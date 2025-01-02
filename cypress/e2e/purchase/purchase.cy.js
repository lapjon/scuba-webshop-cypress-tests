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

describe('Purchase flows', () => {
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

it('Test 1: Verify successful purchase flow for signed-in user', () => {
    // Spy on window.alert
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    // Add items to the cart
    cy.visit('/gear.html');
    cy.get('.add-to-basket').eq(0).click() // Add first item
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Mask & Snorkel Set has been added to your basket!');
    });
    cy.get('.add-to-basket').eq(1).click() // Add second item
      .then(() => {
        expect(alertStub.getCall(1)).to.be.calledWith('Full Body Wetsuit has been added to your basket!');
    });

    // Proceed to checkout
    cy.visit('/basket.html');
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
        expect(alertStub.getCall(2)).to.be.calledWith('Thank you for your order!');
    });
    // Verify redirect
    cy.url().should('include', '/welcome.html');

  });

  it('Test 2: Verify cart summary on Checkout Page', () => {
    const expectedData = [
        ['Diving Fins', '2', '$139.98'],
        ['Dive Computer', '1', '$295.99'],
        ['Diving Boots', '1', '$26.99'],
        ['Dive Torch', '2', '$79.98'],
        ['Total', '', '$542.94'],
    ];

    // Visit the gear page and add items to the basket
    cy.visit('/gear.html');
    cy.get('.add-to-basket').eq(2).click(); // Add Diving Fins item
    cy.get('.add-to-basket').eq(2).click(); // Add Diving Fins again
    cy.get('.add-to-basket').eq(6).click(); // Add Diving Boots
    cy.get('.add-to-basket').eq(3).click(); // Add Dive Computer
    cy.get('.add-to-basket').eq(11).click(); // Add Dive Torch
    cy.get('.add-to-basket').eq(11).click(); // Add Dive Torch again

    // Proceed to checkout
    cy.visit('/basket.html');
    cy.get('.checkout-button').click();

    // Wait for the table to render
    cy.get('.basket-summary-table', { timeout: 10000 }).should('be.visible');

    // Log the rows to debug the extra row
    cy.get('.basket-summary-table tbody tr').then((rows) => {
        cy.log(`Found ${rows.length} rows in the table.`);
        rows.each((index, row) => {
            cy.log(`Row ${index + 1}: ${row.innerText}`);
        });
    });

    // Verify only rows containing data
    cy.get('.basket-summary-table tbody tr').each((row, index) => {
        if (index === 0) {
            cy.log(`Skipping header row`);
            return; // Skip header row
        }
        if (index >= expectedData.length) {
            cy.log(`Skipping footer or extra row at index ${index}`);
            return; // Skip footer or extra rows
        }

        const expectedRow = expectedData[index - 1]; // Adjust index for data rows
        cy.log(`Checking row ${index}`);

        cy.wrap(row).within(() => {
            cy.get('td').eq(0).should('contain.text', expectedRow[0])
                .then(() => cy.log(`Item verified: ${expectedRow[0]}`));
            cy.get('td').eq(1).should('contain.text', expectedRow[1])
                .then(() => cy.log(`Quantity verified: ${expectedRow[1]}`));
            cy.get('td').eq(2).should('contain.text', expectedRow[2])
                .then(() => cy.log(`Price verified: ${expectedRow[2]}`));
        });
    });
});
});