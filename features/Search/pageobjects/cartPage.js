class CartPage {
    get cartTable() {
        return $("table.cart");
    }

    get productName() {
        return $(".product-name");
    }

    get productPriceCell() {
        return $(".product-unit-price");
    }

    async getProductPriceAsText() {
        let priceCell = await this.productPriceCell;
        return priceCell.getText();
    }

    get wrappingDropdown() {
        return $("select#checkout_attribute_1");
    }

    async openWrappingDropdown() {
        let dropdown = await this.wrappingDropdown;
        await dropdown.click();
    }

    async getWrappingOptionsArray() {
        await this.openWrappingDropdown();
        let parent = await this.wrappingDropdown;
        let child = parent.$$("option");
        return child;
    }

    get wrappingOptionCheck() {
        return $(".cart-options > .selected-checkout-attributes");
    }

    async selectWrappingOption() {
        let yesNo = await this.wrappingOptionCheck;
        let options = await this.getWrappingOptionsArray();
        let index = Math.round(Math.random());
        let option = options[index];
        await option.click();
        await expect(option).toBeSelected();
        if (index === 0) {
            await expect(yesNo).toHaveTextContaining("No");
        } else {
            await expect(yesNo).toHaveTextContaining("Yes");
        }
    }

    get totalPriceCell() {
        return $("span.value-summary > strong");
    }

    async getTotalPriceAsText() {
        let priceCell = await this.totalPriceCell;
        return priceCell.getText();
    }

    get termsAndConditionsCheckbox() {
        return $("input#termsofservice");
    }

    async agreeWithtermsAndConditions() {
        let checbox = await this.termsAndConditionsCheckbox;
        await checbox.click();
        await expect(checbox).toBeSelected();
    }

    get checkoutBtn() {
        return $("button#checkout");
    }

    async doCheckout() {
        let button = await this.checkoutBtn;
        await button.waitForDisplayed();
        await button.waitForClickable();
        await button.click();
    }

    get checkoutAsGuestBtn() {
        return $(".checkout-as-guest-button");
    }

    async doCheckoutAsGuest() {
        let button = await this.checkoutAsGuestBtn;
        await button.click();
    }

    async proceedCheckoutAsGuest() {
        await this.agreeWithtermsAndConditions();
        await this.doCheckout();
        await this.doCheckoutAsGuest();
    }
}

module.exports = new CartPage();
