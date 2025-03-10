import {expect, test} from '@playwright/test';

test.describe('Large screen tests', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('givenNavBar_thenHaveMainIconVisible', async ({page}) => {

    // Arrange

    const mainPizzaIcon = page.getByAltText('Large Main Pizza Icon');

    // Assert

    await expect(mainPizzaIcon).toBeVisible();
  });

  test('givenNavBar_thenHaveLinksVisible', async ({page}) => {

    // Arrange

    const pizzaLink = page.getByRole('button', {name: 'Pizzas'});
    const beveragesLink = page.getByRole('button', {name: 'Beverages'});

    // Assert

    await expect(pizzaLink).toBeVisible();
    await expect(beveragesLink).toBeVisible();
  });

  test('givenClickOnPizzas_whenOnHomeRoute_thenNavToPizzasRoute', async ({page}) => {

    // Arrange

    const pizzaQuickLink = page.getByRole('button', {name: 'Pizzas'});

    // Act

    await pizzaQuickLink.click();

    // Assert

    await expect(page).toHaveURL('/pizzas');
  });

  test('givenClickOnBeverages_whenOnHomeRoute_thenNavToBeveragesRoute', async ({page}) => {

    // Arrange

    const beveragesLink = page.getByRole('button', {name: 'Beverages'});

    // Act

    await beveragesLink.click();

    // Assert

    await expect(page).toHaveURL('/beverages');
  });

  test('givenClickOnCartButton_thenShowEmptyCartDrawer', async ({page}) => {

    // Arrange

    const cartButton = page.getByTitle('Cart');
    await expect(cartButton).toBeVisible();

    const emptyCartText = page.getByText("Your cart is empty");
    const total = page.getByText("Total");
    const amount = page.getByRole("button", {name: '0.00€'});

    // Act

    await cartButton.click();

    // Assert

    await expect(emptyCartText).toBeVisible();
    await expect(total).toBeVisible();
    await expect(amount).toBeVisible();
  });

  test('givenClickOnCartButton_whenCartIsVisible_thenHideCartDrawer', async ({page}) => {

    // Arrange

    const cartButton = page.getByTitle('Cart');
    await expect(cartButton).toBeVisible();

    const emptyCartText = page.getByText("Your cart is empty");
    const total = page.getByText("Total");
    const amount = page.getByRole("button", {name: '0.00€'});

    await cartButton.click();

    await expect(emptyCartText).toBeVisible();
    await expect(total).toBeVisible();
    await expect(amount).toBeVisible();

    const closeButton = page.locator('p-button').nth(2);
    await expect(closeButton).toBeVisible();

    // Act

    await closeButton.click();

    // Assert

    await expect(emptyCartText).not.toBeVisible();
    await expect(total).not.toBeVisible();
    await expect(amount).not.toBeVisible();
  });

  test('givenClickOnSignInButton_thenShowSignInDialog', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Sign In');
    await expect(loginButton).toBeVisible();
    const signInText = page.getByText("Sign In");
    const closeLoginDialogIcon = page.getByTitle('Close Sign In Dialog');

    const emailAddressText = page.getByText("Email address");
    const emailInput = page.getByLabel('email');

    const passwordText = page.getByText("Password");
    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Show Password');

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    const questionText = page.getByText("Are you new to Pizzeria Fabulosa?");
    const createAccountText = page.getByTitle("To Register Page");
    const orText = page.getByText("or", {exact: true});
    const dummyLoginText = page.getByRole("button", {name: 'Use a dummy account'});

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
    await expect(createAccountText).toBeVisible();
    await expect(orText).toBeVisible();
    await expect(dummyLoginText).toBeVisible();
  });

  test('givenClickCloseLoginDialogIcon_thenHideSignInDialog', async ({page}) => {

    // Arrange

    const loginButton = page.getByTitle('Sign In');
    await expect(loginButton).toBeVisible();
    const signInText = page.getByText("Sign In");
    const closeLoginDialogIcon = page.getByTitle('Close Sign In Dialog');

    const emailAddressText = page.getByText("Email address");
    const emailInput = page.getByLabel('email');

    const passwordText = page.getByText("Password");
    const passwordInput = page.getByLabel('password');
    const showPasswordIcon = page.getByTitle('Show Password');

    const enterButton = page.getByRole("button", {name: 'ENTER'});

    const questionText = page.getByText("Are you new to Pizzeria Fabulosa?");
    const createAccountText = page.getByTitle("To Register Page");
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

  test('givenClickOnLocaleButton_thenShowLocaleComponentWithChoices', async ({page}) => {

    // Arrange

    const localeButton = page.getByTitle('Locale');
    await expect(localeButton).toBeVisible();
    const esChoice = page.getByRole("button", {name: "Castellano"});
    const enChoice = page.getByRole("button", {name: "English"});

    // Act

    await localeButton.click();

    // Assert

    await expect(esChoice).toBeVisible();
    await expect(enChoice).toBeVisible();
  });

  test('givenClickOnCastellano_whenInEnglish_thenWelcomeTextIsInCastellano', async ({page}) => {

    // Arrange

    const welcomeTextEs = page.getByText("Bienvenidos/as a la");
    const welcomeTextEn = page.getByText("Welcome to");
    await expect(welcomeTextEn).toBeVisible();
    await expect(welcomeTextEs).not.toBeVisible();

    const localeButton = page.getByTitle('Locale');
    await expect(localeButton).toBeVisible();
    const esChoice = page.getByRole("button", {name: "Castellano"});
    const enChoice = page.getByRole("button", {name: "English"});

    await localeButton.click();

    await expect(esChoice).toBeVisible();
    await expect(enChoice).toBeVisible();

    // Act

    await esChoice.click();

    // Assert

    await expect(welcomeTextEn).not.toBeVisible();
    await expect(welcomeTextEs).toBeVisible();
    await expect(esChoice).not.toBeVisible();
    await expect(enChoice).not.toBeVisible();
  });

  test('givenClickOnLocaleButton_whenLocaleIsVisible_thenHideLocaleComponentWithChoices', async ({page}) => {
    // Arrange

    const localeButton = page.getByTitle('Locale');
    await expect(localeButton).toBeVisible();
    const esChoice = page.getByRole("button", {name: "Castellano"});
    const enChoice = page.getByRole("button", {name: "English"});

    await localeButton.click();

    await expect(esChoice).toBeVisible();
    await expect(enChoice).toBeVisible();

    // Act

    await localeButton.click();

    // Assert

    await expect(esChoice).not.toBeVisible();
    await expect(enChoice).not.toBeVisible();
  });

  test('givenClickOnDarkModeButton_whenDarkModeIsOff_thenToggleDarkModeOn', async ({page}) => {

    // Arrange

    const darkModeButton = page.getByTitle('Dark Mode On');
    await expect(darkModeButton).toBeVisible();
    const htmlElement = page.getByTitle('HTML');

    // Act

    await darkModeButton.click();

    // Assert

    await expect(htmlElement).toHaveClass('my-app-dark');
  });

  test('givenClickOnDarkModeButton_whenDarkModeIsOn_thenToggleDarkModeOn', async ({page}) => {

    // Arrange

    const htmlElement = page.getByTitle('HTML');

    const darkModeOnButton = page.getByTitle('Dark Mode On');
    await expect(darkModeOnButton).toBeVisible();
    await darkModeOnButton.click();
    await expect(htmlElement).toHaveClass('my-app-dark');

    const darkModeOffButton = page.getByTitle('Dark Mode Off');
    await expect(darkModeOffButton).toBeVisible();

    // Act

    await darkModeOffButton.click();

    // Assert

    await expect(htmlElement).not.toHaveClass('my-app-dark');
  });

  test('givenNavBar_thenGithubButtonIsVisible', async ({page}) => {

    // Arrange

    const github = page.getByTitle(`Author's GitHub`);

    // Assert

    await expect(github).toBeVisible();
  });
});

