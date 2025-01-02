describe('Test 1: Responsiveness - Hero Section', () => {
    const viewports = [
      { device: 'iPhone X', width: 375, height: 812 }, // Mobile
      { device: 'iPad Mini', width: 768, height: 1024 }, // Tablet
      { device: 'MacBook 13', width: 1280, height: 800 }, // Desktop
    ];
  
    viewports.forEach((viewport) => {
      it(`should display the hero section correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height); // Set viewport size
        cy.visit('http://localhost:5000'); // Load the homepage
  
        // Verify hero section is visible
        cy.get('h2').should('be.visible').and('contain.text', 'Welcome to Deep Dive');
       
  
        // Verify button is visible and aligned
        cy.get('.browse-gear-link').should('be.visible');
      });
    });
  });

  describe('Test 2: Responsiveness - Navigation Bar', () => {
    const viewports = [
      { device: 'iPhone X', width: 375, height: 812 }, // Mobile
      { device: 'iPad Mini', width: 768, height: 1024 }, // Tablet
      { device: 'MacBook 13', width: 1280, height: 800 }, // Desktop
    ];
  
    viewports.forEach((viewport) => {
      it(`should display and allow navigation bar interactions on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height); // Set viewport size
        cy.visit('http://localhost:5000'); // Load the homepage
  
        // Verify navigation bar is visible
        cy.get('nav').should('be.visible');
  
        // Verify links in navigation bar
        cy.get('nav a').should('have.length', 5);
  
        // Verify links are clickable
        cy.get('nav a').contains('Our Gear').click();
        cy.url().should('include', '/gear.html');
  
        cy.visit('http://localhost:5000');
        cy.get('nav a').contains('About').click();
        cy.url().should('include', '/about.html');
      });
    });
  });

  describe('Test 3: Gear Page Grid Layout', () => {
    const viewports = [
      { device: 'iPhone X', width: 375, height: 812, expectedColumns: 1 }, // Mobile: 1 column
      { device: 'iPad Mini', width: 768, height: 1024, expectedColumns: 3 }, // Tablet: 3 columns
      { device: 'MacBook 13', width: 1280, height: 800, expectedColumns: 4 }, // Desktop: 4 columns
    ];
  
    viewports.forEach((viewport) => {
      describe(`${viewport.device} Viewport`, () => {
        it(`should display ${viewport.expectedColumns} column(s)`, () => {
          cy.viewport(viewport.width, viewport.height);
          cy.visit('http://localhost:5000/gear.html');
  
          cy.wait(1000); // Allow layout to stabilize
  
          cy.get('.items-container .item').should('be.visible');
  
          cy.get('.items-container').then(($container) => {
            const containerWidth = $container.width();
            const itemWidth = $container.find('.item').first().width();
            const actualColumns = Math.floor(containerWidth / itemWidth);
  
            // Log debugging information
            cy.log(`Viewport: ${viewport.device}`);
            cy.log(`Container Width: ${containerWidth}px, Item Width: ${itemWidth}px, Actual Columns: ${actualColumns}`);
            console.log(`Viewport: ${viewport.device} - ${viewport.width}x${viewport.height}`);
            console.log(`Container Width: ${containerWidth}px`);
            console.log(`Item Width: ${itemWidth}px`);
            console.log(`Actual Columns: ${actualColumns}`);
  
            // Validate column count
            expect(actualColumns).to.equal(viewport.expectedColumns);
          });
        });
      });
    });
  });