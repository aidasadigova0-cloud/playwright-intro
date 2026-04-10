import {test, expect, Locator} from '@playwright/test';
import playwrightConfig from "../playwright.config";

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
});

test('check GitHub, Discord and Dark Theme', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'GitHub', exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Discord', exact: true }).first()).toBeVisible();
  await expect(page.locator('[class*="colorModeToggle"]')).toBeVisible();
});


test.beforeEach(async ({ page }) => {
  const path = require('path');
  const filePath = `file://${path.resolve('html/dummy-order.html')}`;
  await page.goto(filePath);
})

