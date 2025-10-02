<<<<<<< HEAD
import { z } from "genkit";
=======

import { z } from 'genkit';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad

// Add a consumption property to the vehicle type.
export interface Vehicle {
  make: string;
  model: string;
  batteryCapacity: number; // in kWh
  currentCharge: number; // in %
<<<<<<< HEAD
  connectorType: "CCS" | "CHAdeMO" | "Type 2";
=======
  connectorType: 'CCS' | 'CHAdeMO' | 'Type 2';
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  consumption: number; // in km per kWh
}

export const StationSchema = z.object({
  id: z.string(), // Place ID from Google
<<<<<<< HEAD
  name: z.string(),
=======
  name:z.string(),
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  location: z.string(), // Vicinity/address from Google
  vicinity: z.string().optional(),
  distance: z.number(), // in km
  power: z.number(), // in kW - Note: This is a placeholder as Places API doesn't provide it
  pricePerKwh: z.number(), // in currency - Note: This is a placeholder
<<<<<<< HEAD
  connectors: z.array(z.enum(["CCS", "CHAdeMO", "Type 2"])), // Placeholder
  status: z.enum(["available", "in-use", "unavailable"]), // 'available', 'in-use', or 'unavailable'
=======
  connectors: z.array(z.enum(['CCS', 'CHAdeMO', 'Type 2'])), // Placeholder
  status: z.enum(['available', 'in-use', 'unavailable']), // 'available', 'in-use', or 'unavailable'
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
  hasSlotBooking: z.boolean().default(false),
  lat: z.number(),
  lng: z.number(),
});

export type Station = z.infer<typeof StationSchema>;

export interface Booking {
<<<<<<< HEAD
  id: string; // Firestore document ID
  userId: string;
  stationId: string;
  stationName: string;
  bookingTime: Date;
  createdAt: Date;
=======
    id: string; // Firestore document ID
    userId: string;
    stationId: string;
    stationName: string;
    bookingTime: Date;
    createdAt: Date;
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
}

export const FindStationsInputSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number().default(10000), // 10km
});
export type FindStationsInput = z.infer<typeof FindStationsInputSchema>;

export const FindStationsOutputSchema = z.array(StationSchema);

<<<<<<< HEAD
=======

>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
export const PlanRouteInputSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  vehicle: z.custom<Vehicle>(),
});

// The output from google.maps.DirectionsResult is complex, so we use z.any()
// and cast it in the component. We add points to the overview_polyline for decoding.
export const PlanRouteOutputSchema = z.object({
<<<<<<< HEAD
  route: z
    .any()
    .refine(
      (data) =>
        data &&
        data.routes &&
        data.routes.length > 0 &&
        data.routes[0].overview_polyline &&
        typeof data.routes[0].overview_polyline.points === "string",
      { message: "Route must have a valid encoded polyline." }
    ),
  requiredChargingStations: z.array(StationSchema),
  totalDistance: z.number(), // in meters
  totalDuration: z.number(), // in seconds, including charging time
=======
    route: z.any().refine(data => 
        data && 
        data.routes && 
        data.routes.length > 0 && 
        data.routes[0].overview_polyline && 
        typeof data.routes[0].overview_polyline.points === 'string', 
        { message: "Route must have a valid encoded polyline." }
    ),
    requiredChargingStations: z.array(StationSchema),
    totalDistance: z.number(), // in meters
    totalDuration: z.number(), // in seconds, including charging time
>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
});

export type PlanRouteInput = z.infer<typeof PlanRouteInputSchema>;
export type PlanRouteOutput = z.infer<typeof PlanRouteOutputSchema>;
<<<<<<< HEAD
=======


>>>>>>> e985d78e47653e1979c9e24ec6850ea54ccc31ad
