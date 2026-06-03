export default function HeroSection() {
  return (
    <>
      <section className="relative flex w-full flex-col overflow-hidden px-60 py-32">
        <h1 className="font-display-lg text-display-lg from-primary via-tertiary to-secondary mb-4 bg-linear-to-r bg-clip-text text-transparent">
          Your Awesome Journey So Far!
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Ready for your next adventure? All your confirmed spots and past memories are right here.
        </p>
        <div className="hero-blur-primary absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="hero-blur-secondary absolute top-1/2 -left-24 h-64 w-96 rounded-full blur-3xl" />
      </section>
    </>
  );
}
