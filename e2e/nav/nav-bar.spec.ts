import {expect, test} from '@playwright/test';

test.describe('Large screen tests', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('MainIsIconVisible', async ({page}) => {

    // Arrange

    const mainPizzaIcon = page.getByAltText('Large Main Pizza Icon');

    // Assert

    await expect(mainPizzaIcon).toBeVisible();
  });

  test('LinksAreVisible', async ({page}) => {

    // Arrange

    const pizzaLink = page.getByRole('button', {name: 'Pizzas'});
    const beveragesLink = page.getByRole('button', {name: 'Beverages'});

    // Assert

    await expect(pizzaLink).toBeVisible();
    await expect(beveragesLink).toBeVisible();
  });

  test('RightSideButtonsIsVisible', async ({page}) => {
    await expect(page.getByTitle("Navigation Buttons").getByRole('listitem')).toHaveCount(4);
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

  test('givenClickOnLocaleButton_thenShowLocaleComponentWithChoices', async ({page}) => {

    // Arrange

    const localeButton = page.getByTitle('Language');
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

    const localeButton = page.getByTitle('Language');
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
    await expect(page.getByText('Información')).toBeVisible();
    await expect(page.getByText('Castellano seleccionado')).toBeVisible();
  });

  test('givenClickOnEnglish_whenInCastellano_thenWelcomeTextIsInEnglish', async ({page}) => {

    // Arrange

    const welcomeTextEs = page.getByText("Bienvenidos/as a la");
    const welcomeTextEn = page.getByText("Welcome to");
    await expect(welcomeTextEn).toBeVisible();
    await expect(welcomeTextEs).not.toBeVisible();

    const localeButton = page.getByTitle('Language');
    await expect(localeButton).toBeVisible();
    const esChoice = page.getByRole("button", {name: "Castellano"});
    const enChoice = page.getByRole("button", {name: "English"});

    await localeButton.click();

    await expect(esChoice).toBeVisible();
    await expect(enChoice).toBeVisible();

    await esChoice.click();

    await expect(welcomeTextEn).not.toBeVisible();
    await expect(welcomeTextEs).toBeVisible();
    await expect(esChoice).not.toBeVisible();
    await expect(enChoice).not.toBeVisible();
    await expect(page.getByText('Información')).toBeVisible();
    await expect(page.getByText('Castellano seleccionado')).toBeVisible();

    await localeButton.click();

    // Act

    await enChoice.click();

    // Assert

    await expect(welcomeTextEn).toBeVisible();
    await expect(welcomeTextEs).not.toBeVisible();
    await expect(esChoice).not.toBeVisible();
    await expect(enChoice).not.toBeVisible();
    await expect(page.getByText('Information')).toBeVisible();
    await expect(page.getByText('English selected')).toBeVisible();
  });

  test('givenClickOnLocaleButton_whenLocaleIsVisible_thenHideLocaleComponentWithChoices', async ({page}) => {
    // Arrange

    const localeButton = page.getByTitle('Language');
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

  test('GithubButtonIsIsVisible', async ({page}) => {

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

  test('MainIconIsVisible', async ({page}) => {

    // Arrange

    const mainPizzaIcon = page.getByAltText('Small Main Pizza Icon');

    // Assert

    await expect(mainPizzaIcon).toBeVisible();
  });

  test('RightSideButtonsIsVisible', async ({page}) => {
    await expect(page.getByTitle("Navigation Buttons").getByRole('listitem')).toHaveCount(5);
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

    await navMenu.click();

    const closeButton = page.getByRole('complementary').locator('p-button');
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

test.describe('User Logged In', () => {


});
