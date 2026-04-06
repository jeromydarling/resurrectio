import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Globe, Mail, Sparkles, ToggleRight } from 'lucide-react';

export default function OperatorSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2"><Globe className="h-5 w-5" /> Platform Settings</CardTitle>
          <CardDescription>Core platform configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Application Name</Label><Input defaultValue="Resurrectio" /></div>
          <div className="space-y-2"><Label>Domain</Label><Input defaultValue="resurrectio.app" /></div>
          <div className="space-y-2"><Label>Support Email</Label><Input defaultValue="support@resurrectio.app" /></div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2"><Sparkles className="h-5 w-5" /> NRI Configuration</CardTitle>
          <CardDescription>Narrative Relational Intelligence settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {['Transformation Momentum', 'Drift Risk', 'Fabrica Ready', 'Retention Risk', 'Family Reconnection', 'Community Growing', 'Compliance Upcoming', 'Employment Milestone', 'Communis Ready', 'Pre-Release Intake'].map(signal => (
            <div key={signal} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm">{signal}</span>
              <Badge className="bg-green-100 text-green-700">Enabled</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2"><Mail className="h-5 w-5" /> Email Settings</CardTitle>
          <CardDescription>SMTP and notification configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>SMTP Host</Label><Input defaultValue="smtp.resurrectio.app" /></div>
          <div className="space-y-2"><Label>From Address</Label><Input defaultValue="notifications@resurrectio.app" /></div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2"><ToggleRight className="h-5 w-5" /> Feature Flags</CardTitle>
          <CardDescription>Beta features and toggles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Communio Cross-App Bridge', enabled: true },
            { name: 'Fabrica Warm Handoff', enabled: true },
            { name: 'AI Case Note Summaries', enabled: false },
            { name: 'Advanced Compliance Alerts', enabled: true },
          ].map(flag => (
            <div key={flag.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="text-sm">{flag.name}</span>
              <Badge className={flag.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {flag.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
