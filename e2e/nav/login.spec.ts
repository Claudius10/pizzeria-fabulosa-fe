import {expect, test} from '@playwright/test';
import {badCredentials, offers, stores} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Pizzeria Fabulosa');
  });

  test('ShowLoginDialog', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    const signInText = page.getByText("Sign In");
    const closeLoginDialogIcon = page.getByTitle('Close Sign In Box');

    const emailAddressText = page.getByText("Email address");
    const emailInput = page.getByLabel('email');

    const passwordText = page.getByText("Password");
    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Toggle Password Visibility');

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    const questionText = page.getByText("Are you new to Pizzeria Fabulosa?");
    const createAccountButton = page.getByRole("button", {name: 'To Register Page'});
    const orText = page.getByText("or", {exact: true});
    const dummyLoginButton = page.getByRole("button", {name: 'Use a dummy account'});

    // Act

    await loginButton.click();

    // Assert

    await expect(signInText).toBeVisible();
    await expect(closeLoginDialogIcon).toBeVisible();
    await expect(emailAddressText).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordText).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(showPasswordIcon).toBeVisible();
    await expect(enterButton).toBeVisible();
    await expect(questionText).toBeVisible();
    await expect(createAccountButton).toBeVisible();
    await expect(orText).toBeVisible();
    await expect(dummyLoginButton).toBeVisible();
  });

  test('HideLoginDialog', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    const signInText = page.getByText("Sign In");
    const closeLoginDialogIcon = page.getByTitle('Close Sign In Box');

    const emailAddressText = page.getByText("Email address");
    const emailInput = page.getByLabel('email');

    const passwordText = page.getByText("Password");
    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Toggle Password Visibility');

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    const questionText = page.getByText("Are you new to Pizzeria Fabulosa?");
    const createAccountText = page.getByRole("button", {name: 'To Register Page'});
    const orText = page.getByText("or", {exact: true});
    const dummyLoginText = page.getByRole("button", {name: 'Use a dummy account'});

    await loginButton.click();

    await expect(signInText).toBeVisible();
    await expect(closeLoginDialogIcon).toBeVisible();
    await expect(emailAddressText).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordText).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(showPasswordIcon).toBeVisible();
    await expect(enterButton).toBeVisible();
    await expect(questionText).toBeVisible();
    await expect(createAccountText).toBeVisible();
    await expect(orText).toBeVisible();
    await expect(dummyLoginText).toBeVisible();

    // Act

    await closeLoginDialogIcon.click();

    // Assert

    await expect(signInText).not.toBeVisible();
    await expect(closeLoginDialogIcon).not.toBeVisible();
    await expect(emailAddressText).not.toBeVisible();
    await expect(emailInput).not.toBeVisible();
    await expect(passwordText).not.toBeVisible();
    await expect(passwordInput).not.toBeVisible();
    await expect(showPasswordIcon).not.toBeVisible();
    await expect(enterButton).not.toBeVisible();
    await expect(questionText).not.toBeVisible();
    await expect(createAccountText).not.toBeVisible();
    await expect(orText).not.toBeVisible();
    await expect(dummyLoginText).not.toBeVisible();
  });
});

test.describe('Validation: Email', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByLabel('email');
    const signInText = page.getByText("Sign In");

    // Act

    await emailInput.fill('');
    await signInText.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByLabel('email');
    const signInText = page.getByText("Sign In");

    // Act

    await emailInput.fill('email@');
    await signInText.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('email@');
  });


  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByLabel('email');
    const signInText = page.getByText("Sign In");

    // Act

    await emailInput.fill('email@example.com');
    await signInText.click();

    // Assert

    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(emailInput).toHaveValue('email@example.com');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByLabel('email');
    const signInText = page.getByText("Sign In");

    // Act

    await emailInput.fill('email');
    await expect(emailInput).toHaveValue('email');
    await signInText.click();
    await expect(page.getByText('Email is requiered')).toBeVisible();
    await emailInput.fill('clau@gmail.com');

    // Assert

    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(emailInput).toHaveValue('clau@gmail.com');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByLabel('email');
    const signInText = page.getByText("Sign In");

    // Act

    await emailInput.fill('clau@gmail.com');
    await expect(emailInput).toHaveValue('clau@gmail.com');
    await signInText.click();
    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await emailInput.fill('email');

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('email');
  });
});

