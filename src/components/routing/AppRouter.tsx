import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { OperatorLayout } from '@/components/layout/OperatorLayout';

// Marketing
import PublicLayout from '@/components/marketing/PublicLayout';
import Landing from '@/pages/marketing/Landing';

// Auth pages
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Onboarding from '@/pages/Onboarding';
import NotFound from '@/pages/NotFound';

// App pages — Journeys
import People from '@/pages/journeys/People';
import JourneyMap from '@/pages/journeys/JourneyMap';
import CaseNotes from '@/pages/journeys/CaseNotes';
import Milestones from '@/pages/journeys/Milestones';
import Family from '@/pages/journeys/Family';

// App pages — Services
import ServiceCoordination from '@/pages/services/ServiceCoordination';
import Housing from '@/pages/services/Housing';
import Employment from '@/pages/services/Employment';
import Compliance from '@/pages/services/Compliance';
import Programs from '@/pages/services/Programs';

// App pages — Community
import Dashboard from '@/pages/community/Dashboard';
import Mentors from '@/pages/community/Mentors';
import Stories from '@/pages/community/Stories';
import Events from '@/pages/community/Events';
import Blog from '@/pages/community/Blog';
import KnowledgeBase from '@/pages/community/KnowledgeBase';
import Communio from '@/pages/community/Communio';
import Directory from '@/pages/community/Directory';
import Resources from '@/pages/community/Resources';

// App pages — Organize
import Partners from '@/pages/organize/Partners';
import Activities from '@/pages/organize/Activities';
import Territories from '@/pages/organize/Territories';
import Templates from '@/pages/organize/Templates';

// App pages — Intelligence
import NriSignals from '@/pages/intelligence/NriSignals';
import Reports from '@/pages/intelligence/Reports';
import PresentationMode from '@/pages/intelligence/PresentationMode';
import GardenPulse from '@/pages/intelligence/GardenPulse';

// Settings & Help
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';

// Operator pages
import OperatorOverview from '@/pages/operator/Overview';
import ContentStudio from '@/pages/operator/ContentStudio';
import SourceManager from '@/pages/operator/SourceManager';
import SeoDashboard from '@/pages/operator/SeoDashboard';
import PubCalendar from '@/pages/operator/PubCalendar';
import OperatorMinistries from '@/pages/operator/Ministries';
import EcosystemPulse from '@/pages/operator/EcosystemPulse';
import OperatorPeople from '@/pages/operator/OperatorPeople';
import Announcements from '@/pages/operator/Announcements';
import ApiHealth from '@/pages/operator/ApiHealth';
import ModerationQueue from '@/pages/operator/ModerationQueue';
import OperatorSettings from '@/pages/operator/OperatorSettings';

/** Wraps app pages in MainLayout */
function AppPage({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <MainLayout title={title} subtitle={subtitle}>
      {children}
    </MainLayout>
  );
}

