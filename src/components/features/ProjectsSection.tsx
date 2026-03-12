/**
 * ProjectsSection - Showcase of selected projects
 *
 * @purpose Highlights key projects with links and descriptions
 */

const PROJECTS = [
  {
    title: 'PromptShield',
    description:
      'Chrome extension that protects users from accidentally pasting sensitive data into AI chatbot interfaces. All scanning runs locally—no data leaves your browser.',
    href: 'https://chromewebstore.google.com/detail/promptshield/kjjgplnaampoidmijkmjphnpndeakagg',
    type: 'Chrome Extension',
  },
  {
    title: 'OptOut Hub',
    description:
      'Open-source resource to remove your data from data brokers. Over 80 brokers with direct removal links. Progress saved locally in your browser—no data collected.',
    href: 'https://optout-hub.vercel.app/',
    type: 'Web App',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-green/90">Projects</p>
        <h2 className="mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What I&apos;ve built
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-white/10 bg-grey-900/30 p-8 transition-all duration-300 hover:border-green/30 hover:bg-grey-900/50 hover:shadow-[0_0_30px_rgba(0,255,127,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-green">
                {project.type}
              </span>
              <h3 className="mb-4 text-xl font-semibold text-white transition-colors group-hover:text-green">
                {project.title}
              </h3>
              <p className="text-grey-300">{project.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green group-hover:underline">
                View project
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
