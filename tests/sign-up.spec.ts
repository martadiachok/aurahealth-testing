import { SignUpPage } from "../support/page-objects/pages/SignUpPage";

const {test, expect} = require('@playwright/test')

let signUpPage: SignUpPage;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  await signUpPage.openUrl();
  await signUpPage.mockRecommendedItemList();
});

test('Verify that user can see sign-up page', async ({page}) => {
    await signUpPage.verifyTitleText();
    await signUpPage.verifyDescriptionText();
    await signUpPage.verifyTopicsText();
    await signUpPage.verifyContinueButtonIsDisabled();
    await signUpPage.verifyContinueButtonText();
 });

 test('Verify that user can select item', async ({page}) => {
  await signUpPage.selectOnboardingTopicItem(1);
  await signUpPage.verifyItemIsSelected();
});

test('Verify that user can continue sign up process after selecting 6 items', async ({page}) => {
  await signUpPage.verifyOnboardingTopicItemIsVisible();
  await signUpPage.selectOnboardingTopicItem(6);
  await signUpPage.verifyContinueButtonIsEnabled();
});