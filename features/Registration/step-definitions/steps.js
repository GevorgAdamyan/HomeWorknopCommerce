import { Given, When, Then } from "@wdio/cucumber-framework";
import registrationPage from "../pageobjects/registrationpage";
import { faker } from '@faker-js/faker';
const helper = require("../../../helpers/helper");

Given("the user is on the Registration Page", async () => {
    let path = helper.pathForRegistrationPage
    await registrationPage.goTo(path);
    let pageTitle = helper.registrationPageTitle;
    await expect(browser).toHaveUrlContaining(path);
    await expect(browser).toHaveTitle(pageTitle);
})

When("the user select a gender", async () => {
    await registrationPage.selectGender(); //Assertion is in the "selectGender" function
})

When("the user inserts a firstname and lastname in appropriate fields", async () => {
    let firstname = faker.name.firstName();
    let lastname = faker.name.lastName();
    await registrationPage.insertFirstNameAndLarstName(firstname, lastname)
    let inputFieldForFirstName = await registrationPage.firstNameField;
    let inputFieldForLastName = registrationPage.lastNameField;
    await expect(inputFieldForFirstName).toHaveValue(firstname);
    await expect(inputFieldForLastName).toHaveValue(lastname);
})

When("the user selects the birthday from calendars", async () => {
    await registrationPage.selectTheDateOfBirth(); //Assertions are in "selectTheDateOfBirth" function
})

When("the user inserts an email and password in appropriate fields", async () => {
    let email = faker.internet.email();
    let password = faker.internet.password();
    let emailField = registrationPage.emailField;
    await registrationPage.insertEmailAndPassword(email, password)
    await expect(emailField).toHaveValue(email);
})

When("the user clicks on Register button", async () => {
    await registrationPage.doRegister()
})

Then("A successfull registration message appears", async() => {
    let pageTitle = await registrationPage.resultPageTitle;
    let pageTitleText = helper.successfullRegistrationTitleText;
    let successMessage = await registrationPage.successfullRegistrationMessage;
    let successMessageText = helper.successfullRegistrationMessage;
    await expect(pageTitle).toHaveText(pageTitleText);
    await expect(successMessage).toHaveText(successMessageText);
    await browser.reloadSession();
})
