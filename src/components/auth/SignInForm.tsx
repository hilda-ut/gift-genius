'use client';

import Link from 'next/link';
import Label from '@components/ui/Label';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { createClient } from '@/utils/supabse/client';
import { useState } from 'react';

const supabase = createClient();

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/gift-finder';
    }
  };

  return (
    <div className='w-full flex flex-col align-center space-y-6 p-6 bg-white rounded-lg shadow-md md:w-3/5 lg:w-2/5'>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don&apos;t have an account?{' '}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            className='mt-8'
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign in'}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
}
