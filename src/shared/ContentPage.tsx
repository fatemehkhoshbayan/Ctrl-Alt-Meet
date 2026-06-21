import type { ReactNode } from 'react';

interface ContentPageProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ContentPage({ title, subtitle, children }: ContentPageProps) {
  return (
    <>
      <section className="px-margin-mobile md:px-margin-desktop relative min-h-[35vh] w-full overflow-hidden py-24">
        <div aria-hidden className="hero-glow" />
        <div className="gap-stack-gutter relative z-10 mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="font-headline-lg text-display-lg from-primary via-tertiary to-secondary bg-linear-to-r bg-clip-text text-transparent">
            {title}
          </h1>
          {subtitle ? (
            <p className="font-body-lg text-body-lg text-on-surface-variant mx-auto max-w-2xl">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="hero-blur-primary absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="hero-blur-secondary absolute top-1/2 -left-24 h-64 w-64 rounded-full blur-3xl" />
      </section>
      <section className="px-margin-mobile md:px-margin-desktop mx-auto max-w-3xl py-20">
        <div className="text-on-surface-variant font-body-lg text-body-lg gap-stack-gutter flex flex-col">
          {children}
        </div>
      </section>
    </>
  );
}
