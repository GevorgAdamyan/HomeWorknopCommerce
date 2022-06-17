class CheckoutPage {
    get pageHeader() {
        return $(".page-title > h1");
    }

    get confirmOrderSectionTab() {
        return $("li#opc-confirm_order");
    }

    get confirmOrderBtn() {
        return $("#confirm-order-buttons-container button");
    }

    async confirmOrder() {
        let btn = await this.confirmOrderBtn;
        await btn.click();
    }

    get successPageHeader() {
        return $(".page-title > h1");
    }

    get successMessage() {
        return $(".section .title > strong");
    }
}

module.exports = new CheckoutPage();
