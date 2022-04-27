describe('Signup', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 10000 });
  });

  it('should display validation errors', () => {
    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByText(/a firstname is required/i).should('exist');
    cy.findByText(/a lastname is required/i).should('exist');
    cy.findByText(/a password is required/i).should('exist');
    cy.findByText(/you need to select a role/i).should('exist');
  });

  it('should display a validation error if more than three skills have been selected', () => {
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText('Chapter Owner').click();

    cy.findByText('Tech').click();

    cy.findByText('jest').click();
    cy.findByText('react').click();
    cy.findByText('Typescript').click();

    cy.findByText('Management').click();

    cy.findByText('Roadmap definition').click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByText(/you need to select at most three skills/i).should('exist');
  });

  it('should display a loading indicator for roles', () => {
    cy.findByRole('progressbar', { name: /loading-roles/i }).should('exist');

    cy.findByLabelText('Role').should('exist');
  });

  it('should display a loading indicator for skills', () => {
    cy.findByRole('progressbar', {
      name: /loading-skills/i,
      timeout: 6000,
    }).should('exist');

    cy.findByText('Skills').should('exist');

    cy.findByRole('navigation', { name: /skills/i }).should('exist');
    cy.findByRole('button', { name: /soft skills/i }).should('exist');
    cy.findByRole('button', { name: /management/i }).should('exist');
    cy.findByRole('button', { name: /tech/i }).should('exist');
  });

  it('should display an error when skills are invalid for the chosen role', () => {
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText('Developer').click();

    cy.findByText('Information sharing').click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByText(/invalid skills for this role!/i).should('exist');
  });

  it('should display an error when signup failed', () => {
    const invalidRole = 'Techpriest';
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText(invalidRole).click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByRole('alert').should('exist');
    cy.findByText('Invalid role').should('exist');
  });

  it('should redirect the user to the home page after signup', () => {
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText('Developer').click();

    cy.findByText('Tech').click();

    cy.findByText('jest').click();
    cy.findByText('react').click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.location('pathname').should('match', /\/home$/);
  });
});
