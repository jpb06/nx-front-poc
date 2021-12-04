describe('Signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display validation errors', () => {
    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByText(/firstname is a required field/i);
    cy.findByText(/lastname is a required field/i);
    cy.findByText(/password is a required field/i);
    cy.findByText(/idrole is a required field/i);
    cy.findByText(/you need to select at least two skills/i);
  });

  it('should display a validation error if less than two skills have been selected', () => {
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText('Developer').click();

    cy.findByText('jest').click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByText(/you need to select at least two skills/i);
  });

  it('should display a loading indicator for roles', () => {
    cy.findByRole('progressbar', { name: /loading-roles/i });

    cy.findByLabelText('Role').should('exist');
  });

  it('should display a loading indicator for skills', () => {
    cy.findByRole('progressbar', { name: /loading-skills/i });

    cy.findByText('Skills').should('exist');
    cy.findAllByRole('checkbox').should('have.length.above', 2);
  });

  it('should display an error when signup failed', () => {
    const invalidRole = 'Techpriest';
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText(invalidRole).click();

    cy.findByText('jest').click();
    cy.findByText('prisma').click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.findByRole('alert');
    cy.findByText('Invalid role').should('exist');
  });

  it('should redirect the user to the home page after signup', () => {
    cy.findByLabelText(/lastname/i).type('Mc Bro');
    cy.findByLabelText(/firstName/i).type('Yolo');
    cy.findByLabelText('Password').type('strong-password');

    cy.findByLabelText('Role').click();
    cy.findByText('Developer').click();

    cy.findByText('jest').click();
    cy.findByText('prisma').click();

    cy.findByRole('button', { name: /signup/i }).click();

    cy.location('pathname').should('match', /\/home$/);
  });
});
