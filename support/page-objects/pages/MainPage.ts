import { expect, Locator, Page } from '@playwright/test'
import { url } from '../../test-data/routes';
import { mainPageLocalization } from '../../test-data/localization/main-page';

export class MainPage {
    readonly page: Page
    readonly continueButton: Locator
    readonly loginButton: Locator
    readonly title: Locator
    readonly description: Locator

    // TODO: replace locator with data-testid when it will be done on FE
    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.locator('[class="block_cta-control"] [class="btn__primary-signup glow w-button"]');
        this.loginButton = page.locator('[class="btn__secondary login w-button"]');
        this.title = page.locator('[class="h1__hero"]');
        this.description = page.locator('[class="p__hero"]');
    };

    async openUrl() {
        await this.page.goto(url.main);
        await this.page.waitForURL(url.main);
    };

    async clickContinueButton() {
        await this.continueButton.click();
    };

    async clickLoginButton() {
        await this.loginButton.click();
    };

    async verifyMainButtons() {
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toHaveText(mainPageLocalization.continueButton);
        await expect(this.loginButton).toBeVisible();
        await expect(this.loginButton).toHaveText(mainPageLocalization.loginButton);
    };

    async verifyTitleText() {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText(mainPageLocalization.title);
    };

    async verifyDescriptionText() {
        await expect(this.description).toBeVisible();
        await expect(this.description).toHaveText(mainPageLocalization.description);
    };

    async verifyUrlAfterClickingContinueButton() {
        await this.page.waitForURL(url.signUp);
        await expect(this.page).toHaveURL(url.signUp);
    };

    async verifyStatusCodeAfterClickingContinueButton() {
        const response = await this.page.request.get(url.signUp);
        await expect(response).toBeOK();
    };

};