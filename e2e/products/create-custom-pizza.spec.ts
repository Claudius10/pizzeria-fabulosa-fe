import {expect, test} from '@playwright/test';
import {pizzas} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const openCustomPizza = page.getByTitle('Open Custom Pizza Builder').getByRole(`button`);
    await openCustomPizza.click();
  });

  test('ShowHeader', async ({page}) => {
    await expect(page.getByLabel('Personalize however you like!').getByText('Personalize however you like!')).toBeVisible();
  });

  test('ShowTheEssentials', async ({page}) => {
    await expect(page.getByText('The Essentials')).toBeVisible();

    await expect(page.getByText('Size')).toBeVisible();
    await expect(page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Medium'})).toBeVisible();
    await expect(page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Large'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Gluten free'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Gluten free'})).toBeDisabled();
    await expect(page.getByRole('button', {name: 'Lactose free'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Lactose free'})).toBeDisabled();
    await expect(page.getByText('Base sauce layer')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Tomato Sauce'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Cream Sauce'})).toBeVisible();
    await expect(page.getByText('Base cheese layer', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: '100% Mozzarella', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Double 100% Mozzarella'})).toBeVisible();
    await expect(page.getByText('Allergens').first()).toBeVisible();
  });

  test('ShowIngredients', async ({page}) => {
    await expect(page.getByText('Ingredients')).toBeVisible();

    await expect(page.getByText('Meat')).toBeVisible();

    await expect(page.getByRole('button', {name: 'Smoked Bacon', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Double Smoked Bacon'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Pepperoni', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Double Pepperoni', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Beef', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'York Ham', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Chicken', exact: true})).toBeVisible();

    await expect(page.getByText('Cheese', {exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: 'Parmesan Cheese', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Emmental Cheese'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Goat Cheese', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Blue Cheese', exact: true})).toBeVisible();

    await expect(page.getByText('Vegetable')).toBeVisible();

    await expect(page.getByRole('button', {name: 'Zucchini', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Sliced Tomato'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Onion', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Mushroom', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Eggplant', exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Black Olives', exact: true})).toBeVisible();

    await expect(page.getByText('Oil', {exact: true})).toBeVisible();

    await expect(page.getByRole('button', {name: 'White Truffle Oil', exact: true})).toBeVisible();
  });

  test('ShowAllergens', async ({page}) => {
    await expect(page.getByTitle('Allergens').getByText('Allergens')).toBeVisible();
    await expect(page.getByText('Gluten', {exact: true})).toBeVisible();
  });

  test('ShowActionButtons', async ({page}) => {
    await expect(page.getByRole('button', {name: 'RESET'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'ADD'})).toBeVisible();
  });

  test('ShowInformativeButtons', async ({page}) => {
    await expect(page.getByRole('button', {name: '0.00€'})).toBeVisible();
    await expect(page.getByRole('button', {name: '0/9'})).toBeVisible();
  });
});

test.describe('Interaction: The Essentials', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: pizzas});
    });

    await page.goto('/pizzas');

    const openCustomPizza = page.getByTitle('Open Custom Pizza Builder').getByRole(`button`);
    await openCustomPizza.click();
    const medium = page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Medium'});
    await medium.click();
    await expect(medium).toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('givenLargeSizeSelect_thenUpdatePrice', async ({page}) => {

    // Arrange

    const large = page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Large'});
    await expect(page.getByRole('button', {name: '0.00€'})).toBeVisible();

    // Act

    await large.click();

    // Assert

    await expect(page.getByRole('button', {name: '14.00€'})).toBeVisible();
    await expect(large).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Medium'})).not.toHaveCSS('color', 'rgb(249, 115, 22)');
  });


  test('givenMediumSizeSelect_whenLarge_thenUpdatePrice', async ({page}) => {

    // Arrange

    const medium = page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Medium'});
    const large = page.getByLabel('Personalize however you like!').getByRole('button', {name: 'Large'});
    await expect(page.getByRole('button', {name: '0.00€'})).toBeVisible();
    await large.click();
    await expect(page.getByRole('button', {name: '14.00€'})).toBeVisible();

    // Act

    await medium.click();

    // Assert

    await expect(medium).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(large).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByRole('button', {name: '11.00€'})).toBeVisible();
  });

  test('Base Sauce Interactions', async ({page}) => {

    // Arrange

    const tomatoSauce = page.getByRole('button', {name: 'Tomato Sauce'});
    const creamSauce = page.getByRole('button', {name: 'Cream Sauce'});

    // Act && Assert

    await creamSauce.click();
    await expect(creamSauce).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(tomatoSauce).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await tomatoSauce.click();
    await expect(tomatoSauce).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(creamSauce).not.toHaveCSS('color', 'rgb(249, 115, 22)');
  });

  test('Base Cheese Interactions', async ({page}) => {

    // Arrange

    const mozzarella = page.getByRole('button', {name: '100% Mozzarella', exact: true});
    const doubleMozzarella = page.getByRole('button', {name: 'Double 100% Mozzarella'});

    // Act && Assert

    await doubleMozzarella.click();
    await expect(mozzarella).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(doubleMozzarella).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByText('Lactose', {exact: true})).toBeVisible();
    await mozzarella.click();
    await expect(mozzarella).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(doubleMozzarella).not.toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(page.getByText('Lactose', {exact: true})).toBeVisible();
  });

  test('givenCheeseSelected_whenLactoseFreeSelected_thenRemoveLactoseAndDisableCheeseAndUpdatePrice', async ({page}) => {

    // Arrange

    const mozzarella = page.getByRole('button', {name: '100% Mozzarella', exact: true});
    const lactoseFree = page.getByRole('button', {name: 'Lactose free'});
    const lactoseAllergen = page.getByText('Lactose', {exact: true});

    const parmesan = page.getByRole('button', {name: 'Parmesan Cheese', exact: true});
    const emmental = page.getByRole('button', {name: 'Emmental Cheese'});
    const goat = page.getByRole('button', {name: 'Goat Cheese', exact: true});
    const blue = page.getByRole('button', {name: 'Blue Cheese', exact: true});
    await expect(page.getByRole('button', {name: '11.00€'})).toBeVisible();
    await expect(mozzarella).toHaveCSS('color', 'rgb(249, 115, 22)');

    // Act

    await expect(lactoseAllergen).toBeVisible();
    await parmesan.click();
    await emmental.click();
    await expect(emmental).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(parmesan).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(lactoseAllergen).toBeVisible();
    await lactoseFree.click();

    // Assert

    await expect(page.getByRole('button', {name: '13.00€'})).toBeVisible();
    await expect(lactoseAllergen).not.toBeVisible();
    await expect(parmesan).toBeDisabled();
    await expect(emmental).toBeDisabled();
    await expect(goat).toBeDisabled();
    await expect(blue).toBeDisabled();
  });

  test('givenNoBaseCheeseSelected_whenCreamSauceOrCheeseSelected_thenAddLactose', async ({page}) => {

    // Arrange

    const mozzarella = page.getByRole('button', {name: '100% Mozzarella', exact: true});
    const lactoseFree = page.getByRole('button', {name: 'Lactose free'});
    const lactoseAllergen = page.getByText('Lactose', {exact: true});

    const parmesan = page.getByRole('button', {name: 'Parmesan Cheese', exact: true});
    const emmental = page.getByRole('button', {name: 'Emmental Cheese'});
    const goat = page.getByRole('button', {name: 'Goat Cheese', exact: true});
    const blue = page.getByRole('button', {name: 'Blue Cheese', exact: true});
    await expect(page.getByRole('button', {name: '11.00€'})).toBeVisible();
    await expect(mozzarella).toHaveCSS('color', 'rgb(249, 115, 22)');

    // Act

    await expect(lactoseAllergen).toBeVisible();
    await parmesan.click();
    await emmental.click();
    await expect(emmental).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(parmesan).toHaveCSS('color', 'rgb(249, 115, 22)');
    await expect(lactoseAllergen).toBeVisible();
    await lactoseFree.click();

    // Assert

    await expect(page.getByRole('button', {name: '13.00€'})).toBeVisible();
    await expect(lactoseAllergen).not.toBeVisible();
    await expect(parmesan).toBeDisabled();
    await expect(emmental).toBeDisabled();
    await expect(goat).toBeDisabled();
    await expect(blue).toBeDisabled();
  });
});
