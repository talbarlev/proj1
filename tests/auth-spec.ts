import test, { expect } from "@playwright/test";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login-page";
import { NavbarOptions } from "../data/navbar-enums";
import { invalidUser, user1 } from "../data/users";



test.describe('register', () => {
    test('register - and perform login with new account', async ({ page, baseURL }) => {
        const email = `kaki-${Date.now()}@test.com`, password = "test";

        await page.goto(`${baseURL}account/register`);

        const registerPage = new RegisterPage(page);

        await registerPage.register(email, password, "John", "Doe", "1234567890");

        const afterRegisterText = (await registerPage.getText())?.trim();

        await registerPage.navbar.clickOnOption(NavbarOptions.Logout);

        await registerPage.navbar.clickOnOption(NavbarOptions.Login);

        const loginPage = new LoginPage(page);

        await loginPage.login({email, password});

        expect(afterRegisterText, "Account created successfully").toEqual("Your Account Has Been Created!");
    });

    test('login - with existing account', async ({ page, baseURL }) => {

        await page.goto(`${baseURL}account/login`);

        const loginPage = new LoginPage(page);

        await loginPage.login(user1);

        expect(await loginPage.title()).toBe("My Account");
    });

    test('login - with invalid credentials', async ({ page, baseURL }) => {
        await page.goto(`${baseURL}account/login`);

        const loginPage = new LoginPage(page);

        await loginPage.login(invalidUser);

        expect(await loginPage.title()).toBe("Account Login");
    });
});