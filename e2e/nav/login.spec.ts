import {expect, test} from '@playwright/test';
import {badCredentials, offers, pizzas, stores} from '../api-responses';

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
    const closeLoginDialogIcon = page.getByTitle('Close Login Box');

    const emailAddressText = page.getByText("Email address");
    const emailInput = page.getByLabel('email');

    const passwordText = page.getByText("Password");
    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Toggle Password', {exact: true});

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    const questionText = page.getByText("Are you new to Pizzeria Fabulosa?");
    const createAccountButton = page.getByRole("button", {name: 'Create an account'});
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
    const closeLoginDialogIcon = page.getByTitle('Close Login Box');

    const emailAddressText = page.getByText("Email address");
    const emailInput = page.getByLabel('email');

    const passwordText = page.getByText("Password");
    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Toggle Password', {exact: true});

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    const questionText = page.getByText("Are you new to Pizzeria Fabulosa?");
    const createAccountButton = page.getByRole("button", {name: 'Create an account'});
    const orText = page.getByText("or", {exact: true});
    const dummyLoginButton = page.getByRole("button", {name: 'Use a dummy account'});

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
    await expect(createAccountButton).toBeVisible();
    await expect(orText).toBeVisible();
    await expect(dummyLoginButton).toBeVisible();

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
    await expect(createAccountButton).not.toBeVisible();
    await expect(orText).not.toBeVisible();
    await expect(dummyLoginButton).not.toBeVisible();
  });

  test('givenClickOnCreateNewAccount_thenRedirectToRegistrationRoute', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();

    const createAccountButton = page.getByRole("button", {name: 'Create an account'});

    await loginButton.click();
    await expect(createAccountButton).toBeVisible();

    // Act

    await createAccountButton.click();

    // Assert

    await expect(page.getByText('Create your account')).toBeVisible();
    await expect(createAccountButton).not.toBeVisible();
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

    await expect(page.getByText('Email is required')).toBeVisible();
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

    await expect(page.getByText('Email is required')).toBeVisible();
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

    await expect(page.getByText('Email is required')).not.toBeVisible();
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
    await expect(page.getByText('Email is required')).toBeVisible();
    await emailInput.fill('clau@gmail.com');

    // Assert

    await expect(page.getByText('Email is required')).not.toBeVisible();
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
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await emailInput.fill('email');

    // Assert

    await expect(page.getByText('Email is required')).toBeVisible();
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

    await expect(page.getByText('Password is required')).toBeVisible();
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

    await expect(page.getByText('Password is required')).not.toBeVisible();
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
    await expect(page.getByText('Password is required')).toBeVisible();
    await passwordInput.fill('password');

    // Assert

    await expect(page.getByText('Password is required')).not.toBeVisible();
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
    await expect(page.getByText('Password is required')).not.toBeVisible();
    await passwordInput.fill('');

    // Assert

    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(passwordInput).toHaveValue('');
  });

  test('givenHiddenPassword_whenIconClick_thenShowPassword', async ({page}) => {

    // Arrange

    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Toggle Password', {exact: true});
    const signInText = page.getByText("Sign In");

    // Act

    await passwordInput.fill('Password1');
    await expect(page.getByText('Password is required')).not.toBeVisible();
    await signInText.click();
    await showPasswordIcon.click(); // is an actual eye check the only way?

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

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

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

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('givenEnterClick_whenFormIsValid_thenLoginAndRedirect', async ({page}) => {

    // Arrange

    await page.route('http://192.168.1.128:8080/login?username=clau%40example.com&password=password', async route => {
      await route.fulfill(
        {
          status: 200,
          headers: {
            'set-cookie': 'Pizzeria.Fabulosa.ID_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6ImFwaS5waXp6ZXJpYWZhYnVsb3NhLmNvbSIsIm5hbWUiOiJNaWd1ZWwgZGUgQ2VydmFudGVzIiwiY29udGFjdE51bWJlciI6IjEyMzQ1Njc4OSIsImlkIjoiNCIsImV4cCI6MTc0MjE0OTA3NSwiaWF0IjoxNzQyMDYyNjc1fQ.BQoeYJZ8Kry5BuMuFb5S6oT0Gg8B439hMhETEUBjnW2falDEWRIgGA8r-NsBfbD86nAm6Cew-_EqFvBV7Ie-n5DsEUknK36rJS_6BoQ6PyqquiOnOPw_TH4_KquH31Vnc4NkgVnbkZTyQT5Fpj4jvYK6EcNbiFawNKQqwkn6CSTIYkAjZSmRre50ffSnlL02GS6dUjaUgXqcHnJfmVNP_DwfuSA8FzBWF9YBEGjAMtK1uwwgd3aVFKzXuUFF2lmfwMQLUv48frvdacSj76A27M4oVCgU1pJG1Ud0YdGlfUlNmHltntjOjF-kLaiGgqKsZmzEa0OYzJ3EcMKoVysafw; Path=/; Max-Age=86400;',
          },
        });

    });

    const loginButton = page.getByTitle('Open Login Box');
    const logoutButton = page.getByTitle('Sign Out');
    const userProfileButton = page.getByTitle('Profile');

    const emailInput = page.getByLabel('email');
    const passwordInput = page.getByLabel('password');
    const enterButton = page.getByRole("button", {name: 'ENTER'});
    await emailInput.fill('clau@example.com');
    await passwordInput.fill('password');
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Password is required')).not.toBeVisible();


    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByRole('alert').getByText('Information')).toBeVisible();
    await expect(page.getByText('You have successfully signed-in')).toBeVisible();
    await expect(loginButton).not.toBeVisible();
    await expect(logoutButton).toBeVisible();
    await expect(userProfileButton).toBeVisible();
  });

  test('givenDummyAccountLogin_thenLoginAndRedirect', async ({page}) => {

    // Arrange

    await page.route('http://192.168.1.128:8080/login?username=donQuijote%40gmail.com&password=Password1', async route => {

      await route.fulfill(
        {
          status: 200,
          headers: {
            'set-cookie': 'Pizzeria.Fabulosa.ID_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6ImFwaS5waXp6ZXJpYWZhYnVsb3NhLmNvbSIsIm5hbWUiOiJNaWd1ZWwgZGUgQ2VydmFudGVzIiwiY29udGFjdE51bWJlciI6IjEyMzQ1Njc4OSIsImlkIjoiNCIsImV4cCI6MTc0MjE0OTA3NSwiaWF0IjoxNzQyMDYyNjc1fQ.BQoeYJZ8Kry5BuMuFb5S6oT0Gg8B439hMhETEUBjnW2falDEWRIgGA8r-NsBfbD86nAm6Cew-_EqFvBV7Ie-n5DsEUknK36rJS_6BoQ6PyqquiOnOPw_TH4_KquH31Vnc4NkgVnbkZTyQT5Fpj4jvYK6EcNbiFawNKQqwkn6CSTIYkAjZSmRre50ffSnlL02GS6dUjaUgXqcHnJfmVNP_DwfuSA8FzBWF9YBEGjAMtK1uwwgd3aVFKzXuUFF2lmfwMQLUv48frvdacSj76A27M4oVCgU1pJG1Ud0YdGlfUlNmHltntjOjF-kLaiGgqKsZmzEa0OYzJ3EcMKoVysafw; Path=/; Max-Age=86400;',
          },
        });
    });

    const userProfileButton = page.getByTitle('Profile');
    const loginButton = page.getByTitle('Open Login Box');
    const logoutButton = page.getByTitle('Sign Out');
    const dummyLoginButton = page.getByRole("button", {name: 'Use a dummy account'});

    // Act

    await dummyLoginButton.click();

    // Assert

    await expect(page.getByRole('alert').getByText('Information')).toBeVisible();
    await expect(page.getByText('You have successfully signed-in')).toBeVisible();
    await expect(loginButton).not.toBeVisible();
    await expect(logoutButton).toBeVisible();
    await expect(userProfileButton).toBeVisible();

    await expect(page.url()).toBe('http://192.168.1.128:4200/');
  });

  test('givenEnterClick_whenBadCredentials_thenShowBadCredentialsMessage', async ({page}) => {

    // Arrange

    await page.route('http://192.168.1.128:8080/login?username=clau%40example.com&password=password', async route => {
      await route.fulfill(
        {
          status: 401,
          json: badCredentials
        });
    });

    const emailInput = page.getByLabel('email');
    const passwordInput = page.getByLabel('password');
    const enterButton = page.getByRole("button", {name: 'ENTER'});
    await emailInput.fill('clau@example.com');
    await passwordInput.fill('password');
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Password is required')).not.toBeVisible();

    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByRole('alert').getByText('Warning')).toBeVisible();
    await expect(page.getByText('The credentials are invalid or no account exists for the entered email address. Please, try again.')).toBeVisible();
  });
});

