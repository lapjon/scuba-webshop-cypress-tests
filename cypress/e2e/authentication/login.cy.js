describe('Signed User - Authentication Flow', () => {
    let uniqueEmail; // Declare at the describe block level

    before(() => {
        // Generate a unique email for the test
        uniqueEmail = `testuser${Date.now()}@example.com`;

        // Create a user via API
        cy.request('POST', 'http://localhost:5000/api/signup', {
            name: 'Test User',
            email: uniqueEmail,
            password: 'Password123',
        }).then((response) => {
            expect(response.status).to.eq(201); // Ensure signup is successful
        });
    });

    it('Test 1: Verify user can log in successfully with valid credentials', () => {
        // Visit the login page
        cy.visit('/login.html');

        // Fill out the login form
        cy.get('#email').type(uniqueEmail); // Use uniqueEmail defined in before hook
        cy.get('#password').type('Password123');

        // Submit the form
        cy.get('#login-form').submit();

        // Verify successful login redirection
        cy.url().should('include', '/gear.html');

        // Verify the user is logged in and correct email is displayed in the header)
        cy.get('#logged-in-user').should('contain', uniqueEmail);
    });

    it('Test 2: Verify user should fail to log in with invalid credentials', () => {
        cy.visit('http://localhost:5000/login.html'); // Navigate to the login page

        // Enter invalid credentials
        cy.get('#email').type('wronguser@example.com');
        cy.get('#password').type('WrongPassword123');
        cy.get('button[type="submit"]').click();

        // Verify error message
        cy.get('#error-message', { timeout: 10000 })
            .should('be.visible')
            .and('contain.text', 'Invalid email or password.');
    });

    it('Test 3: Verify user can log out successfully', () => {
        // Visit the login page
        cy.visit('/login.html');

        // Fill out the login form
        cy.get('#email').type(uniqueEmail); // Use the same uniqueEmail
        cy.get('#password').type('Password123');

        // Submit the form
        cy.get('#login-form').submit();

        // Verify that the user is logged in
        cy.get('#logged-in-user').should('contain', uniqueEmail);

        // Log out
        cy.get('#logout-link', { timeout: 10000 }).should('be.visible').click();

        // Verify logout
        cy.get('#logged-in-user').should('not.exist');
        cy.get('#login-link').should('be.visible');
    });

    it('Test 4: Verify user cannot log in with non-existing user', () => {
        // Visit the login page
        cy.visit('/login.html');

        // Fill out the login form
        cy.get('#email').type('nonexistinguser@email.com'); // Use a non-registered email
        cy.get('#password').type('Password123');

        // Submit the form
        cy.get('#login-form').submit();

        // Verify error message
        cy.get('#error-message', { timeout: 10000 })
            .should('be.visible')
            .and('contain.text', 'Invalid email or password.');
    });

    it('Test 5: Verify error message for empty password field', () => {
        // Visit the login page
        cy.visit('/login.html');

        // Fill out the email field only 
        cy.get('#email').type(uniqueEmail); 

        // Submit the form without entering password
        cy.get('#login-form').submit();

        // Verify error message
        cy.get('#error-message', { timeout: 10000 })
            .should('be.visible')
            .and('contain.text', 'Email and password are required.');
    });

    it('Test 6: Verify error message for empty email field', () => {
        // Visit the login page
        cy.visit('/login.html');

        // Fill out the password field only 
        cy.get('#password').type('Password123');

        // Submit the form without entering email
        cy.get('#login-form').submit();

        // Verify error message
        cy.get('#error-message', { timeout: 10000 })
            .should('be.visible')
            .and('contain.text', 'Email and password are required.');
    });

    it('Test 7: Verify redirect link from Login Page to Signup Page for unsigned users', () => {
        // Visit the login page
        cy.visit('/login.html');

        // Assert the presence or redirect CTA
        cy.contains('Not a member? Register here').should('be.visible');
    
        // Click on the "Register here" link
        cy.get('a[href="signup.html"]').click();
    
        // Verify that the user is redirected to the signup page
        cy.url().should('include', '/signup.html');
    
        // Verify the signup page content
        cy.get('h2').should('contain', 'Sign Up'); // Adjust selector and content to your signup page
        cy.get('form').should('exist'); // Ensure the signup form is present
    });
});