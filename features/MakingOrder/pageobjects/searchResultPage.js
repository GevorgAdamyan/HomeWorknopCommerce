class SearchResultPage {
    get productTitle () {
        return $(".product-title > a")
    }

    get addToCartBtn() {
        return $("button*=Add to cart");
    }

    get priceCell() {
        return $(".prices > .price");
    }

    async getPriceAsText() {
        let cell = await this.priceCell;
        return cell.getText();
    }

    async addTheItemToTheCart() {
        let addBtn = await this.addToCartBtn;
        await addBtn.click();
    }

    get notificationBar() {
        return $("#bar-notification");
    }

    get shoppingCartLink() {
        return $("#bar-notification a")
    }

    async goToShoppingCart() {
        let notificationbar = await this.notificationBar;
        await notificationbar.waitForDisplayed();
        let link = await this.shoppingCartLink;
        await link.click();
    }
}

module.exports = new SearchResultPage();
