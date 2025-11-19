import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  TrendingUp,
  BookOpen,
  Target,
  DollarSign,
  Lightbulb,
} from "lucide-react";

export interface Career {
  title: string;
  suitability: string;
  technicalSkills: string[];
  softSkills: string[];
  roadmap: string[];
  resources: string[];
  salaryRange: string;
  futureScope: string;
}

interface CareerCardProps {
  career: Career;
  index: number;
}

export const CareerCard = ({ career, index }: CareerCardProps) => {
  return (
    <Card className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-smooth overflow-hidden">
      <CardHeader className="bg-gradient-hero text-primary-foreground pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2 bg-secondary/20 text-primary-foreground border-primary-foreground/20">
              #{index + 1}
            </Badge>
            <CardTitle className="text-2xl font-bold">{career.title}</CardTitle>
          </div>
          <Briefcase className="h-8 w-8 opacity-80" />
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Suitability */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Why This Career?</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{career.suitability}</p>
        </div>

        <Separator className="bg-border" />

        {/* Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-lg">Required Skills</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Technical Skills:</p>
            <div className="flex flex-wrap gap-2">
              {career.technicalSkills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-3">Soft Skills:</p>
            <div className="flex flex-wrap gap-2">
              {career.softSkills.map((skill, i) => (
                <Badge key={i} variant="outline" className="border-accent/30 text-accent-foreground">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Roadmap */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Target className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-lg">Getting Started Roadmap</h3>
          </div>
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            {career.roadmap.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        <Separator className="bg-border" />

        {/* Resources */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Learning Resources</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            {career.resources.map((resource, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span className="leading-relaxed">{resource}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-border" />

        {/* Salary & Future */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground">
              <DollarSign className="h-5 w-5 text-success" />
              <h3 className="font-semibold">Salary Range (India)</h3>
            </div>
            <p className="text-success font-bold text-lg">{career.salaryRange}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Future Scope</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{career.futureScope}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
