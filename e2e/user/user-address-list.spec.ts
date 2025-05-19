import {expect, test} from '@playwright/test';
import {AUTH_TOKEN_COOKIE, newUserAddressList, userAddressList} from '../api-responses';

test.describe('Render', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');
    expect(await page.title()).toEqual('Profile');
  });

  test('ShowAddressList', async ({page}) => {

    // Arrange

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});

    // Act

    await showAddressListButton.click();

    // Assert

    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await expect(page.getByTitle('Delete Address')).toBeVisible();
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
  });

  test('ShowAddressForm', async ({page}) => {

    // Arrange

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    const toggleAddressForm = page.getByTitle('Toggle Address Form');
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();

    // Act

    await toggleAddressForm.click();

    // Assert

    await expect(page.getByRole('textbox', {name: 'Address Input'})).toBeVisible();
    await expect(page.getByTitle('Address Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Address Number Input'})).toBeVisible();
    await expect(page.getByTitle('Number Icon')).toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Details Input'})).toBeVisible();
    await expect(page.getByTitle('Details icon')).toBeVisible();
    await expect(page.getByRole('button', {name: 'CANCEL'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'CONTINUE'})).toBeVisible();
  });
});

test.describe('Render: API KO', () => {
  test('ShowErrorComponent', async ({page}) => {
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);
    await page.goto('/user/profile');
    expect(await page.title()).toBe('Profile');
    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    await expect(page.getByText('Our servers are not available at the moment').first()).toBeVisible({timeout: 10_000});
    await expect(page.getByText('Please try again later. We apologize for any inconvenience.').first()).toBeVisible({timeout: 10_000});
  });
});

test.describe('Validation: Address', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');

    expect(await page.title()).toBe('Profile');

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    const toggleAddressForm = page.getByTitle('Toggle Address Form');
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
    await toggleAddressForm.click();
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressInput.fill('');
    await div.click();


    // Assert

    await expect(page.getByText('Delivery address is required')).toBeVisible();
    await expect(addressInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressInput.fill('#');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery address is required')).toBeVisible();
    await expect(addressInput).toHaveValue('#');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressInput.fill('Alustre');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery address is required')).not.toBeVisible();
    await expect(addressInput).toHaveValue('Alustre');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressInput.fill('#');
    await expect(addressInput).toHaveValue('#');
    await div.click();
    await expect(page.getByText('Delivery address is required')).toBeVisible();
    await addressInput.fill('Alustre');

    // Assert

    await expect(page.getByText('Delivery address is required')).not.toBeVisible();
    await expect(addressInput).toHaveValue('Alustre');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressInput.fill('Alustre');
    await expect(addressInput).toHaveValue('Alustre');
    await div.click();
    await expect(page.getByText('Delivery address is required')).not.toBeVisible();
    await addressInput.fill('#');

    // Assert

    await expect(page.getByText('Delivery address is required')).toBeVisible();
    await expect(addressInput).toHaveValue('#');
  });
});

test.describe('Validation: Address Number', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');

    expect(await page.title()).toBe('Profile');

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    const toggleAddressForm = page.getByTitle('Toggle Address Form');
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
    await toggleAddressForm.click();
  });

  test('whenEmpty_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressNumberInput.fill('');
    await div.click();


    // Assert

    await expect(page.getByText('Delivery number is required: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressNumberInput.fill('#');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery number is required: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('#');
  });

  test('whenTooManyDigits_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressNumberInput.fill('12345');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery number is required: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('12345');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressNumberInput.fill('15');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery number is required: four digits maximum')).not.toBeVisible();
    await expect(addressNumberInput).toHaveValue('15');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressNumberInput.fill('#');
    await expect(addressNumberInput).toHaveValue('#');
    await div.click();
    await expect(page.getByText('Delivery number is required: four digits maximum')).toBeVisible();
    await addressNumberInput.fill('12');

    // Assert

    await expect(page.getByText('Delivery number is required: four digits maximum')).not.toBeVisible();
    await expect(addressNumberInput).toHaveValue('12');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressNumberInput.fill('12');
    await expect(addressNumberInput).toHaveValue('12');
    await div.click();
    await expect(page.getByText('Delivery number is required: four digits maximum')).not.toBeVisible();
    await addressNumberInput.fill('#');

    // Assert

    await expect(page.getByText('Delivery number is required: four digits maximum')).toBeVisible();
    await expect(addressNumberInput).toHaveValue('#');
  });
});

test.describe('Validation: Address Details', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');

    expect(await page.title()).toBe('Profile');

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    const toggleAddressForm = page.getByTitle('Toggle Address Form');
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
    await toggleAddressForm.click();
  });

  test('whenEmpty_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressDetails.fill('');
    await div.click();


    // Assert

    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await expect(addressDetails).toHaveValue('');
  });

  test('whenInvalid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressDetails.fill('#');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).toBeVisible();
    await expect(addressDetails).toHaveValue('#');
  });

  test('whenValid_thenDoNotTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressDetails.fill('Floor 5, Door 2E');
    await div.click();

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
  });

  test('whenValidAfterInvalid_thenClearValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressDetails.fill('#');
    await expect(addressDetails).toHaveValue('#');
    await div.click();
    await expect(page.getByText('Delivery details input is invalid')).toBeVisible();
    await addressDetails.fill('Floor 5, Door 2E');

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
  });

  test('whenInvalidAfterValid_thenTriggerValidationError', async ({page}) => {

    // Arrange

    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});
    const div = page.getByTitle('Profile Details');

    // Act

    await addressDetails.fill('Floor 5, Door 2E');
    await expect(addressDetails).toHaveValue('Floor 5, Door 2E');
    await div.click();
    await expect(page.getByText('Delivery details input is invalid')).not.toBeVisible();
    await addressDetails.fill('#');

    // Assert

    await expect(page.getByText('Delivery details input is invalid')).toBeVisible();
    await expect(addressDetails).toHaveValue('#');
  });
});

