describe('Signup Functionality', () => {
    const baseUrl = 'http://localhost:5000/signup.html'; // Adjust as per your project setup

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('Test 1: Verify successfull sign up with valid details', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('ValidPass123');
        cy.get('#confirm-password').type('ValidPass123');
        cy.get('button[type="submit"]').click();

        // Verify success message
        cy.get('#signup-message', { timeout: 5000 })
            .should('exist')
            .should('be.visible')
            .and('contain.text', 'User registered successfully!');

        // Verify redirection after signup
        cy.url({ timeout: 10000 }).should('include', '/gear.html');
    });

    it('Test 2: Verify error should display for invalid email format', () => {
        cy.get('#email').type('invalid-email');
        cy.get('#password').type('ValidPass123');
        cy.get('#confirm-password').type('ValidPass123');
        cy.get('button[type="submit"]').click();

        // Verify email error message
        cy.get('#email-error')
            .should('be.visible')
            .and('contain.text', 'Please enter a valid email address.');

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });

    it('Test 3: Verify error message should display for invalid password: No uppercase letters', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('password123'); // Invalid password
        cy.get('#confirm-password').type('password123');
        cy.get('button[type="submit"]').click();

        // Verify password error message
        cy.get('#password-error')
            .should('be.visible')
            .and(
                'contain.text',
                'Password must be at least 8 characters long, include an uppercase letter, and a number.'
            );

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });

    it('Test 4: Verify error message should display for invalid password: No numbers', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('Password'); // Invalid password
        cy.get('#confirm-password').type('Password');
        cy.get('button[type="submit"]').click();

        // Verify password error message
        cy.get('#password-error')
            .should('be.visible')
            .and(
                'contain.text',
                'Password must be at least 8 characters long, include an uppercase letter, and a number.'
            );

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });

    it('Test 5: Verify error message should display for invalid password: No letters', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('12345678'); // Invalid password
        cy.get('#confirm-password').type('12345678');
        cy.get('button[type="submit"]').click();

        // Verify password error message
        cy.get('#password-error')
            .should('be.visible')
            .and(
                'contain.text',
                'Password must be at least 8 characters long, include an uppercase letter, and a number.'
            );

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });

    it('Test 6: Verify error message should display for invalid password: No than 8 characters', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('Pass123'); // Weak password
        cy.get('#confirm-password').type('Pass123');
        cy.get('button[type="submit"]').click();

        // Verify password error message
        cy.get('#password-error')
            .should('be.visible')
            .and(
                'contain.text',
                'Password must be at least 8 characters long, include an uppercase letter, and a number.'
            );

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });

    it('Test 7: Verify error should display for mismatched passwords', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('ValidPass123');
        cy.get('#confirm-password').type('Mismatch123');
        cy.get('button[type="submit"]').click();

        // Verify confirm password error message
        cy.get('#confirm-password-error')
            .should('be.visible')
            .and('contain.text', 'Passwords do not match!');

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });

    it('Test 8: Verify multiple submissions should be prevented', () => {
        const uniqueEmail = `user${Date.now()}@example.com`;

        cy.get('#email').type(uniqueEmail);
        cy.get('#password').type('ValidPass123');
        cy.get('#confirm-password').type('ValidPass123');

        // Click the submit button multiple times
        cy.get('button[type="submit"]').dblclick();

        // Verify only one request is processed
        cy.get('#signup-message', { timeout: 5000 })
            .should('be.visible')
            .and('contain.text', 'User registered successfully!');

        // Verify redirection after signup
        cy.url({ timeout: 10000 }).should('include', '/gear.html');
    }); 
});

describe('Pre-existing user Tests', () => {
    const duplicateEmail = 'existinguser@example.com';
    const password = 'ValidPass123';

    // Pre-test hook to create the user
    before(() => {
        // Ensure the user exists before running the test
        cy.request({
            method: 'POST',
            url: '/api/signup',
            body: {
                email: duplicateEmail,
                password: password,
            },
            failOnStatusCode: false, // Avoid error if the user already exists
        }).then((response) => {
            cy.log('Setup Response:', response);
        });
    });

    it('Test 9: Verify error message should display for email already in use', () => {
        // Intercept the signup API request
        cy.intercept('POST', '/api/signup').as('signupRequest');

        // Visit the signup page
        cy.visit('/signup.html');

        // Fill in the signup form with duplicate email
        cy.get('#email').type(duplicateEmail);
        cy.get('#password').type(password);
        cy.get('#confirm-password').type(password);
        cy.get('button[type="submit"]').click();

        // Wait for the backend response
        cy.wait('@signupRequest').then(({ response }) => {
            // Log the intercepted response for debugging
            cy.log('Intercepted Response:', response);

            // Assert backend response
            expect(response.statusCode).to.eq(409); // Ensure 409 Conflict for duplicate email
            expect(response.body.message).to.eq('Email already in use.');
        });

        // Verify error message on the UI
        cy.get('#signup-message', { timeout: 5000 })
            .should('be.visible')
            .and('contain.text', 'Email already in use.');

        // Verify no redirection
        cy.url().should('include', '/signup.html');
    });
});