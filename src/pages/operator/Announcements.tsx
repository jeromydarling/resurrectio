/**
 * Announcements — System announcements management for the Gardener Console.
 *
 * WHAT: List of system announcements with type badges, targeting, and management.
 * WHERE: /operator/announcements
 * WHY: Operators need to create and manage platform-wide communications.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Megaphone, Plus, Info, AlertTriangle, PartyPopper, Trash2, Pencil } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'System Maintenance — April 12',
    message: 'Scheduled maintenance window from 2:00 AM to 4:00 AM CT. Brief downtime expected.',
    type: 'warning' as const,
    date: '2026-04-04',
    target: 'All Ministries',
  },
  {
    id: 2,
    title: 'New NRI Signal: Communis Ready now available',
    message: 'The Communis Ready signal is now live across all tenants. This measures community integration readiness.',
    type: 'info' as const,
    date: '2026-04-01',
    target: 'All Ministries',
  },
  {
    id: 3,
    title: 'Q1 Impact Report template updated',
    message: 'Updated template now includes housing stability metrics and employment retention rates.',
    type: 'info' as const,
    date: '2026-03-28',
    target: 'All Ministries',
  },
  {
    id: 4,
    title: 'Bridges to Life reaches 500 milestone!',
    message: 'Congratulations to Bridges to Life for reaching 500 active participants. An incredible achievement.',
    type: 'celebration' as const,
    date: '2026-03-22',
    target: 'Bridges to Life',
  },
  {
    id: 5,
    title: 'New feature: Mentor matching improvements',
    message: 'Enhanced mentor matching algorithm now considers language preferences and geographic proximity.',
    type: 'info' as const,
    date: '2026-03-15',
    target: 'All Ministries',
  },
];

const typeConfig: Record<string, { icon: typeof Info; badgeClass: string }> = {
  info: { icon: Info, badgeClass: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
  warning: { icon: AlertTriangle, badgeClass: 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50' },
  celebration: { icon: PartyPopper, badgeClass: 'bg-green-900/50 text-green-300 border-green-700/50' },
};

export default function Announcements() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-100">Announcements</h1>
          <p className="text-purple-300/70 text-sm mt-1">System-wide communications and notices</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> New Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-purple-950/40 border-purple-800/40">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-purple-100">{announcements.length}</p>
            <p className="text-sm text-purple-300/70">Total Active</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-950/40 border-purple-800/40">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-purple-100">{announcements.filter((a) => a.target === 'All Ministries').length}</p>
            <p className="text-sm text-purple-300/70">Platform-Wide</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-950/40 border-purple-800/40">
          <CardContent className="pt-6 text-center">
            <p className="text-2xl font-bold text-purple-100">{announcements.filter((a) => a.type === 'warning').length}</p>
            <p className="text-sm text-purple-300/70">Warnings</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-purple-800/30" />

      {/* Announcement list */}
      <div className="space-y-4">
        {announcements.map((a) => {
          const cfg = typeConfig[a.type];
          const Icon = cfg.icon;
          return (
            <Card key={a.id} className="bg-purple-950/40 border-purple-800/40">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-purple-900/50 mt-0.5">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-purple-100">{a.title}</h3>
                        <Badge variant="outline" className={cfg.badgeClass}>{a.type}</Badge>
                      </div>
                      <p className="text-sm text-purple-300/70 mt-1.5">{a.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-purple-400/60">
                        <span>Posted: {a.date}</span>
                        <span>Target: {a.target}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-200 hover:bg-purple-800/30 h-8 w-8 p-0">
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-purple-400 hover:text-red-300 hover:bg-purple-800/30 h-8 w-8 p-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
