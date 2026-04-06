import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, HandHeart, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { mockPeople, mockMentors } from '@/data/mockData';
import { STAGE_LABELS, STAGE_BADGE_CLASSES } from '@/types/resurrectio';

export default function MentorMatching() {
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [matchNotes, setMatchNotes] = useState('');

  const unmentored = mockPeople.filter((p) => p.mentorId === null);
  const activeMentors = mockMentors.filter((m) => m.trainingStatus === 'active');

  const selectedPerson = unmentored.find((p) => p.id === selectedPersonId) ?? null;
  const selectedMentor = activeMentors.find((m) => m.id === selectedMentorId) ?? null;

  function daysSinceRelease(releaseDate: string): number {
    const now = new Date();
    const release = new Date(releaseDate);
    if (release > now) return 0;
    return Math.floor((now.getTime() - release.getTime()) / (1000 * 60 * 60 * 24));
  }

  function handleConfirmMatch() {
    if (!selectedPerson || !selectedMentor) return;
    toast(`Match created — ${selectedMentor.firstName} ${selectedMentor.lastName} paired with ${selectedPerson.firstName} ${selectedPerson.lastName}`);
    setSelectedPersonId(null);
    setSelectedMentorId(null);
    setMatchNotes('');
  }

  return (
    <div className="space-y-8 pb-12">
      <p className="text-muted-foreground">
        Pair returning citizens with trained mentors who can walk alongside them on their journey.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: People needing mentors */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-red-800" />
            <h2 className="font-serif text-lg font-semibold text-red-900">Returning Citizens Needing a Mentor</h2>
          </div>
          {unmentored.length === 0 && (
            <p className="text-muted-foreground text-sm py-8 text-center">Everyone has a mentor assigned.</p>
          )}
          <div className="space-y-3">
            {unmentored.map((person) => {
              const days = daysSinceRelease(person.releaseDate);
              const isSelected = selectedPersonId === person.id;
              return (
                <Card
                  key={person.id}
                  className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-red-800 bg-red-50' : 'hover:bg-red-50/40'}`}
                  onClick={() => setSelectedPersonId(isSelected ? null : person.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900">{person.firstName} {person.lastName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={STAGE_BADGE_CLASSES[person.stage]}>
                            {STAGE_LABELS[person.stage]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Housing: {person.housingStatus}
                          </span>
                        </div>
                        {days > 0 && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {days} days since release
                          </p>
                        )}
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-red-800 bg-red-800' : 'border-gray-300'}`}>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right: Available mentors */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HandHeart className="h-5 w-5 text-red-800" />
            <h2 className="font-serif text-lg font-semibold text-red-900">Available Mentors</h2>
          </div>
          <div className="space-y-3">
            {activeMentors.map((mentor) => {
              const isSelected = selectedMentorId === mentor.id;
              return (
                <Card
                  key={mentor.id}
                  className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-red-800 bg-red-50' : 'hover:bg-red-50/40'}`}
                  onClick={() => setSelectedMentorId(isSelected ? null : mentor.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-900">{mentor.firstName} {mentor.lastName}</p>
                        <p className="text-sm text-muted-foreground">{mentor.specialization}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{mentor.totalHours} hrs logged</span>
                          <span>{mentor.matchedMentees.length} mentees</span>
                          <span>{mentor.parish}</span>
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-red-800 bg-red-800' : 'border-gray-300'}`}>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: Confirm match */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <CardTitle className="font-serif text-red-900">Create Match</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedPerson && selectedMentor ? (
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white rounded-lg px-4 py-2 border">
                <p className="text-sm text-muted-foreground">Returning Citizen</p>
                <p className="font-medium text-red-900">{selectedPerson.firstName} {selectedPerson.lastName}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-red-800 hidden sm:block" />
              <div className="bg-white rounded-lg px-4 py-2 border">
                <p className="text-sm text-muted-foreground">Mentor</p>
                <p className="font-medium text-red-900">{selectedMentor.firstName} {selectedMentor.lastName}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Select one person and one mentor above to create a match.
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="matchNotes">Why is this a good match?</Label>
            <Textarea
              id="matchNotes"
              value={matchNotes}
              onChange={(e) => setMatchNotes(e.target.value)}
              placeholder="Describe why this pairing makes sense..."
              rows={3}
            />
          </div>

          <Button
            className="bg-red-900 hover:bg-red-950"
            disabled={!selectedPerson || !selectedMentor}
            onClick={handleConfirmMatch}
          >
            <HandHeart className="mr-2 h-4 w-4" />
            Confirm Match
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
