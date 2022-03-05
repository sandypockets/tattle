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

describe('Contacts page', () => {
  it("should show a prompt to create a contact if the user has none", () => {
    let numOfContacts = 0;
    cy.request('http://localhost:3000/api/v1/contacts?type=all&ownerId=65442cde-a6c8-4126-8c3b-c50e7a237f4a').then(req => {
      numOfContacts = req.body.length
    }).then(() => {
      if (numOfContacts === 0) {
        cy.get('span[data-cy*="add-first-contact-card"]').contains('Add your first contact')
      }
    })
  });

  it("should show a table of contact if the user has more than 0", () => {
    let numOfContacts = 0;
    cy.request('http://localhost:3000/api/v1/contacts?type=all&ownerId=65442cde-a6c8-4126-8c3b-c50e7a237f4a').then(req => {
      numOfContacts = req.body.length
    }).then(() => {
      if (numOfContacts > 0) {
        cy.get('span[data-cy*="contacts-page-table"]')
      }
    })
  });

});