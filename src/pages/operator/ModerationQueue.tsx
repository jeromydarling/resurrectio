import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Check, Flag, X, Shield } from 'lucide-react';

const items = [
  { id: '1', type: 'story', submittedBy: 'Fr. Michael Torres', ministry: 'St. Vincent de Paul', preview: 'Marcus shared his testimony about finding stability...', status: 'pending' },
  { id: '2', type: 'note', submittedBy: 'Sarah Chen', ministry: 'Kairos Ministry', preview: 'David expressed frustration with his housing situation...', status: 'pending' },
  { id: '3', type: 'comment', submittedBy: 'Deacon James', ministry: 'Dismas Ministry', preview: 'Great progress on the guild course this week...', status: 'pending' },
  { id: '4', type: 'story', submittedBy: 'Maria Rodriguez', ministry: 'Catholic Charities', preview: 'Anthony\'s journey from release to his first job...', status: 'flagged' },
  { id: '5', type: 'note', submittedBy: 'Fr. Michael Torres', ministry: 'St. Vincent de Paul', preview: 'Weekly mentor meeting — positive engagement...', status: 'approved' },
  { id: '6', type: 'comment', submittedBy: 'Tom Wilson', ministry: 'Kolbe House', preview: 'The support group session was powerful today...', status: 'approved' },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700', flagged: 'bg-red-100 text-red-700', approved: 'bg-green-100 text-green-700',
};

export default function ModerationQueue() {
  const pending = items.filter(i => i.status === 'pending').length;
  const flagged = items.filter(i => i.status === 'flagged').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-yellow-600">{pending}</div><div className="text-xs text-muted-foreground">Pending</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{flagged}</div><div className="text-xs text-muted-foreground">Flagged</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">12</div><div className="text-xs text-muted-foreground">Approved Today</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-serif flex items-center gap-2"><Shield className="h-5 w-5" /> Moderation Queue</CardTitle></CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead><TableHead>Submitted By</TableHead><TableHead>Ministry</TableHead>
              <TableHead>Preview</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell><Badge variant="secondary">{item.type}</Badge></TableCell>
                <TableCell className="font-medium">{item.submittedBy}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{item.ministry}</TableCell>
                <TableCell className="text-sm max-w-xs truncate">{item.preview}</TableCell>
                <TableCell><Badge className={statusColors[item.status]}>{item.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600"><Check className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-yellow-600"><Flag className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600"><X className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
