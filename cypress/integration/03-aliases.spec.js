/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  const item = 'Good attitude'

  it('defines the aliases', () => {
    
  })
  

  it('should show items that match whatever is in the filter field', () => {
    cy.get('[data-test="new-item-input"]').as('newItemBar')
    cy.get('[data-test="add-item"]').as('addButton')
    cy.get('[data-test="filter-items"]').as('filterBar')
    cy.get('[data-test="items"] li').as('allItems')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems')

    cy.get('@newItemBar').type(item)
    cy.get('@addButton').click()
    cy.get('@filterBar').type(item)
    cy.get('@allItems').each(($item) => {
      expect($item.text()).to.include(item)
    });
  });

  it('should hide items that do not match whatever is in the filter field', () => {
    cy.get('[data-test="new-item-input"]').as('newItemBar')
    cy.get('[data-test="add-item"]').as('addButton')
    cy.get('[data-test="filter-items"]').as('filterBar')
    cy.get('[data-test="items"] li').as('allItems')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems')

    cy.get('@newItemBar').type(item)
    cy.get('@addButton').click()
    cy.get('@newItemBar').type('other stuff')
    cy.get('@addButton').click()
    cy.get('@filterBar').type(item)
    cy.get('@unpackedItems').should('not.contain', 'stuff');
  });
});

describe('Filtering items with aliases', () => {
  
});
