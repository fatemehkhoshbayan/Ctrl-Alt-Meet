import { CircleAlert } from 'lucide-react';

export default function ErrorState({ error }: { error?: string }) {
  return (
    <section className="bg-error px-margin-mobile md:px-margin-desktop flex min-h-screen w-full items-center justify-center">
      <div className="bg-error-container gap-stack-gutter mx-auto flex flex-col items-center justify-center rounded-md p-32">
        <CircleAlert size={48} className="text-error" />
        <p className="font-headline-lg text-headline-lg text-error">Something went wrong</p>
        <p className="text-error font-body-lg text-body-lg">
          {`${error ?? 'An unknown error occurred!'} Please try again later.`}
        </p>
      </div>
    </section>
  );
}
