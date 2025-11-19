import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

export interface CareerFormData {
  skills: string;
  interests: string;
  education: string;
  goal: string;
}

interface CareerFormProps {
  onSubmit: (data: CareerFormData) => void;
  isLoading: boolean;
}

export const CareerForm = ({ onSubmit, isLoading }: CareerFormProps) => {
  const [formData, setFormData] = useState<CareerFormData>({
    skills: "",
    interests: "",
    education: "",
    goal: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.skills && formData.interests && formData.education && formData.goal;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="skills" className="text-base font-semibold">
          Your Skills
        </Label>
        <Textarea
          id="skills"
          placeholder="e.g., Python, JavaScript, Problem Solving, Communication"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="min-h-[100px] resize-none bg-card border-border transition-smooth focus:shadow-soft"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests" className="text-base font-semibold">
          Your Interests
        </Label>
        <Textarea
          id="interests"
          placeholder="e.g., Technology, Design, Healthcare, Finance, Education"
          value={formData.interests}
          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          className="min-h-[100px] resize-none bg-card border-border transition-smooth focus:shadow-soft"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="education" className="text-base font-semibold">
          Education Level
        </Label>
        <Input
          id="education"
          placeholder="e.g., High School, Bachelor's in Computer Science, MBA"
          value={formData.education}
          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          className="bg-card border-border transition-smooth focus:shadow-soft"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal" className="text-base font-semibold">
          Your Career Goal
        </Label>
        <Textarea
          id="goal"
          placeholder="e.g., Become a software engineer, Start my own business, Work in healthcare"
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          className="min-h-[100px] resize-none bg-card border-border transition-smooth focus:shadow-soft"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full bg-gradient-hero text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-medium hover:shadow-glow transition-smooth"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Analyzing Your Profile...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Get Career Recommendations
          </>
        )}
      </Button>
    </form>
  );
};
