import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Camera, Save, Rocket } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export default function IntakeForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    facility: '',
    releaseDate: '',
    sentenceLength: '',
    charges: '',
    paroleOfficerName: '',
    paroleOfficerPhone: '',
    paroleEndDate: '',
    paroleConditions: '',
    housingStatus: '',
    employmentStatus: '',
    transportation: '',
    hasValidId: false,
    hasBankAccount: false,
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    familyMembers: '',
    existingMentor: '',
    strengths: '',
    barriers: '',
    immediateNeeds: '',
    goals: '',
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <p className="text-muted-foreground">
        Begin a restoration journey by capturing this person's story, situation, and immediate needs.
      </p>

      {/* Section 1: Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-6">
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <span className="text-xs text-muted-foreground">Photo</span>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="First name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Last name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={form.dob} onChange={(e) => update('dob', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(555) 555-0000" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="email@example.com" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Incarceration Details */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Incarceration Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Facility</Label>
            <Select value={form.facility} onValueChange={(v) => update('facility', v)}>
              <SelectTrigger><SelectValue placeholder="Select facility" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Cook County">Cook County</SelectItem>
                <SelectItem value="Stateville">Stateville</SelectItem>
                <SelectItem value="Pontiac">Pontiac</SelectItem>
                <SelectItem value="Dixon">Dixon</SelectItem>
                <SelectItem value="Logan">Logan</SelectItem>
                <SelectItem value="Danville">Danville</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="releaseDate">Release Date</Label>
            <Input id="releaseDate" type="date" value={form.releaseDate} onChange={(e) => update('releaseDate', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sentenceLength">Sentence Length</Label>
            <Input id="sentenceLength" value={form.sentenceLength} onChange={(e) => update('sentenceLength', e.target.value)} placeholder="e.g. 3 years" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="charges">Charges</Label>
            <Textarea id="charges" value={form.charges} onChange={(e) => update('charges', e.target.value)} placeholder="List charges..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Parole/Probation */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Parole / Probation</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paroleOfficerName">Parole Officer Name</Label>
            <Input id="paroleOfficerName" value={form.paroleOfficerName} onChange={(e) => update('paroleOfficerName', e.target.value)} placeholder="Officer name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paroleOfficerPhone">Parole Officer Phone</Label>
            <Input id="paroleOfficerPhone" value={form.paroleOfficerPhone} onChange={(e) => update('paroleOfficerPhone', e.target.value)} placeholder="(555) 555-0000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paroleEndDate">Parole End Date</Label>
            <Input id="paroleEndDate" type="date" value={form.paroleEndDate} onChange={(e) => update('paroleEndDate', e.target.value)} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="paroleConditions">Conditions / Requirements</Label>
            <Textarea id="paroleConditions" value={form.paroleConditions} onChange={(e) => update('paroleConditions', e.target.value)} placeholder="List parole conditions and requirements..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Current Situation */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Current Situation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Housing Status</Label>
              <Select value={form.housingStatus} onValueChange={(v) => update('housingStatus', v)}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="shelter">Shelter</SelectItem>
                  <SelectItem value="transitional">Transitional</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Employment Status</Label>
              <Select value={form.employmentStatus} onValueChange={(v) => update('employmentStatus', v)}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="searching">Searching</SelectItem>
                  <SelectItem value="placed">Placed</SelectItem>
                  <SelectItem value="retained">Retained</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Transportation</Label>
              <Select value={form.transportation} onValueChange={(v) => update('transportation', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="own_vehicle">Own Vehicle</SelectItem>
                  <SelectItem value="public_transit">Public Transit</SelectItem>
                  <SelectItem value="rides">Rides from Others</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="hasValidId"
                checked={form.hasValidId}
                onCheckedChange={(v) => update('hasValidId', !!v)}
              />
              <Label htmlFor="hasValidId" className="cursor-pointer">Has Valid ID</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="hasBankAccount"
                checked={form.hasBankAccount}
                onCheckedChange={(v) => update('hasBankAccount', !!v)}
              />
              <Label htmlFor="hasBankAccount" className="cursor-pointer">Has Bank Account</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Support Network */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Support Network</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input id="emergencyContactName" value={form.emergencyContactName} onChange={(e) => update('emergencyContactName', e.target.value)} placeholder="Contact name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input id="emergencyContactPhone" value={form.emergencyContactPhone} onChange={(e) => update('emergencyContactPhone', e.target.value)} placeholder="(555) 555-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactRelationship">Relationship</Label>
              <Input id="emergencyContactRelationship" value={form.emergencyContactRelationship} onChange={(e) => update('emergencyContactRelationship', e.target.value)} placeholder="e.g. Mother, Brother" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="familyMembers">Family Members to Reconnect With</Label>
            <Textarea id="familyMembers" value={form.familyMembers} onChange={(e) => update('familyMembers', e.target.value)} placeholder="List family members and relationships..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="existingMentor">Existing Mentor / Support Person</Label>
            <Input id="existingMentor" value={form.existingMentor} onChange={(e) => update('existingMentor', e.target.value)} placeholder="Name of existing mentor or support person" />
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Assessment Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Assessment Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strengths">Strengths & Assets</Label>
            <p className="text-xs text-muted-foreground">What is this person good at? What are they proud of?</p>
            <Textarea id="strengths" value={form.strengths} onChange={(e) => update('strengths', e.target.value)} placeholder="Describe strengths, skills, and assets..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="barriers">Barriers to Reentry</Label>
            <p className="text-xs text-muted-foreground">What obstacles does this person face?</p>
            <Textarea id="barriers" value={form.barriers} onChange={(e) => update('barriers', e.target.value)} placeholder="Describe barriers and challenges..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="immediateNeeds">Immediate Needs</Label>
            <p className="text-xs text-muted-foreground">What does this person need in the next 7 days?</p>
            <Textarea id="immediateNeeds" value={form.immediateNeeds} onChange={(e) => update('immediateNeeds', e.target.value)} placeholder="List urgent needs..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goals">Goals</Label>
            <p className="text-xs text-muted-foreground">What does this person want their life to look like in 6 months?</p>
            <Textarea id="goals" value={form.goals} onChange={(e) => update('goals', e.target.value)} placeholder="Describe goals and aspirations..." rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          className="bg-red-900 hover:bg-red-950"
          onClick={() => toast('Person added — journey started')}
        >
          <Rocket className="mr-2 h-4 w-4" />
          Save & Begin Journey
        </Button>
        <Button
          variant="outline"
          className="border-red-800 text-red-800 hover:bg-red-50"
          onClick={() => toast('Draft saved')}
        >
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
      </div>
    </div>
  );
}
