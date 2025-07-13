'use client';

import { useState } from 'react';
import { Gift } from 'lucide-react';
import Label from '@components/ui/Label';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { createClient } from '@/utils/supabse/client';

const supabase = createClient();

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className='w-full flex flex-col align-center space-y-6 p-6 bg-white rounded-lg shadow-md md:w-3/5 lg:w-2/5'>
      {success ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Gift className="h-8 w-8 text-purple-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Check your email</h2>
          <p className="text-gray-800 text-md mt-2 text-center">We&apos;ve sent a confirmation link to <span className="font-semibold">{email}</span>.<br/>Please check your inbox to confirm your account.</p>
          <a href="/sign-in" className="text-purple-600 hover:text-purple-700 font-medium mt-4">Back to Sign In</a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <div className="flex items-center justify-center">
            <Gift className="h-8 w-8 text-purple-400 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-8"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      )}
      {!success && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/sign-in" className="text-purple-600 hover:text-purple-700 font-medium">
            Log in
          </a>
        </p>
      )}
    </div>
  );
}
