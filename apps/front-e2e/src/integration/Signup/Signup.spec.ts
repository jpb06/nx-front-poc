import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/I open the signup page/, () => {
  cy.visit('/', { timeout: 30000 });
});

When(/I fill the signup form/, () => {
  cy.findByLabelText(/lastname/i).type('Mc Bro');
  cy.findByLabelText(/firstName/i).type('Yolo');
  cy.findByLabelText('Password').type('strong-password');

  cy.findByLabelText('Role').click();
  cy.findByText('Developer').click();

  cy.findByText('Tech').click();

  cy.findByText('jest').click();
  cy.findByText('react').click();
});

And(/I submit/, () => {
  cy.findByRole('button', { name: /signup/i }).click();
});

Then(/I am in home page/, () => {
  cy.location('pathname').should('match', /\/home$/);
});
