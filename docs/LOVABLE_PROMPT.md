# Resurrectio — Lovable Activation Guide

## Read This First

This repo contains a **complete frontend** for a reentry/restorative justice platform. 95 routes, 1,335 source files, 101 E2E tests, 424 Supabase migrations, 278 edge functions. The UI is done. The design system is done. The mock data is done. **Do not rebuild any pages.**

Your job is to **connect the existing frontend to Supabase** so the app works with real data instead of mock data.

**Repo:** `github.com/jeromydarling/resurrectio`  
**Branch:** `main`

---

## Step 1: Fix Base Path (Do This Immediately)

The app was deployed to GitHub Pages for preview. Lovable serves from root `/`, so:

**`vite.config.ts`** — Change the base line:
```ts
// BEFORE (GitHub Pages):
base: process.env.PLAYWRIGHT ? "/" : "/resurrectio/",
// AFTER (Lovable):
base: "/",
```

**`src/App.tsx`** — Remove the basename:
```tsx
// BEFORE:
<BrowserRouter basename="/resurrectio">
// AFTER:
<BrowserRouter>
```

**`public/404.html`** — Delete this file (GitHub Pages SPA workaround, not needed).

**`index.html`** — Remove the GitHub Pages redirect `<script>` block in `<body>` (the one that checks `l.search[1] === '/'`).

---

## Step 2: Restore Auth Providers

`src/App.tsx` was simplified for the static demo. The contexts all exist in `src/contexts/` — they just need to be re-added to the provider stack.

Replace the current App component with:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { TenantProvider } from "@/contexts/TenantContext";
import { EmailInsightsPanelProvider } from "@/contexts/EmailInsightsPanelContext";
import { GlobalModalProvider } from "@/contexts/GlobalModalContext";
import { ImpersonationProvider } from "@/contexts/ImpersonationContext";
import { DemoModeProvider } from "@/contexts/DemoModeContext";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { AppRouter } from "@/components/routing/AppRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DemoModeProvider>
    <AuthProvider>
      <ViewModeProvider>
      <TenantProvider>
      <TooltipProvider>
        <EmailInsightsPanelProvider>
        <GlobalModalProvider>
        <ImpersonationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <DemoBanner />
            <AppRouter />
          </BrowserRouter>
        </ImpersonationProvider>
        </GlobalModalProvider>
        </EmailInsightsPanelProvider>
      </TooltipProvider>
      </TenantProvider>
      </ViewModeProvider>
    </AuthProvider>
    </DemoModeProvider>
  </QueryClientProvider>
);

export default App;
```

---

## Step 3: Connect Supabase

The Supabase project already exists:
- **Project ID:** `zmeawjhxbgvtcfcfcygf` (in `supabase/config.toml`)
- **Client:** `src/integrations/supabase/client.ts` (already configured)
- **Types:** `src/integrations/supabase/types.ts` (auto-generated from schema)
- **424 migrations** in `supabase/migrations/`
- **278 edge functions** in `supabase/functions/`

Set environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## Step 4: Create the Journey Data Model

**This is the critical difference from CROS.** Read `docs/DATA_MODEL_MIGRATION.md` for the full plan.

In CROS, the pipeline tracks **opportunities** (partner relationships). In Resurrectio, journeys track **people** (returning citizens through restoration stages).

Create these tables:

```sql
CREATE TABLE journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  tenant_id uuid REFERENCES tenants(id),
  current_stage text NOT NULL CHECK (current_stage IN (
    'pre_release', 'stabilization', 'growth', 'flourishing', 'alumni'
  )),
  stage_entered_at timestamptz DEFAULT now(),
  release_date date,
  facility text,
  parole_officer text,
  parole_officer_phone text,
  parole_end_date date,
  housing_status text,
  employment_status text,
  mentor_id uuid REFERENCES contacts(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE journey_stage_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid REFERENCES journeys(id) ON DELETE CASCADE,
  from_stage text,
  to_stage text NOT NULL,
  changed_at timestamptz DEFAULT now(),
  changed_by uuid REFERENCES profiles(id),
  notes text
);

-- RLS policies
ALTER TABLE journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_stage_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenants see own journeys" ON journeys
  FOR ALL USING (tenant_id = (SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid() LIMIT 1));

