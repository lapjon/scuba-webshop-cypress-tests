describe('Unsigned-in user flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000')
  });
  it('Test 1: Load home page and verify title, header and footer', () => {
     // Verify header is visible 
     cy.get('header').should('be.visible');
     // Verify footer is visible 
     cy.get('footer').should('be.visible');
     // Verify Welcome to Deep Dive is visible 
     cy.get('h2').should('be.visible').and('contain.text', 'Welcome to Deep Dive');
  });

  it('Test 2: Verify featured items and Add to Basket buttons', () => {
     // Very that 4 featured items are on the Welcome page
     cy.get('.featured-items').should('be.visible');
     cy.get('.featured-items .item').should('have.length', 4);
     // Verify that featured items have the Add to Basket button
     cy.get('.add-to-basket').should('have.length', 4);
  });

  it('Test 3: Verify Browse Our Gear CTA functionality', () => {
    // Verify Browse Our Gear CTA in body
    cy.get('.browse-gear-link').should('be.visible').and('contain.text', 'Browse Our Gear');
    cy.get('.browse-gear-link').click();
    // Verify URL contains the Gear page
    cy.url().should('include', '/gear.html');
 });

 it('Test 4: Verify empty cart counter', () => {
    // Get Cart counter and verify it should be 0
  cy.get('#basket-counter').should('be.visible');
  cy.get('#basket-counter').should('contain', '0');
});

});