describe('Unsigned-in user flows', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5000')
    });

it('Test 1: Verify page links as unsigned user', () => {
    // Verify title and linke to Gear page
    cy.get('a[href="welcome.html"]').should('contain.text', 'Deep Dive');
    // Verify navigation links in the header (5 links)
    cy.get('nav a').should('have.length', 5);
    // Verify text and visibility of each link (as unsigned user)
    cy.get('nav a').eq(0).should('be.visible').and('contain.text', 'Our Gear')
    cy.get('nav a').eq(1).should('be.visible').and('contain.text', 'About')
    cy.get('nav a').eq(2).should('be.visible').and('contain.text', 'Login')
    // Verify Logout button is not visible as unsigned user
    cy.get('nav a').eq(3).should('not.be.visible').and('contain.text', 'Logout')
    // Verify text and visibility of Cart link (as unsigned user)
    cy.get('nav a').eq(4).should('be.visible').and('contain.text', 'Cart')
    // Verify Browse Our Gear link in body
    cy.get('.browse-gear-link').should('be.visible').and('contain.text', 'Browse Our Gear');
 });

 it('Test 2: Navigate to Gear page when clicking link', () => {
    // Click Our Gear link 
    cy.get('nav a').contains('Our Gear').click();
    // Verify URL contains the Gear page
    cy.url().should('include', '/gear.html');
    // Verify header and footer are visible
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('Test 3: Navigate to About page when clicking link', () => {
    // Click About link 
    cy.get('nav a').contains('About').click();
    // Verify URL contains the Gear page
    cy.url().should('include', '/about.html');
    // Verify header and footer are visible
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('Test 4: Navigate to Login page when clicking link', () => {
    // Click Login link 
    cy.get('nav a').contains('Login').click();
    // Verify URL contains the Gear page
    cy.url().should('include', '/login.html');
    // Verify header and footer are visible
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('Test 5: Navigate to Cart page when clicking link', () => {
    // Click Cart link 
    cy.get('nav a').contains('Cart').click();
    // Verify URL contains the Cart page
    cy.url().should('include', '/basket.html');
    // Verify header and footer are visible
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });

});