test.describe('Validation: Password', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const passwordInput = page.getByLabel('password');
    const signInText = page.getByText("Sign In");

    // Act

    await passwordInput.fill('');
    await signInText.click();

    // Assert

    await expect(page.getByText('Password is requiered')).toBeVisible();
    await expect(passwordInput).toHaveValue('');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const passwordInput = page.getByLabel('password');
    const signInText = page.getByText("Sign In");

    // Act

    await passwordInput.fill('asd');
    await signInText.click();

    // Assert

    await expect(page.getByText('Password is requiered')).not.toBeVisible();
    await expect(passwordInput).toHaveValue('asd');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const passwordInput = page.getByLabel('password');
    const signInText = page.getByText("Sign In");

    // Act

    await passwordInput.fill('');
    await expect(passwordInput).toHaveValue('');
    await signInText.click();
    await expect(page.getByText('Password is requiered')).toBeVisible();
    await passwordInput.fill('password');

    // Assert

    await expect(page.getByText('Password is requiered')).not.toBeVisible();
    await expect(passwordInput).toHaveValue('password');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const passwordInput = page.getByLabel('password');
    const signInText = page.getByText("Sign In");

    // Act

    await passwordInput.fill('password');
    await expect(passwordInput).toHaveValue('password');
    await signInText.click();
    await expect(page.getByText('Password is requiered')).not.toBeVisible();
    await passwordInput.fill('');

    // Assert

    await expect(page.getByText('Password is requiered')).toBeVisible();
    await expect(passwordInput).toHaveValue('');
  });

  test('givenHiddenPassword_whenIconClick_thenShowPassword', async ({page}) => {

    // Arrange

    const passwordInput = page.getByLabel('password');
    const passwordVisibility = page.getByTitle('Toggle Password Visibility');
    const signInText = page.getByText("Sign In");

    // Act

    await passwordInput.fill('Password1');
    await expect(page.getByText('Password is requiered')).not.toBeVisible();
    await signInText.click();
    await passwordVisibility.click(); // is an actual eye check the only way?

    // Assert

    await expect(passwordInput).toHaveValue('Password1');
  });
});

