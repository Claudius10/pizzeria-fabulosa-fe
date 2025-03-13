import {expect, test} from '@playwright/test';
import {pizzas} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
  });

  test('givenPizzasRoute_theShowSearchBox', async ({page}) => {
    await expect(page.getByPlaceholder("Search")).toBeVisible();
    await expect(page.getByTitle("Search Icon")).toBeVisible();
  });

  test('givenPizzasRoute_thenShowFiltersBox', async ({page}) => {
    await expect(page.getByTitle("Toggle Filters")).toBeVisible();
    await expect(page.getByText("Filters")).toBeVisible();
    await expect(page.getByTitle("Filters Active/Inactive")).toBeVisible();
  });

  test('showPizzaList', async ({page}) => {
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);
  });

  test('givenPizzasList_thenShowCustomPizzaItem', async ({page}) => {
    await expect(page.getByAltText('Custom Pizza Image')).toBeVisible();
    await expect(page.getByText('My Pizza')).toBeVisible();
    await expect(page.getByText('Personalize however you like!')).toBeVisible();
    await expect(page.getByTitle('Open Custom Pizza Builder').getByRole('button')).toBeVisible();
  });

  test('givenPizzasList_thenShowQuatroQuesosPizza', async ({page}) => {
    await expect(page.getByAltText('Pizza Cuatro Quesos')).toBeVisible();
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Medium'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Large'})).toBeVisible();
    await expect(page.getByText('Tomato Sauce, 100% Mozzarella, Parmesan Cheese, Emmental Cheese, Blue Cheese')).toBeVisible();
    await expect(page.getByRole('button', {name: '13.30€'})).toBeVisible();
    await expect(page.getByTitle('Add Product').getByRole('button')).toBeVisible();
    await expect(page.getByTitle("Allergens")).toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenPizzasRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/pizzas');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
