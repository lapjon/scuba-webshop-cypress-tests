// cypress/support/commands.d.ts

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user.
       * @example cy.login()
       */
      login(): Chainable<void>;
    }
  }