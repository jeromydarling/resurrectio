import { test, expect } from '@playwright/test';

test.describe('Services Group', () => {
  test('service coordination matrix loads', async ({ page }) => {
    await page.goto('/services');
    
    await page.screenshot({ path: 'e2e/screenshots/service-coordination.png', fullPage: true });
  });

  test('housing page shows placements', async ({ page }) => {
    await page.goto('/housing');
    
    await page.screenshot({ path: 'e2e/screenshots/housing.png', fullPage: true });
  });

  test('employment page shows tracking', async ({ page }) => {
    await page.goto('/employment');
    
    await page.screenshot({ path: 'e2e/screenshots/employment.png', fullPage: true });
  });

  test('resume builder has questionnaire and preview', async ({ page }) => {
    await page.goto('/resume-builder');
    
    await expect(page.getByText(/resume shouldn.*barrier/i)).toBeVisible();
    await expect(page.getByText('MARCUS JOHNSON')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/resume-builder.png', fullPage: true });
  });

  test('compliance page shows items', async ({ page }) => {
    await page.goto('/compliance');
    
    await page.screenshot({ path: 'e2e/screenshots/compliance.png', fullPage: true });
  });

  test('parole scheduler has form and calendar', async ({ page }) => {
    await page.goto('/parole-scheduler');
    
    await expect(page.getByText('Schedule New')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/parole-scheduler.png', fullPage: true });
  });

  test('programs page shows cohorts', async ({ page }) => {
    await page.goto('/programs');
    
    await page.screenshot({ path: 'e2e/screenshots/programs.png', fullPage: true });
  });

  test('transportation coordination shows ride board', async ({ page }) => {
    await page.goto('/transport');
    
    await expect(page.getByText(/rides needed/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/transport.png', fullPage: true });
  });

  test('emergency fund shows balance and disbursements', async ({ page }) => {
    await page.goto('/emergency-fund');
    
    await expect(page.getByText(/Current Balance/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/emergency-fund.png', fullPage: true });
  });
});
