import { Page } from "@playwright/test";

// to an abstract class
export default class ErrorAlert {
    constructor(private page: Page) { }

    get alert() {
        return this.page.locator(".alert-danger");
    }

    async isVisible() {
        return await this.alert.isVisible();
    }

    async getText() {
        return await this.alert.textContent();
    }
}
