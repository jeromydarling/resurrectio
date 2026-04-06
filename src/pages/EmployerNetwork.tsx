import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  Briefcase,
  Calculator,
  BadgeCheck,
  Eye,
  UserPlus,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/* ── inline mock data ─────────────────────────────────────────────── */

interface Employer {
  id: string;
  name: string;
  industry: string;
  activePlacements: number;
  wageRange: string;
  wotcCertified: boolean;
  contact: string;
  lastPlacement: string | null;
  seasonal?: boolean;
}

const employers: Employer[] = [
  { id: 'e1', name: 'Rivera Construction', industry: 'Construction/Labor', activePlacements: 6, wageRange: '$16-22/hr', wotcCertified: true, contact: 'Maria Rivera', lastPlacement: '2 weeks ago' },
  { id: 'e2', name: 'Goodwill Industries', industry: 'Retail/Warehouse', activePlacements: 4, wageRange: '$14-16/hr', wotcCertified: false, contact: 'James Park', lastPlacement: '1 month ago' },
  { id: 'e3', name: "Catholic Charities Kitchen", industry: 'Food Service', activePlacements: 3, wageRange: '$15/hr', wotcCertified: false, contact: 'Sr. Angela', lastPlacement: '3 weeks ago' },
  { id: 'e4', name: 'Community Auto Shop', industry: 'Automotive', activePlacements: 2, wageRange: '$18-20/hr', wotcCertified: true, contact: 'Mike Torres', lastPlacement: '1 month ago' },
  { id: 'e5', name: 'Midwest Logistics', industry: 'Warehouse/Distribution', activePlacements: 3, wageRange: '$17/hr', wotcCertified: false, contact: 'Dave Johnson', lastPlacement: '2 weeks ago' },
  { id: 'e6', name: 'Green City Landscaping', industry: 'Landscaping', activePlacements: 2, wageRange: '$15-17/hr', wotcCertified: false, contact: 'Carlos Mendez', lastPlacement: null, seasonal: true },
  { id: 'e7', name: "St. Vincent's Thrift Store", industry: 'Retail', activePlacements: 1, wageRange: '$14/hr', wotcCertified: false, contact: "Mary O'Brien", lastPlacement: null },
  { id: 'e8', name: 'Tech Recyclers Inc', industry: 'Electronics/Recycling', activePlacements: 2, wageRange: '$16/hr', wotcCertified: true, contact: 'Amir Patel', lastPlacement: null },
];

const INDUSTRY_BADGE: Record<string, string> = {
  'Construction/Labor': 'bg-orange-100 text-orange-800 border-orange-200',
  'Retail/Warehouse': 'bg-blue-100 text-blue-800 border-blue-200',
  'Food Service': 'bg-amber-100 text-amber-800 border-amber-200',
  'Automotive': 'bg-slate-100 text-slate-800 border-slate-200',
  'Warehouse/Distribution': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Landscaping': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Retail': 'bg-purple-100 text-purple-800 border-purple-200',
  'Electronics/Recycling': 'bg-teal-100 text-teal-800 border-teal-200',
};

/* ── component ─────────────────────────────────────────────────────── */