CREATE POLICY "Tenants see own history" ON journey_stage_history
  FOR ALL USING (journey_id IN (SELECT id FROM journeys WHERE tenant_id = (SELECT tenant_id FROM tenant_users WHERE user_id = auth.uid() LIMIT 1)));
```

Create a hook `src/hooks/useJourneys.ts` that queries this table — parallel to `useOpportunities.ts` but for people.

---

## Step 5: Wire Pages to Real Data

The new Resurrectio pages in these directories use mock data from `src/data/mockData.ts`:
- `src/pages/journeys/` (People, JourneyMap, CaseNotes, Milestones, Family)
- `src/pages/services/` (ServiceCoordination, Housing, Employment, Compliance, Programs)
- `src/pages/community/` (Dashboard, Mentors, Stories, Events, etc.)
- `src/pages/organize/` (Partners, Activities, Territories, Templates)
- `src/pages/intelligence/` (NriSignals, Reports, PresentationMode, GardenPulse)

Each page imports from `@/data/mockData`. When wiring to Supabase:
1. Create the corresponding hook (e.g., `useJourneyPeople()`)
2. Import the hook in the page
3. Use real data when available, fall back to mock data when empty
4. **Keep the mock data imports as fallback** — don't delete them

The CROS infrastructure pages (`src/pages/PersonDetail.tsx`, `src/pages/Grants.tsx`, etc.) already use Supabase hooks — they'll work automatically once auth and tenant are connected.

---

## What Already Exists (Do Not Rebuild)

### Design System
- **Color:** Deep oxblood red (primary `#991b1b`, CSS var `--primary: 0 72% 35%`)
- **Background:** Warm cream `#faf7f3`
- **Headings:** Cormorant Garamond (Google Fonts, `font-serif` class)
- **Body:** DM Sans (Google Fonts, `font-sans` class)
- **Components:** 52 shadcn/Radix UI base components in `src/components/ui/`
- **Tokens:** `src/index.css` (CSS custom properties), `tailwind.config.ts`

### Pages (95 routes in `src/components/routing/AppRouter.tsx`)

**Marketing:** 13-section landing page with hero, stats, narrative, CROS ecosystem, features, integrations, government compliance (10 systems), email intelligence, NRI explainer, real quotes (Stevenson/Pope Francis/Colson/Prejean/Tutu), pricing, FAQ

**App — Journeys:** People, Journey Map, Case Notes, Milestones, Family, Family Support, Document Recovery, Pre-Release, Intake Form

**App — Services:** Service Coordination, Housing, Employment, Resume Builder, Compliance, Parole Scheduler, Programs, Provisions, Transportation, Emergency Fund

**App — Community:** Mentors, Mentor Matching, Employer Network (with WOTC calculator), Text Communication, Stories, Volunteers, Events, Calendar, Blog, Knowledge Base (12 categories), Communio, Directory, Resources

**App — Organize:** Partners, Activities, Territories, Templates, Document Hub (Google Drive/Dropbox + NRI voice learning), Grants, Projects, Campaigns, Import Center

**App — Intelligence:** NRI Signals (19 types), Staff Wellness (burnout detection), Crisis Protocols (3-level escalation), Reports, Funder Dashboard, Presentation Mode, Garden Pulse, Testimonium, Impact Journal, Government Compliance (click-to-copy worksheets)

**Auth:** Login, Signup, 5-step Onboarding, Demo Gate

**Legal:** Terms, Privacy (42 CFR Part 2, CJIS, HIPAA), Data Security (honest Active/Partial/In Progress badges)

**Operator Console:** 12 Gardener pages with dark red sidebar

### Mock Data
`src/data/mockData.ts` — 21 people, 23 case notes, 19 NRI signals, 8 mentors, 12 partners, 6 programs, events, stories, blog posts, knowledge base articles, resources, templates, territories, compliance items, housing/employment records, activities

### Infrastructure from CROS
- **Relatio:** 21 integration connectors, import wizard, setup guides
- **Gmail Intelligence:** Profunda-AI engine (2,500+ lines), contact/task/follow-up extraction
- **Campaign Sending:** Gmail/Outlook direct send
- **Generosity/Fundraising/Giving** tracking
- **260 hooks**, **8 contexts**, **137 lib utilities**
- **Vitest** test config + existing unit tests

