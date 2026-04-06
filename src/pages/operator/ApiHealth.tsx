/**
 * ApiHealth — API status dashboard for the Gardener Console.
 *
 * WHAT: Service health grid, response time bars, error rates, and uptime.
 * WHERE: /operator/api-health
 * WHY: Operators need real-time visibility into API and infrastructure health.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Activity, Shield, Database, HardDrive, Zap, Wifi, CheckCircle, AlertTriangle, Clock, BarChart3 } from 'lucide-react';

const services = [
  { name: 'Authentication', icon: Shield, status: 'up' as const, latency: 45, uptime: '99.99%' },
  { name: 'Database', icon: Database, status: 'up' as const, latency: 12, uptime: '99.98%' },
  { name: 'Storage', icon: HardDrive, status: 'degraded' as const, latency: 320, uptime: '99.82%' },
  { name: 'Edge Functions', icon: Zap, status: 'up' as const, latency: 89, uptime: '99.95%' },
  { name: 'Realtime', icon: Wifi, status: 'up' as const, latency: 23, uptime: '99.97%' },
];

const responseTimes = [
  { hour: '00:00', ms: 42 },
  { hour: '04:00', ms: 38 },
  { hour: '08:00', ms: 56 },
  { hour: '12:00', ms: 78 },
  { hour: '16:00', ms: 65 },
  { hour: '20:00', ms: 48 },
  { hour: 'Now', ms: 45 },
];

const statusConfig = {
  up: { label: 'Operational', color: 'text-green-400', bg: 'bg-green-500', badgeClass: 'bg-green-900/50 text-green-300 border-green-700/50', icon: CheckCircle },
  degraded: { label: 'Degraded', color: 'text-yellow-400', bg: 'bg-yellow-500', badgeClass: 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50', icon: AlertTriangle },
  down: { label: 'Down', color: 'text-red-400', bg: 'bg-red-500', badgeClass: 'bg-red-900/50 text-red-300 border-red-700/50', icon: AlertTriangle },
};

export default function ApiHealth() {
  const maxMs = Math.max(...responseTimes.map((r) => r.ms));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-200">API Health</h1>
        <p className="text-red-400/70 text-sm mt-1">Infrastructure and service status monitoring</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-red-950/40 border-red-900/40">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-950/50">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-red-400/70">Uptime</p>
              <p className="text-2xl font-bold text-red-200">99.97%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-950/40 border-red-900/40">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-950/50">
              <BarChart3 className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-red-400/70">Error Rate</p>
              <p className="text-2xl font-bold text-red-200">0.02%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-950/40 border-red-900/40">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-950/50">
              <Clock className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-red-400/70">Avg Latency</p>
              <p className="text-2xl font-bold text-red-200">45ms</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service health grid */}
      <Card className="bg-red-950/40 border-red-900/40">
        <CardHeader>
          <CardTitle className="text-red-200 text-lg">Service Health</CardTitle>
          <CardDescription className="text-red-500/70">Current status of all platform services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((svc) => {
            const cfg = statusConfig[svc.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={svc.name} className="flex items-center justify-between p-3 rounded-lg bg-red-950/15 border border-red-900/15">
                <div className="flex items-center gap-3">
                  <svc.icon className={`w-4 h-4 ${cfg.color}`} />
                  <span className="text-sm font-medium text-red-200">{svc.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-red-500/60">{svc.latency}ms</span>
                  <span className="text-xs text-red-500/60">{svc.uptime}</span>
                  <Badge variant="outline" className={cfg.badgeClass}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {cfg.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Separator className="bg-red-900/30" />

      {/* Response time chart */}
      <Card className="bg-red-950/40 border-red-900/40">
        <CardHeader>
          <CardTitle className="text-red-200 text-lg">Response Time (24h)</CardTitle>
          <CardDescription className="text-red-500/70">Average response time in milliseconds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40">
            {responseTimes.map((r) => (
              <div key={r.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-red-300 font-medium">{r.ms}ms</span>
                <div
                  className="w-full rounded-t bg-red-700/70 hover:bg-red-600/70 transition-colors"
                  style={{ height: `${(r.ms / maxMs) * 100}%` }}
                />
                <span className="text-[10px] text-red-500/60">{r.hour}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
