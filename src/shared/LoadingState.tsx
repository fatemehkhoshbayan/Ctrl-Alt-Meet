import { Loader2 } from 'lucide-react';

export default function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <Loader2 size={48} className="text-primary animate-spin" />
      <p className="text-on-surface-variant font-body-md text-body-md animate-pulse">{message}</p>
    </div>
  );
}
