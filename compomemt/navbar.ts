import { Page } from "@playwright/test";

export default class Navbar {
    constructor(private page: Page) { }

  
    async clickOnMyAccount() {
        await this.page.getByRole('link', { name: 'My Account' }).click();
    }

    async clickOnOption(option: string) {
        await this.page.getByRole('link', { name: option }).click();
    }

}