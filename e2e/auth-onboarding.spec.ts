import { test, expect } from '@playwright/test';

test.describe('Authentication & Onboarding', () => {
  test('login page renders with form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Resurrectio')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/login.png' });
  });

  test('login navigates to dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    await page.screenshot({ path: 'e2e/screenshots/login-redirect.png' });
  });

  test('signup page renders with form', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByLabel('Organization Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/signup.png' });
  });

  test('onboarding shows 5-step flow', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page.getByText('Welcome to Resurrectio')).toBeVisible();
    // Step indicators should be visible
    await page.screenshot({ path: 'e2e/screenshots/onboarding-step1.png' });

    // Click continue to step 2
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText('About Your Organization')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/onboarding-step2.png' });
  });

  test('demo gate page renders', async ({ page }) => {
    await page.goto('/demo');
    
    await page.screenshot({ path: 'e2e/screenshots/demo-gate.png' });
  });
});
