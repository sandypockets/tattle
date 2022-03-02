const testEmail = Cypress.env('testUserEmail')
const testPassword = Cypress.env('testUserPassword')

beforeEach(() => {
  cy.visit('http://localhost:3000/signin')
  cy.get('h2').contains("Sign in to your account")
  cy.get('a[href*="/signup"]')
})

describe('Login', () => {
  it('successfully logs the user in', () => {
    cy.get('input[id*="input-id--email--email-address"]').type(testEmail)
    cy.get('input[id*="input-id--password--password"]').type(testPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('input[id*="search-field"]')
  })

  it('shows an error if the email is not included', () => {
    cy.get('input[id*="input-id--email--email-address"]').type(' ')
    cy.get('input[id*="input-id--password--password"]').type(testPassword)
    cy.get('button[type*="submit"]').click()
    cy.get('span[id^="auth-error-message"]')
  })

  it('shows an error if the password is not included', () => {
    cy.get('input[id*="input-id--email--email-address"]').type(testEmail)
    cy.get('input[id*="input-id--password--password"]').type(' ')
    cy.get('button[type*="submit"]').click()
    cy.get('span[id^="auth-error-message"]')
  })

  it('shows an error if the email or password are incorrect', () => {
    cy.get('input[id*="input-id--email--email-address"]').type('somerandomuser@example.com')
    cy.get('input[id*="input-id--password--password"]').type('somerandompassword')
    cy.get('button[type*="submit"]').click()
    cy.get('span[id^="auth-error-message"]')
  })
})