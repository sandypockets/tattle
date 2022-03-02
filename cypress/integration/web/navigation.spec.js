describe('Navigation', () => {
  it('should navigate through the web top menu', () => {
    cy.visit('http://localhost:3000')
    cy.get('a[href*="faq"]').contains('What is Tattle').click({ multiple: true })
    cy.url().should('include', '/faq')
    cy.get('h2').contains('Frequently asked questions')

    cy.get('a[href*="pricing"]').contains('Pricing').click()
    cy.url().should('include', '/pricing')
    cy.get('h2').contains('Pricing')
    cy.get('span').contains('$3 USD')

    cy.get('a[href*="contact"]').contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.get('h2').contains('Hey there')
    cy.get('button[type="submit"]').contains('Submit')
  })
})