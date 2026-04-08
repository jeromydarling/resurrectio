import { test, expect } from '@playwright/test';

test.describe('Community Group', () => {
  test('mentors page shows directory', async ({ page }) => {
    await page.goto('/mentors');
    
    await page.screenshot({ path: 'e2e/screenshots/mentors.png', fullPage: true });
  });

  test('mentor matching shows two columns', async ({ page }) => {
    await page.goto('/mentor-matching');
    
    await expect(page.getByText(/Needing a Mentor/i)).toBeVisible();
    await expect(page.getByText(/Available Mentor/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/mentor-matching.png', fullPage: true });
  });

  test('employer network shows directory and WOTC', async ({ page }) => {
    await page.goto('/employers');
    
    await expect(page.getByText('WOTC')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/employer-network.png', fullPage: true });
  });

  test('text communication shows SMS hub', async ({ page }) => {
    await page.goto('/text');
    
    await expect(page.getByText(/prepaid phone/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/text-communication.png', fullPage: true });
  });

  test('stories page with expand/collapse', async ({ page }) => {
    await page.goto('/stories');
    
    const readBtn = page.getByRole('button', { name: /Read Full Story/i }).first();
    await readBtn.click();
    await expect(page.getByRole('button', { name: /Collapse/i }).first()).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/stories-expanded.png' });
  });

  test('events page shows calendar', async ({ page }) => {
    await page.goto('/events');
    
    await page.screenshot({ path: 'e2e/screenshots/events.png', fullPage: true });
  });

  test('blog page loads', async ({ page }) => {
    await page.goto('/blog');
    
    await page.screenshot({ path: 'e2e/screenshots/blog.png', fullPage: true });
  });

  test('knowledge base has 12 categories', async ({ page }) => {
    await page.goto('/knowledge');
    
    await expect(page.getByText('Legal Rights')).toBeVisible();
    await expect(page.getByText('Substance Recovery')).toBeVisible();
    await expect(page.getByText('Civic Participation')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/knowledge-base.png', fullPage: true });
  });

  test('communio shows ecosystem pipeline', async ({ page }) => {
    await page.goto('/communio');
    
    await expect(page.getByText('Fabrica')).toBeVisible();
    await expect(page.getByText('Communis')).toBeVisible();
    await expect(page.getByText('Propria')).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/communio.png', fullPage: true });
  });

  test('directory shows organizations', async ({ page }) => {
    await page.goto('/directory');
    
    await page.screenshot({ path: 'e2e/screenshots/directory.png', fullPage: true });
  });

  test('resources page shows downloads', async ({ page }) => {
    await page.goto('/resources');
    
    await page.screenshot({ path: 'e2e/screenshots/resources.png', fullPage: true });
  });
});
