/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber')
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"]').click()
    cy.location('pathname').should('equal', '/echo-chamber/sign-in')
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {});
});

describe('Sign Up', () => {
  const invalidInput = "not-an-email"
  const password = 'myPassword'
  const validEmail = 'myEmail@server.com'
  const user = {
    'email': `${Date.now()}@email.com`,
    'password': 'myPassword'
  }


  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit')
    cy.get('[data-test="sign-up-email"]').as('signupEmail')
    cy.get('[data-test="sign-up-password"]').as('signupPassword')
   
  });

  it('should require an email', () => {

    cy.get('@signupPassword').type(password)
    cy.get('@submit').click();

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field')

    cy.get('@signupEmail')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true')
  });

  it('should require that the email actually be an email address', () => {

    cy.get('@signupPassword').type(password)

    cy.get('@signupEmail').type(invalidInput)
    cy.get('@submit').click()

    cy.get('@signupEmail')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true')

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', `Please include an '@' in the email address. '${invalidInput}' is missing an '@'.`)
  });

  it('should require a password when the email is present', () => {

    cy.get('@signupEmail').type(validEmail)
    cy.get('@submit').click()

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field')

    cy.get('@signupPassword')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true')
  });

  it('should successfully create a user when entering an email and a password', () => {
    // this is the n00b way to odo it
    cy.get('@signupEmail').type(user.email)
    cy.get('@signupPassword').type(user.password)
    cy.get('@submit').click()

    cy.visit('/echo-chamber/sign-in')
    cy.get('[data-test="sign-in-email"]').as('signinEmail').type(user.email)
    cy.get('[data-test="sign-in-password"]').as('signinPassword').type(user.password)
    cy.get('[data-test="sign-in-submit"]').as('signinSubmit').click()

    cy.location('pathname').should('equal', '/echo-chamber/posts')
    cy.contains('Signed in as ' + user.email)
  })
});
