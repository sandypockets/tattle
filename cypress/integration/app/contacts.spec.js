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
  cy.get('a[data-cy*="nav-/app/contacts-undefined"]').click()
})

describe('Contacts index page', () => {
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

  it("should show a table of contacts if the user has 1 or more contacts", () => {
    let numOfContacts = 0;
    cy.request('http://localhost:3000/api/v1/contacts?type=all&ownerId=65442cde-a6c8-4126-8c3b-c50e7a237f4a').then(req => {
      numOfContacts = req.body.length
    }).then(() => {
      if (numOfContacts > 0) {
        cy.get('table[data-cy*="contacts-page-table"]')
      }
    })
  });

});

describe('Contacts new page', () => {
  beforeEach(() => {
    cy.get('a[data-cy*="nav-/app/contacts/new-contacts"]').click()
  })

  it("should show a form to create a new contact", () => {
    cy.get('h2[data-cy*="create-contact-form-title"]').contains('Create a contact')
  });

  it("should submit the form successfully", () => {
    cy.get('input[data-cy*="create-contact-form-name"]').type('Kobe')
    cy.get('input[data-cy*="create-contact-form-phone"]').type('6139994567')
    cy.get('button[data-cy*="create-contact-form-submit"]').click()
    // TO DO
    // Check that contact is displayed successfully
  });
});

describe('phone number form validation', () => {
  beforeEach(() => {
    cy.get('a[data-cy*="nav-/app/contacts/new-contacts"]').click()
    cy.get('input[data-cy*="create-contact-form-name"]').type('Kobe - Cypress Test')
  })

  it("should fail to submit the form if it contains letters", () => {
    cy.get('input[data-cy*="create-contact-form-phone"]').type('613a994567')
    cy.get('button[data-cy*="create-contact-form-submit"]').click()
    cy.get('span[data-cy*="phone-validation-error-message"]')
  });

  it("should should fail to submit the form if it contains too many numbers", () => {
    cy.get('input[data-cy*="create-contact-form-phone"]').type('61319994567')
    cy.get('button[data-cy*="create-contact-form-submit"]').click()
    cy.get('span[data-cy*="phone-validation-error-message"]')
  });

  it("should should fail to submit the form if it contains too many characters", () => {
    cy.get('input[data-cy*="create-contact-form-phone"]').type('613-999--4567')
    cy.get('button[data-cy*="create-contact-form-submit"]').click()
    cy.get('span[data-cy*="phone-validation-error-message"]')
  });

  it("should should fail to submit the form if it contains out of place symbols", () => {
    cy.get('input[data-cy*="create-contact-form-phone"]').type('613-999456-7')
    cy.get('button[data-cy*="create-contact-form-submit"]').click()
    cy.get('span[data-cy*="phone-validation-error-message"]')
  });
});