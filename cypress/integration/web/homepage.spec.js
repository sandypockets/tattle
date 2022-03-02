describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
  })

  it('contains a hero section with call to action buttons', () => {
    cy.visit('http://localhost:3000')
    cy.get('a[id*="landing-sign-up"]').contains('Sign up')
    cy.get('a[id*="landing-learn-more"]').contains('Learn more')
  })
})