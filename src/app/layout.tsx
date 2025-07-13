import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Footer } from '@components/Footer';
import './globals.css';
import Link from 'next/link';
import { Gift } from 'lucide-react';

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

// Placeholder for user auth (replace with your actual auth logic)
const user = null; // null = guest, otherwise user object

function Header() {
  return (
    <header className="w-full bg-white/80 border-b border-stone-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Gift className="h-7 w-7 text-purple-500" />
          <span className="text-xl font-bold text-gray-800">Giftly</span>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium transition">
              <span>Profile</span>
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="text-purple-600 hover:text-purple-800 font-medium underline">Sign In</Link>
              <Link href="/sign-up" className="text-purple-600 hover:text-purple-800 font-medium underline">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col bg-gradient-to-b from-stone-50 via-stone-50/95 to-stone-50/90`}>
        <Header />
        {children}
        <div className="mt-12 bg-gradient-to-b from-stone-50/90 to-stone-100/80 py-6">
          <Footer />
        </div>
      </body>
    </html>
  );
}
