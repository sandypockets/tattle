const testEmail = Cypress.env('testUserEmail')
const testPassword = Cypress.env('testUserPassword')

describe('Login', () => {
  it('successfully logs the user in', () => {
    cy.visit('http://localhost:3000/signin')
    cy.get('input[id*="input-id--email--email-address"]').type(testEmail)
    cy.get('input[id*="input-id--password--password"]').type(testPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('input[id*="search-field"]')
  })
})