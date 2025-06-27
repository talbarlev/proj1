import { Page } from "@playwright/test";
import Navbar from "../compomemt/navbar";

export default class RegisterPage {
    constructor(private page: Page) { }

    get navbar(): Navbar {
        return new Navbar(this.page);
    }

    async getText(): Promise<string | null> {
        return await this.page.locator("h1").textContent();
    }

    async register(email: string, password: string, firstName: string, lastName: string, phone: string) {
        await this.inputFirstName(firstName);
        await this.inputLastName(lastName);
        await this.inputEmail(email);
        await this.inputPhone(phone);
        await this.inputPassword(password);
        await this.inputConfirmPassword(password);
        await this.clickTermsAndConditionsCheckbox();
        await this.clickContinueButton();
    }

    private async inputFirstName(firstName: string) {
        await this.page.locator("#input-firstname").fill(firstName);
    }

    private async inputLastName(lastName: string) {
        await this.page.locator("#input-lastname").fill(lastName);
    }

    private async inputEmail(email: string) {
        await this.page.locator("#input-email").fill(email);
    }

    private async inputPhone(phone: string) {
        await this.page.locator("#input-telephone").fill(phone);
    }

    private async inputPassword(password: string) {
        await this.page.locator("#input-password").fill(password);
    }

    private async inputConfirmPassword(confirmPassword: string) {
        await this.page.locator("#input-confirm").fill(confirmPassword);
    }

    private async isSubscribeCheckboxChecked() {
        await this.page.locator("#input-newsletter-no").isChecked();
    }

    private async clickTermsAndConditionsCheckbox() {
        await this.page.locator("input#input-agree").click({ force: true });
    }

    private async clickContinueButton() {
        return await Promise.all(
            [this.page.waitForNavigation({ waitUntil: "networkidle" }),
            this.page.locator("input[type='submit']").click()])
    }
}