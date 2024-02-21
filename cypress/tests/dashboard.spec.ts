describe('Dashboard Test', () => {
    beforeEach(() => {
        cy.login('testuser', '1234');
        cy.intercept("PATCH", "/users/*").as("updateUser");
        cy.intercept("POST", "/transactions").as("createTransaction");
    });

    it('should be able to see username', () => {
        cy.visit('/');
        cy.contains('testuser');
    });

    it('Should be able to view user profile', () => {
        cy.visit('/user/settings');
        cy.contains('User Settings');
    });

    it('Should be able to update user profile', () => {
        cy.visit('/user/settings');
        cy.get('input[name="firstName"]').clear().type('Test');
        cy.get('input[name="lastName"]').clear().type('Name');
        cy.get('input[name="email"]').clear().type('test@test.com');
        cy.get('input[name="phoneNumber"]').clear().type('415600635'); 
        cy.get('button[type="submit"]').click();
        cy.wait("@updateUser").its("response.statusCode").should("equal", 204);
        
    });


    it('Should be able to view bank accounts', () => {
        cy.visit('/bankaccounts');
        cy.contains('Bank Accounts');
    });

    it('Should be able to create new bank accounts', () => {
        cy.visit('/bankaccounts/new');
        cy.get('input[name="bankName"]').clear().type('My Test Bank');
        cy.get('input[name="routingNumber"]').clear().type('987651234');
        cy.get('input[name="accountNumber"]').clear().type('123450000');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/bankaccounts');
        cy.contains('My Test Bank');

    });

    it('Should be able to add new payment type transaction', () => {
        cy.visit('/transaction/new');
        cy.getBySelLike("user-list-item").first().click({ force: true });
        cy.get('input[name="amount"]').clear().type('150');
        cy.get('input[name="description"]').clear().type('Cypress Test');
        cy.getBySelLike("submit-payment").click();
        cy.wait("@createTransaction").its("response.statusCode").should("equal", 200);
        
    });

    it('Should be able to add new request type transaction', () => {
        cy.visit('/transaction/new');
        cy.getBySelLike("user-list-item").first().click({ force: true });
        cy.get('input[name="amount"]').clear().type('150');
        cy.get('input[name="description"]').clear().type('Cypress Test');
        cy.getBySelLike("submit-request").click();
        cy.wait("@createTransaction").its("response.statusCode").should("equal", 200);
        
    });

  
    
  
  });
  