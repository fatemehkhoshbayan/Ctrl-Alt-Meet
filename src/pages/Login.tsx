import { AuthHeroSection, LoginForm } from '@/features';

export default function Login() {
  return (
    <>
      <AuthHeroSection />
      <section className="px-margin-mobile mx-auto py-12">
        <LoginForm />
      </section>
    </>
  );
}
