import { InitialOptionsTsJest } from "ts-jest/dist/types";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: ["/node_modules/", "/tests/fixtures/.*"],
} as InitialOptionsTsJest;
