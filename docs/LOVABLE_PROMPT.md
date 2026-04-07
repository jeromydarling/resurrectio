# Resurrectio — Lovable Import & Activation Prompt

## What This Is

Resurrectio is a reentry/restorative justice platform for prison ministries and organizations serving returning citizens. It was built by restructuring a CROS (Communal Relationship Operating System) clone. The frontend is complete with 95 routes, realistic mock data, and a full marketing site. It needs Supabase backend activation.

**Repo:** github.com/jeromydarling/resurrectio
**Branch:** main
**Live preview:** jeromydarling.github.io/resurrectio

## Critical First Steps

### 1. Remove GitHub Pages config
The app was deployed to GitHub Pages for preview. Remove before Lovable deployment:
- `vite.config.ts`: delete `base: "/resurrectio/"` line (Lovable uses root `/`)
- `src/App.tsx`: remove `basename="/resurrectio"` from `<BrowserRouter>`
- `public/404.html`: can be deleted (was for GitHub Pages SPA routing)
- `index.html`: remove the GitHub Pages redirect script in `<body>`

### 2. Restore Auth & Tenant Providers
`src/App.tsx` was simplified for the static demo. Restore the full provider stack:
```tsx
<QueryClientProvider client={queryClient}>
  <DemoModeProvider>
  <AuthProvider>
    <ViewModeProvider>
    <TenantProvider>
    <TooltipProvider>
      <EmailInsightsPanelProvider>
      <GlobalModalProvider>
      <ImpersonationProvider>
        // ... toasters, router, etc
      </ImpersonationProvider>
      </GlobalModalProvider>
      </EmailInsightsPanelProvider>
    </TooltipProvider>
    </TenantProvider>
    </ViewModeProvider>
  </AuthProvider>
  </DemoModeProvider>
</QueryClientProvider>
```
All context providers still exist in `src/contexts/`. They were removed from App.tsx only because the demo doesn't have Supabase connected.

### 3. Connect Supabase
The Supabase project already exists:
- Project ID: `zmeawjhxbgvtcfcfcygf` (in `supabase/config.toml`)
- Client: `src/integrations/supabase/client.ts`
- Types: `src/integrations/supabase/types.ts`
- 424 migrations in `supabase/migrations/`
- 278 edge functions in `supabase/functions/`

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in environment.

## What's Already Built (Don't Rebuild)

### Frontend (1,335 source files, 95 routes)
- **Marketing homepage** with 13 sections (hero, stats, narrative, ecosystem, features, integrations, government compliance, email intelligence, NRI, testimonials, pricing, FAQ, built-for)
- **28 Resurrectio-specific pages** (journeys, services, community, organize, intelligence)
- **11 specialized reentry tools** (Document Recovery, Text Communication, Transportation, Employer Network, Emergency Fund, Pre-Release, Crisis Protocols, Funder Dashboard, Resume Builder, Family Support, Staff Wellness)
- **12 Gardener Console pages** (operator admin)
- **All CROS infrastructure pages** (PersonDetail, EventDetail, GrantDetail, etc.)
- **Legal pages** (Terms, Privacy, Data Security)
- **5-step onboarding** flow for reentry organizations
- **Document Hub** with Google Drive/Dropbox integration concept
- **Government Compliance** page with 10 export systems and click-to-copy worksheets

