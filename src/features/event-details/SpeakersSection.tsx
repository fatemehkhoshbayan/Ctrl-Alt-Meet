import { SquareUserRound } from 'lucide-react';
import type { ISpeaker } from '@/services';

interface ISpeakersSectionProps {
  speakers: ISpeaker[];
}

export default function SpeakersSection({ speakers }: ISpeakersSectionProps) {
  return (
    <section id="speakers">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md text-secondary gap-stack-gap flex items-center">
          <SquareUserRound size={30} className="text-secondary" />
          Meet the Speakers
        </h3>
      </div>
      <div className="gap-gutter grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        {speakers.map(speaker => (
          <div key={speaker.id} className="group cursor-pointer">
            <div className="group-hover:border-secondary relative mb-4 aspect-square overflow-hidden rounded-xl border-2 border-transparent transition-all">
              <img
                alt={speaker.name}
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                src={speaker.imageUrl || speaker.avatar}
              />
            </div>
            <h5 className="font-headline-sm text-headline-sm text-white">{speaker.name}</h5>
            <p className="text-on-surface-variant text-label-md">
              {speaker.title}, {speaker.company}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
