
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
    // 1. Get the initial route from Google Maps
    const directionsResult = await getDirections(origin, destination);

    if (!directionsResult || directionsResult.routes.length === 0) {
      throw new Error('Could not find a route.');
    }

    const route = directionsResult.routes[0];
    const leg = route.legs[0];
    
    // Vehicle-specific range calculations
    const vehicleMaxRangeKm = vehicle.batteryCapacity * vehicle.consumption;
    const safetyBufferKm = 50; // Keep a 50km buffer
    let currentChargeKm = vehicleMaxRangeKm * (vehicle.currentCharge / 100);
    
    const requiredChargingStops: Station[] = [];
    let totalChargingTimeSeconds = 0;

    if (!leg.steps || leg.steps.length === 0) {
        return {
            route: directionsResult,
            requiredChargingStations: [],
            totalDistance: leg.distance?.value || 0,
            totalDuration: leg.duration?.value || 0,
        };
    }

    // Simulate driving through each step of the route
    for (const step of leg.steps) {
        const stepDistanceKm = (step.distance?.value || 0) / 1000;
        
        // If we can't make the next step even with our current charge, we have a problem.
        if (currentChargeKm < stepDistanceKm) {
             // In a real app, you might throw an error or try to find a charger *before* this step.
             console.warn(`Not enough charge to complete step. Charge: ${currentChargeKm}km, Step: ${stepDistanceKm}km`);
        }

        // Check if our battery will drop below a comfortable threshold (e.g., 20%) + safety buffer
        // This is a more proactive check than just seeing if we can make the next step.
        const proactiveCheckThresholdKm = (vehicleMaxRangeKm * 0.2) + safetyBufferKm;

        if (currentChargeKm - stepDistanceKm < proactiveCheckThresholdKm) {
            // We need to find a charger soon.
            const searchPoint = step.end_location; // Search at the end of the current step
            
            const nearbyStations = await findStations({
                latitude: searchPoint.lat,
                longitude: searchPoint.lng,
                radius: 50000, // 50km search radius, can be adjusted
            });

            // Find the best available station (available and highest power)
            const bestStation = nearbyStations
                .filter(s => s.status === 'available')
                .sort((a, b) => b.power - a.power)[0]; // Get the one with the highest power

            if (bestStation) {
                // Add this station to our list of required stops if it's not already there
                if (!requiredChargingStops.some(s => s.id === bestStation.id)) {
                  requiredChargingStops.push(bestStation);

                  // Simulate charging to 80%
                  const chargeNeededTo80PercentKwh = (vehicle.batteryCapacity * 0.8) - ((currentChargeKm - stepDistanceKm) / vehicle.consumption);
                  
                  if (chargeNeededTo80PercentKwh > 0) {
                      // Time (h) = Energy (kWh) / Power (kW)
                      const chargingTimeHours = chargeNeededTo80PercentKwh / bestStation.power;
                      totalChargingTimeSeconds += chargingTimeHours * 3600;

                      // After charging, our range is reset to 80% of max.
                      currentChargeKm = vehicleMaxRangeKm * 0.8;
                  }
                }

            } else {
                // Could not find an available station. 
                // A more advanced implementation could expand the search radius or alert the user.
                console.warn("Could not find any available charging stations near", searchPoint);
            }
        }
        
        // "Consume" the energy for this step
        currentChargeKm -= stepDistanceKm;
    }

    const totalDriveDurationSeconds = leg.duration?.value || 0;
    const totalDurationSeconds = totalDriveDurationSeconds + totalChargingTimeSeconds;
    const totalDistanceMeters = leg.distance?.value || 0;

    return {
      route: directionsResult,
      requiredChargingStations: requiredChargingStops,
      totalDistance: totalDistanceMeters,
      totalDuration: totalDurationSeconds,
    };
  }
);
