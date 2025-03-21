import {expect, test} from '@playwright/test';
import {fatalError} from '../api-responses';

test.describe('Render: Large Screen', () => {
  test('givenUnknownRoute_thenShow404Page', async ({page}) => {
    await page.goto('random');
    await expect(page.getByText('You have reached a dead-end')).toBeVisible();
  });

  test('givenUserRoute_whenNoAuthToken_thenShow403Page', async ({page}) => {
    await page.goto('user/profile');
    await expect(page.getByText('Access denied: ensure you are logged-in and have the sufficient privileges to access this page')).toBeVisible();
  });

  test('givenFatalError_thenShowErrorPage', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: fatalError});
    });

    await page.goto('/pizzas');
    await page.waitForURL('/error');

    await expect(page.getByText('An unexpected error(s) has occurred')).toBeVisible();
    await expect(page.getByText('We apologize for any inconvenience. Please try again later.')).toBeVisible();

    await expect(page.getByText('Path')).toBeVisible();
    await expect(page.getByRole('button', {name: '/api/v1/resource/product'})).toBeVisible();

    await expect(page.getByText('Origin')).toBeVisible();
    await expect(page.getByRole('button', {name: 'G.E.H.unknownException'})).toBeVisible();

    await expect(page.getByText('Cause')).toBeVisible();
    await expect(page.getByRole('button', {name: 'FatalBeanException'})).toBeVisible();

    await expect(page.getByText('Message')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Not implemented yet'})).toBeVisible();

    await expect(page.getByText('Logged')).toBeVisible();
    await expect(page.getByRole('button', {name: 'True'}).first()).toBeVisible();

    await expect(page.getByText('Fatal', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'True'}).nth(1)).toBeVisible();
  });
});

test.describe('Render: Small Screen', () => {
  test.use({viewport: {width: 360, height: 760}});

  test('givenUnknownRoute_thenShow404Page', async ({page}) => {
    await page.goto('random');
    await expect(page.getByText('You have reached a dead-end')).toBeVisible();
  });

  test('givenUserRoute_whenNoAuthToken_thenShow403Page', async ({page}) => {
    await page.goto('user/profile');
    await expect(page.getByText('Access denied: ensure you are logged-in and have the sufficient privileges to access this page')).toBeVisible();
  });

  test('givenFatalError_thenShowErrorPage', async ({page}) => {

    await page.route('*/**/api/v1/resource/product?type=pizza', async route => {
      await route.fulfill({json: fatalError});
    });

    await page.goto('/pizzas');
    await page.waitForURL('/error');

    await expect(page.getByText('An unexpected error(s) has occurred')).toBeVisible();
    await expect(page.getByText('We apologize for any inconvenience. Please try again later.')).toBeVisible();

    await expect(page.getByText('Path')).toBeVisible();
    await expect(page.getByRole('button', {name: '/api/v1/resource/product'})).toBeVisible();

    await expect(page.getByText('Origin')).toBeVisible();
    await expect(page.getByRole('button', {name: 'G.E.H.unknownException'})).toBeVisible();

    await expect(page.getByText('Cause')).toBeVisible();
    await expect(page.getByRole('button', {name: 'FatalBeanException'})).toBeVisible();

    await expect(page.getByText('Message')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Not implemented yet'})).toBeVisible();

    await expect(page.getByText('Logged')).toBeVisible();
    await expect(page.getByRole('button', {name: 'True'}).first()).toBeVisible();

    await expect(page.getByText('Fatal', {exact: true})).toBeVisible();
    await expect(page.getByRole('button', {name: 'True'}).nth(1)).toBeVisible();
  });
});
