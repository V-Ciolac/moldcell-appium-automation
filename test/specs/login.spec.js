import LoginPage from '../pageobjects/login.page.js';
import { loginData } from '../data/login.data.js';

const APP_PACKAGE = 'md.moldcell.selfservice';

describe('Стартовый экран приложения', () => {
  // Хук afterEach гарантированно закрывает (смахивает) приложение после каждого теста.
  // Это оставляет чистый эмулятор для следующего сценария.
  afterEach(async () => {
    await driver.terminateApp(APP_PACKAGE);
  });

  it('Позитивный сценарий: запуск приложения и проверка всех элементов экрана', async () => {
    // 1. Действие: Запуск приложения
    await driver.activateApp(APP_PACKAGE);
    await LoginPage.waitForScreenLoad();

    // 2. Проверки (Assertions) всех доступных элементов
    // Блок заголовков и текста
    await expect(LoginPage.screenTitleFirst).toBeDisplayed({
      message: 'Заголовок "добро пожаловать в" не отображается',
    });
    await expect(LoginPage.screenTitleSecond).toBeDisplayed({
      message: 'Заголовок "my moldcell!" не отображается',
    });
    await expect(LoginPage.screenDescription).toBeDisplayed({
      message: 'Текст описания не отображается',
    });

    // Блок полей ввода
    await expect(LoginPage.phoneInput).toBeDisplayed({
      message: 'Поле ввода телефона не отображается',
    });
    await expect(LoginPage.passwordInput).toBeDisplayed({
      message: 'Поле ввода пароля не отображается',
    });
    await expect(LoginPage.hidePasswordIcon).toBeDisplayed({
      message: 'Иконка скрытия пароля не отображается',
    });

    // Блок кнопок авторизации и восстановления
    await expect(LoginPage.forgotPasswordButton).toBeDisplayed({
      message: 'Кнопка "Забыли пароль?" не отображается',
    });
    await expect(LoginPage.loginButton).toBeDisplayed({
      message: 'Кнопка "Войти" не отображается',
    });

    // Блок регистрации и условий
    await expect(LoginPage.createAccountIcon).toBeDisplayed({
      message: 'Иконка регистрации не отображается',
    });
    await expect(LoginPage.createAccountButton).toBeDisplayed({
      message: 'Кнопка "Регистрация" не отображается',
    });
    await expect(LoginPage.termsAndConditionsLink).toBeDisplayed({
      message: 'Ссылка на условия использования не отображается',
    });
  });

  it('Негативный сценарий: ошибка при вводе некорректного номера телефона', async () => {
    // Предусловие: Запуск приложения с нуля
    await driver.activateApp(APP_PACKAGE);
    await LoginPage.waitForScreenLoad();

    // 1. Действия: ввод невалидных данных и попытка входа
    await LoginPage.enterPhone(loginData.invalidPhone);
    await LoginPage.clickLogin();

    // 2. Проверки: отображение элемента ошибки и строгое соответствие текста
    await expect(LoginPage.errorMessage).toBeDisplayed({
      message: 'Сообщение об ошибке не появилось',
    });

    const actualErrorText = await LoginPage.getErrorMessageText();
    expect(actualErrorText).toEqual(loginData.expectedErrorMessage);
  });
});
