import {expect, test} from '@playwright/test';
import {registerOK} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Create your account');
  });

  test('ShowHeading', async ({page}) => {
    await expect(page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'}).first()).toBeVisible();
  });

  test('ShowForm', async ({page}) => {
    await expect(page.getByTitle('Full Name Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Full name'})).toBeVisible();

    await expect(page.getByTitle('Email Icon').first()).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Email', exact: true})).toBeVisible();

    await expect(page.getByRole('textbox', {name: 'Matching Email'})).toBeVisible();

    await expect(page.getByTitle('Phone Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Contact Number'})).toBeVisible();

    await expect(page.getByTitle('Toggle Password Visibility')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Password', exact: true})).toBeVisible();

    await expect(page.getByRole('textbox', {name: 'Matching Password'})).toBeVisible();
  });

  test('ShowButtons', async ({page}) => {
    await expect(page.getByRole("button", {name: 'Cancel'})).toBeVisible();
    await expect(page.getByRole("button", {name: 'Continue'})).toBeVisible();
  });

  test('ShowFooter', async ({page}) => {
    await expect(page.getByText('Do you have an account?')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Sign In'})).toBeVisible();
  });
});

test.describe('Validation: Full name', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two ')).toBeVisible();
    await expect(fullNameInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('A');
    await header.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await expect(fullNameInput).toHaveValue('A');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('Aa');
    await header.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).not.toBeVisible();
    await expect(fullNameInput).toHaveValue('Aa');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('A');
    await expect(fullNameInput).toHaveValue('A');
    await header.click();
    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await fullNameInput.fill('Clau');

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).not.toBeVisible();
    await expect(fullNameInput).toHaveValue('Clau');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await fullNameInput.fill('Clau');
    await expect(fullNameInput).toHaveValue('Clau');
    await header.click();
    await expect(page.getByText('Name is required: minimum length is two')).not.toBeVisible();
    await fullNameInput.fill('C');

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await expect(fullNameInput).toHaveValue('C');
  });
});

test.describe('Validation: Email', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('email@');
    await header.click();

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('email@');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('email@gmail.com');
    await header.click();


    // Assert

    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(emailInput).toHaveValue('email@gmail.com');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('email');
    await expect(emailInput).toHaveValue('email');
    await header.click();
    await expect(page.getByText('Email is requiered')).toBeVisible();
    await emailInput.fill('clau@gmail.com');

    // Assert

    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await expect(emailInput).toHaveValue('clau@gmail.com');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('clau@gmail.com');
    await expect(emailInput).toHaveValue('clau@gmail.com');
    await header.click();
    await expect(page.getByText('Email is requiered')).not.toBeVisible();
    await emailInput.fill('email');

    // Assert

    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(emailInput).toHaveValue('email');
  });
});

test.describe('Validation: Matching Email', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingEmail.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Please make sure email address matches')).toBeVisible();
    await expect(matchingEmail).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingEmail.fill('email');
    await header.click();

    // Assert

    await expect(page.getByText('Please make sure email address matches')).toHaveCount(2);
    await expect(matchingEmail).toHaveValue('email');
  });

  test('givenValidMatchingEmail_whenInvalidEmail_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingEmail.fill('email@gmail.com');
    await header.click();

    // Assert

    await expect(page.getByText('Please make sure email address matches')).toHaveCount(2);
    await expect(matchingEmail).toHaveValue('email@gmail.com');
  });

  test('givenValidEmailAndMatchingEmail_whenNoMatch_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('clau@gmail.com');
    await matchingEmail.fill('email@gmail.com');
    await header.click();

    // Assert

    await expect(page.getByText('Please make sure email address matches')).toHaveCount(2);
    await expect(emailInput).toHaveValue('clau@gmail.com');
    await expect(matchingEmail).toHaveValue('email@gmail.com');
  });

  test('whenValidEmailAndMatchingEmail_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await emailInput.fill('email@gmail.com');
    await matchingEmail.fill('email@gmail.com');
    await header.click();

    // Assert

    await expect(page.getByText('Please make sure email address matches')).not.toHaveCount(2);
    await expect(emailInput).toHaveValue('email@gmail.com');
    await expect(matchingEmail).toHaveValue('email@gmail.com');
  });
});

test.describe('Validation: Contact Number', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await contactNumber.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(contactNumber).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await contactNumber.fill('12345678');
    await header.click();

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(contactNumber).toHaveValue('12345678');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await contactNumber.fill('123456789');
    await header.click();

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).not.toBeVisible();
    await expect(contactNumber).toHaveValue('123456789');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await contactNumber.fill('12345678');
    await expect(contactNumber).toHaveValue('12345678');
    await header.click();
    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await contactNumber.fill('123456789');

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).not.toBeVisible();
    await expect(contactNumber).toHaveValue('123456789');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await contactNumber.fill('123456789');
    await expect(contactNumber).toHaveValue('123456789');
    await header.click();
    await expect(page.getByText('Contact number must contain exactly nine digits')).not.toBeVisible();
    await contactNumber.fill('12345678');

    // Assert

    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(contactNumber).toHaveValue('12345678');
  });
});

test.describe('Validation: Password', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).toBeVisible();
    await expect(password).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('password');
    await header.click();

    // Assert

    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).toBeVisible();
    await expect(password).toHaveValue('password');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('Password1');
    await header.click();

    // Assert

    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).not.toBeVisible();
    await expect(password).toHaveValue('Password1');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('password');
    await expect(password).toHaveValue('password');
    await header.click();
    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).toBeVisible();
    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');

    // Assert

    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).not.toBeVisible();
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('Password1');
    await expect(password).toHaveValue('Password1');
    await header.click();
    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).not.toBeVisible();
    await password.fill('password');
    await expect(password).toHaveValue('password');

    // Assert

    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).toBeVisible();
  });

  test('givenHiddenPassword_whenIconClick_thenShowPassword', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const passwordVisibility = page.getByTitle('Toggle Password Visibility');
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('Password1');
    await header.click();
    await passwordVisibility.click(); // is an actual eye check the only way?

    // Assert

    await expect(password).toHaveValue('Password1');
  });
});

