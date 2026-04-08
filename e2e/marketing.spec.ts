import { test, expect } from '@playwright/test';

test.describe('Marketing Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
  });

  test('loads hero section with headline and CTAs', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('From Incarceration to Restoration');
    await expect(page.getByRole('link', { name: /Start Your/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Try the Demo/i })).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/marketing-hero.png', fullPage: false });
  });

  test('has all major sections', async ({ page }) => {
    // Problem stats
    await expect(page.getByText('600K+')).toBeVisible();
    await expect(page.getByText('67%')).toBeVisible();

    // Human cost section
    await expect(page.getByText('The Human Cost of the Wrong Tools')).toBeVisible();

    // Solution
    await expect(page.getByText('People, Not Cases')).toBeVisible();

    // Features
    await expect(page.getByText('Everything Your Organization Needs')).toBeVisible();

    // Built for the Real Work
    await expect(page.getByText('Built for the Real Work')).toBeVisible();

    await page.screenshot({ path: 'e2e/screenshots/marketing-sections.png', fullPage: true });
  });

  test('has pricing section with three tiers', async ({ page }) => {
    const pricing = page.locator('#pricing');
    await pricing.scrollIntoViewIfNeeded();
    await expect(page.getByText('Everyone Gets the Full Platform')).toBeVisible();
    await expect(page.getByText('Seedling')).toBeVisible();
    await expect(page.getByText('Growing')).toBeVisible();
    await expect(page.getByText('Coalition')).toBeVisible();
    await expect(page.getByText('$29')).toBeVisible();
    await expect(page.getByText('$79')).toBeVisible();
    await expect(page.getByText('$149')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/marketing-pricing.png' });
  });

  test('has voices of restoration with real quotes', async ({ page }) => {
    await expect(page.getByText('Voices of Restoration')).toBeVisible();
    await expect(page.getByText('Bryan Stevenson')).toBeVisible();
    await expect(page.getByText('Pope Francis')).toBeVisible();
    await expect(page.getByText('Chuck Colson')).toBeVisible();
  });

  test('has government compliance section', async ({ page }) => {
    await expect(page.getByText('Government Reporting, Handled')).toBeVisible();
    await expect(page.getByText('WIPS / PIRL')).toBeVisible();
    await expect(page.getByText('Workforce One')).toBeVisible();
  });

  test('has FAQ section', async ({ page }) => {
    await expect(page.getByText('Frequently Asked Questions')).toBeVisible();
    await expect(page.getByText('Bonterra Apricot')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.getByRole('link', { name: 'Try Demo' }).click();
    await expect(page).toHaveURL(/\/demo/);
  });

  test('footer has legal links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'Terms' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Privacy' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Security' })).toBeVisible();
  });
});
