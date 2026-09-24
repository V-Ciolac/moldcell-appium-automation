import { locators } from '../locators/login.locators.js';

class LoginPage {
  // Секция локаторов (геттеры)
  get screenTitleFirst() {
    return $(locators.SCREEN_TITLE_FIRST);
  }
  get screenTitleSecond() {
    return $(locators.SCREEN_TITLE_SECOND);
  }
  get screenDescription() {
    return $(locators.SCREEN_DESCRIPTION);
  }

  get phoneInput() {
    return $(locators.PHONE_INPUT);
  }
  get passwordInput() {
    return $(locators.PASSWORD_INPUT);
  }
  get hidePasswordIcon() {
    return $(locators.HIDE_PASSWORD_ICON);
  }

  get forgotPasswordButton() {
    return $(locators.FORGOT_PASSWORD_BUTTON);
  }
  get loginButton() {
    return $(locators.LOGIN_BUTTON);
  }

  get createAccountIcon() {
    return $(locators.CREATE_ACCOUNT_ICON);
  }
  get createAccountButton() {
    return $(locators.CREATE_ACCOUNT_BUTTON);
  }
  get termsAndConditionsLink() {
    return $(locators.TERMS_AND_CONDITIONS_LINK);
  }

  get errorMessage() {
    return $(locators.ERROR_MESSAGE);
  }

  // Секция методов
  async waitForScreenLoad() {
    await this.screenTitleFirst.waitForDisplayed();
  }

  async enterPhone(phoneNumber) {
    await this.phoneInput.waitForDisplayed();
    await this.phoneInput.click();
    await this.phoneInput.setValue(phoneNumber);
  }

  async clickLogin() {
    await this.loginButton.waitForDisplayed();
    await this.loginButton.click();
  }

  async getErrorMessageText() {
    await this.errorMessage.waitForDisplayed();
    return await this.errorMessage.getText();
  }
}

export default new LoginPage();
