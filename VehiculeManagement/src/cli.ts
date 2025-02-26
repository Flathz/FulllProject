import { program } from "commander";
import {
  handleCreateFleet,
  handleRegisterVehicle,
  handleParkVehicle,
} from "./App/CommandHandlers";
import { initializeDb } from "./Infra/DrizzleRepository";

(async () => {
  await initializeDb();

  program
    .command("create <userId>")
    .description("Create a new fleet")
    .action(async (userId: string) => {
      const result = await handleCreateFleet({ type: "CreateFleet", userId });
      if (result.success) {
        console.log(result.data);
      } else {
        console.error(`Error: ${result.error}`);
        process.exit(1);
      }
    });

  program
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Register a vehicle in a fleet")
    .action(async (fleetId: string, vehiclePlateNumber: string) => {
      const vehicleId = `veh-${vehiclePlateNumber}`;
      const result = await handleRegisterVehicle({
        type: "RegisterVehicle",
        fleetId,
        vehicleId,
        plateNumber: vehiclePlateNumber,
      });
      if (!result.success) {
        console.error(`Error: ${result.error}`);
        process.exit(1);
      }
      console.log("Vehicle registered successfully");
    });

  program
    .command(
      "localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]",
    )
    .description("Set vehicle location")
    .action(
      async (
        fleetId: string,
        vehiclePlateNumber: string,
        lat: string,
        lng: string,
        alt?: string,
      ) => {
        const vehicleId = `veh-${vehiclePlateNumber}`;
        const result = await handleParkVehicle({
          type: "ParkVehicle",
          fleetId,
          vehicleId,
          location: {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            altitude: alt ? parseFloat(alt) : undefined,
          },
        });
        if (!result.success) {
          console.error(`Error: ${result.error}`);
          process.exit(1);
        }
        console.log("Vehicle location updated");
      },
    );

  await program.parseAsync(process.argv);
})();
