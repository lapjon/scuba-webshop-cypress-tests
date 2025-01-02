describe('Signed-in user flows', () => {
    const userEmail = 'testuser@example.com';
    const password = 'ValidPass123';
    
    
    before(() => {
      // Ensure the user exists by creating it via API
      cy.request({
        method: 'POST',
        url: '/api/signup',
        body: { email: userEmail, password },
        failOnStatusCode: false, // Ignore failures if the user already exists
    });
});
    
    it('Test 1: Verify signed users can add items to cart and should see updated cart counter', () => {
        const userEmail = 'testuser@example.com';
    const password = 'ValidPass123';

        // Log in as registrered user
        cy.visit('/login.html');
        cy.get('#email').type(userEmail);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();

        // Verify successful sign-in 
        cy.get('#logged-in-user').should('contain', userEmail);

        // Navigate to Welcome page
        cy.visit('/welcome.html');
        // Add items to basket
        cy.get('.featured-items .add-to-basket').eq(0).click();
        cy.get('.featured-items .add-to-basket').eq(1).click();

    
        // Verify basket counter updated correctly
        cy.get('#basket-counter').should('contain', '2');
    });
});