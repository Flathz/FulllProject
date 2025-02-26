export type VehicleId = string;
export type FleetId = string;
export type UserId = string;
export type Location = {
  latitude: number;
  longitude: number;
  altitude?: number;
};

export type Vehicle = {
  id: VehicleId;
  plateNumber: string;
  location?: Location;
};

export type Fleet = {
  id: FleetId;
  userId: UserId;
  vehicles: Record<VehicleId, Vehicle>;
};

export type DomainError =
  | "VehicleAlreadyRegistered"
  | "VehicleNotFound"
  | "VehicleAlreadyAtLocation"
  | "FleetNotFound";
