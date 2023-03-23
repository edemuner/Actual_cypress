/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it.only('should set the range and verify it', () => {
    cy.get('@rating-filter').invoke('val', 7).trigger('change')
    //scy.get('@rating-filter').should('have.value', 7);
  });

  it('should check the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').as('checkbox').uncheck();
    cy.get('@checkbox').should('not.be.checked');
  });

  it('should select an option from the select and verify it', () => {
    cy.get('@restaurant-filter').select('Taco Bell');
    cy.get('@restaurant-filter').should('have.value', 'Taco Bell');
  });
});
