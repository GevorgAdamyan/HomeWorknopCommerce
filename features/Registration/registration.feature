Feature: Registration functionality

Scenario: As a user I should be able to register on the website

Given the user is on the Registration Page

When the user select a gender
And the user inserts a firstname and lastname in appropriate fields
And the user selects the birthday from calendars
And the user inserts an email and password in appropriate fields
And the user clicks on Register button
Then A successfull registration message appears
