import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { text, real, sqliteTable } from "drizzle-orm/sqlite-core";
import { Fleet, Vehicle, VehicleId, FleetId } from "../Domain/Types";
import { eq } from "drizzle-orm";

export const fleets = sqliteTable("fleets", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
});

export const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey(),
  fleetId: text("fleetId").references(() => fleets.id),
  plateNumber: text("plateNumber").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  altitude: real("altitude"),
});

const sqlite = new Database("./fleet.db");
const db = drizzle(sqlite);

export const initializeDb = async () => {
  await db.run(`CREATE TABLE IF NOT EXISTS fleets (
id TEXT PRIMARY KEY,
userId TEXT NOT NULL
)`);
  await db.run(`CREATE TABLE IF NOT EXISTS vehicles (
id TEXT PRIMARY KEY,
fleetId TEXT,
plateNumber TEXT NOT NULL,
latitude REAL,
longitude REAL,
altitude REAL,
FOREIGN KEY (fleetId) REFERENCES fleets(id)
)`);
};

export const saveFleet = async (fleet: Fleet): Promise<void> => {
  await db
    .insert(fleets)
    .values({
      id: fleet.id,
      userId: fleet.userId,
    })
    .onConflictDoUpdate({
      target: fleets.id,
      set: { userId: fleet.userId },
    });

  for (const vehicle of Object.values(fleet.vehicles)) {
      await db
      .insert(vehicles)
          // @ts-ignore
      .values({
        id: vehicle.id,
        fleetId: fleet.id,
        plateNumber: vehicle.plateNumber,
        latitude: vehicle.location?.latitude,
        longitude: vehicle.location?.longitude,
        altitude: vehicle.location?.altitude,
      })
      .onConflictDoUpdate({
        target: vehicles.id,
        set: {
          plateNumber: vehicle.plateNumber,
            // @ts-ignore
          latitude: vehicle.location?.latitude,
          longitude: vehicle.location?.longitude,
          altitude: vehicle.location?.altitude,
        },
      });
  }
};

export const getFleet = async (fleetId: FleetId): Promise<Fleet> => {
  const fleetResult = await db
    .select()
    .from(fleets)
    .where(eq(fleets.id, fleetId))
    .get();
  if (!fleetResult) throw new Error("FleetNotFound");

  const vehicleResults = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.fleetId, fleetId))
    .all();

  const vehiclesMap: Record<VehicleId, Vehicle> = {};
  for (const row of vehicleResults) {
    vehiclesMap[row.id] = {
      id: row.id,
      plateNumber: row.plateNumber,
      location: row.latitude
        ? {
            latitude: row.latitude,
            longitude: row.longitude!,
            altitude: row.altitude || undefined,
          }
        : undefined,
    };
  }

  return {
    id: fleetResult.id,
    userId: fleetResult.userId,
    vehicles: vehiclesMap,
  };
};
