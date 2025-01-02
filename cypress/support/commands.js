Cypress.Commands.add('login', () => {
    // API endpoint and test user credentials
    cy.request('POST', 'http://localhost:5000/api/login', {
      email: 'testuser@example.com',
      password: 'Password123',
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
      window.localStorage.setItem('userEmail', 'testuser@example.com');
      // Assert token and userEmail are set
    expect(window.localStorage.getItem('token')).to.exist;
    expect(window.localStorage.getItem('userEmail')).to.eq('testuser@example.com');
    });
  });

  // Custom command to create a user
Cypress.Commands.add('createUser', () => {
    const uniqueEmail = `testuser${Date.now()}@example.com`; // Generate unique email
    cy.request('POST', 'http://localhost:5000/api/signup', {
      name: 'Test User',
      email: uniqueEmail,
      password: 'Password123',
    }).then((response) => {
      // Optionally verify the response or store additional data
      expect(response.status).to.eq(201); // Ensure user creation was successful
    });
  });

  Cypress.Commands.add('addItemsToCart', (items) => {
    items.forEach((item) => {
      cy.visit('/gear.html'); // Adjust URL based on your app
      cy.get(`button[onclick*="addToBasket(${item.id},"]`) // Match item ID in the onclick attribute
    });
  });

