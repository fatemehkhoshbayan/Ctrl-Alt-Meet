import {
  ImageIcon,
  Mic,
  CirclePlay,
  Share2,
  Code2,
  Globe,
  Link,
  type LucideIcon,
} from 'lucide-react';
import type { ISpeaker } from '@/services';

interface ISpeakerCardProps {
  speaker: ISpeaker;
}

const TOPIC_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
];

const SOCIAL_ICON_MAP: Record<string, LucideIcon> = {
  twitter: Share2,
  github: Code2,
  public: Globe,
  website: Globe,
};

export default function SpeakerCard({ speaker }: ISpeakerCardProps) {
  return (
    <article className="group border-outline-variant/20 bg-surface mx-auto flex flex-row overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="bg-surface-container-highest relative h-full w-96 overflow-hidden">
        {speaker.imageUrl ? (
          <img
            alt={speaker.name}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            src={speaker.imageUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon size={64} className="text-outline" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-8">
        <div className="flex flex-wrap gap-2">
          {speaker.topics.map((topic, i) => (
            <span
              key={topic}
              className={`font-label-sm text-label-sm rounded-full px-3 py-1 ${TOPIC_COLORS[i % TOPIC_COLORS.length]}`}
            >
              {topic}
            </span>
          ))}
        </div>

        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors duration-300">
            {speaker.name}
          </h2>
          <p className="text-on-surface-variant font-body-sm text-body-sm mt-0.5">
            {speaker.title} at {speaker.company}
          </p>
        </div>

        <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
          {speaker.bio}
        </p>

        {speaker.talks.length > 0 && (
          <div className="gap-stack-gap flex flex-col">
            <div className="text-primary flex items-center gap-1.5">
              <Mic size={16} />
              <span className="font-label-sm text-label-sm tracking-widest uppercase">
                Featured Talks
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {speaker.talks.map(talk => (
                <div
                  key={talk}
                  className="border-outline-variant/20 flex items-center gap-3 rounded-xl border px-4 py-2.5"
                >
                  <CirclePlay size={16} className="text-on-surface-variant" />
                  <span className="font-body-sm text-body-sm text-on-surface">{talk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          {speaker.social.map(social => {
            const IconComponent = SOCIAL_ICON_MAP[social.icon] ?? Link;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="border-outline-variant/30 bg-primary-container/15 text-primary hover:bg-surface-container-high flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <IconComponent size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
