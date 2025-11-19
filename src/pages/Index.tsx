import { useState } from "react";
import { CareerForm, CareerFormData } from "@/components/CareerForm";
import { CareerCard, Career } from "@/components/CareerCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Compass, Sparkles } from "lucide-react";

const Index = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (formData: CareerFormData) => {
    setIsLoading(true);
    setCareers([]);

    try {
      const { data, error } = await supabase.functions.invoke("career-guide", {
        body: formData,
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setCareers(data.careers);
      toast({
        title: "Success!",
        description: "Your personalized career recommendations are ready.",
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error getting career recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-full p-4 shadow-glow">
              <Compass className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            AI Career Guide
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect career path with AI-powered analysis. Get personalized recommendations based on your unique skills, interests, and goals.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl bg-card rounded-2xl shadow-medium p-8 border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
              Tell Us About Yourself
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Share your profile to receive tailored career recommendations
            </p>
            <CareerForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      {careers.length > 0 && (
        <div id="results" className="max-w-7xl mx-auto px-4 pb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Personalized Career Recommendations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Based on your profile, here are the top 5 career paths that align with your skills and aspirations
            </p>
          </div>

          <div className="grid gap-8">
            {careers.map((career, index) => (
              <CareerCard key={index} career={career} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
