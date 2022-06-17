class PaymentSection {
    get paymentMethodSectionTab() {
        return $("li#opc-payment_method");
    }

    get paymentMethodsRadioBtn() {
        return $("#payment-method-block li:nth-child(1) input");
    }

    async selectPaymentMethod() {
        let option = await this.paymentMethodsRadioBtn;
        await option.click();
        await expect(option).toBeSelected();
    }

    get paymentSectionContinueBtn() {
        return $("#payment-method-buttons-container button");
    }

    async confirmPaymentSection() {
        let btn = await this.paymentSectionContinueBtn;
        await btn.click();
    }

    async completePaymentMethodSection() {
        await this.selectPaymentMethod();
        await this.confirmPaymentSection();
    }

    get paymentInfoSectionTab() {
        return $("li#opc-payment_info");
    }

    get paymentInfoSectionBtn() {
        return $("#payment-info-buttons-container button");
    }

    async completePaymentInfoSection() {
        let btn = await this.paymentInfoSectionBtn;
        await btn.click();
    }
}

module.exports = new PaymentSection();
