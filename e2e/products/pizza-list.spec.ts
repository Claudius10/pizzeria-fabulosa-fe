import {expect, test} from '@playwright/test';
import {pizzas} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Pizzas');
  });

  test('ShowSearchBox', async ({page}) => {
    await expect(page.getByPlaceholder("Search")).toBeVisible();
    await expect(page.getByTitle("Search Icon")).toBeVisible();
  });

  test('ShowFiltersBox', async ({page}) => {
    await expect(page.getByTitle("Toggle Filters")).toBeVisible();
    await expect(page.getByText("Filters")).toBeVisible();
    await expect(page.getByTitle("Remove All Filters")).toBeVisible();
  });

  test('showPizzaList', async ({page}) => {
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(10);
  });

  test('ShowCustomPizzaItem', async ({page}) => {
    await expect(page.getByAltText('Custom Pizza Image')).toBeVisible();
    await expect(page.getByText('My Pizza')).toBeVisible();
    await expect(page.getByText('Personalize however you like!')).toBeVisible();
    await expect(page.getByTitle('Open Custom Pizza Builder').getByRole('button')).toBeVisible();
  });

  test('ShowCuatroQuesosPizza', async ({page}) => {
    await expect(page.getByAltText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Medium'}).first()).toBeVisible();
    await expect(page.getByRole('button', {name: 'Large'}).first()).toBeVisible();
    await expect(page.getByText('Tomato Sauce, 100% Mozzarella, Parmesan Cheese, Emmental Cheese, Blue Cheese')).toBeVisible();
    await expect(page.getByRole('button', {name: '13.30€'}).first()).toBeVisible();
    await expect(page.getByTitle('Add Cuatro Quesos').getByRole('button')).toBeVisible();
    await expect(page.getByTitle("Cuatro Quesos Allergens")).toBeVisible();
  });

  test('ShowAllergens', async ({page}) => {

    // Arrange

    const allergens = page.getByTitle("Cuatro Quesos Allergens");
    const close = page.getByRole('dialog', {name: 'ALLERGENS'}).getByRole('button');

    // Act && Assert

    await allergens.click();
    await expect(page.getByRole('dialog', {name: 'ALLERGENS'})).toBeVisible();
    await expect(page.getByText('ALLERGENS', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Allergens Warning Icon')).toBeVisible();
    await expect(page.getByText('This product contains the following allergens')).toBeVisible();
    await expect(page.getByText('Gluten', {exact: true})).toBeVisible();
    await expect(page.getByText('Lactose')).toBeVisible();

    await close.click();
    await expect(page.getByRole('dialog', {name: 'ALLERGENS'})).not.toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenPizzasRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/pizzas');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
