# Gift Genius 🎁

AI-powered gift suggestions. Tell Giftly about someone (age, interests, your relationship, budget) and it returns six specific, shoppable gift ideas with direct shopping links.

**Live demo: [gift-genius.netlify.app](https://gift-genius.netlify.app)**

## What it does

- Generates six tailored gift ideas from a short form, each with a name, description, price range, category, and a shopping link.
- Localizes shopping links to the recipient's country, with region-specific Amazon domains for the US, UAE, Canada, UK, Germany, Japan, and Australia.
- Works for guests (3 free suggestions) and signed-in users via Supabase auth, with a premium tier for more.

## How the AI works

The OpenAI call runs server-side in a Next.js route handler (`src/app/api/gift-suggestions/route.ts`). It uses `gpt-4o-mini` in JSON mode for reliable structured output, and the route normalizes the response into gift cards.

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS, Supabase (auth and profiles), OpenAI API, deployed on Netlify.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_OPENAI_API_TOKEN` – your OpenAI API key
- `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – your Supabase anon key
