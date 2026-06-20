export default function ProfileHeroSection() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      <div aria-hidden className="hero-glow" />
      <div className="relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-stack-gutter">
            <span className="hero-badge font-body text-label-md inline-block rounded-full px-4 py-1 tracking-wider uppercase">
              Your Profile
            </span>
            <h1 className="hero-title font-display text-display-lg mx-auto max-w-2xl leading-tight">
              Make it <span className="scribble-accent">yours</span>
            </h1>
            <p className="font-body text-body-xl text-on-surface-variant mx-auto max-w-xl">
              Update your photo, bio, and preferences anytime after you join.
            </p>
          </div>
        </div>
      </div>
      <div className="hero-blur-primary absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
      <div className="hero-blur-secondary absolute top-1/2 -left-24 h-64 w-64 rounded-full blur-3xl" />
    </section>
  );
}
