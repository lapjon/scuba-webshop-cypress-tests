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

        // Ensure items are added to the cart before each test
      const items = [
        { id: 1, name: 'Scuba Mask' },
        { id: 2, name: 'Wetsuit' },
      ];
      cy.addItemsToCart(items);
  
      // Navigate to checkout page
      cy.visit('/checkout.html');
    });

    it('Test 1: Error message should display for missing field: email', () => {
        cy.get('#email').clear();
        cy.get('button[type="submit"]').click();
    
        // Assertions for missing email
        cy.get('#email-error').should('contain', 'Please enter a valid email address.');
      });
    
      it('Test 2: Error message should display for invalid email format', () => {
        cy.get('#email').type('invalid-email');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid email
        cy.get('#email-error').should('contain', 'Please enter a valid email address.');
      });

      it('Test 3: Error message should display for numbers in first name field', () => {
        cy.get('#first-name').type('123');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid first name
        cy.get('#first-name-error').should('contain', 'Please enter a valid first name (letters only).');
      });

      it('Test 4: Error message should display for missing first name', () => {
        cy.get('#first-name').clear();
        cy.get('button[type="submit"]').click();
    
        // Assertion for missing first name
        cy.get('#first-name-error').should('contain', 'Please enter a valid first name (letters only).');
      });

      it('Test 5: Error message should display for numbers in last name field', () => {
        cy.get('#last-name').type('123');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid last name
        cy.get('#last-name-error').should('contain', 'Please enter a valid last name (letters only).');
      });

      it('Test 6: Error message should display for missing last name', () => {
        cy.get('#last-name').clear();
        cy.get('button[type="submit"]').click();
    
        // Assertion for missing last name
        cy.get('#last-name-error').should('contain', 'Please enter a valid last name (letters only).');
      });

      it('Test 7: Error message should display for too short address: less than 5 characters', () => {
        cy.get('#address').type('abcd');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid address
        cy.get('#address-error').should('contain', 'Address must be at least 5 characters long.');
      });

      it('Test 8: Error message should display for missing address field', () => {
        cy.get('#address').clear();
        cy.get('button[type="submit"]').click();
    
        // Assertion for missing address
        cy.get('#address-error').should('contain', 'Address must be at least 5 characters long.');
      });

      it('Test 9: Error message should display for missing country', () => {
        // Do not interact with select country dropdown
        cy.get('button[type="submit"]').click();
    
        // Assertion for missing country
        cy.get('#country-error').should('contain', 'Please select your country.');
      });

      it('Test 10: Error message should display for missing city field', () => {
        cy.get('#city').clear();
        cy.get('button[type="submit"]').click();
    
        // Assertion for missing city
        cy.get('#city-error').should('contain', 'City cannot be empty.');
      });

      it('Test 11: Error message should display for too short postcode: less than 4 characters', () => {
        cy.get('#postcode').type('123');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid postcode
        cy.get('#postcode-error').should('contain', 'Postcode must be 4-6 digits.');
      });

      it('Test 12: Error message should display for too long postcode: longer than 6 characters', () => {
        cy.get('#postcode').type('1234567');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid postcode
        cy.get('#postcode-error').should('contain', 'Postcode must be 4-6 digits.');
      });

      it('Test 13: Error message should display for numbers in card holder name field', () => {
        cy.get('#card-name').type('1234567');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid card holder name
        cy.get('#card-name-error').should('contain', 'Cardholder name must contain letters only.');
      });

      it('Test 14: Error message should display for special characters in card holder name field', () => {
        cy.get('#card-name').type('@#$%^&*');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid card holder name
        cy.get('#card-name-error').should('contain', 'Cardholder name must contain letters only.');
      });

      it('Test 15: Error message should display for letters in card number field', () => {
        cy.get('#card-number').type('letters');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid card number
        cy.get('#card-number-error').should('contain', 'Card number must be 16 digits.');
      });

      it('Test 16: Error message should display for invalid card number', () => {
        cy.get('#card-number').type('1234567891011');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid number
        cy.get('#card-number-error').should('contain', 'Card number must be 16 digits.');
      });

      it('Test 17: Error message should display for past expiry date', () => {
        cy.get('#expiry-date')
        .type('2024-01') // Correct format for type="month"
        .blur()     // Simulate leaving the field
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid expiry date
        cy.get('#expiry-date-error').should('contain', 'Expiry date must be in the future.');
      });

      it('Test 18: Error message should display for invalid cvv number', () => {
        cy.get('#cvv').type('1');
        cy.get('button[type="submit"]').click();
    
        // Assertion for invalid cvv number
        cy.get('#cvv-error').should('contain', 'CVV must be 3 digits.');
      });

});


