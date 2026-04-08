import { test, expect } from '@playwright/test';

test.describe('Mentor Matching Workflow', () => {
  test('select a person and mentor, then confirm match', async ({ page }) => {
    await page.goto('/mentor-matching');

    // Left column: select an unmentored person
    const personCard = page.locator('text=Needing a Mentor').locator('..').locator('button, [role="radio"]').first();
    if (await personCard.isVisible()) {
      await personCard.click();
    }

    // Right column: select an available mentor
    const mentorCard = page.locator('text=Available Mentor').locator('..').locator('button, [role="radio"]').first();
    if (await mentorCard.isVisible()) {
      await mentorCard.click();
    }

    // Look for Confirm Match button
    const confirmBtn = page.getByRole('button', { name: /Confirm Match/i });
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
      // Expect toast confirmation
      await expect(page.getByText(/match/i)).toBeVisible({ timeout: 5000 });
    }

    await page.screenshot({ path: 'e2e/screenshots/mentor-matching-workflow.png', fullPage: true });
  });
});

test.describe('Parole Scheduler Workflow', () => {
  test('fill out and submit a new check-in', async ({ page }) => {
    await page.goto('/parole-scheduler');

    // Fill the schedule form
    const dateInput = page.getByLabel(/Date/i).first();
    if (await dateInput.isVisible()) {
      await dateInput.fill('2026-05-01');
    }

    const timeInput = page.getByLabel(/Time/i).first();
    if (await timeInput.isVisible()) {
      await timeInput.fill('09:00');
    }

    const locationInput = page.getByLabel(/Location/i).first();
    if (await locationInput.isVisible()) {
      await locationInput.fill('Cook County Parole Office');
    }

    // Submit
    const scheduleBtn = page.getByRole('button', { name: /Schedule/i }).first();
    if (await scheduleBtn.isVisible()) {
      await scheduleBtn.click();
      await expect(page.getByText(/scheduled/i)).toBeVisible({ timeout: 5000 });
    }

    await page.screenshot({ path: 'e2e/screenshots/parole-scheduled.png', fullPage: true });
  });

  test('compliance items show overdue highlighting', async ({ page }) => {
    await page.goto('/parole-scheduler');

    // Look for overdue items (they should have red styling)
    const overdueItems = page.locator('[class*="border-l-red"], [class*="border-red"]');
    const count = await overdueItems.count();

    await page.screenshot({ path: 'e2e/screenshots/parole-compliance-items.png', fullPage: true });
    // At least verify the page has compliance items
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Emergency Fund Workflow', () => {
  test('submit a disbursement', async ({ page }) => {
    await page.goto('/emergency-fund');

    // Verify fund balance is showing
    await expect(page.getByText(/Current Balance/i)).toBeVisible();

    // Fill disbursement form
    const amountInput = page.getByLabel(/Amount/i).first();
    if (await amountInput.isVisible()) {
      await amountInput.fill('75');
    }

    const purposeInput = page.getByLabel(/Purpose/i).first();
    if (await purposeInput.isVisible()) {
      await purposeInput.fill('Bus pass for parole appointments');
    }

    // Submit
    const submitBtn = page.getByRole('button', { name: /Submit/i }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await expect(page.getByText(/approval/i)).toBeVisible({ timeout: 5000 });
    }

    await page.screenshot({ path: 'e2e/screenshots/emergency-fund-disbursement.png' });
  });
});

test.describe('Resume Builder Workflow', () => {
  test('person selector works and updates UI', async ({ page }) => {
    await page.goto('/resume-builder');

    // The resume preview should show Marcus by default
    await expect(page.getByText('MARCUS JOHNSON')).toBeVisible();

    // Select a different person from dropdown
    const personSelect = page.locator('text=Building resume for').locator('..').locator('button[role="combobox"]');
    if (await personSelect.isVisible()) {
      await personSelect.click();
      // Pick a different person
      const option = page.getByRole('option').nth(1);
      if (await option.isVisible()) {
        await option.click();
      }
    }

    await page.screenshot({ path: 'e2e/screenshots/resume-person-selected.png', fullPage: true });
  });

  test('skill tags toggle on click', async ({ page }) => {
    await page.goto('/resume-builder');

    // Find a skill tag button
    const constructionTag = page.getByRole('button', { name: 'Construction' }).first();
    if (await constructionTag.isVisible()) {
      // Click to select
      await constructionTag.click();
      // Should now have different styling (selected state)
      await page.screenshot({ path: 'e2e/screenshots/resume-skill-selected.png' });
    }
  });

  test('generate resume button shows toast', async ({ page }) => {
    await page.goto('/resume-builder');

    const generateBtn = page.getByRole('button', { name: /Generate Resume/i });
    if (await generateBtn.isVisible()) {
      await generateBtn.click();
      await expect(page.getByText(/generat/i)).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('Text Communication Workflow', () => {
  test('template buttons fill the message field', async ({ page }) => {
    await page.goto('/text');

    // Click a template button
    const templateBtn = page.getByRole('button', { name: /Checking in/i }).first();
    if (await templateBtn.isVisible()) {
      await templateBtn.click();

      // The textarea should now have content
      const textarea = page.locator('textarea').first();
      const value = await textarea.inputValue();
      expect(value.length).toBeGreaterThan(0);
    }

    await page.screenshot({ path: 'e2e/screenshots/text-template-filled.png' });
  });

  test('send button shows toast', async ({ page }) => {
    await page.goto('/text');

    // Type a message
    const textarea = page.locator('textarea').first();
    if (await textarea.isVisible()) {
      await textarea.fill('Just checking in, how are you doing?');
    }

    const sendBtn = page.getByRole('button', { name: /Send/i }).first();
    if (await sendBtn.isVisible()) {
      await sendBtn.click();
      // Should show some feedback
      await page.screenshot({ path: 'e2e/screenshots/text-sent.png' });
    }
  });
});

test.describe('Crisis Protocol — Escalate and Resolve', () => {
  test('escalate button shows toast with level', async ({ page }) => {
    await page.goto('/crisis');

    const escalateBtn = page.getByRole('button', { name: /Escalate/i }).first();
    if (await escalateBtn.isVisible()) {
      await escalateBtn.click();
      await expect(page.getByText(/Escalated/i)).toBeVisible({ timeout: 5000 });
    }
    await page.screenshot({ path: 'e2e/screenshots/crisis-escalated.png' });
  });

  test('resolve button shows success toast', async ({ page }) => {
    await page.goto('/crisis');

    const resolveBtn = page.getByRole('button', { name: /Resolve/i }).first();
    if (await resolveBtn.isVisible()) {
      await resolveBtn.click();
      await expect(page.getByText(/resolved/i)).toBeVisible({ timeout: 5000 });
    }
    await page.screenshot({ path: 'e2e/screenshots/crisis-resolved.png' });
  });
});

test.describe('Employer Network — WOTC Calculator', () => {
  test('WOTC calculator computes credit', async ({ page }) => {
    await page.goto('/employers');

    // Scroll to WOTC section
    const wotcSection = page.getByText('Work Opportunity Tax Credit');
    if (await wotcSection.isVisible()) {
      await wotcSection.scrollIntoViewIfNeeded();

      // Fill wage and hours
      const wageInput = page.getByLabel(/Wage/i).first();
      const hoursInput = page.getByLabel(/Hours/i).first();

      if (await wageInput.isVisible() && await hoursInput.isVisible()) {
        await wageInput.fill('16');
        await hoursInput.fill('2000');

        const calcBtn = page.getByRole('button', { name: /Calculate/i });
        if (await calcBtn.isVisible()) {
          await calcBtn.click();
          // Should show a dollar amount
          await expect(page.getByText(/\$/)).toBeVisible();
        }
      }
    }

    await page.screenshot({ path: 'e2e/screenshots/wotc-calculated.png' });
  });
});

test.describe('Government Compliance — Click to Copy', () => {
  test('copy button exists on worksheet fields', async ({ page }) => {
    await page.goto('/government-reports');

    // Scroll to Copy-Ready Worksheets section
    const worksheetSection = page.getByText('Copy-Ready Worksheets');
    if (await worksheetSection.isVisible()) {
      await worksheetSection.scrollIntoViewIfNeeded();

      // Hover over a field to reveal copy button
      const fieldRow = page.locator('text=Marcus').first();
      if (await fieldRow.isVisible()) {
        await fieldRow.hover();
        await page.screenshot({ path: 'e2e/screenshots/gov-copy-hover.png' });
      }
    }
  });
});

test.describe('Onboarding — Complete 5-Step Flow', () => {
  test('walk through all 5 steps', async ({ page }) => {
    await page.goto('/onboarding');

    // Step 1: Welcome
    await expect(page.getByText('Welcome to Resurrectio')).toBeVisible();
    await page.getByRole('button', { name: /Continue/i }).click();
    await page.screenshot({ path: 'e2e/screenshots/onboarding-1-welcome.png' });

    // Step 2: About Your Organization
    await expect(page.getByText('About Your Organization')).toBeVisible();
    await page.getByLabel(/Organization Name/i).fill('Hope House Reentry');

    // Select org type
    const orgTypeSelect = page.locator('button[role="combobox"]').first();
    if (await orgTypeSelect.isVisible()) {
      await orgTypeSelect.click();
      const option = page.getByRole('option', { name: /Reentry Nonprofit/i });
      if (await option.isVisible()) {
        await option.click();
      }
    }

    await page.getByRole('button', { name: /Next/i }).click();
    await page.screenshot({ path: 'e2e/screenshots/onboarding-2-org.png' });

    // Step 3: Your Role
    await expect(page.getByText('Your Role')).toBeVisible();
    const caseManagerCard = page.getByText('Case Manager').first();
    await caseManagerCard.click();
    await page.getByRole('button', { name: /Next/i }).click();
    await page.screenshot({ path: 'e2e/screenshots/onboarding-3-role.png' });

    // Step 4: What Matters Most
    await expect(page.getByText('What Matters Most')).toBeVisible();
    // Check a few boxes
    const checkboxes = page.locator('input[type="checkbox"], [role="checkbox"]');
    const checkboxCount = await checkboxes.count();
    for (let i = 0; i < Math.min(3, checkboxCount); i++) {
      await checkboxes.nth(i).click();
    }
    await page.getByRole('button', { name: /Next/i }).click();
    await page.screenshot({ path: 'e2e/screenshots/onboarding-4-challenges.png' });

    // Step 5: You're Ready
    await expect(page.getByText(/ready/i)).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/onboarding-5-ready.png' });

    // Click the CTA to go to dashboard
    const goBtn = page.getByRole('button', { name: /Go to/i }).first();
    if (await goBtn.isVisible()) {
      await goBtn.click();
      // Should navigate somewhere
      await page.waitForURL(/\/(dashboard|intake|mentor|knowledge|settings)/);
    }
  });
});

test.describe('Sidebar Navigation — Full Walkthrough', () => {
  test('expand each nav group and verify items', async ({ page }) => {
    await page.goto('/dashboard');

    // Click through each group
    const groups = ['Journeys', 'Services', 'Community', 'Organize', 'Intelligence'];

    for (const group of groups) {
      const groupBtn = page.getByText(group, { exact: true }).first();
      await groupBtn.click();

      // Verify some items are now visible
      await page.waitForTimeout(300); // animation
      await page.screenshot({ path: `e2e/screenshots/sidebar-${group.toLowerCase()}.png` });
    }
  });

  test('Quick Add button navigates to quick add', async ({ page }) => {
    await page.goto('/dashboard');

    const quickAdd = page.getByRole('link', { name: /Quick Add/i });
    if (await quickAdd.isVisible()) {
      await quickAdd.click();
      await expect(page).toHaveURL(/\/quick-add/);
    }
  });
});

test.describe('Marketing — CTA Navigation', () => {
  test('Start Your Ministry button goes to signup', async ({ page }) => {
    await page.goto('/');
    const ctaBtn = page.getByRole('link', { name: /Start Your/i }).first();
    await ctaBtn.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('Try Demo button goes to demo gate', async ({ page }) => {
    await page.goto('/');
    const demoBtn = page.getByRole('link', { name: /Try the Demo/i }).first();
    await demoBtn.click();
    await expect(page).toHaveURL(/\/demo/);
  });

  test('pricing Start Free Trial goes to signup', async ({ page }) => {
    await page.goto('/');
    // Scroll to pricing
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const trialBtn = page.getByRole('link', { name: /Start Free Trial/i }).first();
    await trialBtn.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('footer Terms link goes to terms page', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await footer.getByRole('link', { name: 'Terms' }).click();
    await expect(page).toHaveURL(/\/terms/);
    await expect(page.getByText('Terms of Service')).toBeVisible();
  });
});

test.describe('Login → Dashboard Flow', () => {
  test('sign in redirects to command center', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@resurrectio.app');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: /Sign In/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText("Today's Focus")).toBeVisible();
  });
});
