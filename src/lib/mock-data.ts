import type { Vehicle } from './types';

export const defaultVehicle: Vehicle = {
  make: 'Tesla',
  model: 'Model Y',
  batteryCapacity: 75,
  currentCharge: 65,
  connectorType: 'CCS',
};

export const vehicles: Vehicle[] = [
    { make: 'Tesla', model: 'Model 3', batteryCapacity: 75, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Tesla', model: 'Model Y', batteryCapacity: 75, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Tesla', model: 'Model S', batteryCapacity: 100, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Tesla', model: 'Model X', batteryCapacity: 100, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Ford', model: 'Mustang Mach-E', batteryCapacity: 98, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Chevrolet', model: 'Bolt EV', batteryCapacity: 65, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Hyundai', model: 'Ioniq 5', batteryCapacity: 77, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Kia', model: 'EV6', batteryCapacity: 77, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Volkswagen', model: 'ID.4', batteryCapacity: 82, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Audi', model: 'e-tron', batteryCapacity: 95, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Jaguar', model: 'I-PACE', batteryCapacity: 90, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Porsche', model: 'Taycan', batteryCapacity: 93, currentCharge: 100, connectorType: 'CCS' },
    { make: 'Nissan', model: 'Leaf', batteryCapacity: 40, currentCharge: 100, connectorType: 'CHAdeMO' },
    { make: 'Renault', model: 'Zoe', batteryCapacity: 52, currentCharge: 100, connectorType: 'Type 2' },
]
