'use client';

import Link from 'next/link';
import { Clock, Gift, Heart, Sparkles, Target } from 'lucide-react';
import Button from '@/_components/ui/Button';

const features = [
  {
    icon: <Sparkles className="h-6 w-6 text-purple-500" />,
    title: 'Smart Suggestions',
    description: 'Our AI understands the art of thoughtful gifting',
  },
  {
    icon: <Target className="h-6 w-6 text-sky-500" />,
    title: 'Perfect Match',
    description: 'Tailored to interests and personality',
  },
  {
    icon: <Clock className="h-6 w-6 text-emerald-500" />,
    title: 'Quick & Easy',
    description: 'Find the ideal gift in minutes, not hours',
  },
  {
    icon: <Heart className="h-6 w-6 text-rose-500" />,
    title: 'From the Heart',
    description: 'Make every gift meaningful and personal',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-16 pb-8 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-28">
            <div className="text-center">
              <div className="flex items-center justify-center mb-8">
                <Gift className="h-16 w-16 text-purple-600 animate-float" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find the Perfect Gift</span>
                <span className="block text-purple-600 mt-2">with Gift Genius</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-lg text-gray-600 sm:max-w-2xl">
                Let our AI help you discover thoughtful, personalized gifts that will bring joy to your loved ones.
                No more endless searching. Get curated suggestions that match their interests perfectly.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link href="/gift-finder">
                  <Button className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                    Start Finding Gifts
                    <Gift className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Gift Genius?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Finding the perfect gift has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-2xl border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-purple-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Find the Perfect Gift?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join the happy gift-givers who have discovered the perfect presents for their loved ones.
            </p>
            <div className="mt-8">
              <Link href="/gift-finder">
                <Button className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Started Now
                  <Sparkles className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
