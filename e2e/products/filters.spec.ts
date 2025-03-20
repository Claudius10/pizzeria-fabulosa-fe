import {expect, test} from '@playwright/test';
import {beverages, pizzas} from '../api-responses';

test.describe('Pizza Filters', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');
    const toggleFilters = page.getByTitle('Toggle Filters');
    await toggleFilters.click();
  });

  test('Render Filter Box', async ({page}) => {
    await expect(page.getByTitle('Filters Box')).toBeVisible();
    await expect(page.getByTitle('Toggle Filters')).toBeVisible();
    await expect(page.getByText('Filters')).toBeVisible();
    await expect(page.getByTitle('Remove All Filters')).toBeVisible();
  });

  test('Render Filters', async ({page}) => {

    // Assert

    await expect(page.getByText('Meat')).toBeVisible();
    await expect(page.getByTitle("Meat Filters").getByRole('listitem')).toHaveCount(7);


    await expect(page.getByText('Smoked Bacon', {exact: true})).toBeVisible();
    await expect(page.getByText('Double Smoked Bacon', {exact: true})).toBeVisible();
    await expect(page.getByText('Pepperoni', {exact: true})).toBeVisible();
    await expect(page.getByText('Double Pepperoni', {exact: true})).toBeVisible();
    await expect(page.getByText('Beef', {exact: true})).toBeVisible();
    await expect(page.getByText('York Ham', {exact: true})).toBeVisible();
    await expect(page.getByText('Chicken', {exact: true})).toBeVisible();

    await expect(page.getByText('Cheese', {exact: true})).toBeVisible();
    await expect(page.getByTitle("Cheese Filters").getByRole('listitem')).toHaveCount(6);

    await expect(page.getByText('Parmesan Cheese', {exact: true})).toBeVisible();
    await expect(page.getByText('Emmental Cheese', {exact: true})).toBeVisible();
    await expect(page.getByText('Blue Cheese', {exact: true})).toBeVisible();
    await expect(page.getByText('Goat Cheese', {exact: true})).toBeVisible();
    await expect(page.getByText('100% Mozzarella', {exact: true})).toBeVisible();
    await expect(page.getByText('Double 100% Mozzarella', {exact: true})).toBeVisible();

    await expect(page.getByText('Vegetable', {exact: true})).toBeVisible();
    await expect(page.getByTitle("Vegetable Filters").getByRole('listitem')).toHaveCount(6);

    await expect(page.getByText('Zucchini', {exact: true})).toBeVisible();
    await expect(page.getByText('Sliced Tomato', {exact: true})).toBeVisible();
    await expect(page.getByText('Onion', {exact: true})).toBeVisible();
    await expect(page.getByText('Mushroom', {exact: true})).toBeVisible();
    await expect(page.getByText('Eggplant', {exact: true})).toBeVisible();
    await expect(page.getByText('Black Olives', {exact: true})).toBeVisible();

    await expect(page.getByText('Sauce', {exact: true})).toBeVisible();
    await expect(page.getByTitle("Sauce Filters").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByText('Tomato Sauce', {exact: true})).toBeVisible();
    await expect(page.getByText('Cream Sauce', {exact: true})).toBeVisible();

    await expect(page.getByText('Oil', {exact: true})).toBeVisible();
    await expect(page.getByTitle("Oil Filters").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByText('White Truffle Oil', {exact: true})).toBeVisible();

    await expect(page.getByText('Allergens', {exact: true})).toBeVisible();
    await expect(page.getByTitle("Allergens Filters").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByText('Gluten', {exact: true})).toBeVisible();
    await expect(page.getByText('Lactose', {exact: true})).toBeVisible();
  });

  test('givenFiltersToggle_thenLeaveOnlyFilteredItems', async ({page}) => {

    // Arrange

    const smokedBeacon = page.getByTitle('Smoked Bacon', {exact: true});
    const pepperoni = page.getByTitle('Pepperoni', {exact: true});
    const beef = page.getByTitle('Beef', {exact: true});
    const clearAllFilters = page.getByTitle('Remove All Filters');

    // Act && Assert

    await smokedBeacon.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(4);
    await expect(page.getByTitle('Smoked Bacon On', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Smoked Bacon On', {exact: true})).toHaveCSS('background-color', 'rgb(220, 252, 231)');
    await expect(page.getByTitle('Smoked Bacon On', {exact: true})).toHaveCSS('color', 'rgb(21, 128, 61)');

    await smokedBeacon.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(7);
    await expect(page.getByTitle('Smoked Bacon Off', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Smoked Bacon Off', {exact: true})).toHaveCSS('background-color', 'rgb(254, 226, 226)');
    await expect(page.getByTitle('Smoked Bacon Off', {exact: true})).toHaveCSS('color', 'rgb(185, 28, 28)');

    await page.getByTitle('Smoked Bacon Off', {exact: true}).click();
    await expect(page.getByTitle('Smoked Bacon Off', {exact: true})).not.toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(10);

    await smokedBeacon.click();
    await expect(page.getByTitle('Smoked Bacon On', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Smoked Bacon On', {exact: true})).toHaveCSS('background-color', 'rgb(220, 252, 231)');
    await expect(page.getByTitle('Smoked Bacon On', {exact: true})).toHaveCSS('color', 'rgb(21, 128, 61)');

    await pepperoni.click();
    await expect(page.getByTitle('Pepperoni On', {exact: true})).toBeVisible();
    await expect(page.getByTitle('Pepperoni On', {exact: true})).toHaveCSS('background-color', 'rgb(220, 252, 231)');
    await expect(page.getByTitle('Pepperoni On', {exact: true})).toHaveCSS('color', 'rgb(21, 128, 61)');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(3);

    await beef.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);
    await page.getByTitle('Pepperoni On', {exact: true}).click();
    await page.getByTitle('Smoked Bacon On', {exact: true}).click();
    await page.getByTitle('Beef On', {exact: true}).click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(7);
    await clearAllFilters.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(10);
    await expect(page.getByTitle('Smoked Bacon Off', {exact: true})).not.toBeVisible();
    await expect(page.getByTitle('Pepperoni Off', {exact: true})).not.toBeVisible();
    await expect(page.getByTitle('Beef Off', {exact: true})).not.toBeVisible();
  });

  test('givenAllergensToggle_thenLeaveOnlyFilteredItems', async ({page}) => {

    // Arrange

    const gluten = page.getByTitle('Gluten', {exact: true});

    // Act && Assert

    await gluten.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(9);
    await expect(page.getByText("Gluten Free")).not.toBeVisible();

    await gluten.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);
    await expect(page.getByText("Gluten Free")).toBeVisible();

    await page.getByTitle('Gluten Off', {exact: true}).click();
    await expect(page.getByTitle('Gluten Off', {exact: true})).not.toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(10);
  });

  test('givenSearch_whenFilterOn_thenLeaveOnlyFilteredItemsThatMatchTheSearch', async ({page}) => {

    // Arrange

    const zucchini = page.getByTitle('Zucchini', {exact: true});
    const search = page.getByRole('textbox', {name: 'Search Input'});

    // Act && Assert

    await zucchini.click();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(4);
    await search.fill('na');
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);
    await expect(page.getByText('Natura')).toBeVisible();
    await zucchini.click();
    await expect(page.getByText('Natura')).not.toBeVisible();
    await expect(page.getByText('Carbonara')).toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(2);
    await zucchini.click();
    await expect(page.getByTitle('Zucchini Off', {exact: true})).not.toBeVisible();
    await expect(page.getByTitle("Pizza List").getByRole('listitem')).toHaveCount(3);
    await expect(page.getByText('Carbonara')).toBeVisible();
    await expect(page.getByText('Natura')).toBeVisible();
  });
});

test.describe('Beverage Filters', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=beverage', async route => {
      await route.fulfill({json: beverages});
    });

    await page.goto('/beverages');
    const toggleFilters = page.getByTitle('Toggle Filters');
    await toggleFilters.click();
  });

  test('Render Filters', async ({page}) => {

    // Assert

    await expect(page.getByText('Additive')).toBeVisible();
    await expect(page.getByTitle("Additive Filters").getByRole('listitem')).toHaveCount(1);

    await expect(page.getByTitle('Sugar', {exact: true})).toBeVisible();

    await expect(page.getByText('Allergens', {exact: true})).toBeVisible();
    await expect(page.getByTitle("Allergens Filters").getByRole('listitem')).toHaveCount(2);

    await expect(page.getByText('Gluten', {exact: true})).toBeVisible();
    await expect(page.getByText('Alcohol', {exact: true})).toBeVisible();
  });

  test('givenSugarFilter_thenShowFilteredItems', async ({page}) => {

    // Assert

    const sugar = page.getByTitle('Sugar', {exact: true});

    // Act && Assert

    await sugar.click();
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(4);
    await expect(page.getByText('Coca-Cola Zero')).not.toBeVisible();
    await sugar.click();
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(4);
    await expect(page.getByText('Coca-Cola Zero')).toBeVisible();
  });

  test('givenGlutenFilter_thenShowFilteredItems', async ({page}) => {

    // Assert

    const gluten = page.getByTitle('Gluten', {exact: true});

    // Act && Assert

    await gluten.click();
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(2);
    await gluten.click();
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(6);
    await expect(page.getByText('Gluten Free')).toBeVisible();
  });

  test('givenAlcoholFilter_thenShowFilteredItems', async ({page}) => {

    // Assert

    const alcohol = page.getByTitle('Alcohol', {exact: true});

    // Act && Assert

    await alcohol.click();
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(2);
    await expect(page.getByText('Mahou Classic')).toBeVisible();
    await expect(page.getByText('Mahou Gluten Free')).toBeVisible();
    await expect(page.getByText('Mahou Without Alcohol')).not.toBeVisible();
    await alcohol.click();
    await expect(page.getByText('Mahou Classic')).not.toBeVisible();
    await expect(page.getByText('Mahou Gluten Free')).not.toBeVisible();
    await expect(page.getByText('Mahou Without Alcohol')).toBeVisible();
    await expect(page.getByTitle("Beverage List").getByRole('listitem')).toHaveCount(6);
  });
});
