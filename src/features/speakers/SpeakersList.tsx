import { UserSearch } from 'lucide-react';
import { useSpeakers } from '@/services';
import { EmptyState, ErrorState, LoadingState } from '@/shared';
import { SpeakerCard } from '.';

export default function SpeakersList() {
  let content: React.ReactNode;
  const { data: speakers = [], isLoading, isError, error, isSuccess } = useSpeakers();

  if (isLoading) {
    content = <LoadingState message="Loading speakers..." />;
  } else if (isError) {
    content = <ErrorState error={error?.message ?? 'Failed to load speakers'} />;
  } else if (isSuccess && speakers.length === 0) {
    content = (
      <EmptyState
        icon={<UserSearch size={48} className="text-primary" />}
        title="No speakers yet"
        message="Check back soon — the lineup is being finalized."
      />
    );
  } else {
    content = speakers.map(speaker => <SpeakerCard key={speaker.id} speaker={speaker} />);
  }

  return (
    <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 py-16">{content}</section>
  );
}
