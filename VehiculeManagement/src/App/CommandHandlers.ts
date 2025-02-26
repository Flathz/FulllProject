import { getFleet, saveFleet } from "../Infra/DrizzleRepository";
import {
  addVehicle,
  hasVehicle,
  updateVehicleLocation,
  getVehicle,
  createFleet,
} from "../Domain/Fleet";
import {
  ParkVehicleCommand,
  CreateFleetCommand,
  RegisterVehicleCommand,
} from "./Commands";
import { DomainError } from "../Domain/Types";

export type CommandResult<T = void> =
  | {
    success: true;
    data?: T;
  }
  | {
    success: false;
    error: DomainError;
  };

export const handleCreateFleet = async (
  command: CreateFleetCommand,
): Promise<CommandResult<string>> => {
  const fleetId = `fleet-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const fleet = createFleet(fleetId, command.userId);
  await saveFleet(fleet);
  return { success: true, data: fleetId };
};

export const handleRegisterVehicle = async (
  command: RegisterVehicleCommand,
): Promise<CommandResult> => {
  const fleet = await getFleet(command.fleetId).catch(() => {
    throw new Error("FleetNotFound");
  });
  if (hasVehicle(fleet, command.vehicleId)) {
    return { success: false, error: "VehicleAlreadyRegistered" };
  }

  const vehicle = { id: command.vehicleId, plateNumber: command.plateNumber };
  const updatedFleet = addVehicle(fleet, vehicle);
  await saveFleet(updatedFleet);

  return { success: true };
};

export const handleParkVehicle = async (
  command: ParkVehicleCommand,
): Promise<CommandResult> => {
  const fleet = await getFleet(command.fleetId).catch(() => {
    throw new Error("FleetNotFound");
  });
  const vehicle = getVehicle(fleet, command.vehicleId);

  if (!vehicle) {
    return { success: false, error: "VehicleNotFound" };
  }

  if (
    vehicle.location?.latitude === command.location.latitude &&
    vehicle.location?.longitude === command.location.longitude
  ) {
    return { success: false, error: "VehicleAlreadyAtLocation" };
  }

  const updatedFleet = updateVehicleLocation(
    fleet,
    command.vehicleId,
    command.location,
  );
  await saveFleet(updatedFleet);

  return { success: true };
};
