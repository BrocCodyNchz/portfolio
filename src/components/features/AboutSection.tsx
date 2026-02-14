/**
 * AboutSection - Brief introduction and background
 *
 * @purpose Showcases background as new developer and explains this site as a project
 */

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-green/90">About</p>
        <h2 className="mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          New developer.
          <br />
          <span className="text-grey-300">Ready to grow.</span>
        </h2>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-grey-300">
              I recently graduated from General Assembly&apos;s Software Engineering Immersive bootcamp,
              where I learned full-stack development and built a strong foundation in modern web technologies.
              My background is in analysis, and I bring that same level of detail and rigor into every project I build.
            </p>
            <p className="text-lg leading-relaxed text-grey-300">
              <span className="text-green font-medium">This website is itself a project</span>—a portfolio
              I built to showcase my skills and introduce myself to the tech community. It&apos;s built with
              React, TypeScript, and Tailwind CSS, featuring a design inspired by xAI, SpaceX, and Starlink.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-grey-900/50 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-lg font-semibold text-white">What I&apos;ve Learned</h3>
            <ul className="space-y-4">
              {['Full-Stack Development', 'React & TypeScript', 'RESTful APIs', 'Responsive Design'].map(
                (item, index) => (
                  <li key={index} className="flex items-center gap-3 text-grey-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