test.describe('Submit: API OK', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');

    expect(await page.title()).toBe('Profile');

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    const toggleAddressForm = page.getByTitle('Toggle Address Form');
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
    await toggleAddressForm.click();
  });

  test('givenSubmitClick_whenEmptyForm_thenTriggerValidationErrors', async ({page}) => {

    // Arrange

    const continueButton = page.getByRole('button', {name: 'CONTINUE'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Delivery address is required')).toBeVisible();
    await expect(page.getByText('Delivery number is required: four digits maximum')).toBeVisible();
  });

  test('givenSubmitClick_whenFormIsValid_thenShowNewAddress', async ({page}) => {

    // Arrange

    await page.route('*/**/api/v1/user/1/address', async route => {
      const method = route.request().method();
      if (method === 'POST') {
        // fulfill the creation request
        await route.fulfill({status: 201});
      } else {
        // fulfill the re-fetch of the user address list after creation
        await route.fulfill({status: 200, json: newUserAddressList});
      }
    });

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');

    const continueButton = page.getByRole('button', {name: 'CONTINUE'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
    await expect(page.getByText('Address: Alustre')).toBeVisible();
    await expect(page.getByText('Address number: 15')).toBeVisible();
    await expect(page.getByText('Address details: Floor 5, Door 2E')).toBeVisible();
  });

  test('givenCancelClick_thenHideForm', async ({page}) => {

    // Arrange

    const cancel = page.getByRole('button', {name: 'CANCEL'});

    // Act

    await cancel.click();

    // Assert

    await expect(page.getByRole('textbox', {name: 'Address Input'})).not.toBeVisible();
    await expect(page.getByTitle('Address Icon')).not.toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Address Number Input'})).not.toBeVisible();
    await expect(page.getByTitle('Number Icon')).not.toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Details Input'})).not.toBeVisible();
    await expect(page.getByTitle('Details icon')).not.toBeVisible();
    await expect(page.getByRole('button', {name: 'CANCEL'})).not.toBeVisible();
    await expect(page.getByRole('button', {name: 'CONTINUE'})).not.toBeVisible();
  });

  test('givenToggleAddressClick_whenFormIsVisible_thenHideForm', async ({page}) => {

    // Arrange

    const toggle = page.getByTitle('Toggle Address Form');

    // Act

    await toggle.click();

    // Assert

    await expect(page.getByRole('textbox', {name: 'Address Input'})).not.toBeVisible();
    await expect(page.getByTitle('Address Icon')).not.toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Address Number Input'})).not.toBeVisible();
    await expect(page.getByTitle('Number Icon')).not.toBeVisible();
    await expect(page.getByRole('textbox', {name: 'Details Input'})).not.toBeVisible();
    await expect(page.getByTitle('Details icon')).not.toBeVisible();
    await expect(page.getByRole('button', {name: 'CANCEL'})).not.toBeVisible();
    await expect(page.getByRole('button', {name: 'CONTINUE'})).not.toBeVisible();
  });
});

test.describe('Submit: API KO', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    await page.route('*/**/api/v1/user/1/address', async route => {
      const method = route.request().method();
      if (method === 'POST') {
        await route.abort();
      } else {
        await route.continue();
      }
    });

    await page.goto('/user/profile');

    expect(await page.title()).toBe('Profile');

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    const toggleAddressForm = page.getByTitle('Toggle Address Form');
    await expect(page.getByTitle('Toggle Address Form')).toBeVisible();
    await toggleAddressForm.click();
  });

  test('givenSubmitClick_whenApiIsDown_thenShowErrorMessage', async ({page}) => {

    // Arrange

    const addressInput = page.getByRole('textbox', {name: 'Address Input'});
    const addressNumberInput = page.getByRole('textbox', {name: 'Address Number Input'});
    const addressDetails = page.getByRole('textbox', {name: 'Details Input'});

    await addressInput.fill('Alustre');
    await addressNumberInput.fill('15');
    await addressDetails.fill('Floor 5, Door 2E');

    const continueButton = page.getByRole('button', {name: 'CONTINUE'});

    // Act

    await continueButton.click();

    // Assert

    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Our servers are not available at the moment. Please try again later')).toBeVisible();
  });
});

test.describe('Delete', () => {
  test.beforeEach(async ({page}) => {

    // auth is automatically set inside the initializeApp fn in config.app.ts
    await page.context().addCookies([AUTH_TOKEN_COOKIE]);

    // 1 is the userId in the ID_TOKEN
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({json: userAddressList});
    });

    await page.goto('/user/profile');

    expect(await page.title()).toBe('Profile');

    const showAddressListButton = page.getByRole('button', {name: 'My address list'});
    await showAddressListButton.click();
    await expect(page.getByText('Address: En un lugar de la Mancha...')).toBeVisible();
    await expect(page.getByText('Address number: 1605')).toBeVisible();
  });

  test('givenDeleteClick_thenDeleteAddress', async ({page}) => {

    // Arrange

    // DELETE
    await page.route('*/**/api/v1/user/1/address/1', async route => {
      await route.fulfill({status: 200});
    });

    // GET after DELETE
    await page.route('*/**/api/v1/user/1/address', async route => {
      await route.fulfill({status: 204});
    });

    const deleteAddress = page.getByTitle('Delete Address');

    // Act

    await deleteAddress.click();

    // Assert

    await expect(page.getByText('Address: En un lugar de la Mancha...')).not.toBeVisible();
    await expect(page.getByText('Address number: 1605')).not.toBeVisible();
  });
});
