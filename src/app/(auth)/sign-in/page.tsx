import PageContainer from '@components/layout/PageContainer';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <PageContainer classes="flex justify-center">
      <SignInForm />
    </PageContainer>
  );
}