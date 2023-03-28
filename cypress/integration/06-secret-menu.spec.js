/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for (const property of properties){
    it('should have a column for ${property}', () => {
      cy.get(`#${property}-column`);
    })

    it('should hide the column if unchecked', () => {
      cy.get(`#show-${property}`).uncheck().debug();
      cy.get(`#${property}-column`).should('be.hidden');
    })
  }

  for (const restaurant of restaurants){
    it('should only exhibit selected restaurant', () => {
      cy.get('#restaurant-visibility-filter').select(restaurant)
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(0).should('contain', restaurant)
      })
    })
  }

  for (const rate of ratings){
    it('should only exhibit greater than minimum rating', () => {
      cy.get('#minimum-rating-visibility').invoke('val', rate).trigger('input')
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(5).find('.cell')//.invoke('text').should('be.at.least', rate)
        
        .should(($cell) => {
          const cell = parseInt($cell.text())
          expect(cell).to.be.gte(rate)
        })
      })
    })
  }
});
