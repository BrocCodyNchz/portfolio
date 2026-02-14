/**
 * AboutSection - Brief introduction and background
 *
 * @purpose Showcases background and technical philosophy
 */

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-green/90">About</p>
        <h2 className="mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Cody McFarland
        </h2>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-grey-300">
              I am a Software Engineer focused on building high-performance, scalable web applications.
              Recently graduated from General Assembly&apos;s Software Engineering Immersive, I&apos;ve
              transitioned from a career in complex analysis to full-stack development.
            </p>
            <p className="text-lg leading-relaxed text-grey-300">
              I approach code with the same rigor required for data modeling: every component is a
              mission-critical system. I actively embrace the current AI landscape, integrating
              intelligent automation into my workflow while advocating for radical transparency and
              ethical implementation in every model I deploy.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-grey-900/50 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-lg font-semibold text-white">Current Stack</h3>
              <p className="text-grey-300 leading-relaxed">
                This portfolio is a live demonstration of my technical philosophy—built with React,
                TypeScript, and Tailwind CSS, featuring a high-fidelity UI inspired by the minimalist,
                functional aesthetics of aerospace engineering.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/broccodynchz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-grey-300 transition-all hover:border-green/50 hover:bg-white/5 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/cody-mcfarland"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-grey-300 transition-all hover:border-green/50 hover:bg-white/5 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
