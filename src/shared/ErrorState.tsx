import { CircleAlert } from 'lucide-react';

export default function ErrorState({ error }: { error?: string }) {
  return (
    <div className="bg-error-container mx-auto flex flex-col items-center justify-center gap-4 p-32">
      <CircleAlert size={48} className="text-error" />
      <p className="font-headline-lg text-headline-lg text-on-error">Something went wrong</p>
      <p className="text-on-error font-body-md text-body-md">
        {`${error ?? 'An unknown error occurred!'} Please try again later.`}
      </p>
    </div>
  );
}
