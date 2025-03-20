import {expect, test} from '@playwright/test';
import {beverages, pizzas} from '../api-responses';

test.describe('Search', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/pizzas');
  });

  test('Render Search Box', async ({page}) => {
    await expect(page.getByRole('textbox', {name: 'Search Input'})).toBeVisible();
    await expect(page.getByTitle('Search Icon')).toBeVisible();
  });

  test('givenSearchText_thenShowOnlyMatches', async ({page}) => {

    // Arrange

    const search = page.getByRole('textbox', {name: 'Search Input'});

    // Act && Assert

    await search.fill('Cuatro Quesos');
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);

    await search.fill('cuatro');
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);

    await search.fill('cua');
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);

    await search.fill('ca');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(4);
    await expect(page.getByText('Cabra Loca')).toBeVisible();
    await expect(page.getByText('Carbonara')).toBeVisible();
    await expect(page.getByText('Caníbal')).toBeVisible();

    await page.goto('/beverages');
    await page.waitForURL('/beverages');
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(8);

    await search.fill('ma');
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(3);
    await expect(page.getByText('Mahou Classic')).toBeVisible();
    await expect(page.getByText('Mahou Without Alcohol')).toBeVisible();
    await expect(page.getByText('Mahou Gluten Free')).toBeVisible();

    await page.goto('/pizzas');
    await page.waitForURL('/pizzas');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(10);
  });
});
