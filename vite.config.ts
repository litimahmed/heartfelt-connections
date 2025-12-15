/**
 * @file vite.config.ts
 * @description This file contains the configuration for Vite, a modern build tool
 * that provides a faster and leaner development experience for web projects.
 *
 * @see https://vitejs.dev/config/ for more information on Vite configuration.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * @function defineConfig
 * @description The main function to define the Vite configuration.
 * It takes a configuration object or a function that returns one.
 *
 * @param {object} config - The Vite configuration object.
 * @param {object} config.server - Configuration for the development server.
 * @param {string} config.server.host - The host to listen on. '::' listens on all network interfaces.
 * @param {number} config.server.port - The port for the development server.
 * @param {Array} config.plugins - An array of Vite plugins to use.
 * @param {object} config.resolve - Configuration for module resolution.
 * @param {object} config.resolve.alias - Defines aliases for cleaner import paths.
 */
export default defineConfig(({ mode }) => ({
  // Configuration for the development server.
  server: {
    // Listen on all network interfaces, which is useful for testing on different devices on the same network.
    host: "::",
    // The port the development server will run on.
    port: 8080,
  },
  // An array of Vite plugins to enhance the build process.
  plugins: [
    // The official React plugin for Vite, which uses SWC for fast refresh and compilation.
    react(),
  ].filter(Boolean),
  // Configuration for how modules are resolved.
  resolve: {
    // Defines aliases for import paths to make them cleaner and easier to manage.
    alias: {
      // The '@' alias is configured to point to the 'src' directory.
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
