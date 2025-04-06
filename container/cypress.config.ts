import { defineConfig } from "cypress";

export default defineConfig({
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 10000,
    requestTimeout: 10000,
    retries: { runMode: 1, openMode: 1 },
    waitForAnimations: true,
    chromeWebSecurity: false,
    video: false,
    e2e: {
      baseUrl: "http://localhost:8080/",
      supportFile: false,
      specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      setupNodeEvents(on, config) {
      },
    }
});