test.describe('Submit: API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });


  test('givenEnterClick_whenFormIsEmpty_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(page.getByText('Password is requiered')).toBeVisible();
  });

  test('givenEnterClick_whenFormIsValid_thenLogin', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/auth/login?username=clau@gmail.com&password=password', async route => {
      await route.fulfill(
        {
          status: 200,
          headers: {
            'set-cookie': 'Pizzeria.Fabulosa.ID_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6ImFwaS5waXp6ZXJpYWZhYnVsb3NhLmNvbSIsIm5hbWUiOiJNaWd1ZWwgZGUgQ2VydmFudGVzIiwiY29udGFjdE51bWJlciI6IjEyMzQ1Njc4OSIsImlkIjoiNCIsImV4cCI6MTc0MjE0OTA3NSwiaWF0IjoxNzQyMDYyNjc1fQ.BQoeYJZ8Kry5BuMuFb5S6oT0Gg8B439hMhETEUBjnW2falDEWRIgGA8r-NsBfbD86nAm6Cew-_EqFvBV7Ie-n5DsEUknK36rJS_6BoQ6PyqquiOnOPw_TH4_KquH31Vnc4NkgVnbkZTyQT5Fpj4jvYK6EcNbiFawNKQqwkn6CSTIYkAjZSmRre50ffSnlL02GS6dUjaUgXqcHnJfmVNP_DwfuSA8FzBWF9YBEGjAMtK1uwwgd3aVFKzXuUFF2lmfwMQLUv48frvdacSj76A27M4oVCgU1pJG1Ud0YdGlfUlNmHltntjOjF-kLaiGgqKsZmzEa0OYzJ3EcMKoVysafw; Path=/; Domain=localhost; Max-Age=86400; Expires=Sun, 16 Mar 2055 18:17:55 GMT; Secure; SameSite=Lax'
          },
        });
    });

    const emailInput = page.getByLabel('email');
    const passwordInput = page.getByLabel('password');
    const enterButton = page.getByRole("button", {name: 'ENTER'});
    await emailInput.fill('clau@gmail.com');
    await passwordInput.fill('password');
    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(page.getByText('Password is requiered')).not.toBeVisible();

    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByText('Information')).toBeVisible();
    await expect(page.getByText('You have successfully signed-in')).toBeVisible();
  });

  test('givenDummyAccountLogin_thenLogin', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/auth/login?username=donQuijote@gmail.com&password=Password1', async route => {
      await route.fulfill(
        {
          status: 200,
          headers: {
            'set-cookie': 'Pizzeria.Fabulosa.ID_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6ImFwaS5waXp6ZXJpYWZhYnVsb3NhLmNvbSIsIm5hbWUiOiJNaWd1ZWwgZGUgQ2VydmFudGVzIiwiY29udGFjdE51bWJlciI6IjEyMzQ1Njc4OSIsImlkIjoiNCIsImV4cCI6MTc0MjE0OTA3NSwiaWF0IjoxNzQyMDYyNjc1fQ.BQoeYJZ8Kry5BuMuFb5S6oT0Gg8B439hMhETEUBjnW2falDEWRIgGA8r-NsBfbD86nAm6Cew-_EqFvBV7Ie-n5DsEUknK36rJS_6BoQ6PyqquiOnOPw_TH4_KquH31Vnc4NkgVnbkZTyQT5Fpj4jvYK6EcNbiFawNKQqwkn6CSTIYkAjZSmRre50ffSnlL02GS6dUjaUgXqcHnJfmVNP_DwfuSA8FzBWF9YBEGjAMtK1uwwgd3aVFKzXuUFF2lmfwMQLUv48frvdacSj76A27M4oVCgU1pJG1Ud0YdGlfUlNmHltntjOjF-kLaiGgqKsZmzEa0OYzJ3EcMKoVysafw; Path=/; Domain=localhost; Max-Age=86400; Expires=Sun, 16 Mar 2055 18:17:55 GMT; Secure; SameSite=Lax'
          },
        });
    });

    const dummyLoginButton = page.getByRole("button", {name: 'Use a dummy account'});

    // Act

    await dummyLoginButton.click();

    // Assert

    await expect(page.getByText('Information')).toBeVisible();
    await expect(page.getByText('You have successfully signed-in')).toBeVisible();
  });

  test('givenEnterClick_whenBadCredentials_thenShowBadCredentialsMessage', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/auth/login?username=clau@gmail.com&password=password', async route => {
      await route.fulfill(
        {
          status: 200,
          json: badCredentials
        });
    });

    const emailInput = page.getByLabel('email');
    const passwordInput = page.getByLabel('password');
    const enterButton = page.getByRole("button", {name: 'ENTER'});
    await emailInput.fill('clau@gmail.com');
    await passwordInput.fill('password');
    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(page.getByText('Password is requiered')).not.toBeVisible();

    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByText('Warning')).toBeVisible();
    await expect(page.getByText('The credentials are invalid or no account exists for the entered email address. Please, try again.')).toBeVisible();
  });
});


test.describe('Submit: API KO', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });

  test('givenLogin_whenApiIsDown_thenServersDownMessage', async ({page}) => {

    // Arrange

    const emailInput = page.getByLabel('email');
    const passwordInput = page.getByLabel('password');
    const enterButton = page.getByRole("button", {name: 'ENTER'});
    await emailInput.fill('clau@gmail.com');
    await passwordInput.fill('password');
    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(page.getByText('Password is requiered')).not.toBeVisible();

    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later.')).toBeVisible();
  });
});
