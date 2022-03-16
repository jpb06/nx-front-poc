Feature: Signup Page

  I want to open the signup page

  Scenario: Opening the signup page
    Given I open the signup page
    When I fill the signup form
    And I submit
    Then I am in home page
