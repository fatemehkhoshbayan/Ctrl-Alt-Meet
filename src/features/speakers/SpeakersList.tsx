import { UserSearch } from 'lucide-react';
import { useSpeakers } from '@/services';
import { EmptyState, ErrorState, LoadingState } from '@/shared';
import { SpeakerCard } from '.';

export default function SpeakersList() {
  const { speakers, status, error } = useSpeakers();

  return (
    <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 py-16">
      {status === 'loading' && <LoadingState message="Loading speakers…" />}
      {status === 'failed' && <ErrorState error={error ?? undefined} />}
      {status === 'succeeded' && speakers.length === 0 && (
        <EmptyState
          icon={<UserSearch size={48} className="text-primary" />}
          title="No speakers yet"
          message="Check back soon — the lineup is being finalized."
        />
      )}
      {status === 'succeeded' &&
        speakers.map(speaker => <SpeakerCard key={speaker.id} speaker={speaker} />)}
    </section>
  );
}
