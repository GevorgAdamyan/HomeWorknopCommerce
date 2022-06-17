class ShipingMethodSection {
    get shipingMethodSectionTab() {
        return $("li#opc-shipping_method");
    }

    async getShipingMethodRadioBtn(index) {
        return $(`.method-list li:nth-child(${index}) input`);
    }

    async selectShipingMethod() {
        let index = Math.floor(Math.random() * (4 - 1) + 1);
        let option = await this.getShipingMethodRadioBtn(index);
        await option.click();
        await expect(option).toBeSelected();
    }

    get shipingMethodContinueBtn() {
        return $("#shipping-method-buttons-container > button");
    }

    async confirmShipingMethodSection() {
        let btn = await this.shipingMethodContinueBtn;
        await btn.click();
    }

    async completeShipingMethodSection() {
        await this.selectShipingMethod();
        await this.confirmShipingMethodSection();
    }
}

module.exports = new ShipingMethodSection();
