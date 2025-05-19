import {expect, test} from '@playwright/test';
import {offers, stores} from '../api-responses';

test.describe('API OK', () => {
  test.beforeEach(async ({page}) => {
    await page.route('*/**/api/v1/resource/offer', async route => {
      await route.fulfill({json: offers});
    });

    await page.route('*/**/api/v1/resource/store', async route => {
      await route.fulfill({json: stores});
    });

    await page.goto('/');
  });

  test('ShowTabTitle', async ({page}) => {
    expect(await page.title()).toBe('Pizzeria Fabulosa');
  });

  test('ShowWelcomeText', async ({page}) => {
    await expect(page.getByText('Welcome to')).toBeVisible();
    await expect(page.getByText('Pizzeria Fabulosa')).toBeVisible();
  });

  test('ShowOffers', async ({page}) => {
    await expect(page.getByTitle("Offers").getByRole('listitem')).toHaveCount(2);
    await expect(page.getByText('Discover our offers')).toBeVisible();
    await expect(page.getByText('3x2 for Pizzas')).toBeVisible();
    await expect(page.getByText('Second Pizza at half the price').first()).toBeVisible();
    await expect(page.getByText('Valid every day for Medium and Familiar sized Pizzas').first()).toBeVisible();
    await expect(page.getByText('Conditions').first()).toBeVisible();
    await expect(page.getByAltText('3x2 for Pizzas Offer')).toBeVisible();
    await expect(page.getByAltText('Second Pizza at half the price Offer')).toBeVisible();
  });

  test('ShowStores', async ({page}) => {
    await expect(page.getByTitle("Stores").getByRole('listitem')).toHaveCount(2);
    await expect(page.getByText('Come by our store')).toBeVisible();
    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByText('Viciosa', {exact: true})).toBeVisible();
    await expect(page.getByText('Calle Viciosa 221')).toBeVisible();
    await expect(page.getByText('555666555')).toBeVisible();
    await expect(page.getByText('Schedule').first()).toBeVisible();
    await expect(page.getByTitle('Alustre Phone Icon')).toBeVisible();
    await expect(page.getByTitle('Viciosa Phone Icon')).toBeVisible();
    await expect(page.getByTitle('Alustre Location Icon')).toBeVisible();
    await expect(page.getByTitle('Viciosa Location Icon')).toBeVisible();
    await expect(page.getByAltText('Alustre Location on Map')).toBeVisible();
    await expect(page.getByAltText('Viciosa Location on Map')).toBeVisible();
  });
});

test.describe('Skeletons', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('ShowOfferSkeletons', async ({page}) => {
    await expect(page.getByTitle("Offers").getByRole('listitem')).toHaveCount(2);
  });

  test('ShowOStoreSkeletons', async ({page}) => {
    await expect(page.getByTitle("Stores").getByRole('listitem')).toHaveCount(2);
  });
});

test.describe('API KO', () => {
  test('givenHomePage_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
