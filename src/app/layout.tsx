import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Footer } from '@components/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Giftly - AI-Powered Gift Suggestions',
  description: 'Find the perfect gift with our AI-powered gift suggestion platform. Personalized recommendations for every occasion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col bg-gradient-to-b from-stone-50 via-stone-50/95 to-stone-50/90`}>
        {children}
        <div className="mt-12 bg-gradient-to-b from-stone-50/90 to-stone-100/80 py-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
