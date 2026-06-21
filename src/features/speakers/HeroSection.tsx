import { Sparkles } from 'lucide-react';
import { CreateEventHelper } from '@/shared';

export default function HeroSection() {
  return (
    <section className="px-page-inline relative mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden py-20 lg:py-28 xl:py-36">
      <div aria-hidden className="hero-glow" />
      <div className="bg-primary/10 border-primary/20 text-primary font-label-sm text-label-sm mb-6 inline-flex w-fit animate-pulse items-center gap-2 rounded-full border px-4 py-1.5">
        <Sparkles size={14} />
        Meet the Pioneers
      </div>
      <h2 className="font-display-lg text-display-lg mb-6 leading-tight">
        Mastering the <span className="text-primary italic">Architecture</span> of Tomorrow
      </h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl">
        Meet the Visionaries, Founders, Engineers, and Designers redefining the boundaries of
        performance and scalability in the modern web ecosystem.
      </p>
      <CreateEventHelper className="justify-start p-0" />
      <div className="hero-blur-primary absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="hero-blur-secondary absolute top-1/2 -left-24 h-64 w-96 rounded-full blur-3xl" />
    </section>
  );
}
