import { expect, Locator, Page, Request } from '@playwright/test'
import { endpoints, url } from '../../test-data/routes'
import { LoginErrorType } from '../..'
import { loginLocalization } from '../../test-data/localization/components/login'

export class Login {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator
    readonly signedInUserName: Locator
    readonly errorToastNotification: Locator

    // TODO: replace locator with data-testid when it will be done on FE
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[placeholder="Email"]');
        this.passwordInput = page.locator('[placeholder="Password"]');
        this.signInButton = page.locator('[id="login-modal"] [class*="aura-btn"]');
        this.signedInUserName = page.locator('[class="font custom-font body2 b100 medium undefined"]');
        this.errorToastNotification = page.locator('[class="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter"]');
    };

    async fillEmailInput(email: string) {
        await expect(this.emailInput).toBeVisible({ timeout: 30000 });
        await this.emailInput.fill(email);
    };

    async fillPasswordInput(password: string) {
        await this.passwordInput.fill(password);
    };

    async clickSignInButton() {
        await this.signInButton.click();
    };

    async fillSignInData(email: string, password: string) {
        await this.fillEmailInput(email);
        await this.fillPasswordInput(password);
    };

    async veriyLoginRequest(email: string, password: string) {
        const expectedRequestBody = {
            clientType: 'CLIENT_TYPE_WEB',
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        const requestpromise = this.page.waitForRequest(endpoints.components.login);
        this.clickSignInButton();
        const request = await requestpromise
        const actualRequestBody = await request.postDataJSON()

        expect(actualRequestBody).toEqual(expectedRequestBody);
    };

    async verifyErrorNotification(errorType: LoginErrorType) {
        let errorNotificationText;
        await expect(this.errorToastNotification).toBeVisible();
        switch (errorType) {
            case 'incorrect email':
                errorNotificationText = loginLocalization.incorrectEmailErrorMessage;
                break;
            case 'incorrect credentials':
                errorNotificationText = loginLocalization.incorrectCredentialsErrorMessage;
                break;
        }
        await expect(this.errorToastNotification).toHaveText(errorNotificationText);
    };

}; 