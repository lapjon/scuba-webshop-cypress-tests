// Ensure the user exists before any tests are run
before(() => {
    cy.request({
        method: 'POST',
        url: '/api/signup',
        body: {
            email: 'testuser@example.com',
            password: 'ValidPass123'
        },
        failOnStatusCode: false // Prevent errors if the user already exists
    });
});

describe('Cart - Signed User', () => {
    const userEmail = 'testuser@example.com';
    const userPassword = 'ValidPass123';

    beforeEach(() => {
        // Log in as an existing user before each test
        cy.visit('/login.html');
        cy.get('#email').type(userEmail);
        cy.get('#password').type(userPassword);
        cy.get('button[type="submit"]').click();

        // Verify login successful
        cy.get('#logged-in-user').should('contain', userEmail);
    });
    it('Test 1: Add multiple items to cart and verify cart counter and total amount', () =>{
        cy.visit('/gear.html');

        // Add multiple predefined items
        cy.get('.add-to-basket').eq(0).click(); // Item 1
        cy.get('.add-to-basket').eq(1).click(); // Item 2
        cy.get('.add-to-basket').eq(2).click(); // Item 3
        cy.get('.add-to-basket').eq(6).click(); // Item 4
        cy.get('.add-to-basket').eq(11).click(); // Item 5

          // Verify basket counter is updated
        cy.get('#basket-counter').should('contain', '5');

        // Click Cart link 
        cy.get('nav a').contains('Cart').click(); 

        // Verify numbers of items in the Cart
        cy.get('#total-items').should('have.text', '5');

        // Verify total price in the basket
        cy.get('#total-price').should('have.text', '316.95');
    });

    it('Test 2: Remove items from cart and verify cart counter and total amount', () => {
        // Add 5 items to the basket to set up test data
        cy.visit('/gear.html');
        cy.get('.add-to-basket').eq(0).click(); // Item 1
        cy.get('.add-to-basket').eq(1).click(); // Item 2
        cy.get('.add-to-basket').eq(2).click(); // Item 3
        cy.get('.add-to-basket').eq(6).click(); // Item 4
        cy.get('.add-to-basket').eq(11).click(); // Item 5

        // Visit the basket page
        cy.visit('/basket.html');

        // Verify numbers of items in the Cart
        cy.get('#total-items').should('have.text', '5');

        // Verify total price in the basket
        cy.get('#total-price').should('have.text', '316.95');

        // Remove the fourth and fifth item from the basket
        // The list will reindex after the first removal
        cy.get('.remove-item').eq(4).click();
        cy.get('.remove-item').eq(3).click();

        // Verify numbers of items in the Cart
        cy.get('#total-items').should('have.text', '3');

        // Verify total price in the basket
        cy.get('#total-price').should('have.text', '249.97');
    });

    it('Test 3: Add multiples of the same item and verify quantity and total amount', () => {
        cy.visit('/gear.html');
        cy.get('.add-to-basket').eq(0).click(); // Item 1
        cy.get('.add-to-basket').eq(0).click(); // Item 1 x 2
        // Visit the basket page
        cy.visit('/basket.html');

        // Verify numbers of items in the Cart
        cy.get('#total-items').should('have.text', '2');

        // Verify total price in the basket
        cy.get('#total-price').should('have.text', '59.98');
    });

    it('Test 4: Empty cart and verify quantity and total amount', () => {
        cy.visit('/gear.html');
        cy.get('.add-to-basket').eq(3).click(); // Item 1
        cy.get('.add-to-basket').eq(4).click(); // Item 2
        cy.get('.add-to-basket').eq(5).click(); // Item 3
        // Visit the basket page
        cy.visit('/basket.html');

        // Remove the fourth and fifth item from the basket
        // The list will reindex after the first removal
        cy.get('.remove-item').eq(2).click();
        cy.get('.remove-item').eq(1).click();
        cy.get('.remove-item').eq(0).click();

        // Verify numbers of items in the Cart
        cy.get('#total-items').should('have.text', '0');

        // Verify total price in the basket
        cy.get('#total-price').should('have.text', '0.00');
    });

    it('Test 5: Add multiple items from Welcome page and Gear Page and verify cart counter and total amount', () =>{
        cy.visit('/welcome.html');

        // Add multiple predefined items
        cy.get('.featured-items .add-to-basket').eq(0).click();
        cy.get('.featured-items .add-to-basket').eq(2).click();
        cy.get('.featured-items .add-to-basket').eq(3).click();

        cy.visit('/gear.html');
        // Add multiple predefined items
        cy.get('.add-to-basket').eq(0).click(); 
        cy.get('.add-to-basket').eq(1).click(); 
        cy.get('.add-to-basket').eq(2).click(); 
        cy.get('.add-to-basket').eq(6).click(); 
        cy.get('.add-to-basket').eq(11).click(); 

          // Verify basket counter is updated
        cy.get('#basket-counter').should('contain', '8');

        // Click Cart link 
        cy.get('nav a').contains('Cart').click(); 

        // Verify numbers of items in the Cart
        cy.get('#total-items').should('have.text', '8');

        // Verify total price in the basket
        cy.get('#total-price').should('have.text', '712.92');
    });
});