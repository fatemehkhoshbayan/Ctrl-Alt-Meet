import { useNavigate } from 'react-router-dom';
import { Button } from '@/ui';

export default function NotFoundState() {
  const navigate = useNavigate();

  return (
    <div className="bg-background/60 px-margin-mobile md:px-margin-desktop flex min-h-screen items-center justify-center">
      <section className="bg-surface-container/80 gap-stack-gutter flex w-full max-w-7xl flex-col items-center justify-center rounded-lg p-32 shadow-md">
        <h1 className="font-headline-lg text-headline-lg text-secondary">404</h1>
        <h2 className="font-headline-md text-headline-md text-on-surface">Page not found!</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant text-center">
          We couldn't find the page you're looking for. It may have been moved or no longer exists.
        </p>
        <Button color="secondary" size="lg" BtnText="Events" onClick={() => navigate('/')} />
      </section>
    </div>
  );
}
