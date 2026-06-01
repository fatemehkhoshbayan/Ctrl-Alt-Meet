import { SquareTerminal, BadgeInfo, Waypoints } from 'lucide-react';
import type { IEventProps } from './types';

export default function AboutSection({ event }: IEventProps) {
  return (
    <section id="about">
      <h3 className="font-headline-md text-headline-md text-primary gap-stack-gap mb-6 flex items-center">
        <BadgeInfo size={30} className="text-primary" />
        About this event
      </h3>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
        {event.description}
      </p>
      <div className="gap-stack-gap grid grid-cols-1 md:grid-cols-2">
        <div className="bg-surface-container border-outline-variant hover:border-primary/50 rounded-lg border p-6 transition-all duration-300">
          <SquareTerminal size={30} className="text-primary mb-4" />
          <h4 className="font-headline-sm text-headline-sm mb-2">Live Coding</h4>
          <p className="text-on-surface-variant">
            Watch industry leaders build production-ready systems from scratch on the main stage.
          </p>
        </div>
        <div className="bg-surface-container border-outline-variant hover:border-tertiary/50 rounded-lg border p-6 transition-all duration-300">
          <Waypoints size={30} className="text-till mb-4" />
          <h4 className="font-headline-sm text-headline-sm mb-2">Architecture Panels</h4>
          <p className="text-on-surface-variant">
            Participate in heated debates about monolithic vs microservices and the future of
            serverless.
          </p>
        </div>
      </div>
    </section>
  );
}
