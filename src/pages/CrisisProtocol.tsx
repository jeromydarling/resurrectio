/**
 * Crisis Protocol — Escalation protocols triggered by NRI crisis signals.
 *
 * WHAT: Displays active crisis alerts and escalation protocol reference.
 * WHERE: /crisis-protocol
 * WHY: When NRI fires a serious signal, responders need clear protocols and quick action.
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertTriangle,
  ShieldAlert,
  Clock,
  Phone,
  MessageSquare,
  User,
  ChevronUp,
  CheckCircle2,
  Heart,
  ExternalLink,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Inline mock data                                                   */
/* ------------------------------------------------------------------ */

const activeAlerts = [
  {
    id: 'alert-1',
    signalType: 'DRIFT RISK',
    signalColor: 'bg-orange-600',
    personName: 'Marcus Johnson',
    personId: 'p-marcus-johnson',
    description:
      'Missed 2 mentor meetings, housing provider reports absence. Last contact: 4 days ago.',
    escalationLevel: 2,
    assignedTo: 'Sarah Chen',
    responseDeadline: '24 hours',
    actionsTaken: [
      'Called twice, texted, contacted mentor',
    ],
    nextStep: 'Home visit scheduled for tomorrow 10am',
  },
  {
    id: 'alert-2',
    signalType: 'MENTAL HEALTH CONCERN',
    signalColor: 'bg-red-700',
    personName: 'Kevin Harris',
    personId: 'p-kevin-harris',
    description:
      'Withdrew from support group, cancelled GED class, mentor reports "flat affect" during last meeting.',
    escalationLevel: 1,
    assignedTo: 'Fr. Michael Torres',
    responseDeadline: '48 hours',
    actionsTaken: [
      'Mentor check-in completed',
    ],
    nextStep: 'Assess need for crisis counseling referral',
  },
];

const escalationLevels = [
  {
    level: 1,
    label: 'Concern',
    borderColor: 'border-l-yellow-500',
    badgeClass: 'bg-yellow-100 text-yellow-800',
    trigger: 'Missed meetings, declining engagement, minor compliance issues',
    responseTime: '48 hours',
    actions: [
      'Mentor outreach',
      'Phone/text check-in',
      'Case note review',
    ],
    notify: 'Assigned case manager',
  },
  {
    level: 2,
    label: 'Urgent',
    borderColor: 'border-l-orange-500',
    badgeClass: 'bg-orange-100 text-orange-800',
    trigger:
      'Multiple missed check-ins, housing instability, employment loss, failed drug test',
    responseTime: '24 hours',
    actions: [
      'Home visit',
      'Parole officer contact',
      'Emergency services assessment',
    ],
    notify: 'Case manager + program director',
  },
  {
    level: 3,
    label: 'Critical',
    borderColor: 'border-l-red-600',
    badgeClass: 'bg-red-100 text-red-800',
    trigger:
      'Substance relapse confirmed, re-arrest, domestic violence, suicidal ideation, missing person',
    responseTime: 'Immediate',
    actions: [
      'Emergency intervention',
      'Crisis counseling',
      'Law enforcement if needed',
      'Family notification',
    ],
    notify: 'Entire care team + program director + emergency contacts',
  },
];

const crisisResources = [
  { label: 'National Suicide Prevention', value: '988', icon: Phone },
  { label: 'SAMHSA Helpline', value: '1-800-662-4357', icon: Phone },
  { label: 'Crisis Text Line', value: 'Text HOME to 741741', icon: MessageSquare },
  { label: 'Local Emergency', value: '911', icon: ShieldAlert },
  { label: 'Narcan Locator', value: 'Find nearest naloxone', icon: ExternalLink },
];

/* ------------------------------------------------------------------ */
/*  Escalation dots                                                    */
/* ------------------------------------------------------------------ */

function EscalationDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-3.5 h-3.5 rounded-full border-2 ${
            i <= level
              ? i === 3
                ? 'bg-red-600 border-red-600'
                : i === 2
                  ? 'bg-orange-500 border-orange-500'
                  : 'bg-yellow-500 border-yellow-500'
              : 'bg-white border-gray-300'
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm text-gray-600">Level {level} of 3</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CrisisProtocol() {
  return (
    <div className="min-h-screen bg-red-50/60">
      {/* Header */}
      <header className="bg-red-950 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <ShieldAlert className="w-8 h-8 text-red-300" />
            <h1 className="text-3xl font-serif font-bold tracking-tight">
              Crisis Escalation Protocols
            </h1>
          </div>
          <p className="text-red-200 max-w-3xl leading-relaxed">
            When NRI detects a crisis signal, every minute matters. These protocols ensure
            the right people are notified and the right resources are mobilized.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* ---- Active Crisis Alerts ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-700" />
            Active Crisis Alerts
          </h2>

          <div className="space-y-5">
            {activeAlerts.map((alert) => (
              <Card
                key={alert.id}
                className="border-l-4 border-l-red-700 shadow-sm bg-white"
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`${alert.signalColor} text-white text-xs`}>
                          {alert.signalType}
                        </Badge>
                        <EscalationDots level={alert.escalationLevel} />
                      </div>
                      <CardTitle className="font-serif text-xl text-red-900">
                        <Link
                          to={`/people/${alert.personId}`}
                          className="hover:underline underline-offset-2"
                        >
                          {alert.personName}
                        </Link>
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        Response deadline:{' '}
                        <strong className="text-red-800">{alert.responseDeadline}</strong>
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{alert.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Assigned Responder
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-800">
                        <User className="w-4 h-4 text-red-700" />
                        {alert.assignedTo}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Next Step
                      </p>
                      <p className="text-sm text-gray-800 font-medium">{alert.nextStep}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Actions Taken
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                      {alert.actionsTaken.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="destructive" size="sm" className="bg-red-800 hover:bg-red-900" onClick={() => toast.warning(`Escalated to Level ${Math.min(alert.level + 1, 3)} — program director notified`)}>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Escalate
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50" onClick={() => toast.success(`Crisis resolved for ${alert.person} — case note logged`)}>
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Resolve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---- Escalation Protocol Reference ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Escalation Protocol Reference
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {escalationLevels.map((lvl) => (
              <Card
                key={lvl.level}
                className={`border-l-4 ${lvl.borderColor} shadow-sm bg-white`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={lvl.badgeClass}>Level {lvl.level}</Badge>
                    <CardTitle className="font-serif text-lg text-red-900">
                      {lvl.label}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                      Trigger
                    </p>
                    <p className="text-gray-700">{lvl.trigger}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                      Response Time
                    </p>
                    <p className="text-gray-800 font-semibold">{lvl.responseTime}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                      Actions
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-0.5">
                      {lvl.actions.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                      Notify
                    </p>
                    <p className="text-gray-700">{lvl.notify}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---- Crisis Resources ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-700" />
            Crisis Resources
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {crisisResources.map((res) => {
              const Icon = res.icon;
              return (
                <Card key={res.label} className="bg-white shadow-sm">
                  <CardContent className="pt-5 text-center space-y-2">
                    <Icon className="w-6 h-6 text-red-800 mx-auto" />
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {res.label}
                    </p>
                    <p className="text-lg font-bold text-red-900">{res.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
