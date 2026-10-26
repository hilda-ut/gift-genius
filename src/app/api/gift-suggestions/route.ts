import { getAmazonDomain } from '@/utils/get-amazon-domain';
import { getCategoryImageUrl } from '@/utils/get-category-image';
import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@/utils/supabse/server';

export async function POST(req: NextRequest) {
  try {
    const {
      age,
      interests,
      relationship,
      priceRange = [20, 80],
      country,
    } = await req.json();

    const supabase = await createSupabaseClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let isPremium = false;
    let suggestionsCount = 0;

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('suggestions_count, is_premium')
        .eq('id', user.id)
        .single();
      if (profile) {
        isPremium = profile.is_premium;
        suggestionsCount = profile.suggestions_count;
      }
      if (!isPremium && suggestionsCount >= 8) {
        return NextResponse.json({
          error: 'limit',
          message: 'You’ve discovered 8 thoughtful gift ideas. Unlock unlimited suggestions with Giftly Pro.',
        }, { status: 403 });
      }
    } else {
      // Guest user: check for x-guest-suggestions-count header
      // This header should be set by the client and reflect the guest's local usage count
      const guestCountHeader = req.headers.get('x-guest-suggestions-count');
      const guestCount = guestCountHeader ? parseInt(guestCountHeader, 10) : 0;
      if (guestCount >= 3) {
        return NextResponse.json({
          error: 'limit',
          message: 'You’ve reached your free limit. Create an account to continue.',
        }, { status: 403 });
      }
    }

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

      Return a JSON object of the form { "giftIdeas": [ ... ] } containing 6 items with these exact fields. Be specific with product names and brands.`;

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
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are a helpful assistant that returns only JSON.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('[gift-suggestions] OpenAI error', response.status, detail);
      let code;
      try {
        code = JSON.parse(detail)?.error?.code;
      } catch {
        code = undefined;
      }
      return NextResponse.json(
        { error: 'AI request failed. Try again later.', code, status: response.status },
        { status: 502 },
      );
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
        rh: `p_36:${priceRange[0]}00-${priceRange[1]}00`,
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

    // Increment suggestions_count for signed-in, non-premium users
    if (user && !isPremium) {
      await supabase
        .from('profiles')
        .update({ suggestions_count: suggestionsCount + 1 })
        .eq('id', user.id);
    }

    return NextResponse.json({ suggestions: giftIdeas });
  } catch (err) {
    console.error('[gift-suggestions] Unexpected error', err);
    const detail = process.env.NODE_ENV === 'development' && err instanceof Error ? err.message : undefined;
    return NextResponse.json({ error: 'Something went wrong.', detail }, { status: 500 });
  }
}
