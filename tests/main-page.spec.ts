import { MainPage } from "../support/page-objects/pages/MainPage";

const {test, expect} = require('@playwright/test')

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await mainPage.openUrl();
});

test('Verify that user can open website and see main buttons', async ({page}) => {
  await mainPage.verifyMainButtons();
  await mainPage.verifyTitleText();
  await mainPage.verifyDescriptionText();
});

test('Verify navigation to sign-up page', async ({page}) => {
  await mainPage.clickContinueButton();
  await mainPage.verifyUrlAfterClickingContinueButton();
  await mainPage.verifyStatusCodeAfterClickingContinueButton();
});