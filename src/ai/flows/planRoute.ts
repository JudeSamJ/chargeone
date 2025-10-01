
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Station, Vehicle, PlanRouteOutputSchema, PlanRouteInputSchema, PlanRouteInput, PlanRouteOutput } from '@/lib/types';
import { getDirections } from '@/lib/google-maps';
import { findStations } from './findStations';

export async function planRoute(input: PlanRouteInput): Promise<PlanRouteOutput> {
  return planRouteFlow(input);
}

const planRouteFlow = ai.defineFlow(
  {
    name: 'planRouteFlow',
    inputSchema: PlanRouteInputSchema,
    outputSchema: PlanRouteOutputSchema,
  },
  async ({ origin, destination, vehicle }) => {
    // 1. Get the route from Google Maps
    const directionsResult = await getDirections(origin, destination);

    if (!directionsResult || directionsResult.routes.length === 0) {
      throw new Error('Could not find a route.');
    }

    const route = directionsResult.routes[0];
    const leg = route.legs[0];
    
    // Use the vehicle's specific consumption rate
    const vehicleMaxRangeKm = vehicle.batteryCapacity * vehicle.consumption;
    const safetyBufferKm = 50; // Leave a 50km buffer
    let currentChargeKm = vehicleMaxRangeKm * (vehicle.currentCharge / 100);
    
    const stationsOnRoute: Station[] = [];
    let totalChargingTimeSeconds = 0;

    if (!leg.steps || leg.steps.length === 0) {
        return {
            route: directionsResult,
            requiredChargingStations: [],
            totalDistance: leg.distance?.value || 0,
            totalDuration: leg.duration?.value || 0,
        };
    }

    for (const step of leg.steps) {
        const stepDistanceKm = (step.distance?.value || 0) / 1000;
        
        // Check if we can complete the next step with our buffer
        if (currentChargeKm < stepDistanceKm + safetyBufferKm) {
            // Can't make it to the end of this step with a safe buffer, need to charge.
            const searchPoint = step.start_location;
            
            const nearbyStations = await findStations({
                latitude: searchPoint.lat,
                longitude: searchPoint.lng,
                radius: 50000, // 50km search radius
            });

            // Find the best available station nearby (available and highest power)
            const bestStation = nearbyStations
                .filter(s => s.status === 'available')
                .sort((a, b) => b.power - a.power)[0]; // Get the one with the highest power

            if (bestStation) {
                // Add this station to our list of required stops if it's not already there
                if (!stationsOnRoute.some(s => s.id === bestStation.id)) {
                    stationsOnRoute.push(bestStation);
                }

                // Estimate charging time.
                // Assuming we charge from current state to 80%
                const chargeNeededTo80Percent = (vehicle.batteryCapacity * 0.8) - ((currentChargeKm - stepDistanceKm) / vehicle.consumption);
                
                if (chargeNeededTo80Percent > 0) {
                    // Time (h) = Energy (kWh) / Power (kW)
                    const chargingTimeHours = chargeNeededTo80Percent / bestStation.power;
                    totalChargingTimeSeconds += chargingTimeHours * 3600;

                    // After charging, our range is reset to 80% of max.
                    currentChargeKm = vehicleMaxRangeKm * 0.8;
                }

            } else {
                // Could not find an available station. For now, we'll just continue,
                // but a real app might alert the user or try a wider search.
                console.warn("Could not find any available charging stations near", searchPoint);
            }
        }
        
        // "Consume" the energy for this step
        currentChargeKm -= stepDistanceKm;
    }

    const requiredChargingStations = stationsOnRoute;

    const totalDriveDurationSeconds = leg.duration?.value || 0;
    const totalDurationSeconds = totalDriveDurationSeconds + totalChargingTimeSeconds;
    const totalDistanceMeters = leg.distance?.value || 0;

    return {
      route: directionsResult,
      requiredChargingStations: requiredChargingStations,
      totalDistance: totalDistanceMeters,
      totalDuration: totalDurationSeconds,
    };
  }
);
