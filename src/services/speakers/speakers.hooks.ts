import { useEffect, useState } from 'react';
import { speakersApi } from './speakers.api';
import type { ISpeaker } from './speakers.type';

type Status = 'loading' | 'succeeded' | 'failed';

interface UseSpeakersResult {
  speakers: ISpeaker[];
  status: Status;
  error: string | null;
}

export function useSpeakers(): UseSpeakersResult {
  const [speakers, setSpeakers] = useState<ISpeaker[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await speakersApi.getAll();
        if (!cancelled) {
          setSpeakers(data);
          setStatus('succeeded');
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load speakers');
          setStatus('failed');
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { speakers, status, error };
}
