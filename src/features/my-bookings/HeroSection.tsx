export default function HeroSection() {
  return (
    <>
      <section className="px-page-inline relative mx-auto flex w-full max-w-[1440px] flex-col overflow-hidden py-24 lg:py-32">
        <h1 className="font-display-lg text-display-lg from-primary via-tertiary to-secondary mb-4 bg-linear-to-r bg-clip-text text-transparent">
          Your Awesome Journey So Far!
        </h1>
        <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl">
          Ready for your next adventure? All your confirmed spots and past memories are right here.
        </p>
        <div className="hero-blur-primary absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="hero-blur-secondary absolute top-1/2 -left-24 h-64 w-96 rounded-full blur-3xl" />
      </section>
    </>
  );
}
