/// <reference types="cypress" />

const user = {
  email: 'first@example.com',
  password: 'password123',
};

describe('Sign Up', () => {

  beforeEach(() => {
    cy.task('reset')
  })
  it('should successfully create a user when entering an email and a password', () => {
    // Sign Up
    cy.signUp(user)

    // Sign In
    cy.signIn(user)

    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email);
  });

  it('should successfully login with a provided seeded user', () => {
    cy.task('reset');
    cy.task('seed');
    cy.signIn(user)
  })

  it('should block duplicated users on signup', () => {
    cy.task('reset')
    cy.signUp(user)
    cy.signUp(user)
    cy.get('p').should('contain', 'A user already exists with that email.')
  })
});
