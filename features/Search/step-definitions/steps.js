import { Given, When, Then } from '@wdio/cucumber-framework';
import homePage from "../pageobjects/homePage";
import cartPage from "../pageobjects/cartPage";
import searchResults from "../pageobjects/searchResultPage";
import checkoutPage from "../pageobjects/checkoutPage";
import billingSection from "../pageobjects/billingSection";
import shipingSection from "../pageobjects/shipingSection";
import paymentSection from "../pageobjects/paymentSection";
import { faker } from '@faker-js/faker';
const helper = require("../../../helpers/helper");
const activeClass = helper.activationClass;


Given("the user is on the home page", async () => {
    await homePage.goTo("/");
    let pageTitle = helper.homePageTitle;
    await expect(browser).toHaveTitle(pageTitle);
})

When(/^the user inserts "(.*)" in searchbar and click on Search button$/, async (keyword) => {
    await homePage.searchAnItem(keyword);
    let pageTitle = helper.searchResultsPageTitle;
    let productTitle = await searchResults.productTitle;
    await expect(browser).toHaveTitle(pageTitle)
    await expect(productTitle).toHaveTextContaining(keyword);
})

When("the user clicks on Add to Cart button from the item's page", async () => {
    await searchResults.addTheItemToTheCart();
    let notificationBar = await searchResults.notificationBar;
    await expect(notificationBar).toBeDisplayed();
    await searchResults.goToShoppingCart();
    let pageTitle = helper.cartPageTitle;
    let cartTable = await cartPage.cartTable;
    await expect(browser).toHaveTitle(pageTitle);
    await expect(cartTable).toBeDisplayed();
})

When("the user navigates to Cart page, agrees with Terms and Conditions and click on Checkout button", async () => {
    let productTablePriceText = await cartPage.getProductPriceAsText();
    let productTablePrice = helper.convertPriceAsTextToNumber(productTablePriceText);
    let giftWrapingPrice = helper.giftWrapingPrice;
    await cartPage.selectWrappingOption();
    let wrappingOptions = await cartPage.getWrappingOptionsArray();
    let giftWrappingOption = wrappingOptions[1];
    if (await giftWrappingOption.isSelected()) {
        await browser.waitUntil(async function () {
            let totalPriceText = await cartPage.getTotalPriceAsText();
            let totalPrice = helper.convertPriceAsTextToNumber(totalPriceText);
            return totalPrice > productTablePrice;
        })
        productTablePrice += giftWrapingPrice;
    }
    let totalPriceText = await cartPage.getTotalPriceAsText();
    let totalPrice = helper.convertPriceAsTextToNumber(totalPriceText);
    await expect(totalPrice).toEqual(productTablePrice);
    await cartPage.proceedCheckoutAsGuest();
    let checkoutPageHeader = await checkoutPage.pageHeader;
    let checkoutPageHeaderText = helper.checkoutPageHeader;
    let pageTitle = helper.checkoutPageTitle;
    let billingSectionTab = await billingSection.billingSectionTab;
    await expect(checkoutPageHeader).toHaveText(checkoutPageHeaderText);
    await expect(browser).toHaveTitle(pageTitle);
    await expect(billingSectionTab).toHaveElementClass(activeClass)
})

When("the user fills the Billing Adress and clicks on Continue button", async () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let city = faker.address.city();
    let adress = faker.address.streetAddress();
    let postalCode = faker.address.zipCode();
    let phoneNumber = faker.phone.phoneNumber();
    await billingSection.completeTheBillingAddressSection(firstName, lastName, email, city, adress, postalCode, phoneNumber);
    let shipingSectionTab = await shipingSection.shipingMethodSectionTab;
    await expect(shipingSectionTab).toHaveElementClass(activeClass);
})

When("the user selects the Shipping method and clicks on Continue button", async () => {
    await shipingSection.completeShipingMethodSection();
    let paymentMethodSectionTab = await paymentSection.paymentMethodSectionTab;
    await expect(paymentMethodSectionTab).toHaveElementClass(activeClass)
})

When("the user selects the Payment method and clicks on Continue button", async () => {
    await paymentSection.completePaymentMethodSection();
    let paymentInfoSectionTab = await paymentSection.paymentInfoSectionTab;
    await expect(paymentInfoSectionTab).toHaveElementClass(activeClass);
    await paymentSection.completePaymentInfoSection();
    let confirmOrderSectionTab = checkoutPage.confirmOrderSectionTab;
    await expect(confirmOrderSectionTab).toHaveElementClass(activeClass);
})

When("the user confirms the order and clicks on Continue button", async () => {
    await checkoutPage.confirmOrder();
    let path = helper.pathForCompletePage;
    await expect(browser).toHaveUrlContaining(path)
})

Then("the user see the the success message", async () => {
    let pageHeaderText = helper.completePageHeaderText;
    let pageHeader = await checkoutPage.successPageHeader;
    let successMessageText = helper.successfullCheckoutMessageText;
    let successMessage = await checkoutPage.successMessage;
    await expect(pageHeader).toHaveText(pageHeaderText);
    await expect(successMessage).toBeDisplayed();
    await expect(successMessage).toHaveText(successMessageText);
    await browser.reloadSession();
})