### Design System
- Color: Deep oxblood red (`--primary: 0 72% 35%`, hex #991b1b)
- Background: Warm cream (#faf7f3)
- Headings: Cormorant Garamond (Google Fonts)
- Body: DM Sans (Google Fonts)
- Components: shadcn/Radix UI (52 base components in `src/components/ui/`)
- CSS tokens in `src/index.css`, Tailwind config in `tailwind.config.ts`

### Mock Data
`src/data/mockData.ts` has 21 mock people, case notes, signals, partners, mentors, events, stories, etc. This data powers the demo pages. When Supabase is connected, these pages should switch to real data via the existing hooks in `src/hooks/`.

### Infrastructure Preserved from CROS
- **Relatio integration layer**: 21 connectors (Salesforce, HubSpot, Blackbaud, CiviCRM, etc.), import wizard, setup guides
- **Gmail intelligence engine**: Profunda-AI (2,500+ lines), email sync, contact/task/follow-up extraction
- **Campaign sending**: Gmail/Outlook direct send with merge tags
- **Generosity/fundraising/giving** tracking
- **Testimonium** storytelling, **Impulsus** impact journal
- **Voluntarium** volunteer management, **Provisio** provisions
- **260 hooks**, **8 contexts**, **137 lib utilities**
- **Vitest** test infrastructure with existing test files

## Key Architecture Decisions

### People-Centered Journeys (NOT Opportunity-Centered)
This is the most important architectural difference from CROS.

**In CROS:** The journey/pipeline system tracks OPPORTUNITIES (partner relationships through sales stages).
**In Resurrectio:** Journeys track PEOPLE (returning citizens through restoration stages: Pre-Release → Stabilization → Growth → Flourishing → Alumni).

**Read `docs/DATA_MODEL_MIGRATION.md`** for the full migration plan. Key points:
- Create a `journeys` table (or add `journey_stage` to contacts)
- Create `journey_stage_history` for tracking transitions
- The CROS `opportunities` table STAYS for partner relationships
- NRI signals should fire on journey records, not opportunity records
- Both models coexist: opportunities = org partnerships, journeys = people

### Pricing Model
Tiers defined in `src/config/brand.ts`:
- **Seedling** ($29/mo) — up to 5 active staff & mentors
- **Growing** ($79/mo) — up to 25 active staff & mentors
- **Coalition** ($149/mo) — unlimited staff & mentors
- Everyone gets every feature. No paywalled safety nets.
- Returning citizens, volunteers, imported contacts = always free, unlimited
- Stripe config in `src/config/stripe.ts` (product names already updated to Resurrectio tiers)

### NRI Signal Types
19 signal types defined in `src/config/brand.ts` including reentry-specific: substance relapse risk, mental health crisis, parole violation risk, housing eviction warning, employment termination risk, program dropout risk, benefit enrollment window, mentor burnout risk, re-incarceration risk composite score.

## What Needs Supabase Work

### Priority 1: Auth & Basic Data Flow
1. Connect Supabase environment variables
2. Restore provider stack in App.tsx
3. Verify auth flow works (Login → Supabase Auth → redirect to dashboard)
4. Verify tenant creation on signup
5. Test demo mode (DemoGatePage at /demo)

### Priority 2: Journey Data Model
1. Create `journeys` table per `docs/DATA_MODEL_MIGRATION.md`
2. Create `journey_stage_history` table
3. Create `useJourneys` hook parallel to `useOpportunities`
4. Wire JourneyMap, People, CaseNotes pages to real data
5. Keep mock data as fallback when Supabase returns empty

### Priority 3: Core Feature Activation
1. People/contacts CRUD (PersonDetail already exists with full UI)
2. Case notes CRUD
3. Events, Calendar, Volunteers
4. Activities timeline
5. Grants tracking

### Priority 4: Integrations
1. Gmail OAuth + sync (infrastructure exists in `supabase/functions/gmail-sync/`)
2. Stripe checkout (infrastructure exists in `src/config/stripe.ts`)
3. Relatio import wizard (infrastructure exists)

## Testing
- Vitest config: `vitest.config.ts`
- Test setup: `src/test/setup.ts`
- Existing tests in `src/test/` and `src/hooks/__tests__/`
- Run: `npx vitest run`

## Files to Know
| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component — restore providers here |
| `src/components/routing/AppRouter.tsx` | All 95 routes |
| `src/components/layout/Sidebar.tsx` | Navigation (5 groups + extras) |
| `src/config/brand.ts` | App name, tiers, archetypes, 19 signal types |
| `src/config/stripe.ts` | Stripe product/price IDs |
| `src/data/mockData.ts` | Demo data for all pages |
| `src/types/resurrectio.ts` | Person, CaseNote, Milestone, etc. types |
| `src/index.css` | CSS design tokens (red palette) |
| `docs/DATA_MODEL_MIGRATION.md` | Journey data model migration plan |
| `src/lib/seo/contentPipeline.ts` | SEO keywords & content strategy |
| `src/lib/connectors/chmsRegistry.ts` | 21 integration connectors |
| `src/lib/relatio/setupGuides.ts` | Integration setup guides |
| `public/llms.txt` | LLM-readable app description |

## Do NOT
- Don't rebuild any existing pages — they're complete with styling and mock data
- Don't change the color scheme, fonts, or design tokens
- Don't remove mock data — keep it as fallback for empty states
- Don't restructure the routing — 95 routes are already wired
- Don't delete CROS infrastructure files — they power integrations, AI, and features
- Don't rename the Supabase project or tables — 424 migrations depend on the schema
- Don't change the pricing model or tier names
