# Resurrectio Data Model: People-Centered Journeys

## The Core Shift from CROS

In CROS, the journey/pipeline system tracks **opportunities** (partner relationships 
moving through stages like Target → Contacted → Discovery → Proposal → Signed).

In Resurrectio, journeys track **people** (returning citizens moving through 
restoration stages: Pre-Release → Stabilization → Growth → Flourishing → Alumni).

This is the fundamental architectural difference.

## What Already Works

The Resurrectio demo pages (JourneyMap, People, CaseNotes, Dashboard, etc.) already 
model this correctly — every person has a `stage` field and journeys are person-level.

## What Needs to Change in Lovable/Supabase

### 1. New `journeys` Table (or extend `contacts`)

```sql
-- Option A: Add stage tracking directly to contacts
ALTER TABLE contacts ADD COLUMN journey_stage text 
  CHECK (journey_stage IN ('pre_release', 'stabilization', 'growth', 'flourishing', 'alumni'));
ALTER TABLE contacts ADD COLUMN stage_entered_at timestamptz;
ALTER TABLE contacts ADD COLUMN stage_history jsonb DEFAULT '[]';

-- Option B: Separate journeys table (better for history)
CREATE TABLE journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid REFERENCES contacts(id),
  tenant_id uuid REFERENCES tenants(id),
  current_stage text NOT NULL,
  stage_entered_at timestamptz DEFAULT now(),
  release_date date,
  facility text,
  parole_officer text,
  parole_end_date date,
  housing_status text,
  employment_status text,
  mentor_id uuid REFERENCES contacts(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE journey_stage_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid REFERENCES journeys(id),
  from_stage text,
  to_stage text NOT NULL,
  changed_at timestamptz DEFAULT now(),
  changed_by uuid REFERENCES profiles(id),
  notes text
);
```

### 2. Repoint Pipeline/Journey Infrastructure

The existing CROS pipeline infrastructure (`src/lib/journeyChapters.ts`, 
`src/pages/Pipeline.tsx`) tracks opportunity stages. For Resurrectio:

- `Pipeline.tsx` → repoint to `journeys` table, group by person stage
- `journeyChapters.ts` → replace chapter definitions with reentry stages
- `useOpportunities` hooks → create parallel `useJourneys` hooks for person journeys
- Keep `useOpportunities` for actual partner/collaboration opportunities

### 3. NRI Signals on People, Not Opportunities

Current CROS signals fire on opportunity records. Resurrectio signals should fire 
on journey records:

- Drift Risk → person's activity patterns
- Transformation Momentum → person's milestone velocity
- Compliance Upcoming → person's parole/court dates
- Housing Eviction Warning → person's housing record
- etc.

The `ai_suggestions` and `email_task_suggestions` tables can stay opportunity-linked 
for partner-related intelligence, but add a `contact_id` / `journey_id` foreign key 
for person-centered signals.

### 4. What Stays the Same

- **Opportunities** still exist — they represent partnerships, employer relationships, 
  funder connections. The pipeline for THOSE stays opportunity-level.
- **Activities** already link to contacts — no change needed.
- **Events** already work generically — no change needed.
- **Grants** already work generically — no change needed.
- **Volunteers/Mentors** already link to contacts — no change needed.

### 5. Key Principle

> Opportunities = organizational relationships (partners, employers, funders)
> Journeys = people's restoration arcs (returning citizens)
>
> Both exist. Neither replaces the other. The confusion in CROS was that 
> journeys WERE opportunities. In Resurrectio, journeys are people.
