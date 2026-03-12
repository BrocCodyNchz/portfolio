/**
 * HeroSection - Full-viewport hero with dramatic typography
 *
 * @purpose Creates impactful first impression inspired by SpaceX/xAI
 */

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-green/90 opacity-0 animate-fade-in">
          Building the future
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white opacity-0 animate-slide-up [animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl">
          Innovation
          <br />
          <span className="text-green">Through Code</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-grey-300 opacity-0 animate-slide-up [animation-delay:400ms] sm:text-xl">
          Crafting exceptional digital experiences that push boundaries and transform ideas into reality.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 opacity-0 animate-slide-up [animation-delay:600ms] sm:flex-row">
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-lg bg-green px-8 py-4 font-semibold text-black transition-colors transition-shadow transition-transform duration-300 hover:bg-green-hover hover:shadow-[0_0_30px_rgba(0,255,127,0.4)] hover:-translate-y-px active:bg-green-dark active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-green/50 px-8 py-4 font-semibold text-white transition-colors transition-shadow transition-transform duration-300 hover:border-green hover:bg-green/10 active:border-green-dark active:bg-green/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Get in Touch
          </a>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-px bg-gradient-to-b from-green/60 to-transparent" />
      </div>
    </section>
  )
}