test.describe('Validation: Matching Password', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingPassword.fill('');
    await header.click();

    // Assert

    await expect(page.getByText('Password must match')).toBeVisible();
    await expect(matchingPassword).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingPassword.fill('password');
    await header.click();

    // Assert

    await expect(page.getByText('Password must match')).toHaveCount(2);
    await expect(matchingPassword).toHaveValue('password');
  });

  test('givenValidMatchingPassword_whenInvalidPassword_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingPassword.fill('Password1');
    await header.click();

    // Assert

    await expect(page.getByText('Password must match')).toHaveCount(2);
    await expect(matchingPassword).toHaveValue('Password1');
  });

  test('givenValidPasswordAndMatchingPassword_whenNoMatch_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('Password1');
    await matchingPassword.fill('Password2');
    await header.click();

    // Assert

    await expect(page.getByText('Password must match')).toHaveCount(2);
    await expect(password).toHaveValue('Password1');
    await expect(matchingPassword).toHaveValue('Password2');
  });

  test('whenValidPasswordAndMatchingPassword_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await password.fill('Password1');
    await matchingPassword.fill('Password1');
    await header.click();

    // Assert

    await expect(page.getByText('Please make sure email address matches')).not.toHaveCount(2);
    await expect(password).toHaveValue('Password1');
    await expect(matchingPassword).toHaveValue('Password1');
  });

  test('givenHiddenMatchingPassword_whenIconClick_thenShowPassword', async ({page}) => {

    // Arrange

    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});
    const matchingPasswordVisibility = page.getByTitle('Toggle Matching Password Visibility');
    const header = page.getByRole("heading", {name: 'CREATE YOUR ACCOUNT'});

    // Act

    await matchingPassword.fill('Password1');
    await header.click();
    await matchingPasswordVisibility.click(); // is an actual eye check the only way?

    // Assert

    await expect(matchingPassword).toHaveValue('Password1');
  });
});

test.describe('Submit', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('givenSubmitClick_whenEmptyForm_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const continueButton = page.getByRole("button", {name: 'Continue'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Name is required: minimum length is two')).toBeVisible();
    await expect(page.getByText('Email is requiered')).toBeVisible();
    await expect(page.getByText('Please make sure email address matches')).toBeVisible();
    await expect(page.getByText('Contact number must contain exactly nine digits')).toBeVisible();
    await expect(page.getByText('Password must contain one uppercase and lower case letter, one number, and be eight characters long')).toBeVisible();
    await expect(page.getByText('Password must match')).toBeVisible();
  });

  test('givenSubmitClick_whenAllButOneFormIsInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await matchingEmail.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await password.fill('Password1');
    await matchingPassword.fill('password');

    const continueButton = page.getByRole("button", {name: 'Continue'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Password must match')).toHaveCount(2);
  });

  test('givenSubmitClick_whenFormIsValid_thenRedirectAndShowSuccessMessage', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/anon/register', async route => {
      await route.fulfill({json: registerOK});
    });

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await matchingEmail.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await password.fill('Password1');
    await matchingPassword.fill('Password1');

    const continueButton = page.getByRole("button", {name: 'Continue'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Information')).toBeVisible();
    await expect(page.getByText('Successful registration! You may now login.')).toBeVisible();
    expect(page.url()).toBe('http://192.168.1.128:4200/');
  });

  test('givenCancelClick_thenRedirectToHomePage', async ({page}) => {

    // Arrange

    const cancel = page.getByRole("button", {name: 'Cancel'});
    expect(page.url()).toBe('http://192.168.1.128:4200/registration');

    // Act

    await cancel.click();

    // Assert

    expect(page.url()).toBe('http://192.168.1.128:4200/');
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/registration');
  });

  test('givenClickOnSignIn_theOpenLogInDialog', async ({page}) => {

    // Arrange

    const signIn = page.getByRole('button', {name: 'Sign In', exact: true});

    // login component
    const signInText = page.getByTitle('Sign In');
    const closeLoginDialogIcon = page.getByTitle('Close Login Box', {exact: true});

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

    await signIn.click();

    // Arrange

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
});

test.describe('Submit: API KO', () => {
  test('givenSubmitClickWithValidForm_whenApiIsDown_thenShowErrorMessage', async ({page}) => {

    await page.goto('/registration');
    // Arrange

    const fullNameInput = page.getByRole('textbox', {name: 'Full name'});
    const emailInput = page.getByRole('textbox', {name: 'Email', exact: true});
    const matchingEmail = page.getByRole('textbox', {name: 'Matching Email', exact: true});
    const contactNumber = page.getByRole('textbox', {name: 'Contact Number', exact: true});
    const password = page.getByRole('textbox', {name: 'Password', exact: true});
    const matchingPassword = page.getByRole('textbox', {name: 'Matching Password', exact: true});

    await fullNameInput.fill('Clau');
    await emailInput.fill('clau@example.com');
    await matchingEmail.fill('clau@example.com');
    await contactNumber.fill('123456789');
    await password.fill('Password1');
    await matchingPassword.fill('Password1');

    const continueButton = page.getByRole("button", {name: 'Continue'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later')).toBeVisible();
  });
});
