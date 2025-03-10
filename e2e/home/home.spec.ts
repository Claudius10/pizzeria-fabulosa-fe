import {expect, test} from '@playwright/test';

test('givenHomePage_thenDisplayOffers', async ({page}) => {
  await page.route('*/**/api/v1/resource/offer', async route => {
    const json = {
      "timeStamp": "2025-03-09T19:37:30.463882738",
      "status": {"code": 200, "description": "OK", "error": false},
      "payload": [{
        "id": 1,
        "image": "/assets/offers/offer.jpeg",
        "name": {"es": "3x2 en Pizzas", "en": "3x2 for Pizzas"},
        "description": {
          "es": "Válida todos los días en Pizzas Medianas y Familiares",
          "en": "Valid every day for Medium and Familiar sized Pizzas"
        },
        "caveat": {
          "es": "Cualquiera especialidad o hasta 4 ingredientes",
          "en": "Any specialty or up to 4 ingredients"
        }
      }, {
        "id": 2,
        "image": "/assets/offers/offer.jpeg",
        "name": {"es": "2ª Pizza al 50%", "en": "Second Pizza at half the price"},
        "description": {
          "es": "Válida todos los días en Pizzas Medianas y Familiares",
          "en": "Valid every day for Medium and Familiar sized Pizzas"
        },
        "caveat": {
          "es": "Cualquiera especialidad o hasta 4 ingredientes",
          "en": "Any specialty or up to 4 ingredients"
        }
      }],
      "error": null
    };
    await route.fulfill({json});
  });
  // Go to the page
  await page.goto('/');

  const offerItem = page.getByTestId('OfferItem');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('3x2 for Pizzas')).toBeVisible();
  await expect(page.getByText('Second Pizza at half the price')).toBeVisible();
});
