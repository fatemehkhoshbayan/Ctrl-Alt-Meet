import { Star, icons, type LucideIcon } from 'lucide-react';
import type { TEventHighlight } from '@/services';
import type { IEventProps } from '../types';
import { toPascalCase } from '@/utils';

function HighlightIcon({
  name,
  className,
  size = 30,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = icons[toPascalCase(name) as keyof typeof icons] as LucideIcon | undefined;
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

function renderHighlight(highlight: TEventHighlight) {
  if (highlight.featured) {
    return (
      <div
        key={highlight.id}
        className="group relative h-96 overflow-hidden rounded-lg lg:col-span-6 lg:row-span-8 lg:h-auto"
      >
        <img
          alt={highlight.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          data-alt={highlight.description}
          src={highlight.image}
        />
        <div className="from-background absolute inset-0 bg-linear-to-t to-transparent opacity-80"></div>
        <div className="absolute bottom-6 left-6">
          <h6 className="text-headline-lg font-headline-lg text-white">{highlight.title}</h6>
          <p className="text-on-surface-variant text-body-lg">{highlight.description}</p>
        </div>
      </div>
    );
  }

  if (highlight.accent === 'primary') {
    return (
      <div
        key={highlight.id}
        className="bg-primary text-on-primary accent-glow gap-stack-gap flex flex-col justify-center rounded-lg p-8 lg:col-span-3 lg:row-span-1"
      >
        <HighlightIcon name={highlight.icon} className="text-on-primary" size={40} />
        <h6 className="text-headline-md font-headline-md">{highlight.title}</h6>
        <p className="text-body-lg opacity-90">{highlight.description}</p>
      </div>
    );
  }

  return (
    <div
      key={highlight.id}
      className="glass-card gap-stack-gap flex flex-col justify-center rounded-lg p-8 lg:col-span-3 lg:row-span-1"
    >
      <HighlightIcon name={highlight.icon} className="text-secondary" size={40} />
      <h6 className="text-headline-lg font-headline-lg text-white">{highlight.title}</h6>
      <p className="text-on-surface-variant text-body-lg">{highlight.description}</p>
    </div>
  );
}

export default function HighlightsSection({ event }: IEventProps) {
  return (
    <div>
      <h3 className="font-headline-lg text-headline-lg text-till gap-stack-gap mb-8 flex items-center">
        <Star size={40} className="text-till" />
        Event Highlights
      </h3>
      <div className="gap-stack-gutter grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2">
        {(event.highlights ?? []).map(renderHighlight)}
      </div>
    </div>
  );
}
