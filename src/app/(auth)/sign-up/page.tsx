import SignUpForm from '@components/auth/SignUpForm';
import PageContainer from '@components/layout/PageContainer';

export default function SignUpPage() {
  return (
    <PageContainer classes="flex justify-center">
      <SignUpForm />
    </PageContainer>
  );
}