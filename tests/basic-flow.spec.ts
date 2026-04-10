import { test, expect, Locator, PlaywrightTestArgs, PlaywrightTestOptions } from "@playwright/test";

// scenarios to implement
// 1 - button disabled until inputs not filled
// 2 - all elements are visible on page open (two inputs and 1 button)
// 3 - fill username, fill correct email, click button, assert popup is visible
// 4 - failing test with empty spaces
// 5 - button disabled with fields

test.beforeEach(async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const path = require('path');
    const filepath = `file://${path.resolve('html/dummy-order.html')}`;
    await page.goto(filepath);
});

test('all elements are visible', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');
    const emailField: Locator = page.getByTestId('email');

    await expect(orderButton).toBeVisible();
    await expect(usernameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(orderButton).toBeDisabled();
});

test('fill elements and place order', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');
    const emailField: Locator = page.locator('#email');
    const popupOK: Locator = page.locator('#popup-message');

    await usernameField.fill('my-username');
    await emailField.fill('hello@google.com');
    await orderButton.click();
    await expect(popupOK).toBeVisible();
});

test('verify email field validation', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');
    const emailField: Locator = page.getByTestId('email');

    await usernameField.fill('my-username');
    await emailField.fill('hello@google'); // invalid email format

    await expect(orderButton).toBeDisabled();
});

test('verify that username is required in the flow', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const emailField: Locator = page.getByTestId('email');

    // steps - only correct email, no username
    await emailField.fill('hello@google.com');

    await expect(orderButton).toBeDisabled();
});