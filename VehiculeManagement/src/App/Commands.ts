import { VehicleId, FleetId, UserId, Location } from "../Domain/Types";

export type RegisterVehicleCommand = {
  type: "RegisterVehicle";
  fleetId: FleetId;
  vehicleId: VehicleId;
  plateNumber: string;
};

export type ParkVehicleCommand = {
  type: "ParkVehicle";
  fleetId: FleetId;
  vehicleId: VehicleId;
  location: Location;
};

export type CreateFleetCommand = {
  type: "CreateFleet";
  userId: UserId;
};
