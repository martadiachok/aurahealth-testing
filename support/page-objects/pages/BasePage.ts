import { Page } from '@playwright/test'

export class BasePage {
    readonly page: Page 

    constructor(page: Page) {
        this.page = page
    }

    async wait(time: number) {
        await this.page.waitForTimeout(time);
    };

    async openUrl(url: string) {
        await this.page.goto(url);
        await this.page.waitForURL(url);
    };
};