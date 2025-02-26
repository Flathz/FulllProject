import { Given, When, Then } from '@cucumber/cucumber';
import { getFleet } from '../src/Infra/DrizzleRepository';
import * as assert from "node:assert";
import {handleCreateFleet, handleParkVehicle, handleRegisterVehicle} from "../src/App/CommandHandlers";

let myFleetId: string;
let otherFleetId: string;
let vehicleId: string;
let vehiclePlateNumber: string;
let location: { latitude: number; longitude: number; altitude?: number };

Given('my fleet', async function () {
  const result = await handleCreateFleet({ type: 'CreateFleet', userId: 'user1' });
  assert(result.success);
  myFleetId = result.data!;
});

Given('the fleet of another user', async function () {
  const result = await handleCreateFleet({ type: 'CreateFleet', userId: 'user2' });
  assert(result.success);
  otherFleetId = result.data!;
});

Given('a vehicle', function () {
  vehicleId = `veh-${Date.now()}`;
  vehiclePlateNumber = `PLATE-${Date.now()}`;
});

Given('I have registered this vehicle into my fleet', async function () {
  const result = await handleRegisterVehicle({
    type: 'RegisterVehicle',
    fleetId: myFleetId,
    vehicleId,
    plateNumber: vehiclePlateNumber,
  });
  assert(result.success);
});

Given('this vehicle has been registered into the other user\'s fleet', async function () {
  const result = await handleRegisterVehicle({
    type: 'RegisterVehicle',
    fleetId: otherFleetId,
    vehicleId,
    plateNumber: vehiclePlateNumber,
  });
  assert(result.success);
});

Given('a location', function () {
  location = { latitude: 48.8566, longitude: 2.3522 };
});

Given('my vehicle has been parked into this location', async function () {
  const result = await handleParkVehicle({
    type: 'ParkVehicle',
    fleetId: myFleetId,
    vehicleId,
    location,
  });
  assert(result.success);
});

When('I register this vehicle into my fleet', async function () {
  const result = await handleRegisterVehicle({
    type: 'RegisterVehicle',
    fleetId: myFleetId,
    vehicleId,
    plateNumber: vehiclePlateNumber,
  });
  this.result = result;
});

When('I try to register this vehicle into my fleet', async function () {
  const result = await handleRegisterVehicle({
    type: 'RegisterVehicle',
    fleetId: myFleetId,
    vehicleId,
    plateNumber: vehiclePlateNumber,
  });
  this.result = result;
});

When('I park my vehicle at this location', async function () {
  const result = await handleParkVehicle({
    type: 'ParkVehicle',
    fleetId: myFleetId,
    vehicleId,
    location,
  });
  this.result = result;
});

When('I try to park my vehicle at this location', async function () {
  const result = await handleParkVehicle({
    type: 'ParkVehicle',
    fleetId: myFleetId,
    vehicleId,
    location,
  });
  this.result = result;
});

Then('this vehicle should be part of my vehicle fleet', async function () {
  const fleet = await getFleet(myFleetId);
  assert(fleet.vehicles[vehicleId]);
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert(!this.result.success);
  assert.equal(this.result.error, 'VehicleAlreadyRegistered');
});

Then('the known location of my vehicle should verify this location', async function () {
  const fleet = await getFleet(myFleetId);
  const vehicle = fleet.vehicles[vehicleId];
  assert.deepEqual(vehicle.location, location);
});

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert(!this.result.success);
  assert.equal(this.result.error, 'VehicleAlreadyAtLocation');
});