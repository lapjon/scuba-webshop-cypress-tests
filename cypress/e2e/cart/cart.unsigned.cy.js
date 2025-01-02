describe('Unsigned-in user flows', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5000')
    });

    it('Test 1: Verify Add to Cart from Welcome page', () => {
        // Select the first Add to Cart
        cy.get('.featured-items .add-to-basket').eq(0).click();
        // Verify alert and verify text
        cy.on('window:alert', (alertText) => {
           expect(alertText).to.equal('Mask & Snorkel Set has been added to your cart!')
        });
        // Verify the Cart counter updates
        cy.get('#basket-counter').should('contain', '1');
        // Nagivate to the Cart page
        cy.visit('http://localhost:5000/basket.html');
        // Verify the correct product appears in the Cart
        cy.get('.basket-item').should('have.length', 1).and('contain.text', 'Mask & Snorkel Set');
   
       });
   
    it('Test 2: Add and Remove item from Cart', () => {
         // Listen for window alerts and verify alert text dynamically
        cy.on('window:alert', (alertText) => {
           if (alertText.includes('Diving Fins has been added to your cart!')) {
             expect(alertText).to.equal('Diving Fins has been added to your cart!');
           } else if (alertText.includes('Are you sure you want to remove this item from your cart?')) {
             expect(alertText).to.equal('Are you sure you want to remove this item from your cart?');
           } else {
             throw new Error(`Unexpected alert text: ${alertText}`); // Fails test on unexpected alerts
           }
         });
        // Step 1: Add item to the cart
        cy.get('.featured-items .add-to-basket').eq(2).click();
        // Verify the Cart counter updates
        cy.get('#basket-counter').should('contain', '1');
        // Step 2: Navigate to the Cart page
        cy.visit('http://localhost:5000/basket.html');
        // Step 3: Remove the item
        cy.get('.basket-item .remove-item').click();
        // Verify basket is now empty
        cy.get('.basket-item').should('have.length', 0);
        // Verify the Cart counter updates to 0
        cy.get('#basket-counter').should('contain', '0');
        // Verify the empty cart message
        cy.get('p').should('contain.text', 'Your cart is empty');
       });

    it('Test 3: Verify Cart persistance after page reload', () => {
        // Select the first Add to Cart
        cy.get('.featured-items .add-to-basket').eq(0).click();
        // Verify Cart counter updates to 1
        cy.get('#basket-counter').should('contain', '1');
        // Navigate to Cart page
        cy.visit('http://localhost:5000/basket.html');
        // Verify the cart contains the corerct item 
        cy.get('.basket-item')
        .should('have.length', 1)
        .and('contain.text', 'Mask & Snorkel Set')
        .and('contain.text', '$29.99');
        // Reload the page
        cy.reload();
        // Verify the cart counter still shows 1
        cy.get('#basket-counter').should('contain', '1');
        // Verify the cart still contains the corerct item 
        cy.get('.basket-item')
        .should('have.length', 1)
        .and('contain.text', 'Mask & Snorkel Set')
        .and('contain.text', '$29.99');
    });

    it('Test 4: Verify Checkout page CTA redirect to login page as un-signed user', () => {
        cy.visit('/basket.html');

        // Click Proceed to Checkout button
        cy.get('.checkout-button').click();
        // Verify redirection to the login page
        cy.url().should('include', '/login.html');

    });

    it('Test 5: Verify un-signed user should be prompted to login when proceeding to checkout', () => {
        cy.visit('/basket.html');
        // Click Proceed to Checkout button
        cy.get('.checkout-button').click();
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('You must be logged in to access the checkout page.')
         });

        // Verify redirection to the login page
        cy.url().should('include', '/login.html');

    });


       
});