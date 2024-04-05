import { Login } from "../support/page-objects/components/Login";
import { MainPage } from "../support/page-objects/pages/MainPage";
import { loginData } from "../support/test-data/login-credentials";

const {test, expect} = require('@playwright/test')

let mainPage: MainPage;
let loginComponent: Login;

test.beforeEach(async ({ page, context, browser}) => {
    mainPage = new MainPage(page);
    loginComponent = new Login(page);
    context = await browser.newContext();
    context.clearCookies();
    await mainPage.openUrl();
  });
  
  test('Verify request that user can sign in', async ({page}) => {
    await mainPage.clickLoginButton();
    await loginComponent.fillSignInData(loginData.email, loginData.password);
    await loginComponent.veriyLoginRequest(loginData.email, loginData.password);
  });

  test('Verify error notification is shown when incorrect email is filled', async ({page}) => {
    await mainPage.clickLoginButton();
    await loginComponent.fillEmailInput('abc');
    await loginComponent.clickSignInButton();
    await loginComponent.verifyErrorNotification('incorrect email');
  });

  test('Verify error notification is shown when incorrect credentials is filled', async ({page}) => {
    await mainPage.clickLoginButton();
    await loginComponent.fillSignInData('abc@gmail.com', '123');
    await loginComponent.clickSignInButton();
    await loginComponent.verifyErrorNotification('incorrect credentials');
  });