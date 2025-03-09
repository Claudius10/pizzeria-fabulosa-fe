import {expect, test} from '@playwright/test';


test('givenHomeRoute_thenHavePageTitle', async ({page}) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Pizzeria Fabulosa/);
});


test('givenClickOnLocaleIcon_thenShowTheLocaleComponentWithChoices', async ({page}) => {
  await page.goto('/');

  const localeButton = page.getByTestId('LocaleButton');
  const localeContainer = page.getByTestId('LocaleContainer');

  localeButton.click();

  await expect(localeContainer).toBeVisible();
});
