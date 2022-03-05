const testEmail = Cypress.env('testUserEmail')
const testPassword = Cypress.env('testUserPassword')

beforeEach(() => {
  cy.visit('http://localhost:3000/signin')
  cy.get('h2').contains("Sign in to your account")
  cy.get('a[href*="/signup"]')
  cy.get('input[id*="input-id--email--email-address"]').type(testEmail)
  cy.get('input[id*="input-id--password--password"]').type(testPassword)
  cy.get('button[type*="submit"]').click()
  cy.get('input[id*="search-field"]')
})

describe('Dashboard', () => {
  it("asks the user to create a contact if they don't have any", () => {
    let numberOfContacts = 0;
    cy.request('http://localhost:3000/api/v1/contacts?type=all&ownerId=65442cde-a6c8-4126-8c3b-c50e7a237f4a').then(req => {
      numberOfContacts = req.body.length
    }).then(() => {
      if (numberOfContacts === 0) {
        cy.get('span.mt-2.block.text-sm.font-medium').contains('Add your first contact')
      } else {
        cy.get('#addFirstGoalCardText').contains('Add your first goal')
      }
    })
  })

  it("should show the add a goal screen if stats show zero goals created", () => {
    cy.get('dd#statOne').contains('0')
    let numOfGoals = 0;
    let numOfContacts = 0;
    cy.request('http://localhost:3000/api/v1/contacts?type=all&ownerId=65442cde-a6c8-4126-8c3b-c50e7a237f4a').then(req => {
      numOfContacts = req.body.length
    })
      .then(() => {
        cy.request('http://localhost:3000/api/v1/goals?ownerId=65442cde-a6c8-4126-8c3b-c50e7a237f4a').then(req => {
          numOfGoals = req.body.length
        })
      })
      .then(() => {
        if (numOfContacts === 0) {
          cy.get('span.mt-2.block.text-sm.font-medium').contains('Add your first contact')
        }
        if (numOfContacts !== 0 && numOfGoals === 0) {
          cy.get('span.mt-2.block.text-sm.font-medium').contains('Add your first goal')
        }
      })
  })

})