test.describe('Logout', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/login?username=clau%40gmail.com&password=password', async route => {
      await route.fulfill(
        {
          status: 200,
          headers: {
            'set-cookie': 'Pizzeria.Fabulosa.ID_TOKEN=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6ImFwaS5waXp6ZXJpYWZhYnVsb3NhLmNvbSIsIm5hbWUiOiJNaWd1ZWwgZGUgQ2VydmFudGVzIiwiY29udGFjdE51bWJlciI6IjEyMzQ1Njc4OSIsImlkIjoiNCIsImV4cCI6MTc0MjE0OTA3NSwiaWF0IjoxNzQyMDYyNjc1fQ.BQoeYJZ8Kry5BuMuFb5S6oT0Gg8B439hMhETEUBjnW2falDEWRIgGA8r-NsBfbD86nAm6Cew-_EqFvBV7Ie-n5DsEUknK36rJS_6BoQ6PyqquiOnOPw_TH4_KquH31Vnc4NkgVnbkZTyQT5Fpj4jvYK6EcNbiFawNKQqwkn6CSTIYkAjZSmRre50ffSnlL02GS6dUjaUgXqcHnJfmVNP_DwfuSA8FzBWF9YBEGjAMtK1uwwgd3aVFKzXuUFF2lmfwMQLUv48frvdacSj76A27M4oVCgU1pJG1Ud0YdGlfUlNmHltntjOjF-kLaiGgqKsZmzEa0OYzJ3EcMKoVysafw; Path=/; Max-Age=86400;',
          },
        });
    });

    await page.goto('/pizzas');

    const loginButton = page.getByTitle('Open Login Box');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    const emailInput = page.getByLabel('email');
    const passwordInput = page.getByLabel('password');
    const enterButton = page.getByRole("button", {name: 'ENTER'});
    await emailInput.fill('clau@gmail.com');
    await passwordInput.fill('password');
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Password is required')).not.toBeVisible();

    await enterButton.click();

    await page.goto('/pizzas');
  });

  test('givenClickOnLogout_whenLoggedIn_thenLogoutAndRedirect', async ({page}) => {

    // Arrange

    await page.route('*/**/logout', async route => {
      await route.fulfill(
        {
          status: 200,
          headers: {
            'set-cookie': 'Pizzeria.Fabulosa.ID_TOKEN=; Path=/; Max-Age=0;',
          },
        });
    });

    const userProfileButton = page.getByTitle('Profile');
    const loginButton = page.getByTitle('Open Login Box');
    const logoutButton = page.getByTitle('Sign Out');
    const yesButton = page.getByRole("button", {name: 'Yes'});
    const noButton = page.getByRole("button", {name: 'No'});
    await logoutButton.click();

    await expect(page.getByTitle('Header').getByText('Information')).toBeVisible();
    await expect(page.getByText('Proceed with sign-out?')).toBeVisible();
    await expect(yesButton).toBeVisible();
    await expect(noButton).toBeVisible();

    // Act

    await yesButton.click();

    // Assert

    await expect(loginButton).toBeVisible();
    await expect(page.getByText('Information')).toBeVisible();
    await expect(page.getByText('You have successfully signed-out')).toBeVisible();
    await expect(logoutButton).not.toBeVisible();
    await expect(yesButton).not.toBeVisible();
    await expect(noButton).not.toBeVisible();
    await expect(userProfileButton).not.toBeVisible();

    await expect(page.url()).toBe('http://192.168.1.128:4200/');
  });

  test('givenClickOnLogout_whenApiIsDown_thenDisplayErrorMessage', async ({page}) => {

    // Arrange

    const userProfileButton = page.getByTitle('Profile');
    const loginButton = page.getByTitle('Open Login Box');
    const logoutButton = page.getByTitle('Sign Out');
    const yesButton = page.getByRole("button", {name: 'Yes'});
    const noButton = page.getByRole("button", {name: 'No'});
    await logoutButton.click();

    await expect(page.getByTitle('Header').getByText('Information')).toBeVisible();
    await expect(page.getByText('Proceed with sign-out?')).toBeVisible();
    await expect(yesButton).toBeVisible();
    await expect(noButton).toBeVisible();

    // Act

    await yesButton.click();

    // Assert

    await expect(logoutButton).toBeVisible();
    await expect(userProfileButton).toBeVisible();
    await expect(page.getByRole('alert').getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later.')).toBeVisible();
    await expect(loginButton).not.toBeVisible();
    await expect(yesButton).not.toBeVisible();
    await expect(noButton).not.toBeVisible();
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
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Password is required')).not.toBeVisible();

    // Act

    await enterButton.click();

    // Assert

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later.')).toBeVisible();
  });
});
