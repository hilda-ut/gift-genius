'use client';

import { useState } from 'react';
import { Gift } from 'lucide-react';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import Button from '../ui/Button';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up:', { email, password });
  };

  return (
    <div className='w-full flex flex-col align-center space-y-6 p-6 bg-white rounded-lg shadow-md md:w-3/5 lg:w-2/5'>
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
        >
          Sign Up
        </Button>


      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
          Log in
        </a>
      </p>
    </div>
  );
}