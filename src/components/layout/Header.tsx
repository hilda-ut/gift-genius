'use client';

import { useUser } from '@/context/AuthContext';
import { Gift } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const user = useUser();

  return (
    <header className="w-full bg-white/80 border-b border-stone-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center justify-between gap-2 text-xl font-bold text-gray-800">
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