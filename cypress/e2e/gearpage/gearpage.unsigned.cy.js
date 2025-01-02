describe('Unsigned-in user flows', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5000')
    });

    it('Test 1: Verify item count on the Gear page', () => {
        // Verify that the Gear page has 12 items
        cy.visit('http://localhost:5000/gear.html');
        cy.get('.items-container .item').should('have.length', 12);
        // Check each item has required details
        cy.get('.items-container .item').each(($el) => {
           cy.wrap($el).find('img').should('be.visible');
           cy.wrap($el).find('h3').should('not.be.empty');
           cy.wrap($el).find('p').should('contain.text', 'Price');
           cy.wrap($el).find('.add-to-basket').should('be.visible');
        });
    });

    it('Test 2: Verify alert displays the correct message when clicking Add to Cart for all items', () => {
        cy.visit('http://localhost:5000/gear.html');
        // Step 1: Get all items and loop through each
        cy.get('.items-container .item').each(($el, index) => {
          // Step 2: Intercept window alert and verify the correct text
          cy.on('window:alert', (alertText) => {
            // Extract item name from the current element for dynamic assertion
            const expectedItemName = $el.find('h3').text();
            expect(alertText).to.equal(`${expectedItemName} has been added to your cart!`);
          });
    
          // Step 3: Click the Add to Cart button for the current item
          cy.wrap($el).within(() => {
            cy.contains('Add to Cart').click(); // Click the Add to Cart button
          });
    
          // Step 4: Remove the window alert listener to prevent conflicts
          cy.removeAllListeners('window:alert');
        });
      });
});