import { test, expect } from '@playwright/test';

test.describe('Journeys Group', () => {
  test('dashboard / command center loads', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByText("Today's Focus")).toBeVisible();
    await expect(page.getByText('People Needing Attention')).toBeVisible();
    await expect(page.getByText('Quick Actions')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/dashboard.png', fullPage: true });
  });

  test('people page shows returning citizens table', async ({ page }) => {
    await page.goto('/people');
    
    await expect(page.getByPlaceholder(/Search/i)).toBeVisible();
    await expect(page.getByText('Marcus')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/people.png', fullPage: true });
  });

  test('people page search filters results', async ({ page }) => {
    await page.goto('/people');
    
    await page.getByPlaceholder(/Search/i).fill('Marcus');
    await expect(page.getByText('Marcus')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/people-search.png' });
  });

  test('people page name links to person detail', async ({ page }) => {
    await page.goto('/people');
    
    const firstLink = page.locator('a[href*="/people/"]').first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/people\//);
    await page.screenshot({ path: 'e2e/screenshots/person-detail.png' });
  });

  test('journey map shows kanban columns', async ({ page }) => {
    await page.goto('/journey-map');
    
    await expect(page.getByText('Pre-Release')).toBeVisible();
    await expect(page.getByText('Stabilization')).toBeVisible();
    await expect(page.getByText('Growth')).toBeVisible();
    await expect(page.getByText('Flourishing')).toBeVisible();
    await expect(page.getByText('Alumni')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/journey-map.png', fullPage: true });
  });

  test('case notes shows timeline', async ({ page }) => {
    await page.goto('/case-notes');
    
    await page.screenshot({ path: 'e2e/screenshots/case-notes.png', fullPage: true });
  });

  test('milestones page loads', async ({ page }) => {
    await page.goto('/milestones');
    
    await page.screenshot({ path: 'e2e/screenshots/milestones.png', fullPage: true });
  });

  test('family page shows connections', async ({ page }) => {
    await page.goto('/family');
    
    await page.screenshot({ path: 'e2e/screenshots/family.png', fullPage: true });
  });

  test('family support page shows children wellbeing', async ({ page }) => {
    await page.goto('/family-support');
    
    await expect(page.getByText(/Families do time too/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/family-support.png', fullPage: true });
  });

  test('document recovery page loads', async ({ page }) => {
    await page.goto('/documents');
    
    await expect(page.getByText(/Photo ID/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/document-recovery.png', fullPage: true });
  });

  test('pre-release page shows facility dashboard', async ({ page }) => {
    await page.goto('/pre-release');
    
    await expect(page.getByText(/best reentry programs/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/pre-release.png', fullPage: true });
  });

  test('intake form has all sections', async ({ page }) => {
    await page.goto('/intake');
    
    await expect(page.getByText('Basic Information')).toBeVisible();
    await expect(page.getByText('Incarceration Details')).toBeVisible();
    await expect(page.getByText('Assessment Notes')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/intake-form.png', fullPage: true });
  });
});
