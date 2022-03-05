const newTestUserPassword = Cypress.env('newTestUserPassword')
beforeEach(() => {
  cy.visit('http://localhost:3000/signup')
  cy.get('h2').contains("Start your free trial")
  cy.get('a[href*="/signin"]')
})

describe('Sign up', () => {
  it('successfully signs the user up', () => {
    const newTestUserEmail = Cypress.env('newTestUserEmail')
    cy.get('input[id*="input-id--name--first-name"]').type("Kobe")
    cy.get('input[id*="input-id--email--email-address"]').type(newTestUserEmail + '3')
    // Use below cy.get as needed. Commented out for now to avoid unnecessary user creation
    // cy.get('input[id*="input-id--email--email-address"]').type(Math.floor(Math.random() * 100) + newTestUserEmail)
    cy.get('input[id*="input-id--password--password"]').type(newTestUserPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('input[id*="search-field"]')
  })

  it('shows the trial banner on sign up', () => {
    const newTestUserEmail = Cypress.env('newTestUserEmail')
    cy.get('input[id*="input-id--name--first-name"]').type("Kobe")
    cy.get('input[id*="input-id--email--email-address"]').type(newTestUserEmail + '4')
    // Use below cy.get as needed. Commented out for now to avoid unnecessary user creation
    // cy.get('input[id*="input-id--email--email-address"]').type(Math.floor(Math.random() * 100) + newTestUserEmail)
    cy.get('input[id*="input-id--password--password"]').type(newTestUserPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('input[id*="search-field"]')
    cy.get('#trialBanner').contains('14')
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