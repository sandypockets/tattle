beforeEach(() => {
  cy.visit('http://localhost:3000/signup')
  cy.get('h2').contains("Start your free trial")
  cy.get('a[href*="/signin"]')
})

describe('Sign up', () => {
  it('successfully signs the user up for a trial', () => {
    const newTestUserEmail = Cypress.env('newTestUserEmail')
    const newTestUserPassword = Cypress.env('newTestUserPassword')
    cy.get('input[id*="input-id--name--first-name"]').type("Kobe")
    cy.get('input[id*="input-id--email--email-address"]').type(newTestUserEmail)
    cy.get('input[id*="input-id--password--password"]').type(newTestUserPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('input[id*="search-field"]')
  })

  it('shows an error if the account already exists', () => {
    const testEmail = Cypress.env('testUserEmail')
    const testPassword = Cypress.env('testUserPassword')
    cy.get('input[id*="input-id--name--first-name"]').type("Kobe")
    cy.get('input[id*="input-id--email--email-address"]').type(testEmail)
    cy.get('input[id*="input-id--password--password"]').type(testPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('span[id^="auth-error-message"]')
  })
})