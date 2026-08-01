import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { generateUser } from '../fixtures/test-data';

test.describe('Registration', () => {
  test('new user can register successfully', async ({ page }) => {
    const user = generateUser();
    const registrationPage = new RegistrationPage(page);

    await registrationPage.registerNewUser(user);

    await registrationPage.expectRegistrationSuccess(user.username);
    expect(await registrationPage.isLoggedIn()).toBeTruthy();
  });

  test('registering with a duplicate username shows an error', async ({ page }) => {
    const user = generateUser();
    const registrationPage = new RegistrationPage(page);

    // First registration succeeds
    await registrationPage.registerNewUser(user);
    await registrationPage.expectRegistrationSuccess(user.username);
    await registrationPage.logout();

    // Second registration with the same username should fail
    await registrationPage.open();
    await registrationPage.fillForm(generateUser({ username: user.username }));
    await registrationPage.submit();

    await registrationPage.expectDuplicateUsernameError();
  });

  test('submitting with a missing required field shows a validation error', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const user = generateUser({ username: '' }); // omit required username

    await registrationPage.open();
    await registrationPage.fillForm(user);
    await registrationPage.submit();

    await registrationPage.expectRequiredFieldError();
  });
});
