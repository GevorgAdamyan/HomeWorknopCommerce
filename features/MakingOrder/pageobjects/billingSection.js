class BillingSection {
    get billingSectionTab() {
        return $("li#opc-billing");
    }

    get firstNameField() {
        return $("#BillingNewAddress_FirstName");
    }

    async insertFirstName(firstName) {
        let inputField = await this.firstNameField;
        await inputField.click();
        await inputField.setValue(firstName);
    }

    get lastNameField() {
        return $("#BillingNewAddress_LastName");
    }

    async insertLastName(lastName) {
        let inputField = await this.lastNameField;
        await inputField.click();
        await inputField.setValue(lastName);
    }

    get emailField() {
        return $("#BillingNewAddress_Email");
    }

    async insertEmail(email) {
        let inputField = await this.emailField;
        await inputField.click();
        await inputField.setValue(email);
    }

    get cityField() {
        return $("#BillingNewAddress_City");
    }

    async insertCity(city) {
        let inputField = await this.cityField;
        await inputField.click();
        await inputField.setValue(city);
    }

    get adressField() {
        return $("#BillingNewAddress_Address1");
    }

    async insertAdress(adress) {
        let inputField = await this.adressField;
        await inputField.click();
        await inputField.setValue(adress);
    }

    get postalCodeFiled() {
        return $("#BillingNewAddress_ZipPostalCode");
    }

    async insertPostalCode(postalCode) {
        let inputField = await this.postalCodeFiled;
        await inputField.click();
        await inputField.setValue(postalCode);
    }

    get phoneNumberField() {
        return $("#BillingNewAddress_PhoneNumber");
    }

    async insertPhoneNumber(phoneNumber) {
        let inputField = await this.phoneNumberField;
        await inputField.click();
        await inputField.setValue(phoneNumber);
    }

    get countriesDropdown() {
        return $("#BillingNewAddress_CountryId");
    }

    get statesDropdown() {
        return $("select#BillingNewAddress_StateProvinceId");
    }

    async openCountriesDropdown() {
        let dropdown = await this.countriesDropdown;
        await dropdown.click();
    }

    async openStatesDropdown() {
        let dropdown = await this.statesDropdown;
        await dropdown.click();
    }

    async getCountriesArray() {
        await this.openCountriesDropdown();
        let parent = await this.countriesDropdown;
        let child = parent.$$("option");
        return child;
    }

    async getStatesArray() {
        await this.openStatesDropdown();
        let parent = await this.statesDropdown;
        let child = parent.$$("option");
        return child;
    }

    async selectState() {
        let states = await this.getStatesArray();
        let index = Math.floor(Math.random() * (states.length - 1) + 1);
        let state = states[index];
        await state.click();
        await expect(state).toBeSelected();
    }

    async selectCountry() {
        let countries = await this.getCountriesArray();
        let index = Math.floor(Math.random() * (countries.length - 1) + 1);
        let country = countries[index];
        await country.click();
        await expect(country).toBeSelected();
        if(index === 1 || index === 39) {
            this.selectState();
        }
    }

    get billingSectionContinueBtn() {
        return $('#billing-buttons-container > button[name="save"]');
    }

    async confirmTheBillingSection() {
        let btn = await this.billingSectionContinueBtn;
        await btn.click();
    }

    async completeTheBillingAddressSection(firstName, lastName, email, city, adress, postalCode, phoneNumber) {
        await this.insertFirstName(firstName);
        await this.insertLastName(lastName);
        await this.insertEmail(email);
        await this.selectCountry();
        await this.insertCity(city);
        await this.insertAdress(adress);
        await this.insertPostalCode(postalCode);
        await this.insertPhoneNumber(phoneNumber);
        await this.confirmTheBillingSection();
    }
}

module.exports = new BillingSection();
