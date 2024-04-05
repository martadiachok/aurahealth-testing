import { expect, Locator, Page } from '@playwright/test'
import { endpoints, url } from '../../test-data/routes'
import { onboardingTopicItems, signUpPageLocalization } from '../../test-data/localization/sign-up-page'
import { recommendedItemList } from '../../test-data/mocks/sign-up-page'

export class SignUpPage {
    readonly page: Page
    readonly continueButton: Locator
    readonly description: Locator
    readonly title: Locator
    readonly onboardingTopicItems: String
    readonly singleOnboardingTopicItem: Locator
    readonly selectedItem: Locator

    // TODO: replace locator with data-testid when it will be done on FE
    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.locator('[data-testid="continueButton"]');
        this.description = page.locator('[class="font custom-font body b64 undefined left"]');
        this.title = page.locator('[class="font custom-font h2-small b100 semibold left"]');
        this.onboardingTopicItems = '[data-testid="onboardingTopicItem"] [class*="font custom-font h4"]';
        this.singleOnboardingTopicItem = page.locator('[data-testid="onboardingTopicItem"]:nth-child(1)');
        this.selectedItem = page.locator('[alt="check-mark-blue"]');
    };

    async openUrl() {
        await this.page.goto(url.signUp);
        await this.page.waitForURL(url.signUp);
    };

    async mockRecommendedItemList() {
        await this.page.route(endpoints.signUpPage.recommendedItemList, route => route.fulfill({
            status: 200,
            body: JSON.stringify(recommendedItemList)
        }));
    };

    async selectOnboardingTopicItem(numberOfElementsToClick: number) {
        this.verifyOnboardingTopicItemIsVisible();
        const elements = await this.page.$$(String(this.onboardingTopicItems));

        for (let i = 0; i < numberOfElementsToClick && i < elements.length; i++) {
            try {
                await elements[i].click();
            } catch (error) {
                console.error(`Error clicking element ${i + 1}: ${error}`);
            }
        };
    };

    async verifyTitleText() {
        await expect(this.title).toBeVisible({ timeout: 50000 });
        await expect(this.title).toHaveText(signUpPageLocalization.title);
    };

    async verifyDescriptionText() {
        await expect(this.description).toBeVisible();
        await expect(this.description).toHaveText(signUpPageLocalization.description);
    };

    async verifyOnboardingTopicItemIsVisible() {
        await expect(this.singleOnboardingTopicItem).toBeVisible({ timeout: 30000 });
    };

    async verifyItemIsSelected() {
        await expect(this.selectedItem).toBeVisible();
    };

    async verifyContinueButtonIsDisabled() {
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toBeDisabled();
    };

    async verifyContinueButtonText() {
        await expect(this.continueButton).toBeVisible();
        await expect(this.continueButton).toHaveText(signUpPageLocalization.continueChooseTopicButton);
    };

    async verifyContinueButtonIsEnabled() {
        await expect(this.continueButton).toBeEnabled();
    };

    async verifyTopicsText() {
        this.verifyOnboardingTopicItemIsVisible();
        const actualOnboardingTopicItems = await this.page.$$eval(String(this.onboardingTopicItems), elements =>
            elements.map(element => element.textContent?.trim() || ''));
        await expect(actualOnboardingTopicItems).toEqual(onboardingTopicItems);
    };

};