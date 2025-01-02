describe('E2E Test: Complete happy flow with signup, login and purchase', () => {
    const uniqueEmail = `user${Date.now()}@example.com`;
    const userPassword = 'ValidPass123';


    it('Test 1: Full E2E Happy Flow: browse gear, add items, register, login, checkout, and complete order', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.visit('http://localhost:5000')
    // Step 1: Browse welcome page and add items to cart
    cy.get('.featured-items .add-to-basket').eq(0).click(); // Add Mask & Snorkel Set to cart
    cy.get('.featured-items .add-to-basket').eq(1).click(); // Add Full Body Wetsuit to Cart
    cy.get('#basket-counter').should('contain', '2'); // Verify cart counter updates
    
    // Step 2: Browse gear page and add items to cart
    cy.visit('/gear.html');

    cy.get('.add-to-basket').eq(2).click(); // Add Diving Fins to Cart
    cy.get('.add-to-basket').eq(6).click(); // Add Diving boots to Cart
    cy.get('.add-to-basket').eq(9).click(); // Add Gear Bag to Cart
    cy.get('.add-to-basket').eq(10).click(); // Add Underwater Camera to Cart

    cy.get('#basket-counter').should('contain', '6'); // Verify cart counter updates
    
    // Click Cart link 
    cy.get('nav a').contains('Cart').click();

    // Click Proceed to Checkout button
    cy.get('.checkout-button').click();
    // Verify redirection to the login page
    cy.url().should('include', '/login.html');

    // Assert the presence or redirect CTA
    cy.contains('Not a member? Register here').should('be.visible');
    
    // Click on the "Register here" link
    cy.get('a[href="signup.html"]').click();

    cy.get('#email').type(uniqueEmail);
    cy.get('#password').type('ValidPass123');
    cy.get('#confirm-password').type('ValidPass123');
    cy.get('button[type="submit"]').click();

    // Verify success message
    cy.get('#signup-message', { timeout: 5000 })
    .should('exist')
    .should('be.visible')
    .and('contain.text', 'User registered successfully!');

    // Click Login link 
    cy.get('nav a').contains('Login').click();

    // Fill out the login form
    cy.get('#email').type(uniqueEmail); // Use uniqueEmail defined in before hook
    cy.get('#password').type('ValidPass123');

    // Submit the form
    cy.get('#login-form').submit();

    // Verify login successful
    cy.get('#logged-in-user').should('contain', uniqueEmail);

    // Click Cart link 
    cy.get('nav a').contains('Cart').click();

    // Click Proceed to Checkout button
    cy.get('.checkout-button').click();

    // Fill out the checkout form
    cy.get('#email').type('testuser@example.com');
    cy.get('#first-name').type('Test');
    cy.get('#last-name').type('User');
    cy.get('#address').type('123 Test Street');
    cy.get('#city').type('Test City');
    cy.get('#postcode').type('12345');
    cy.get('#country').select('United States');
    cy.get('#card-name').type('Test User');
    cy.get('#card-number').type('4111111111111111');
    cy.get('#expiry-date')
    .type('2025-12') // Type the month
    .blur()     // Simulate leaving the field
    cy.get('#cvv').type('123');

    // Submit the form
    cy.get('button[type="submit"]').click()
      .then(() => {
        expect(alertStub).to.have.been.calledWith('Thank you for your order!');
    });
    // Verify redirect
    cy.url().should('include', '/welcome.html');




});
});