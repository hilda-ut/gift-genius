import { getAmazonDomain } from '@/utils/get-amazon-domain';
import { getCategoryImageUrl } from '@/utils/get-category-image';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {
      age,
      interests,
      relationship,
      priceRange = [20, 80],
      country,
    } = await req.json();

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
      return NextResponse.json({ error: 'OpenAI API key missing' }, { status: 500 });
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
      return NextResponse.json({ error: 'AI request failed. Try again later.' }, { status: 500 });
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;

    let suggestions;
    try {
      const parsed = JSON.parse(content);
      suggestions = Array.isArray(parsed) ? parsed : parsed.giftIdeas;
    } catch (err) {
      console.error('Failed to parse AI response:', err);
      return NextResponse.json({ error: 'Invalid response from AI' }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const giftIdeas = suggestions.map((item: any, i: number) => {
      const name = item.name || `Gift Idea ${i + 1}`;
      const amazonDomain = getAmazonDomain(country);

      const searchParams = new URLSearchParams({
        k: name,
        rh: `p_36:${priceRange[0]}00-${priceRange[1]}00`, // Price range in cents
      });

      const productUrl = `https://www.${amazonDomain}/s?${searchParams.toString()}`;

      return {
        id: `item-number-${i}`,
        name,
        description: item.description || 'A thoughtful gift.',
        priceRange: item.priceRange || `$${priceRange[0]} - $${priceRange[1]}`,
        category: item.category || 'General',
        imageUrl: getCategoryImageUrl(item.category),
        productUrl,
      };
    });

    return NextResponse.json({ suggestions: giftIdeas });
  } catch (err) {
    console.error('Unexpected error in getAIGiftSuggestions:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
