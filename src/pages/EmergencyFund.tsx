/**
 * EmergencyFund — Emergency / benevolence fund management.
 *
 * WHAT: Tracks small but critical disbursements for people in reentry.
 * WHERE: /:tenantSlug/emergency-fund
 * WHY: These small amounts — a bus pass, work boots, a phone — can be the difference
 *      between stability and crisis. Every dollar is accounted for with dignity.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Calculator,
  ShieldCheck,
  AlertCircle,
  Receipt,
  Send,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/* ── Inline mock data ── */

const fundOverview = {
  currentBalance: 3247,
  disbursedThisMonth: 1890,
  totalDisbursedYTD: 14320,
  avgDisbursement: 127,
};

interface Disbursement {
  id: string;
  date: string;
  personName: string;
  personId: string;
  category: string;
  amount: number;
  purpose: string;
  approvedBy: string;
}

const recentDisbursements: Disbursement[] = [
  { id: 'd1', date: 'Apr 3', personName: 'Marcus Johnson', personId: 'person-1', category: 'Transportation', amount: 45, purpose: 'Monthly bus pass', approvedBy: 'Sarah Chen' },
  { id: 'd2', date: 'Apr 1', personName: 'Anthony Brown', personId: 'person-4', category: 'Housing', amount: 350, purpose: 'Security deposit assistance', approvedBy: 'Fr. Michael Torres' },
  { id: 'd3', date: 'Mar 28', personName: 'Denise Williams', personId: 'person-5', category: 'Employment', amount: 120, purpose: 'Work boots + safety glasses', approvedBy: 'Sarah Chen' },
  { id: 'd4', date: 'Mar 25', personName: 'Kevin Harris', personId: 'person-6', category: 'Emergency', amount: 75, purpose: 'Emergency phone replacement', approvedBy: 'Deacon James' },
  { id: 'd5', date: 'Mar 22', personName: 'Terrence Wallace', personId: 'person-10', category: 'Education', amount: 85, purpose: 'GED testing fee', approvedBy: 'Sarah Chen' },
  { id: 'd6', date: 'Mar 20', personName: 'Robert Davis', personId: 'person-3', category: 'Medical', amount: 200, purpose: 'Prescription co-pays (3 months)', approvedBy: 'Fr. Michael Torres' },
  { id: 'd7', date: 'Mar 15', personName: 'Marcus Johnson', personId: 'person-1', category: 'Clothing', amount: 95, purpose: 'Interview clothes', approvedBy: 'Sarah Chen' },
  { id: 'd8', date: 'Mar 10', personName: 'Patricia Jackson', personId: 'person-7', category: 'Legal', amount: 150, purpose: 'Court filing fees for expungement', approvedBy: 'Deacon James' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Transportation: 'bg-blue-100 text-blue-800',
  Housing: 'bg-green-100 text-green-800',
  Employment: 'bg-indigo-100 text-indigo-800',
  Emergency: 'bg-red-100 text-red-800',
  Education: 'bg-amber-100 text-amber-800',
  Medical: 'bg-teal-100 text-teal-800',
  Clothing: 'bg-purple-100 text-purple-800',
  Legal: 'bg-slate-100 text-slate-800',
  Other: 'bg-gray-100 text-gray-700',
};

const CATEGORIES = [
  'Transportation', 'Housing', 'Employment', 'Emergency',
  'Education', 'Medical', 'Clothing', 'Legal', 'Other',
];

const PEOPLE_OPTIONS = [
  { id: 'person-1', name: 'Marcus Johnson' },
  { id: 'person-4', name: 'Anthony Brown' },
  { id: 'person-5', name: 'Denise Williams' },
  { id: 'person-6', name: 'Kevin Harris' },
  { id: 'person-10', name: 'Terrence Wallace' },
  { id: 'person-3', name: 'Robert Davis' },
  { id: 'person-7', name: 'Patricia Jackson' },
  { id: 'person-8', name: 'James Mitchell' },
  { id: 'person-9', name: 'DeShawn Carter' },
];

const FUND_RULES = [
  { icon: DollarSign, text: 'Max single disbursement: $500' },
  { icon: Calculator, text: 'Monthly cap per person: $750' },
  { icon: ShieldCheck, text: 'Requires approval for amounts over $200' },
  { icon: Receipt, text: 'Receipts required for all disbursements over $50' },
];

/* ── Component ── */

export default function EmergencyFund() {
  const [form, setForm] = useState({
    personId: '',
    category: '',
    amount: '',
    purpose: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.personId || !form.category || !form.amount || !form.purpose) {
      toast.error('Please fill in all fields.');
      return;
    }
    toast.success('Disbursement submitted for approval.');
    setForm({ personId: '', category: '', amount: '', purpose: '' });
  };

  return (
    <div className="min-h-screen bg-red-50/40">
      {/* Header */}
      <div className="bg-red-950 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Emergency &amp; Benevolence Fund</h1>
          <p className="mt-2 text-red-200 max-w-2xl">
            A bus pass. Work boots. A phone. These small acts of provision can be the difference between stability and crisis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Fund Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-green-200 bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-3xl font-bold text-green-700 font-serif">${fundOverview.currentBalance.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disbursed This Month</p>
                  <p className="text-3xl font-bold text-red-800 font-serif">${fundOverview.disbursedThisMonth.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Disbursed YTD</p>
                  <p className="text-3xl font-bold text-red-900 font-serif">${fundOverview.totalDisbursedYTD.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-red-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Disbursement</p>
                  <p className="text-3xl font-bold text-red-800 font-serif">${fundOverview.avgDisbursement}</p>
                </div>
                <Calculator className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Table + Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Disbursements Table */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-red-900">Recent Disbursements</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Person</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Approved By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDisbursements.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="whitespace-nowrap text-muted-foreground">{d.date}</TableCell>
                        <TableCell>
                          <Link
                            to={`/people/${d.personId}`}
                            className="text-red-800 hover:text-red-950 underline underline-offset-2"
                          >
                            {d.personName}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={CATEGORY_COLORS[d.category] ?? CATEGORY_COLORS.Other}>
                            {d.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${d.amount}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{d.purpose}</TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">{d.approvedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* New Disbursement Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-red-900">New Disbursement</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="person">Person</Label>
                      <Select value={form.personId} onValueChange={(v) => setForm((f) => ({ ...f, personId: v }))}>
                        <SelectTrigger id="person">
                          <SelectValue placeholder="Select a person" />
                        </SelectTrigger>
                        <SelectContent>
                          {PEOPLE_OPTIONS.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        max="500"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7"
                        value={form.amount}
                        onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Describe the need and how this disbursement will help..."
                      rows={3}
                      value={form.purpose}
                      onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))}
                    />
                  </div>

                  <Button type="submit" className="bg-red-800 hover:bg-red-900 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Approval
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Fund Rules */}
          <div>
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="font-serif text-red-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Fund Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {FUND_RULES.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <rule.icon className="h-5 w-5 text-red-800 mt-0.5 shrink-0" />
                      <span className="text-sm text-red-900">{rule.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
