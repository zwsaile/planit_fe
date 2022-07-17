import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe ('Dashboard', () => {

  it('Should display homepage information', () => {
    cy.intercept('POST', 'https://immense-hollows-78338.herokuapp.com/graphql', (req) => {
      const { body } = req
      aliasQuery(req, 'getUser')
      aliasMutation(req, 'createDailyRecord')
      if (hasOperationName(req, 'getUser')) {
        req.alias = 'gqlgetUserQuery'
        req.reply((res) => {
          res.body.data.getUser.weeklyAverageShowerTime = 1000
          res.body.data.getUser.weeklyAverageWaterUsage = 1000
          res.body.data.getUser.thirtydayAverageShowerTime = 2000
          console.log("Running")
        })
      } else {
        console.log("Not Running")
      }
    })
    cy.visit('http://localhost:3000/')
    cy.contains('Did You Know...')
    cy.contains('The average American uses 5,336 gallons of water on showers per year?')
    cy.contains('If the average shower was 5 minutes long, that number would drop to 3650!')
    cy.get('.main-info-pic').should('have.attr', 'src').should('include', '../assets/save-water-pic.jpeg')
    cy.contains('Your Shower Timer')
    cy.get('.timer-btn-container').children().should('have.length', 3)
    cy.get('.timer-btn-container').contains('Start')
    cy.get('.timer-btn-container').contains('Pause')
    cy.get('.timer-btn-container').contains('Reset')
    cy.contains('Today')
    cy.contains('7 Day Average')
    cy.contains('30 Day Average')
    cy.contains('0:0')
    cy.contains('16:40')
    cy.contains('33:20')
    cy.contains('Plastic Bottles')
    cy.contains('Plastic Straws')
    cy.contains('Plastic Shopping Bags')
  })
    it('Should be able to update item counters', () => {
      cy.visit('http://localhost:3000/')
      cy.get('.item-increment-btn').first().click().click()
      cy.get('.container-item-number').should('have.text', '2')
      cy.get('.item-decrement-btn').first().click().click().click()
      cy.get('.container-item-number').should('have.text', '0')

      cy.get('.item-increment-btn').eq(1).click().click()
      cy.get('.straw-item-number').should('have.text', '2')
      cy.get('.item-decrement-btn').eq(1).click().click().click()
      cy.get('.straw-item-number').should('have.text', '0')

      cy.get('.item-increment-btn').last().click().click()
      cy.get('.bag-item-number').should('have.text', '2')
      cy.get('.item-decrement-btn').last().click().click().click()
      cy.get('.bag-item-number').should('have.text', '0')
    })
})
