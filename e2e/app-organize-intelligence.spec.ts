import { test, expect } from '@playwright/test';

test.describe('Organize Group', () => {
  test('partners page shows table', async ({ page }) => {
    await page.goto('/partners');
    
    await page.screenshot({ path: 'e2e/screenshots/partners.png', fullPage: true });
  });

  test('activities timeline loads', async ({ page }) => {
    await page.goto('/activities');
    
    await page.screenshot({ path: 'e2e/screenshots/activities.png', fullPage: true });
  });

  test('territories page shows coverage', async ({ page }) => {
    await page.goto('/territories');
    
    await page.screenshot({ path: 'e2e/screenshots/territories.png', fullPage: true });
  });

  test('templates page shows library', async ({ page }) => {
    await page.goto('/templates');
    
    await page.screenshot({ path: 'e2e/screenshots/templates.png', fullPage: true });
  });

  test('document hub shows cloud connections', async ({ page }) => {
    await page.goto('/document-hub');
    
    await expect(page.getByText('Google Drive')).toBeVisible();
    await expect(page.getByText('NRI Learns How You Speak')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/document-hub.png', fullPage: true });
  });
});

test.describe('Intelligence Group', () => {
  test('NRI signals page shows signals with expand', async ({ page }) => {
    await page.goto('/signals');
    
    // Click "Why am I seeing this?" on first signal
    const whyBtn = page.getByRole('button', { name: /Why am I seeing/i }).first();
    if (await whyBtn.isVisible()) {
      await whyBtn.click();
      await expect(page.getByText('Evidence')).toBeVisible();
    }
    await page.screenshot({ path: 'e2e/screenshots/nri-signals.png', fullPage: true });
  });

  test('staff wellness shows team health', async ({ page }) => {
    await page.goto('/staff-wellness');
    
    await expect(page.getByText(/empty cup/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/staff-wellness.png', fullPage: true });
  });

  test('crisis protocols show escalation levels', async ({ page }) => {
    await page.goto('/crisis');
    
    await expect(page.getByText('Level 1')).toBeVisible();
    await expect(page.getByText('Level 2')).toBeVisible();
    await expect(page.getByText('Level 3')).toBeVisible();
    await expect(page.getByText('988')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/crisis-protocols.png', fullPage: true });
  });

  test('reports page shows report types', async ({ page }) => {
    await page.goto('/reports');
    
    await page.screenshot({ path: 'e2e/screenshots/reports.png', fullPage: true });
  });

  test('funder dashboard shows aggregate metrics', async ({ page }) => {
    await page.goto('/funder-dashboard');
    
    await expect(page.getByText('127')).toBeVisible();
    await expect(page.getByText(/aggregate data only/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/funder-dashboard.png', fullPage: true });
  });

  test('presentation mode loads', async ({ page }) => {
    await page.goto('/presentation');
    
    await page.screenshot({ path: 'e2e/screenshots/presentation-mode.png', fullPage: true });
  });

  test('garden pulse shows health score', async ({ page }) => {
    await page.goto('/garden-pulse');
    
    await expect(page.getByText('Health Score')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/garden-pulse.png', fullPage: true });
  });

  test('government compliance shows 10 systems', async ({ page }) => {
    await page.goto('/government-reports');
    
    await expect(page.getByText('WIPS / PIRL')).toBeVisible();
    await expect(page.getByText('Workforce One')).toBeVisible();
    await expect(page.getByText('Copy-Ready Worksheets')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/government-compliance.png', fullPage: true });
  });
});
