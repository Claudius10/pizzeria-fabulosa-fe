import {expect, test} from '@playwright/test';
import {beverages, pizzas, pizzasPageTwo} from '../api-responses';

test.describe('Search', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=1&pageSize=7', async route => {
      await route.fulfill({json: pizzasPageTwo});
    });

    await page.route('*/**/api/v1/resource/product?type=beverage&pageNumber=0&pageSize=8', async route => {
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
    const pageTwo = page.getByRole('button', {name: 'Page 2'});

    // Act

    await pageTwo.click();
    await expect(page.url()).toBe('http://192.168.1.128:4200/pizzas?page=2');

    // Assert

    await search.fill('Cuatro Quesos');
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(1);

    await search.fill('cuatro');
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(1);

    await search.fill('cua');
    await expect(page.getByText('Cuatro Quesos')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(1);

    await search.fill('ca');
    await expect(page.getByText('No Results')).toBeVisible();

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
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);
  });
});
