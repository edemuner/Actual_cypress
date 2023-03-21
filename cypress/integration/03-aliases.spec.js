/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="new-item-input"]').as('newItemBar')
    cy.get('[data-test="add-item"]').as('addButton')
    cy.get('[data-test="filter-items"]').as('filterBar')
    cy.get('[data-test="items"] li').as('allItems')
    cy.get('[data-test="items-unpacked"]').as('unpackedItems')
    cy.get('[data-test="items-packed"]').as('packedItems')

  });

  const item = 'Good attitude'

  it('should show items that match whatever is in the filter field', () => {
    cy.get('@newItemBar').type(item)
    cy.get('@addButton').click()
    cy.get('@filterBar').type(item)
    cy.get('@allItems').each(($item) => {
      expect($item.text()).to.include(item)
    });
  });

  it('should hide items that do not match whatever is in the filter field', () => {
    cy.get('@newItemBar').type(item)
    cy.get('@addButton').click()
    cy.get('@newItemBar').type('other stuff')
    cy.get('@addButton').click()
    cy.get('@filterBar').type(item)
    cy.get('@unpackedItems').should('not.contain', 'stuff');
  });

  it('clicking an item should move it to the other items list', () => {
    cy.get('@unpackedItems').find('label').first().as('firstItem')
    cy.get('@firstItem').invoke('text').as('text').then((text) => {
      cy.get('@firstItem').click()
      cy.get('@packedItems').should('contain', text)
    })
    
  })

});
