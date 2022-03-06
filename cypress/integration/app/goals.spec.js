const testOwnerId = Cypress.env('testUserOwnerId')

beforeEach(() => {
  const testEmail = Cypress.env('testUserEmail')
  const testPassword = Cypress.env('testUserPassword')
  cy.visit('http://localhost:3000/signin')
  cy.get('h2').contains("Sign in to your account")
  cy.get('a[href*="/signup"]')
  cy.get('input[id*="input-id--email--email-address"]').type(testEmail)
  cy.get('input[id*="input-id--password--password"]').type(testPassword)
  cy.get('button[type*="submit"]').click()
  cy.get('input[id*="search-field"]')
  cy.get('a[data-cy*="nav-/app/goals-undefined"]').click()
})

describe('Goals page', () => {

  it("should disable the create button if the user has no contacts", () => {
    let numOfContacts = 0;
    cy.request(`http://localhost:3000/api/v1/contacts?type=all&ownerId=${testOwnerId}`).then(req => {
      numOfContacts = req.body.length
    }).then(() => {
      if (numOfContacts === 0) {
        cy.get('button[data-cy*="header-button"]').should('have.attr', 'disabled')
      }
    })
  });

  it("should enable the create button if the user has contacts", () => {
    let numOfContacts = 0;
    cy.request(`http://localhost:3000/api/v1/contacts?type=all&ownerId=${testOwnerId}`).then(req => {
      numOfContacts = req.body.length
    }).then(() => {
      if (numOfContacts > 0) {
        cy.get('button[data-cy*="header-button"]').should('not.have.attr', 'disabled')
      }
    })
  });

  it("should show a create new goal prompt if the user has no goals", () => {
    let numOfGoals = 0
    cy.request(`http://localhost:3000/api/v1/goals?ownerId=${testOwnerId}`).then(req => {
      numOfGoals = req.body.length
    }).then(() => {
      if (numOfGoals === 0) {
        cy.get('span[data-cy*="addFirstGoalCardText"]').contains('Add your first goal')
      }
    })

  });

});