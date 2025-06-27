import { Page } from "@playwright/test";
import { user1 } from "../data/users";

export default class LoginPage {
    constructor(private page: Page) { }

    async title() {
        return await this.page.title();
    }
    
    async login(user: { email: string, password: string } = user1) {
        await this.inputEmail(user.email);
        await this.inputPassword(user.password);
        await this.clickLoginButton();  
    }
    
    private async inputEmail(email: string) {
        return await this.page.locator("#input-email").fill(email);
    }

    private async inputPassword(password: string) {
        return await this.page.locator("#input-password").fill(password);
    }

    private async clickLoginButton() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            this.page.locator("input[type='submit']").click()
        ])
    }

}