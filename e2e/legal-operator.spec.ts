import { test, expect } from '@playwright/test';

test.describe('Legal Pages', () => {
  test('terms of service loads', async ({ page }) => {
    await page.goto('/terms');
    
    await expect(page.getByText('Terms of Service')).toBeVisible();
    await expect(page.getByText('Data Ownership')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/terms.png', fullPage: true });
  });

  test('privacy policy loads with regulatory sections', async ({ page }) => {
    await page.goto('/privacy');
    
    await expect(page.getByText('Privacy Policy')).toBeVisible();
    await expect(page.getByText('42 CFR Part 2')).toBeVisible();
    await expect(page.getByText('CJIS')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/privacy.png', fullPage: true });
  });

  test('data security page shows active vs roadmap', async ({ page }) => {
    await page.goto('/security');
    
    await expect(page.getByText('Data Security & Compliance')).toBeVisible();
    await expect(page.getByText('Active')).toBeVisible();
    await expect(page.getByText('Roadmap')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/data-security.png', fullPage: true });
  });
});

test.describe('Operator Console', () => {
  test('operator overview loads', async ({ page }) => {
    await page.goto('/operator/overview');
    
    await expect(page.getByText('Gardener Console')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/operator-overview.png', fullPage: true });
  });

  test('operator ministries page loads', async ({ page }) => {
    await page.goto('/operator/ministries');
    
    await page.screenshot({ path: 'e2e/screenshots/operator-ministries.png', fullPage: true });
  });

  test('operator settings loads', async ({ page }) => {
    await page.goto('/operator/settings');
    
    await page.screenshot({ path: 'e2e/screenshots/operator-settings.png', fullPage: true });
  });
});

test.describe('Navigation & Sidebar', () => {
  test('sidebar shows all 5 nav groups', async ({ page }) => {
    await page.goto('/dashboard');
    
    // On desktop, sidebar should be visible
    await expect(page.getByText('Journeys')).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Community')).toBeVisible();
    await expect(page.getByText('Organize')).toBeVisible();
    await expect(page.getByText('Intelligence')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/sidebar.png' });
  });

  test('sidebar navigation works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Click Journeys group to expand
    await page.getByText('Journeys').click();
    await page.getByRole('link', { name: 'People' }).click();
    await expect(page).toHaveURL(/\/people/);
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    
    await expect(page.getByText('404')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/404.png' });
  });
});
