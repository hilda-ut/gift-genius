import { toast } from "sonner";
import { GiftIdea } from "@/_types/giftIdea";

export const getAIGiftSuggestions = async (
  age: string,
  interests: string,
  relationship: string,
  priceRange: number[] = [20, 80]
): Promise<GiftIdea[]> => {
  try {
    const prompt = `Suggest 6 gift ideas for a ${age} year old ${relationship} who likes ${interests}. The budget is between $${priceRange[0]} and $${priceRange[1]}. All ideas must be within that range. Return a JSON array with fields: name, description, priceRange, category.`;

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_TOKEN;

    if (!apiKey) {
      toast.error("OpenAI API key missing");
      return [];
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that returns only JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      console.error("OpenAI API error", await response.text());
      toast.error("AI request failed. Try again later.");
      return [];
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;

    let suggestions;
    try {
      const parsed = JSON.parse(content);
      console.log('parsed', parsed)
      suggestions = Array.isArray(parsed) ? parsed : parsed.giftIdeas;

      console.log('suggestions', suggestions)
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      toast.error("Invalid response from AI");
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return suggestions.map((item: any, i: number) => {
      return {
        id: `ai-${i}`,
        name: item.name || `Gift Idea ${i + 1}`,
        description: item.description || "A thoughtful gift.",
        priceRange: item.priceRange || `$${priceRange[0]} - $${priceRange[1]}`,
        category: item.category || "General",
        imageUrl: getImageUrlForCategory(item.category)
      };
    });
  } catch (err) {
    console.error("Unexpected error in getAIGiftSuggestions:", err);
    toast.error("Something went wrong.");
    return [];
  }
};

const getImageUrlForCategory = (category: string): string => {
  const images: Record<string, string> = {
    tech: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    food: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    home: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800",
    fitness: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800",
    beauty: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=800",
    art: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800"
  };
  const key = category?.toLowerCase() || "";
  for (const tag in images) {
    if (key.includes(tag)) return images[tag];
  }
  return "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800";
};
