class HomePage {
    async goTo(url) {
        await browser.url(url);
        await browser.maximizeWindow()
    }

    get searchBar() {
        return $("#small-search-box-form #small-searchterms");
    }

    get searchBtn() {
       return $("#small-search-box-form > button");
    }

    async searchAnItem(item) {
        let searchBar = await this.searchBar
        let searchBtn = await this.searchBtn
        await searchBar.click();
        await searchBar.setValue(item);
        await searchBtn.click();
    }
}

module.exports = new HomePage();
