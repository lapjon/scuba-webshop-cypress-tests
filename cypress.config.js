const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5000", 
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Specify test file patterns
    supportFile: "cypress/support/e2e.js", // Path to custom commands and setup
    viewportWidth: 1280, // Default browser viewport width
    viewportHeight: 720, // Default browser viewport height
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Enable video recording for failed tests
  video: true,

  // Automatically retry failed tests in CI environments
  retries: {
    runMode: 2, // Retries for `cypress run`
    openMode: 0, // Retries for `cypress open`
  },

  // Configure default timeout values
  defaultCommandTimeout: 8000, // Adjust if your app requires longer waits
  pageLoadTimeout: 60000, // Page load timeout
});