### E2E Tests
101 Playwright tests across 9 spec files in `e2e/`:
- Page render tests (67 tests)
- Interaction tests (13 tests — form fills, search, expand/collapse, filters)
- Workflow tests (21 tests — intake submit, mentor matching, parole scheduling, resume builder, crisis escalate/resolve, WOTC calculator, onboarding flow, login→dashboard)

Run with: `PLAYWRIGHT=1 npx vite build && PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright test`

### Pricing Model
Defined in `src/config/brand.ts`:
- **Seedling** ($29/mo) — up to 5 staff & mentors
- **Growing** ($79/mo) — up to 25 staff & mentors
- **Coalition** ($149/mo) — unlimited
- Everyone gets every feature. No paywalled safety nets.
- Stripe config in `src/config/stripe.ts`

### NRI Signal Types
19 types in `src/config/brand.ts` including reentry-specific: substance relapse risk, mental health crisis, parole violation risk, housing eviction warning, employment termination risk, program dropout risk, benefit enrollment window, mentor burnout risk, re-incarceration risk composite score.

---

## Key Architecture Rules

1. **Journeys = People, Opportunities = Partners.** Both exist. The `journeys` table tracks returning citizens through restoration stages. The `opportunities` table tracks partner/employer/funder relationships. Never conflate them.

2. **Capacity billing counts staff/mentors, not returning citizens.** People being served are always free and unlimited.

3. **NRI is bounded.** It suggests, surfaces, and alerts. It never acts autonomously. Every signal includes evidence and a "Why am I seeing this?" explanation.

4. **Tenant-scoped everything.** Row-level security. The Gardener (platform operator) sees aggregate metrics but never modifies tenant data.

5. **Mock data is fallback, not placeholder.** Keep `src/data/mockData.ts` imports in pages — use real data when available, mock when the database is empty.

---

## Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root — restore providers here |
| `src/components/routing/AppRouter.tsx` | All 95 routes |
| `src/components/layout/Sidebar.tsx` | Navigation (5 groups) |
| `src/config/brand.ts` | App name, tiers, archetypes, 19 signal types |
| `src/config/stripe.ts` | Stripe product/price IDs |
| `src/data/mockData.ts` | Demo data for all pages |
| `src/types/resurrectio.ts` | Person, CaseNote, Milestone types |
| `src/index.css` | CSS design tokens (red palette) |
| `tailwind.config.ts` | Tailwind theme (fonts, colors) |
| `docs/DATA_MODEL_MIGRATION.md` | Journey data model spec |
| `src/lib/seo/contentPipeline.ts` | SEO keywords & content strategy |
| `src/lib/connectors/chmsRegistry.ts` | 21 integration connectors |
| `src/lib/relatio/setupGuides.ts` | Integration setup guides |
| `public/llms.txt` | LLM-readable app description |
| `playwright.config.ts` | E2E test config |

---

## Priority Order for Supabase Activation

### Phase 1: Auth (get login working)
1. Set Supabase env vars
2. Restore provider stack in App.tsx
3. Test login → Supabase Auth → redirect to /dashboard
4. Test tenant creation on signup
5. Test demo mode (/demo gate page)

### Phase 2: Journey Data Model
1. Run the SQL from Step 4 above
2. Create `useJourneys` hook
3. Wire JourneyMap and People pages to real data
4. Wire CaseNotes, Milestones to real data

### Phase 3: Core CRUD
1. PersonDetail — already has full UI, just needs data
2. Case notes create/read
3. Events, Calendar
4. Volunteers/Mentors
5. Activities timeline
6. Grants tracking

### Phase 4: Integrations
1. Gmail OAuth + sync (edge functions exist)
2. Stripe checkout (config exists)
3. Relatio import wizard (UI exists)

---

## Do NOT

- Rebuild any existing page — they are complete with styling and mock data
- Change the color scheme, fonts, or design tokens
- Remove mock data — keep as fallback for empty database states
- Restructure the 95 routes — they are all wired correctly
- Delete any CROS infrastructure files — they power integrations, Gmail AI, and platform features
- Rename Supabase tables — 424 migrations depend on the existing schema
- Change pricing tier names or model
- Remove the `font-serif` (Cormorant Garamond) from headings
- Add new dependencies without checking if an existing one already does the job
- Rewrite the Sidebar navigation structure
