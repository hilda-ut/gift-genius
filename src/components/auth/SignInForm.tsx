import Link from 'next/link';
import Label from '@components/ui/Label';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

export default function SignInForm() {
  return (
    <div className='w-full flex flex-col align-center space-y-6 p-6 bg-white rounded-lg shadow-md md:w-3/5 lg:w-2/5'>

      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don&apos;t have an account?{' '}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
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
          />
          <Button
            className='mt-8'
            pendingText="Signing In...">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
