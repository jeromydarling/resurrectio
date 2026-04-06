import React from 'react';

type Variant = 'dashboard' | 'signals' | 'journey';

interface AppPreviewProps {
  variant: Variant;
  className?: string;
}

const urlMap: Record<Variant, string> = {
  dashboard: 'resurrectio.app/dashboard',
  signals: 'resurrectio.app/signals',
  journey: 'resurrectio.app/journey',
};

const titleMap: Record<Variant, string> = {
  dashboard: 'Dashboard',
  signals: 'NRI Signals',
  journey: 'Journey Map',
};

/* ── Sidebar + header frame shared by all variants ── */
function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[220px]">
      {/* Sidebar strip */}
      <div className="w-8 shrink-0 bg-gradient-to-b from-red-900 to-red-950 rounded-bl-sm" />
      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar */}
        <div className="h-7 bg-red-800/10 border-b border-gray-200 flex items-center px-3">
          <span className="text-[10px] font-semibold text-red-950/70 truncate">{title}</span>
        </div>
        {/* Content */}
        <div className="flex-1 p-3 overflow-hidden bg-gray-50/60">{children}</div>
      </div>
    </div>
  );
}

/* ── Dashboard variant ── */
function DashboardContent() {
  const stats = [
    { value: '127', label: 'Active People' },
    { value: '34', label: 'Mentors' },
    { value: '72%', label: 'Housing Rate' },
    { value: '68%', label: 'Employment Rate' },
  ];

  const bars = [
    { label: 'Pre-Rel', h: '45%' },
    { label: 'Stab', h: '70%' },
    { label: 'Growth', h: '55%' },
    { label: 'Flour', h: '35%' },
    { label: 'Alumni', h: '25%' },
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded border border-gray-200 p-1.5 text-center"
          >
            <p className="text-[11px] font-bold text-red-800 leading-tight">{s.value}</p>
            <p className="text-[7px] text-gray-500 leading-tight mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Bar chart placeholder */}
      <div className="bg-white rounded border border-gray-200 p-2 flex-1">
        <p className="text-[7px] text-gray-400 mb-1.5">Journey Pipeline</p>
        <div className="flex items-end gap-2 h-16">
          {bars.map((b) => (
            <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
              <div
                className="w-full rounded-t bg-gradient-to-t from-red-800 to-red-600"
                style={{ height: b.h }}
              />
              <p className="text-[6px] text-gray-400 mt-1 truncate w-full text-center">
                {b.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Signals variant ── */
function SignalsContent() {
  const signals = [
    {
      border: 'border-l-red-500',
      type: 'Drift Risk',
      name: 'Marcus J.',
      text: 'Missed 2 check-ins this week. Housing situation unstable.',
    },
    {
      border: 'border-l-green-500',
      type: 'Transformation Momentum',
      name: 'David R.',
      text: 'Completed job training. Mentor reports strong engagement.',
    },
    {
      border: 'border-l-amber-500',
      type: 'Compliance Upcoming',
      name: 'Anthony W.',
      text: 'Parole review in 5 days. Documentation 80% complete.',
    },
  ];

  return (
    <div className="space-y-2">
      {signals.map((s) => (
        <div
          key={s.name}
          className={`bg-white rounded border border-gray-200 border-l-[3px] ${s.border} p-2`}
        >
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[8px] font-semibold text-red-950/80">{s.type}</span>
            <span className="text-[8px] text-gray-400">—</span>
            <span className="text-[8px] font-medium text-gray-600">{s.name}</span>
          </div>
          <p className="text-[7px] text-gray-400 leading-snug">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Journey variant ── */
function JourneyContent() {
  const columns = [
    { title: 'Pre-Release', names: ['James T.', 'Maria L.', 'Devon K.'] },
    { title: 'Stabilization', names: ['Marcus J.', 'Sarah P.'] },
    { title: 'Growth', names: ['David R.', 'Anthony W.', 'Lisa M.'] },
    { title: 'Flourishing', names: ['Robert H.', 'Chris B.'] },
    { title: 'Alumni', names: ['Michael S.', 'Angela D.', 'Ray C.'] },
  ];

  return (
    <div className="flex gap-1.5 h-full overflow-hidden">
      {columns.map((col) => (
        <div key={col.title} className="flex-1 min-w-0 flex flex-col">
          <p className="text-[6px] font-semibold text-gray-500 mb-1 truncate text-center">
            {col.title}
          </p>
          <div className="bg-gray-100 rounded p-1 space-y-1 flex-1">
            {col.names.map((name) => (
              <div
                key={name}
                className="bg-white rounded border border-gray-200 px-1 py-0.5 text-center"
              >
                <p className="text-[6px] text-gray-600 truncate">{name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const contentMap: Record<Variant, React.ReactNode> = {
  dashboard: <DashboardContent />,
  signals: <SignalsContent />,
  journey: <JourneyContent />,
};

const AppPreview: React.FC<AppPreviewProps> = ({ variant, className = '' }) => {
  return (
    <div
      className={`w-full max-w-[500px] rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white ${className}`}
    >
      {/* Browser chrome */}
      <div className="bg-gray-100 border-b border-gray-200 px-3 py-2 flex items-center gap-2">
        {/* Traffic lights */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {/* URL bar */}
        <div className="flex-1 bg-white rounded-md border border-gray-200 px-2.5 py-0.5">
          <span className="text-[10px] text-gray-400 select-none">{urlMap[variant]}</span>
        </div>
      </div>

      {/* Content area */}
      <Frame title={titleMap[variant]}>{contentMap[variant]}</Frame>
    </div>
  );
};

export default AppPreview;
