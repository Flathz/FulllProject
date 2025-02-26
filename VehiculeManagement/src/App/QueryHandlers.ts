import { getFleet } from "../Infra/DrizzleRepository";
import { getVehicle } from "../Domain/Fleet";
import { GetVehicleLocationQuery } from "./Queries";
import { Location } from "../Domain/Types";

export const handleGetVehicleLocation = async(
  query: GetVehicleLocationQuery,
): Promise<Location | undefined> => {
  const fleet = await getFleet(query.fleetId);
  const vehicle = getVehicle(fleet, query.vehicleId);
  return vehicle?.location;
};
