import { test, expect } from '@playwright/test';

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