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

  test('givenHomePage_thenWelcomeText', async ({page}) => {
    await expect(page.getByText('Welcome to')).toBeVisible();
    await expect(page.getByText('Pizzeria Fabulosa')).toBeVisible();
  });

  test('givenHomePage_thenDisplayOffers', async ({page}) => {


    await expect(page.getByText('Discover our offers')).toBeVisible();
    await expect(page.getByText('3x2 for Pizzas')).toBeVisible();
    await expect(page.getByText('Second Pizza at half the price')).toBeVisible();
    await expect(page.getByText('Valid every day for Medium and Familiar sized Pizzas').first()).toBeVisible();
    await expect(page.getByText('Conditions').first()).toBeVisible();
    await expect(page.getByAltText('Offer Picture').nth(0)).toBeVisible();
    await expect(page.getByAltText('Offer Picture').nth(1)).toBeVisible();
  });

  test('givenHomePage_thenDisplayStores', async ({page}) => {

    await expect(page.getByText('Come by our store')).toBeVisible();
    await expect(page.getByText('Alustre', {exact: true})).toBeVisible();
    await expect(page.getByText('Avenida Alustre 15')).toBeVisible();
    await expect(page.getByText('666555666')).toBeVisible();
    await expect(page.getByText('Viciosa', {exact: true})).toBeVisible();
    await expect(page.getByText('Calle Viciosa 221')).toBeVisible();
    await expect(page.getByText('555666555')).toBeVisible();
    await expect(page.getByText('Schedule').first()).toBeVisible();
    await expect(page.getByTitle('Phone').nth(0)).toBeVisible();
    await expect(page.getByTitle('Phone').nth(1)).toBeVisible();
    await expect(page.getByTitle('Location').nth(0)).toBeVisible();
    await expect(page.getByTitle('Location').nth(1)).toBeVisible();
    await expect(page.getByAltText('Store Location on Map').nth(0)).toBeVisible();
    await expect(page.getByAltText('Store Location on Map').nth(1)).toBeVisible();
  });
});

test.describe('API KO', () => {
  test('givenHomePage_whenApiIsDown_thenDisplayServerError', async ({page}) => {
    await page.goto('/');
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});
