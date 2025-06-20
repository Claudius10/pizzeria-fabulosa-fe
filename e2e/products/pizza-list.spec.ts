import {expect, test} from '@playwright/test';
import {pizzas, pizzasPageTwo} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
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
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);
  });

  test('ShowCustomPizzaItem', async ({page}) => {
    await expect(page.getByAltText('Custom Pizza Image')).toBeVisible();
    await expect(page.getByText('My Pizza')).toBeVisible();
    await expect(page.getByText('Personalize however you like!')).toBeVisible();
    await expect(page.getByTitle('Open Custom Pizza Builder').getByRole('button')).toBeVisible();
  });

  test('ShowItem', async ({page}) => {
    await expect(page.getByRole('img', {name: 'Gluten Free Image'})).toBeVisible();
    await expect(page.getByText('Gluten Free')).toBeVisible();
    await expect(page.getByText('Tomato Sauce, 100% Mozzarella, York Ham, Smoked Bacon, Pepperoni', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Gluten Free Details').getByRole('button')).toBeVisible();
  });

  test('ShowItemDetails', async ({page}) => {

    // Arrange

    const details = page.getByTitle('Gluten Free Details').getByRole('button');
    const closeButton = page.getByLabel('Gluten Free').locator('div').filter({hasText: 'Gluten Free'}).getByRole('button');

    // Act

    await details.click();

    // Assert

    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).toBeVisible();
    await expect(page.getByLabel('Gluten Free').getByText('Gluten Free')).toBeVisible();
    await expect(closeButton).toBeVisible();
    await expect(page.getByLabel('Gluten Free').getByRole('img', {name: 'Gluten Free Image'})).toBeVisible();
    await expect(page.getByTitle('Ingredients', {exact: true}).getByText('Tomato Sauce, 100% Mozzarella, York Ham, Smoked Bacon, Pepperoni')).toBeVisible();
    await expect(page.getByTitle('Allergens Warning Icon')).toBeVisible();
    await expect(page.getByText('This product contains the following allergens')).toBeVisible();
    await expect(page.getByText('Lactose', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Medium'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Large'})).toBeVisible();
    await expect(page.getByRole('button', {name: '14.75€'})).toBeVisible();
    await expect(page.getByLabel('Gluten Free').getByRole('button', {name: 'ADD'})).toBeVisible();

    await closeButton.click();
    await expect(page.getByRole('dialog', {name: 'Gluten Free'})).not.toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('givenPageTwo_fromPageOne_thenShowItems', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=1&pageSize=7', async route => {
      await route.fulfill({json: pizzasPageTwo});
    });

    await page.goto('/pizzas');
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);

    await page.getByRole('button', {name: 'Page 2'}).click();
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas?page=2');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);
  });

  test('givenPageOne_fromPageTwo_thenShowItems', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=1&pageSize=7', async route => {
      await route.fulfill({json: pizzasPageTwo});
    });

    await page.goto('/pizzas');
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);

    await page.getByRole('button', {name: 'Page 2'}).click();
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas?page=2');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);

    await page.getByRole('button', {name: 'Page 1'}).click();
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas?page=1');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);
  });
});

test.describe('Skeletons', () => {
  test('givenPageOne_thenShowSkeletons', async ({page}) => {
    await page.goto('/pizzas?page=1');
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas?page=1');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);
  });

  test('givenPageTwo_thenShowSkeletons', async ({page}) => {
    await page.goto('/pizzas?page=2');
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas?page=2');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);
  });

  test('givenPageTwo_fromPageOne_thenShowSkeletons', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=0&pageSize=7', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);

    await page.getByRole('button', {name: 'Page 2'}).click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);

  });

  test('givenPageOne_fromPageTwo_thenShowSkeletons', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza&pageNumber=1&pageSize=7', async route => {
      await route.fulfill({json: pizzasPageTwo});
    });

    await page.goto('/pizzas?page=2');
    expect(page.url()).toEqual('http://127.0.0.1:4200/pizzas?page=2');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);

    await page.getByRole('button', {name: 'Page 1'}).click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(8);
  });
});

test.describe('API KO', () => {
  test('givenPizzasRoute_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/pizzas');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