test.describe('Small screen tests', () => {
  // set view port for small screen
  test.use({viewport: {width: 360, height: 760}});

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('givenClickOnNavBarMenu_thenShowNavMenuDrawer', async ({page}) => {

    // Arrange

    const navMenu = page.getByTitle('Navigation Menu');
    await expect(navMenu).toBeVisible();

    // Act

    await navMenu.click();

    // Assert

    await expect(page.getByRole("button", {name: 'Home'})).toBeVisible();
    await expect(page.getByRole("button", {name: 'Pizzas'})).toBeVisible();
    await expect(page.getByRole("button", {name: 'Beverages'})).toBeVisible();
    await expect(page.getByRole('complementary').locator('p-button')).toBeVisible();
  });

  test('givenClickOnNavBarMenu_whenNavMenuIsOpen_thenHideNavMenuDrawer', async ({page}) => {

    // Arrange

    const navMenu = page.getByTitle('Navigation Menu');
    await expect(navMenu).toBeVisible();
    const closeButton = page.getByRole('complementary').locator('p-button');
    await navMenu.click();
    await expect(closeButton).toBeVisible();
    await expect(page.getByRole("button", {name: 'Home'})).toBeVisible();
    await expect(page.getByRole("button", {name: 'Pizzas'})).toBeVisible();
    await expect(page.getByRole("button", {name: 'Beverages'})).toBeVisible();

    // Act

    await closeButton.click();

    // Assert

    await expect(page.getByRole("button", {name: 'Home'})).not.toBeVisible();
    await expect(page.getByRole("button", {name: 'Pizzas'})).not.toBeVisible();
    await expect(page.getByRole("button", {name: 'Beverages'})).not.toBeVisible();
  });
});
