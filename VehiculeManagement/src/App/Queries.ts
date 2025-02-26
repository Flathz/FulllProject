import { FleetId, VehicleId } from "../Domain/Types";

export type GetVehicleLocationQuery = {
  type: "GetVehicleLocation";
  fleetId: FleetId;
  vehicleId: VehicleId;
};
