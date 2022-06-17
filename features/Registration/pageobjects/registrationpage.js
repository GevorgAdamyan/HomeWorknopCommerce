class RegistrationPage {
    async goTo(path) {
        await browser.url("/" + path);
        await browser.maximizeWindow()
    }

    async getGenderRadioBtn(index) {
        return $(`#gender span:nth-child(${index}) > input`);
    }

    async selectGender() {
        let index = Math.round(Math.random() + 1)
        let radioBtn = await this.getGenderRadioBtn(index);
        await radioBtn.click()
        await expect(radioBtn).toBeSelected();
    }

    get firstNameField() {
        return $('#FirstName')
    }

    get lastNameField() {
        return $('#LastName')
    }
    
    async insertFirstNameAndLarstName(firstName,lastName) {
        let inputFieldForFirstName = await this.firstNameField;
        let inputFieldForLastName = await this.lastNameField;
        await inputFieldForFirstName.setValue(firstName);
        await inputFieldForLastName.setValue(lastName);
    }

    get daysList() {
        return $("[name=DateOfBirthDay]")
    }

    async openDaysList() {
        let dropdown = await this.daysList;
        await dropdown.click();
    }

    async getDaysArray() {
        await this.openDaysList();
        let parent = this.daysList;
        let child = parent.$$('option')
        return child;
    }

    get monthsList() {
        return $("[name=DateOfBirthMonth]")
    }

    async openMonthsList() {
        let dropdonwn = await this.monthsList;
        await dropdonwn.click();
    }

    async getMonthsArray() {
        await this.openMonthsList();
        let parent = this.monthsList;
        let child = parent.$$('option')
        return child;
    }

    get yearsList() {
        return $("[name=DateOfBirthYear]")
    }

    async openYearsList() {
        let dropdown = await this.yearsList
        await dropdown.click();
    }

    async getYearsArray() {
        await this.openYearsList();
        let parent = this.yearsList;
        let child = parent.$$('option')
        return child;
    }

    async selectTheDateOfBirth() {
        let days = await this.getDaysArray();
        let months = await this.getMonthsArray();
        let years = await this.getYearsArray();
        let indexForDays = Math.floor(Math.random() * (days.length - 1) + 1);
        let indexForMonths = Math.floor(Math.random() * (months.length - 1) + 1);
        let indexForYears = Math.floor(Math.random() * (years.length - 1) + 1);
        if(indexForMonths === 2 && indexForDays > 28) {
            indexForMonths++; 
        } else if ((indexForMonths === 4 || indexForMonths === 6 || indexForMonths === 9 || indexForMonths === 11) && indexForDays === 31) {
            indexForMonths++;
        }
        let day = days[indexForDays];
        let month = months[indexForMonths];
        let year = years[indexForYears];
        await day.click();
        await expect(day).toBeSelected();
        await month.click();
        await expect(month).toBeSelected();
        await year.click();
        await expect(year).toBeSelected();
    }

    get emailField() {
        return $("#Email")
    }

    get passwordField() {
        return $("#Password")
    }

    get confirmPasswordField() {
        return $("#ConfirmPassword")
    }

    async insertEmailAndPassword(email, password) {
        let inputFieldEmial = await this.emailField;
        let inputFieldPassword = await this.passwordField;
        let inputFieldConfirmPassword = await this.confirmPasswordField;
        await inputFieldEmial.setValue(email);
        await inputFieldPassword.setValue(password)
        await inputFieldConfirmPassword.setValue(password)
    }

    get registerBtn() {
        return $("#register-button")
    }

    async doRegister() {
        let regBtn = await this.registerBtn;
        await regBtn.click();
    }

    get resultPageTitle() {
        return $(".page-title > h1")
    }

    get successfullRegistrationMessage() {
        return $(".page-body > .result")
    }
}

module.exports = new RegistrationPage()
