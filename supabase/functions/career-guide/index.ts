import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skills, interests, education, goal } = await req.json();
    
    console.log("Analyzing career path for user with:", {
      skills: skills.substring(0, 50),
      interests: interests.substring(0, 50),
      education,
      goal: goal.substring(0, 50)
    });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert career counselor specializing in the Indian job market. Your task is to analyze the user's profile and provide exactly 5 suitable career recommendations.

For each career, provide:
1. Career title
2. Why this career is suitable (2-3 sentences)
3. Required technical skills (list 4-6 specific skills)
4. Required soft skills (list 4-6 skills)
5. Step-by-step roadmap to get started (5-7 actionable steps)
6. Online courses and resources to learn (4-6 specific recommendations)
7. Average salary range in India (be specific with numbers)
8. Future scope and growth potential (2-3 sentences)

Return the response as a JSON array of exactly 5 career objects. Each object must have this exact structure:
{
  "title": "Career Title",
  "suitability": "Why suitable...",
  "technicalSkills": ["skill1", "skill2", ...],
  "softSkills": ["skill1", "skill2", ...],
  "roadmap": ["step1", "step2", ...],
  "resources": ["resource1", "resource2", ...],
  "salaryRange": "₹X - ₹Y LPA",
  "futureScope": "Future scope..."
}`;

    const userPrompt = `Analyze this profile and recommend 5 suitable careers:

Skills: ${skills}
Interests: ${interests}
Education: ${education}
Career Goal: ${goal}

Return ONLY a valid JSON array of 5 career recommendations. No other text.`;

    console.log("Calling Lovable AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits depleted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to get career recommendations. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("Received AI response");

    const aiResponse = data.choices[0].message.content;
    
    // Extract JSON from the response (handle markdown code blocks)
    let jsonStr = aiResponse;
    if (aiResponse.includes("```json")) {
      jsonStr = aiResponse.split("```json")[1].split("```")[0].trim();
    } else if (aiResponse.includes("```")) {
      jsonStr = aiResponse.split("```")[1].split("```")[0].trim();
    }

    const careers = JSON.parse(jsonStr);
    
    console.log(`Successfully generated ${careers.length} career recommendations`);

    return new Response(JSON.stringify({ careers }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in career-guide function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
