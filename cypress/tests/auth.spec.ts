describe('Authetication Test', () => {
  it('Should create user account successfully', () => {
    cy.visit('/signup');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('Name');
    cy.get('input[name="username"]').type('testuser'); 
    cy.get('input[name="password"]').type('1234');
    cy.get('input[name="confirmPassword"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/signin');
  });

  it('Should Login Failed', () => {
    cy.visit('/signin');
    cy.get('input[name="username"]').type('testuser'); 
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();
    cy.contains('Username or password is invalid');
  });

  it('Should Login successfully', () => {
    cy.visit('/signin');
    cy.get('input[name="username"]').type('testuser'); 
    cy.get('input[name="password"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });

});