export function AppRouter() {
  return (
    <Routes>
      {/* Marketing — root */}
      <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* App routes — tenant scoped */}
      <Route path="/:tenantSlug">
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<AppPage title="Dashboard" subtitle="Ministry overview"><Dashboard /></AppPage>} />

        {/* Journeys */}
        <Route path="people" element={<AppPage title="People" subtitle="Returning citizens directory"><People /></AppPage>} />
        <Route path="journey-map" element={<AppPage title="Journey Map" subtitle="Restoration pipeline"><JourneyMap /></AppPage>} />
        <Route path="case-notes" element={<AppPage title="Case Notes" subtitle="Narrative records"><CaseNotes /></AppPage>} />
        <Route path="milestones" element={<AppPage title="Milestones" subtitle="Progress markers"><Milestones /></AppPage>} />
        <Route path="family" element={<AppPage title="Family" subtitle="Reconnection tracking"><Family /></AppPage>} />

        {/* Services */}
        <Route path="services" element={<AppPage title="Service Coordination" subtitle="Provider matrix"><ServiceCoordination /></AppPage>} />
        <Route path="housing" element={<AppPage title="Housing" subtitle="Placement tracking"><Housing /></AppPage>} />
        <Route path="employment" element={<AppPage title="Employment" subtitle="Job readiness & retention"><Employment /></AppPage>} />
        <Route path="compliance" element={<AppPage title="Compliance" subtitle="Court dates & requirements"><Compliance /></AppPage>} />
        <Route path="programs" element={<AppPage title="Programs" subtitle="Cohort management"><Programs /></AppPage>} />

        {/* Community */}
        <Route path="mentors" element={<AppPage title="Mentors" subtitle="Volunteer directory"><Mentors /></AppPage>} />
        <Route path="stories" element={<AppPage title="Stories" subtitle="Transformation narratives"><Stories /></AppPage>} />
        <Route path="events" element={<AppPage title="Events" subtitle="Ministry calendar"><Events /></AppPage>} />
        <Route path="blog" element={<AppPage title="Blog" subtitle="Ministry updates"><Blog /></AppPage>} />
        <Route path="knowledge" element={<AppPage title="Knowledge Base" subtitle="Resource library"><KnowledgeBase /></AppPage>} />
        <Route path="communio" element={<AppPage title="Communio" subtitle="Cross-app collaboration"><Communio /></AppPage>} />
        <Route path="directory" element={<AppPage title="Directory" subtitle="Organization directory"><Directory /></AppPage>} />
        <Route path="resources" element={<AppPage title="Resources" subtitle="Downloadable materials"><Resources /></AppPage>} />

        {/* Organize */}
        <Route path="partners" element={<AppPage title="Partners" subtitle="Courts, employers, providers"><Partners /></AppPage>} />
        <Route path="activities" element={<AppPage title="Activities" subtitle="Touchpoint timeline"><Activities /></AppPage>} />
        <Route path="territories" element={<AppPage title="Territories" subtitle="Geographic coverage"><Territories /></AppPage>} />
        <Route path="templates" element={<AppPage title="Templates" subtitle="Forms & playbooks"><Templates /></AppPage>} />

        {/* Intelligence */}
        <Route path="signals" element={<AppPage title="NRI Signals" subtitle="Pattern detection"><NriSignals /></AppPage>} />
        <Route path="reports" element={<AppPage title="Reports" subtitle="Impact reporting"><Reports /></AppPage>} />
        <Route path="presentation" element={<AppPage title="Presentation Mode" subtitle="For funder meetings"><PresentationMode /></AppPage>} />
        <Route path="garden-pulse" element={<AppPage title="Garden Pulse" subtitle="Ecosystem health"><GardenPulse /></AppPage>} />

        {/* Settings & Help */}
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>

      {/* Operator (Gardener Console) */}
      <Route path="/operator" element={<Navigate to="/operator/overview" replace />} />
      <Route path="/operator/overview" element={<OperatorLayout><OperatorOverview /></OperatorLayout>} />
      <Route path="/operator/content-studio" element={<OperatorLayout><ContentStudio /></OperatorLayout>} />
      <Route path="/operator/sources" element={<OperatorLayout><SourceManager /></OperatorLayout>} />
      <Route path="/operator/seo" element={<OperatorLayout><SeoDashboard /></OperatorLayout>} />
      <Route path="/operator/calendar" element={<OperatorLayout><PubCalendar /></OperatorLayout>} />
      <Route path="/operator/ministries" element={<OperatorLayout><OperatorMinistries /></OperatorLayout>} />
      <Route path="/operator/pulse" element={<OperatorLayout><EcosystemPulse /></OperatorLayout>} />
      <Route path="/operator/people" element={<OperatorLayout><OperatorPeople /></OperatorLayout>} />
      <Route path="/operator/announcements" element={<OperatorLayout><Announcements /></OperatorLayout>} />
      <Route path="/operator/api-health" element={<OperatorLayout><ApiHealth /></OperatorLayout>} />
      <Route path="/operator/moderation" element={<OperatorLayout><ModerationQueue /></OperatorLayout>} />
      <Route path="/operator/settings" element={<OperatorLayout><OperatorSettings /></OperatorLayout>} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
