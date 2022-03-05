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
  cy.get('a[href*="/app/settings"]').click()
})

describe('Settings page', () => {

  it("shows the checkout on the settings page if the user is in trial", () => {
    let userIsInTrial = false
    cy.get('body')
      .then((body) => {
        if (body.find('#trialBanner')) {
          cy.get('h1#checkoutTitle').contains('Tattle monthly')
        } else {
          cy.get('h2.cardTitle').contains('Settings')
        }
      })
  })

})

