# FizzBuzz

A simple TypeScript implementation of the classic **FizzBuzz** problem with tests written in [Jest](https://jestjs.io/). This project is structured for easy testing and modular code organization.

## Features

- Implements the **FizzBuzz** function in TypeScript.
- Uses [Jest](https://jestjs.io/) for testing.
- Configured for [ts-jest](https://kulshekhar.github.io/ts-jest/) to run TypeScript tests efficiently.

## Complexity Analysis

- **Time Complexity:** **O(1)** – The function performs a few modulo operations and conditionals, regardless of input size.
- **Space Complexity:** **O(1)** – Uses a constant amount of memory without additional data structures.

## Interesting Techniques Used

- **TypeScript Modules:** Uses ES module syntax (`import`/`export`) for cleaner code organization. [Learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
- **Jest with TypeScript:** Utilizes [`@jest/globals`](https://jestjs.io/docs/api) for a clean test syntax and better TypeScript integration.
- **TDD Approach:** The project follows a **Test-Driven Development (TDD)** approach, ensuring the FizzBuzz function is fully tested before use.

## Technologies & Libraries

| Name                                             | Description                                  |
| ------------------------------------------------ | -------------------------------------------- |
| [Jest](https://jestjs.io/)                       | JavaScript testing framework.                |
| [ts-jest](https://kulshekhar.github.io/ts-jest/) | TypeScript preprocessor for Jest.            |
| [TypeScript](https://www.typescriptlang.org/)    | Strongly typed JavaScript.                   |
| [ts-node](https://typestrong.org/ts-node/)       | Run TypeScript directly without compilation. |

## Project Structure

```plaintext
/Project/Fizzbuzz
├── node_modules/          # Dependencies installed by npm
├── README.md              # Project documentation
├── package.json           # Project metadata & dependencies
├── package-lock.json      # Locks dependency versions
├── bun.lock               # Bun package manager lockfile
├── jest.config.js         # Jest configuration
├── fizzbuzz.ts            # FizzBuzz function implementation
├── fizzbuzz.test.ts       # Jest test cases for FizzBuzz
```

## Getting Started

### **Requirements**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

Optional (if using Bun instead of npm):

- [Bun](https://bun.sh/) (alternative package manager)

### **Installation Steps**

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd Fizzbuzz
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

   or using Bun:

   ```sh
   bun install
   ```

### **Running the FizzBuzz Function**

Run the **FizzBuzz** function with Node.js and TypeScript:

```sh
npx ts-node fizzbuzz.ts
```

### **Running the Tests**

Execute tests with Jest:

```sh
npm test
```

or

```sh
npx jest
```
