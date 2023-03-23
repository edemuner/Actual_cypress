var converter = require('color-convert')

/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select(5);
    cy.get('[data-test="select-result"]').contains('Hawkeye');
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').as('tomatoCheckbox');
    cy.get('[data-test="checkbox-result"]').contains('(None)');
    cy.get('@tomatoCheckbox').check()

    cy.get('.grid > :nth-child(5)').find('input[type="checkbox"]').as('checkboxInputs')
    cy.get('@checkboxInputs').check()
    cy.get('[data-test="checkbox-result"]').contains('Lettuce, Tomato, Onion, Sardines');

    cy.get('@checkboxInputs').uncheck()
    cy.get('[data-test="checkbox-result"]').contains('(None)');

  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');

    cy.get('[data-test="radio-paul"]').check();
    cy.get('[data-test="radio-result"]').contains('Paul');

    cy.get('[data-test="radio-john"]').check();
    cy.get('[data-test="radio-result"]').contains('John');

    cy.get('[data-test="radio-george"]').check();
    cy.get('[data-test="radio-result"]').contains('George');
  });

  it.only('should find and control a color input', () => {
    cy.get('[data-test="color-input"]').invoke('val', '#edd400').trigger('input');
    cy.get('[data-test="color-result"]').contains('#edd400');

    cy.get('[data-test="color-container"]').invoke('attr', 'style').then((color) => {
      cy.log(color)
    })
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]');
    cy.get('[data-test="date-result"]');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]');
    cy.get('[data-test="range-result"]');
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
