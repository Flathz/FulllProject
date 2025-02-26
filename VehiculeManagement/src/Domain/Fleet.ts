import { Fleet, FleetId, VehicleId, Vehicle, Location, UserId } from "./Types";

export const createFleet = (id: FleetId, userId: UserId): Fleet => ({
  id,
  userId,
  vehicles: {},
});

export const hasVehicle = (fleet: Fleet, vehicleId: VehicleId): boolean =>
  !!fleet.vehicles[vehicleId];

export const addVehicle = (fleet: Fleet, vehicle: Vehicle): Fleet => ({
  ...fleet,
  vehicles: {
    ...fleet.vehicles,
    [vehicle.id]: vehicle,
  },
});

export const updateVehicleLocation = (
  fleet: Fleet,
  vehicleId: VehicleId,
  location: Location,
): Fleet => ({
  ...fleet,
  vehicles: {
    ...fleet.vehicles,
    [vehicleId]: {
      ...fleet.vehicles[vehicleId],
      location,
    },
  },
});

export const getVehicle = (
  fleet: Fleet,
  vehicleId: VehicleId,
): Vehicle | undefined => fleet.vehicles[vehicleId];
