/**
 * Overview — Main ecosystem dashboard for the Gardener Console.
 *
 * WHAT: Top-level stats, activity feed, and system health indicators.
 * WHERE: /operator/overview
 * WHY: Operators need a single-glance view of the entire platform ecosystem.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Building2, Activity, Clock, CheckCircle, AlertTriangle, Database, Shield, HardDrive, Wifi } from 'lucide-react';

const topStats = [
  { label: 'Total Ministries', value: '12', icon: Building2 },
  { label: 'Total People Across All', value: '1,847', icon: Users },
  { label: 'System Uptime', value: '99.7%', icon: Activity },
  { label: 'Active Users Today', value: '89', icon: Clock },
];

const recentActivity = [
  { id: 1, text: 'St. Vincent de Paul added 3 new people', time: '5 min ago', type: 'info' },
  { id: 2, text: 'Kairos Ministry completed quarterly report', time: '22 min ago', type: 'success' },
  { id: 3, text: 'Catholic Charities updated housing records', time: '1 hr ago', type: 'info' },
  { id: 4, text: 'New mentor registered at Dismas Ministry', time: '2 hr ago', type: 'info' },
  { id: 5, text: 'System backup completed successfully', time: '3 hr ago', type: 'success' },
  { id: 6, text: 'St. Francis House synced 12 milestones', time: '4 hr ago', type: 'info' },
  { id: 7, text: 'Kolbe House ran NRI signal scan', time: '5 hr ago', type: 'info' },
  { id: 8, text: 'Bridges to Life uploaded volunteer roster', time: '6 hr ago', type: 'info' },
];

const healthIndicators = [
  { label: 'API', status: 'healthy', icon: Activity },
  { label: 'Database', status: 'healthy', icon: Database },
  { label: 'Auth', status: 'healthy', icon: Shield },
  { label: 'Storage', status: 'degraded', icon: HardDrive },
];

const statusColor = (s: string) => s === 'healthy' ? 'text-green-400' : s === 'degraded' ? 'text-yellow-400' : 'text-red-400';
const statusBg = (s: string) => s === 'healthy' ? 'bg-green-500' : s === 'degraded' ? 'bg-yellow-500' : 'bg-red-500';

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-200">Ecosystem Overview</h1>
        <p className="text-red-400/70 text-sm mt-1">Platform-wide health and activity at a glance</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((s) => (
          <Card key={s.label} className="bg-red-950/40 border-red-900/40">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-950/50">
                <s.icon className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-red-400/70">{s.label}</p>
                <p className="text-2xl font-bold text-red-200">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <Card className="bg-red-950/40 border-red-900/40 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-red-200 text-lg">Recent Activity</CardTitle>
            <CardDescription className="text-red-500/70">Across all ministries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${a.type === 'success' ? 'bg-green-500' : 'bg-red-600'}`} />
                <div className="flex-1">
                  <p className="text-sm text-red-300">{a.text}</p>
                  <p className="text-xs text-red-500/60">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health indicators */}
        <Card className="bg-red-950/40 border-red-900/40">
          <CardHeader>
            <CardTitle className="text-red-200 text-lg">System Health</CardTitle>
            <CardDescription className="text-red-500/70">Service status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthIndicators.map((h) => (
              <div key={h.label} className="flex items-center justify-between p-3 rounded-lg bg-red-950/20 border border-red-900/20">
                <div className="flex items-center gap-3">
                  <h.icon className={`w-4 h-4 ${statusColor(h.status)}`} />
                  <span className="text-sm text-red-300">{h.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusBg(h.status)}`} />
                  <span className={`text-xs capitalize ${statusColor(h.status)}`}>{h.status}</span>
                </div>
              </div>
            ))}
            <Separator className="bg-red-900/20" />
            <div className="text-center">
              <p className="text-xs text-red-500/60">Last checked 30 seconds ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
