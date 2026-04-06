/**
 * SourceManager — Data source connections for the Gardener Console.
 *
 * WHAT: Cards for each data source with status indicators and configuration.
 * WHERE: /operator/source-manager
 * WHY: Operators need to monitor and configure data source integrations.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Database, Mail, Church, Scale, Settings, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const sources = [
  {
    name: 'Supabase',
    description: 'Primary database and authentication provider',
    icon: Database,
    status: 'connected' as const,
    statusColor: 'bg-green-500',
    badgeClass: 'bg-green-900/50 text-green-300 border-green-700/50',
    lastSync: '2 minutes ago',
    records: '14,302',
  },
  {
    name: 'Email Integration',
    description: 'Outbound email delivery and tracking via SMTP',
    icon: Mail,
    status: 'connected' as const,
    statusColor: 'bg-green-500',
    badgeClass: 'bg-green-900/50 text-green-300 border-green-700/50',
    lastSync: '15 minutes ago',
    records: '2,891 sent',
  },
  {
    name: 'Parish Database',
    description: 'Diocesan parish records and sacramental data',
    icon: Church,
    status: 'pending sync' as const,
    statusColor: 'bg-yellow-500',
    badgeClass: 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50',
    lastSync: '3 hours ago',
    records: '892',
  },
  {
    name: 'Court Records API',
    description: 'County and state court record lookups',
    icon: Scale,
    status: 'disconnected' as const,
    statusColor: 'bg-red-500',
    badgeClass: 'bg-red-900/50 text-red-300 border-red-700/50',
    lastSync: 'Never',
    records: '—',
  },
];

const statusIcon = (status: string) => {
  if (status === 'connected') return <CheckCircle className="w-4 h-4 text-green-400" />;
  if (status === 'pending sync') return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
  return <XCircle className="w-4 h-4 text-red-400" />;
};

export default function SourceManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-100">Source Manager</h1>
        <p className="text-purple-300/70 text-sm mt-1">Manage data source connections and integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sources.map((src) => (
          <Card key={src.name} className="bg-purple-950/40 border-purple-800/40">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-900/50">
                    <src.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-100 text-lg">{src.name}</CardTitle>
                    <CardDescription className="text-purple-400/70 text-xs mt-0.5">{src.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={src.badgeClass}>
                  {statusIcon(src.status)}
                  <span className="ml-1.5">{src.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <Separator className="bg-purple-800/20 mx-6" />
            <CardContent className="pt-4">
              <div className="flex items-center justify-between text-sm">
                <div className="space-y-1">
                  <p className="text-purple-300/60">Last Sync: <span className="text-purple-200">{src.lastSync}</span></p>
                  <p className="text-purple-300/60">Records: <span className="text-purple-200">{src.records}</span></p>
                </div>
                <div className="flex gap-2">
                  {src.status !== 'disconnected' && (
                    <Button size="sm" variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-800/30">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="border-purple-700/50 text-purple-300 hover:bg-purple-800/30 hover:text-purple-100">
                    <Settings className="w-4 h-4 mr-1.5" /> Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
