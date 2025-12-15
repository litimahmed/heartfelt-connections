/**
 * @file eslint.config.js
 * @description This file contains the configuration for ESLint, a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
 * It helps in maintaining code quality and enforcing coding standards.
 */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Ignore the 'dist' directory, which contains the build output.
  { ignores: ["dist"] },
  {
    // Extends the recommended ESLint and TypeScript ESLint configurations.
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Apply these rules to all TypeScript and TSX files.
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      // Set the ECMAScript version to 2020.
      ecmaVersion: 2020,
      // Define the global variables that are available in a browser environment.
      globals: globals.browser,
    },
    // Define the plugins to be used.
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    // Define the rules to be enforced.
    rules: {
      // Enforce the rules of hooks.
      ...reactHooks.configs.recommended.rules,
      // Enforce that only components are exported from files that use React Refresh.
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Disable the rule that flags unused variables, as this can be noisy during development.
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
