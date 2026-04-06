import { mockPrograms } from '@/data/mockData';
import type { Program } from '@/types/resurrectio';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, User, GraduationCap, BookOpen } from 'lucide-react';

function typeBadge(type: Program['type']) {
  const styles: Record<Program['type'], string> = {
    guild_course: 'bg-red-200 text-red-900 border-red-300',
    bible_study: 'bg-violet-100 text-violet-800 border-violet-200',
    ged_prep: 'bg-blue-100 text-blue-800 border-blue-200',
    support_group: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    life_skills: 'bg-amber-100 text-amber-800 border-amber-200',
    job_readiness: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  };
  const labels: Record<Program['type'], string> = {
    guild_course: 'Trades Guild',
    bible_study: 'Bible Study',
    ged_prep: 'GED Prep',
    support_group: 'Support Group',
    life_skills: 'Life Skills',
    job_readiness: 'Job Readiness',
  };
  return (
    <Badge variant="outline" className={`${styles[type]} text-xs`}>
      {labels[type]}
    </Badge>
  );
}

export default function Programs() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-red-950">
          Programs
        </h1>
        <p className="mt-1 text-red-800/70">
          Active program cohorts, completion rates, and upcoming sessions
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-200 p-3">
              <BookOpen className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-700">Active Programs</p>
              <p className="text-2xl font-bold text-red-950">{mockPrograms.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-emerald-100 p-3">
              <Users className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-emerald-600">Total Enrolled</p>
              <p className="text-2xl font-bold text-emerald-900">
                {mockPrograms.reduce((sum, p) => sum + p.enrolledCount, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-amber-100 p-3">
              <GraduationCap className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-amber-600">Avg Completion</p>
              <p className="text-2xl font-bold text-amber-900">
                {Math.round(
                  mockPrograms.reduce((sum, p) => sum + p.completionRate, 0) /
                    mockPrograms.length
                )}
                %
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockPrograms.map((program) => (
          <Card
            key={program.id}
            className="border-red-200 bg-white/90 hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-red-950">
                  {program.name}
                </CardTitle>
                {typeBadge(program.type)}
              </div>
              <CardDescription className="text-red-700/80 mt-1">
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Stats Row */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1.5 text-red-800">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{program.enrolledCount}</span>
                  <span className="text-red-600">enrolled</span>
                </div>
                <div className="flex items-center gap-1.5 text-red-800">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(program.nextSession).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Completion Rate */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-700">Completion Rate</span>
                  <span className="font-semibold text-red-950">
                    {program.completionRate}%
                  </span>
                </div>
                <Progress value={program.completionRate} className="h-2" />
              </div>

              {/* Facilitator */}
              <div className="flex items-center gap-2 text-sm text-red-800">
                <User className="h-4 w-4 text-red-600" />
                <span>{program.facilitator}</span>
              </div>

              {/* Recent Graduates */}
              {program.recentGraduates.length > 0 && (
                <div className="space-y-2">
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-red-600">
                    <GraduationCap className="h-3.5 w-3.5" />
                    Recent Graduates
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {program.recentGraduates.map((name) => (
                      <Badge
                        key={name}
                        variant="outline"
                        className="border-red-300 bg-red-50 text-red-800 text-xs"
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
