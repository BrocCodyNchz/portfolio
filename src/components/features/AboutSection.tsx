/**
 * AboutSection - Brief introduction and background
 *
 * @purpose Showcases background and technical philosophy
 */

const GitHubIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

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
              I’m an aspiring software engineer focused on building reliable, scalable web applications. I recently completed General Assembly’s Software Engineering Bootcamp after years working in complex analysis, where I developed a strong foundation in data modeling and rigorous problem-solving that I now bring to full-stack development.
            </p>
            <p className="text-lg leading-relaxed text-grey-300">
              I approach code with the same care I applied to mission-critical data models in my previous role—every component needs to be deliberate and dependable because small issues can cascade in production. I use modern technology and AI tools to help automate repetitive tasks and speed up processes like prototyping, testing, and iteration, while always prioritizing transparency: documenting model sources, limitations, and potential biases when outputs could impact real decisions or people.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <a
                href="https://github.com/broccodynchz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 text-grey-300 transition-all hover:border-green/50 hover:bg-green/10 hover:text-green"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://linkedin.com/in/cody-mcfarland"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 text-grey-300 transition-all hover:border-green/50 hover:bg-green/10 hover:text-green"
              >
                <LinkedInIcon />
              </a>
            </div>
            <p className="text-sm text-grey-500">
              Built with React, TypeScript & Tailwind. Aerospace-inspired design.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
