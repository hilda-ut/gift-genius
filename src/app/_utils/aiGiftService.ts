import { toast } from 'sonner';
import { GiftIdea } from '@/_types/giftIdea';

export const getAIGiftSuggestions = async (
  age: string,
  interests: string,
  relationship: string,
  priceRange: number[] = [20, 80],
): Promise<GiftIdea[]> => {
  try {
    const prompt = `
      Suggest 6 gift ideas for a ${age} year old ${relationship} who likes ${interests}.
      The budget is between $${priceRange[0]} and $${priceRange[1]}.
      All ideas must be within that range.

      For each suggestion, provide:
      - A specific product name (be specific with brand names when possible)
      - A brief description
      - The approximate price range
      - A category (choose from: Tech, Electronics, Food, Home, Art, Fitness, Beauty, Clothing, Jewelry, Books, Music, Sports, Games, Toys, Educational)

      Example format for each item:
      {
        "name": "Kindle Paperwhite E-reader",
        "description": "6-inch high-resolution display with built-in light for reading",
        "priceRange": "$140 - $160",
        "category": "Tech"
      }

      Return a JSON array containing 6 items with these exact fields. Be specific with product names and brands.`;

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_TOKEN;

    if (!apiKey) {
      toast.error('OpenAI API key missing');
      return [];
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that returns only JSON.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error', await response.text());
      toast.error('AI request failed. Try again later.');
      return [];
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;

    let suggestions;
    try {
      const parsed = JSON.parse(content);
      console.log('parsed', parsed);
      suggestions = Array.isArray(parsed) ? parsed : parsed.giftIdeas;

      console.log('suggestions', suggestions);
    } catch (err) {
      console.error('Failed to parse AI response:', err);
      toast.error('Invalid response from AI');
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return suggestions.map((item: any, i: number) => {
      const name = item.name || `Gift Idea ${i + 1}`;

      const searchParams = new URLSearchParams({
        k: name,
        rh: `p_36:${priceRange[0]}00-${priceRange[1]}00`, // Price range in cents
      });

      const productUrl = `https://www.amazon.com/s?${searchParams.toString()}`;

      return {
        id: `item-number-${i}`,
        name,
        description: item.description || 'A thoughtful gift.',
        priceRange: item.priceRange || `$${priceRange[0]} - $${priceRange[1]}`,
        category: item.category || 'General',
        imageUrl: getImageUrlForCategory(item.category),
        productUrl,
      };
    });
  } catch (err) {
    console.error('Unexpected error in getAIGiftSuggestions:', err);
    toast.error('Something went wrong.');
    return [];
  }
};

const getImageUrlForCategory = (category: string): string => {
  const images: Record<string, string> = {
    tech: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=800',
    electronics: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=800',
    food: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    home: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800',
    art: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800',
    fitness: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800',
    beauty: 'https://images.unsplash.com/photo-1556760544-74068565f05c?w=800',
    clothing: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    books: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800',
    music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    sports: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800',
    games: 'https://plus.unsplash.com/premium_photo-1719360604040-f1b162124df1?w=800',
    toys: 'https://plus.unsplash.com/premium_photo-1684164601910-e4e179d574f0?w=800',
    play: 'https://plus.unsplash.com/premium_photo-1684164601910-e4e179d574f0?w=800',
    educational: 'https://images.unsplash.com/photo-1699347914988-c61ec13c99c5?w=800',
    nature: 'https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?w=800',
  };
  const key = category?.toLowerCase() || '';
  for (const tag in images) {
    if (key.includes(tag)) return images[tag];
  }
  return 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800';
};