export default function EmployerNetwork() {
  const [wage, setWage] = useState('');
  const [hours, setHours] = useState('');
  const [estimatedCredit, setEstimatedCredit] = useState<number | null>(null);

  const totalPlacements = employers.reduce((s, e) => s + e.activePlacements, 0);

  function calculateCredit() {
    const w = parseFloat(wage);
    const h = parseFloat(hours);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      toast('Please enter valid wage and hours.');
      return;
    }
    // WOTC: 40% of first-year wages up to $6,000 for 400+ hrs; 25% for 120-399 hrs
    const qualifyingWages = Math.min(w * h, 6000);
    let credit: number;
    if (h >= 400) {
      credit = qualifyingWages * 0.4;
    } else if (h >= 120) {
      credit = qualifyingWages * 0.25;
    } else {
      credit = 0;
    }
    setEstimatedCredit(Math.round(credit));
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-muted-foreground">
          Build and maintain relationships with employers who believe in second chances.
        </p>
        <Button
          className="bg-red-900 hover:bg-red-950 text-white"
          onClick={() => toast('Employer form coming soon — reach out directly for now.')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employer
        </Button>
      </div>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-100 p-3">
              <Building2 className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-700">Partner Employers</p>
              <p className="text-2xl font-bold text-red-950">18</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-emerald-100 p-3">
              <TrendingUp className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-emerald-600">90-Day Retention</p>
              <p className="text-2xl font-bold text-emerald-900">72%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-100 p-3">
              <Users className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-700">Active Placements</p>
              <p className="text-2xl font-bold text-red-950">34</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-100 p-3">
              <DollarSign className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-700">Avg Starting Wage</p>
              <p className="text-2xl font-bold text-red-950">$16.40</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Employer Directory ────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-red-800" />
          <h2 className="font-serif text-lg font-semibold text-red-900">Employer Directory</h2>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {employers.map((emp) => (
              <Card key={emp.id} className="hover:bg-red-50/40 transition-all">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif font-semibold text-red-900">{emp.name}</h3>
                    {emp.wotcCertified && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 cursor-help">
                            <BadgeCheck className="h-3 w-3 mr-1" />
                            WOTC Certified
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-[200px] text-xs">
                            This employer is certified to receive Work Opportunity Tax Credits for hiring returning citizens.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={INDUSTRY_BADGE[emp.industry] ?? 'bg-gray-100 text-gray-700'}
                    >
                      {emp.industry}
                    </Badge>
                    {emp.seasonal && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Seasonal
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div>
                      <span className="text-muted-foreground">Placements:</span>{' '}
                      <span className="font-medium text-red-900">{emp.activePlacements}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Wages:</span>{' '}
                      <span className="font-medium">{emp.wageRange}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Contact:</span>{' '}
                      <span className="font-medium">{emp.contact}</span>
                    </div>
                    {emp.lastPlacement && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Last placement:</span>{' '}
                        <span className="text-sm">{emp.lastPlacement}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-800 hover:bg-red-50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Placements
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-900 hover:bg-red-950 text-white"
                      onClick={() =>
                        toast(`New placement form for ${emp.name} coming soon.`)
                      }
                    >
                      <UserPlus className="h-3 w-3 mr-1" />
                      Add Placement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* ── WOTC Calculator ──────────────────────────────────── */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-red-800" />
            <CardTitle className="font-serif text-red-900">
              Work Opportunity Tax Credit (WOTC)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Employers can receive <span className="font-semibold text-red-900">$2,400 - $9,600</span> in
            tax credits for each qualified returning citizen hired. Many employers don't know this
            credit exists.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="wage">Hourly Wage ($)</Label>
              <Input
                id="wage"
                type="number"
                placeholder="16.00"
                value={wage}
                onChange={(e) => {
                  setWage(e.target.value);
                  setEstimatedCredit(null);
                }}
                className="w-40"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hours">Hours Worked (1st Year)</Label>
              <Input
                id="hours"
                type="number"
                placeholder="2000"
                value={hours}
                onChange={(e) => {
                  setHours(e.target.value);
                  setEstimatedCredit(null);
                }}
                className="w-40"
              />
            </div>
            <Button
              className="bg-red-900 hover:bg-red-950 text-white"
              onClick={calculateCredit}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Credit
            </Button>
          </div>

          {estimatedCredit !== null && (
            <div className="rounded-lg bg-white border border-red-200 p-4">
              <p className="text-sm text-muted-foreground">Estimated Tax Credit</p>
              <p className="text-3xl font-bold text-red-950">
                ${estimatedCredit.toLocaleString()}
              </p>
              {estimatedCredit === 0 && (
                <p className="text-xs text-amber-700 mt-1">
                  Employee must work at least 120 hours in the first year to qualify.
                </p>
              )}
            </div>
          )}

          <p className="text-xs italic text-muted-foreground">
            Help employers claim this — they often don't know about it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
