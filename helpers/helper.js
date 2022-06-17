module.exports = {
    homePageTitle: "nopCommerce demo store",
    searchResultsPageTitle: "nopCommerce demo store. Search",
    cartPageTitle: "nopCommerce demo store. Shopping Cart",
    checkoutPageTitle: "nopCommerce demo store. Checkout",
    checkoutPageHeader: "Checkout",
    activationClass: "active",
    pathForCompletePage: "completed",
    completePageHeaderText: "Thank you",
    successfullCheckoutMessageText: "Your order has been successfully processed!",
    giftWrapingPrice: 10,
    pathForRegistrationPage: "register?returnUrl=%2Fapple",
    registrationPageTitle: "nopCommerce demo store. Register",
    successfullRegistrationTitleText: "Register",
    successfullRegistrationMessage: "Your registration completed",
    
    convertPriceAsTextToNumber(text) {
        let newText = text.replace(",", "");
        let priceAsNumber = newText.substring(1);
        return +priceAsNumber;
    }
}
