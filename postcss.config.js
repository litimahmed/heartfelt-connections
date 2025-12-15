/**
 * @file postcss.config.js
 * @description This file contains the configuration for PostCSS, a tool for transforming CSS with JavaScript plugins.
 * It is used here to integrate Tailwind CSS and Autoprefixer into the build process.
 */

export default {
  /**
   * @property {object} plugins - An object containing the PostCSS plugins to be used.
   * The keys are the names of the plugins, and the values are their configuration objects.
   */
  plugins: {
    /**
     * @property {object} tailwindcss - The Tailwind CSS plugin.
     * It scans the project's HTML, JavaScript, and other files for class names and generates the corresponding CSS.
     * An empty object means we are using the default configuration.
     */
    tailwindcss: {},
    /**
     * @property {object} autoprefixer - The Autoprefixer plugin.
     * It parses CSS and adds vendor prefixes to CSS rules using values from Can I Use.
     * This ensures that the CSS is compatible with a wide range of browsers.
     * An empty object means we are using the default configuration.
     */
    autoprefixer: {},
  },
}
