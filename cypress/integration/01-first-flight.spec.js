/// <reference types="cypress" />

describe('Create a New Item', () => {

    let testString = 'Good attitude'

    beforeEach(() => {
        cy.visit('/jetsetter')
    });

    it('should have a form', () => {
        cy.get('form')
    });

    it('should have the words "Add Item"', () => {
        cy.contains('Add Item');
    });

    it('should put stuff in an input field', () => {
        cy.get('[data-test="new-item-input"]').type('Good attitude')
    });

    it('should move added items to unpacked', () => {
        cy.get('[data-test="new-item-input"]').type(testString)
        cy.get('[data-test="add-item"]').click()
        cy.get('[data-test="new-item-input"]').should('not.contain', testString)
        cy.get(':nth-child(5) > label.s-vF8tIk32PFgu')
    });

    it('checked items should be deleted', () => {
        cy.get('[data-test="new-item-input"]').type(testString)
        cy.get('[data-test="add-item"]').click()
        cy.get(':nth-child(5) > label.s-vF8tIk32PFgu').click()
        cy.get(':nth-child(5) > label.s-vF8tIk32PFgu').should('not.exist')

    })
});
