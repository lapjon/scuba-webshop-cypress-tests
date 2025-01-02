**Scuba Webshop**

Welcome to the Scuba Webshop – a demo project showcasing a functional e-commerce website built with Node.js, Express, and Cypress for automated testing. This project is designed as a QA portfolio piece, highlighting end-to-end (E2E) testing workflows and automated UI testing.

Features:

- User Authentication: Sign-up, login, and logout functionality.
- Dynamic Cart: Add, remove, and persist items in the cart.
- Checkout Flow: Validate user input during checkout and complete orders.
- Responsive Design: Optimized for desktop and mobile devices.
- Automated Testing: Comprehensive Cypress tests for all key workflows.

Technologies Used:

Frontend: HTML, CSS, Vanilla JavaScript
Backend: Node.js, Express.js
Database: SQLite
Testing: Cypress
CI/CD: GitHub Actions

Project Structure:

The project consists of the following main components:

Public Directory: Contains static HTML, CSS, and JavaScript files for the front-end, including pages like Welcome, Login, Signup, Basket, Gear, and Checkout.
* Source Directory: Includes backend source code, such as the main server.js file.
* Tests Directory: Holds Cypress and Jest test files for automated testing, including end-to-end and unit tests.
* GitHub Workflows: Pre-configured CI workflows to run tests on push or pull requests.
* Package File: Manages Node.js dependencies and scripts.
* Documentation: This README file provides detailed instructions and information about the project.

Installation:

1. Clone the repository:
git clone git@github.com:lapjon/scuba-webshop-cypress-tests.git
cd scuba-webshop-cypress-tests

2. Install dependencies:
npm install

3. Start the server:
npm run start

4. Open your browser and navigate to http://localhost:5000.



Running Tests:

Open Cypress UI
npm run cypress:open

Run Cypress Tests in CLI
npm run cypress:run

This will:

* Start the server.
* Run all Cypress tests in headless mode.
* Run Tests on Multiple Browsers

By default, tests run on Chrome and Firefox via GitHub Actions.


GitHub Actions:

The project includes a pre-configured CI workflow to:

* Run tests automatically on every push or pull request.
* Test on multiple browsers (Chrome and Firefox).


Key Test Scenarios

**Homepage**

* Unsigned User:

TC1: Load home page and verify title, header, and footer.
TC2: Verify featured items and Add to Basket buttons.
TC3: Validate the Browse Our Gear CTA functionality.
TC4: Verify empty cart counter.

* Signed-In User:

TC1: Add items to the cart and verify the cart counter.

**Gear Page**

* Unsigned User:

TC1: Verify item count on the Gear page.
TC2: Confirm alert messages for Add to Cart functionality.

* Signed-In User:

TC1: Add items and verify basket updates.

**Cart Page**

* Unsigned User:

TC1: Verify Add to Cart from Welcome page.
TC2: Add and remove items from the cart.
TC3: Verify cart persistence after page reload.
TC4: Confirm Proceed to Checkout redirects to the login page.
TC5: Verify unsigned user is prompted to log in when proceeding to checkout.

* Signed-In User:

TC1: Add multiple items and verify cart counter and total amount.
TC2: Remove items and validate updates.
TC3: Verify quantities and pricing for multiple instances of the same item.
TC4: Empty cart and verify cart counter and total amount.
TC5: Add multiple items from Welcome page and Gear page and verify cart counter and total amount.

**Responsiveness**

TC1: Responsiveness - Hero Section  
TC2: Responsiveness - Navigation Bar    
TC3: Responsiveness - Gear Grid Page Layout


**Navigation**

* Unsigned User Flows:

TC1: Verify page links as unsiged user
TC2: Navigate to Gear page when clicking link.
TC3: Navigate to About page when clicking link.
TC4: Navigate to Login page when clicking link.
TC5: Navigate to Cart page when clicking link.

* Signed-In User Flows:

TC1: Verify navigation links and flows.

**Authentication**

* Login

TC1: Verify can log in successfully with valid credentials   
TC2: Verify user should fail to log in with invalid credentials    
TC3: Verify user can log out successfully
TC4: Verify user cannot log in with non-existing user
TC5: Verify error message for empty password field
TC6: Verify error message for empty email field
TC7: Verify redirect link from Login page to Signup page for unsigned user

* Signup 

TC1: Verify successful sign up with valid credentials
TC2: Verify error should display for invalid email format
TC3: Verify error should display for invalid password: No uppercase letters
TC4: Verify error should display for invalid password: No numbers 
TC5: Verify error should display for invalid password: No letters
TC6: Verify error should display for invalid password: Less than 8 characters  
TC7: Verify error should display for mismatched passwords
TC8: Verify multiple submissions should be prevented
TC9: Verify error error message should display for email already in use


**Checkout Flow**

TC1: Error message should display for missing field: email
TC2: Error message should display for invalid email format
TC3: Error message should display for numbers in first name field
TC4: Error message should display for missing first name 
TC5: Error message should display for numbers in last name field
TC6: Error message should display for missing last name 
TC7: Error message should display for too short address
TC8: Error message should display for missing address
TC9: Error message should display for missing country
TC10: Error message should display for missing city
TC11: Error message should display for too short postcode
TC12: Error message should display for too long postcode
TC13: Error message should display for numbers in card holder name field
TC14: Error message should display for special characters in card holder name field
TC15: Error message should display for letters in card number field
TC16: Error message should display for invalid card number
TC17: Error message should display for past expiry date
TC18: Error message should display for invalid cvv number

**End-to-End Flow**

Full E2E Happy Flow: Browse gear, add items, register, log in, checkout, and complete order.


License

This project is licensed under the MIT License.

Author

Created by Jon Laprevote – QA Engineer | Portfolio Project


