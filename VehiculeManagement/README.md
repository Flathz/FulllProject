# Fleet Management CLI

A backend application built with TypeScript, following CQRS (Command Query Responsibility Segregation) and BDD (Behavior-Driven Development) design principles without Object-Oriented Programming. This project manages a vehicle fleet, allowing users to create fleets, register vehicles, and localize them using GPS coordinates.

## Features
- Create a fleet for a user
- Register vehicles into a fleet
- Localize vehicles with GPS coordinates
- Persistent storage using Drizzle ORM with Bun SQLite

## Installation

### Prerequisites
- [Bun](https://bun.sh/) installed on your system

### Setup
1. Clone the repository:
   ```bash
   git clone git@github.com:Flathz/FulllProject.git
   cd VehiculeManagement
   ```
2. Install the dependencies:
   ```bash
   bun install
   ```
3. Run the application using the CLI:
   ```bash
   bun run start
   ```

### CLI Commands

```bash
# Create a new fleet for user1
bun run start create user1
# Output: fleet-1234567890-abcde (example fleetId) that you need to use for the next bash command

# Register a vehicle into the fleet
bun run start register-vehicle fleet-1234567890-abcde PLATE123

# Localize the vehicle with latitude, longitude, and optional altitude
bun run start localize-vehicle fleet-1234567890-abcde PLATE123 48.8566 2.3522 100
```

- `create <userId>`: Creates a new fleet and returns the fleet ID.
- `register-vehicle <fleetId> <vehiclePlateNumber>`: Registers a vehicle into the specified fleet.
- `localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]`: Sets the location of a vehicle.

## Development & Testing

### Running Tests
- Unit tests (in-memory):
  ```bash
  bun run test
  ```
- Integration tests (persistent):
  ```bash
  bun run test:integration
  ```

### Code Quality Tools

- **ESLint**: Ensures coding standards and catches errors.
- **Prettier**: Maintains consistent code formatting.
- **TypeScript**: Provides type safety and modern features.

```bash
bun run lint    # Lint code
bun run format  # Format code
```

## Architecture
- **CQRS**: Separates commands and queries.
- **BDD**: Uses Cucumber.js for behavior testing.
- **Functional Programming**: Pure functions, no classes.
- **Persistence**: Drizzle ORM with Bun SQLite.

## Design Focus

- **Code Quality**: Readable, modular, type-safe.
- **Simplicity**: Meets requirements without over-engineering.
- **Best Practices**: Uses modern TypeScript and immutability.

## Application Weaknesses

- **Error Handling**: Separate classes for error handling should be implemented.
- **Scalability**: In-memory SQLite is not ideal for large fleets or concurrent users, but sufficient for this project.
- **Logging**: Basic console logging; structured logging with WARN/INFO levels should be added.
- **Testing**: Tests are currently not working, which is a major focus. Cucumber is being used for the first time.

## Improvements for Code Quality

- **Zod or Joi**: Add schema validation for commands/queries.
- **Winston**: Implement structured logging.
- **Type Guards**: Enhance type safety with custom guards.
- **Modular Handlers**: Split command handlers into separate files.
- **Documentation**: Add proper documentation using Swagger if this were a real API.
- **SonarQube**: Implement for code analysis.

## CI/CD Pipeline

1. Set up GitHub Actions to trigger on pushes and pull requests, running SonarQube for code quality and security analysis.
2. Add steps to execute unit and integration tests, followed by ESLint and Prettier for linting.
3. Configure automatic tagging with semantic versions on successful builds and auto-merge pull requests that pass all checks.
4. Deploy the versioned artifacts to a cloud provider like AWS or GCP from the main branch.

### Next Steps
- Add dependency scanning.
- Implement caching for faster builds.
- Explore rolling deployments.

