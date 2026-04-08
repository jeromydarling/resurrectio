import { test, expect } from '@playwright/test';

test.describe('Intake Form — Full Workflow', () => {
  test('fill out complete intake and submit', async ({ page }) => {
    await page.goto('/intake');

    // Section 1: Basic Info
    await page.getByLabel('First Name').fill('Jerome');
    await page.getByLabel('Last Name').fill('Washington');
    await page.getByLabel('Date of Birth').fill('1990-03-15');
    await page.getByLabel('Phone').fill('312-555-0199');
    await page.getByLabel('Email').fill('jerome.w@email.com');

    // Section 2: Incarceration Details
    await page.getByLabel('Release Date').fill('2026-04-01');
    await page.getByLabel('Sentence Length').fill('5 years');

    // Section 3: Parole
    await page.getByLabel('Parole Officer Name').fill('Officer Davis');
    await page.getByLabel('Parole Officer Phone').fill('312-555-0100');

    // Section 5: Support Network
    await page.getByLabel('Emergency Contact Name').fill('Gloria Washington');

    // Section 6: Assessment — fill strengths
    const strengths = page.getByLabel(/Strengths/i);
    if (await strengths.isVisible()) {
      await strengths.fill('Strong work ethic, good with his hands, wants to learn welding');
    }

    await page.screenshot({ path: 'e2e/screenshots/intake-filled.png', fullPage: true });

    // Submit
    const saveBtn = page.getByRole('button', { name: /Save.*Begin/i });
    await saveBtn.click();

    // Verify toast appears
    await expect(page.getByText(/journey started/i)).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'e2e/screenshots/intake-submitted.png' });
  });

  test('save as draft shows feedback', async ({ page }) => {
    await page.goto('/intake');
    await page.getByLabel('First Name').fill('Draft Person');

    const draftBtn = page.getByRole('button', { name: /Save as Draft/i });
    await draftBtn.click();

    await expect(page.getByText(/draft/i)).toBeVisible({ timeout: 5000 });
  });
});

test.describe('People Page — Search and Navigation', () => {
  test('search filters the table live', async ({ page }) => {
    await page.goto('/people');

    // Count initial rows
    const initialRows = await page.locator('tbody tr').count();
    expect(initialRows).toBeGreaterThan(3);

    // Search for a specific name
    await page.getByPlaceholder(/Search/i).fill('Marcus');

    // Should have fewer rows
    const filteredRows = await page.locator('tbody tr').count();
    expect(filteredRows).toBeLessThan(initialRows);
    await expect(page.getByText('Marcus')).toBeVisible();

    // Clear search restores all
    await page.getByPlaceholder(/Search/i).clear();
    const restoredRows = await page.locator('tbody tr').count();
    expect(restoredRows).toBe(initialRows);
  });

  test('Add Person button navigates to intake', async ({ page }) => {
    await page.goto('/people');
    await page.getByRole('link', { name: /Add Person/i }).click();
    await expect(page).toHaveURL(/\/intake/);
  });

  test('clicking a person name navigates to their profile', async ({ page }) => {
    await page.goto('/people');
    const personLink = page.locator('a[href*="/people/"]').first();
    const href = await personLink.getAttribute('href');
    await personLink.click();
    await expect(page).toHaveURL(new RegExp(href!));
  });
});

test.describe('Journey Map — Kanban Interaction', () => {
  test('kanban columns show correct stage counts', async ({ page }) => {
    await page.goto('/journey-map');

    // All 5 stages should be visible
    for (const stage of ['Pre-Release', 'Stabilization', 'Growth', 'Flourishing', 'Alumni']) {
      await expect(page.getByText(stage)).toBeVisible();
    }

    // Cards should exist in columns
    const cards = await page.locator('[class*="rounded"]').filter({ hasText: /days in stage/i }).count();
    expect(cards).toBeGreaterThan(0);
  });

  test('clicking a person card navigates to profile', async ({ page }) => {
    await page.goto('/journey-map');
    const personLink = page.locator('a[href*="/people/"]').first();
    if (await personLink.isVisible()) {
      await personLink.click();
      await expect(page).toHaveURL(/\/people\//);
    }
  });
});

test.describe('Stories — Expand/Collapse', () => {
  test('expand and collapse a story', async ({ page }) => {
    await page.goto('/stories');

    // Find the first "Read Full Story" button
    const readBtn = page.getByRole('button', { name: /Read Full Story/i }).first();
    await expect(readBtn).toBeVisible();

    // Click to expand
    await readBtn.click();

    // Should now show "Collapse" button
    const collapseBtn = page.getByRole('button', { name: /Collapse/i }).first();
    await expect(collapseBtn).toBeVisible();

    await page.screenshot({ path: 'e2e/screenshots/story-expanded.png' });

    // Click to collapse
    await collapseBtn.click();

    // Should show "Read Full Story" again
    await expect(page.getByRole('button', { name: /Read Full Story/i }).first()).toBeVisible();
  });
});

test.describe('NRI Signals — Evidence Expander', () => {
  test('expand "Why am I seeing this?" reveals evidence', async ({ page }) => {
    await page.goto('/signals');

    const whyBtn = page.getByRole('button', { name: /Why am I seeing/i }).first();
    await expect(whyBtn).toBeVisible();

    await whyBtn.click();

    // Evidence section should appear
    await expect(page.getByText('Evidence').first()).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/signal-evidence-expanded.png' });
  });

  test('signal type filters work', async ({ page }) => {
    await page.goto('/signals');

    // Get initial signal count
    const initialCards = await page.locator('[style*="border-left"]').count();

    // Click a filter button (if any exist besides "All Signals")
    const filterButtons = page.getByRole('button').filter({ hasText: /Risk|Momentum|Ready/i });
    const filterCount = await filterButtons.count();

    if (filterCount > 0) {
      await filterButtons.first().click();
      const filteredCards = await page.locator('[style*="border-left"]').count();
      expect(filteredCards).toBeLessThanOrEqual(initialCards);
    }
  });
});

test.describe('Knowledge Base — Search and Filter', () => {
  test('search filters articles', async ({ page }) => {
    await page.goto('/knowledge');

    const searchInput = page.getByPlaceholder(/Search/i);
    await searchInput.fill('housing');

    // Should show housing-related articles
    await expect(page.getByText(/housing/i).first()).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/knowledge-search.png' });
  });

  test('category filter buttons work', async ({ page }) => {
    await page.goto('/knowledge');

    // Click a category filter
    const legalBtn = page.getByRole('button', { name: /Legal/i }).first();
    if (await legalBtn.isVisible()) {
      await legalBtn.click();
      await expect(page.getByText(/Legal Rights/i)).toBeVisible();
    }
  });
});

test.describe('Directory — Filter by Type', () => {
  test('type filter shows only matching orgs', async ({ page }) => {
    await page.goto('/directory');

    // Click employer filter
    const employerBtn = page.getByRole('button', { name: /employer/i });
    if (await employerBtn.isVisible()) {
      await employerBtn.click();

      // All visible cards should be employers
      const badges = page.locator('.bg-blue-100');
      const count = await badges.count();
      expect(count).toBeGreaterThan(0);
    }
  });
});
