/**
 * ContactSection - Call-to-action and contact links
 *
 * @purpose Encourages engagement with clear CTA
 */

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/10 py-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-green/90">Contact</p>
        <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Let&apos;s build something
          <br />
          <span className="text-green">extraordinary</span>
        </h2>
        <p className="mb-12 text-lg text-grey-300">
          Have a project in mind? I&apos;d love to hear about it. Reach out and let&apos;s create something amazing together.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:codydev.expire209@passinbox.com"
            className="inline-flex items-center justify-center rounded-lg bg-green px-10 py-4 font-semibold text-black transition-all duration-300 hover:bg-green-dark hover:shadow-[0_0_30px_rgba(0,255,127,0.4)] hover:-translate-y-1"
          >
            Get in Touch
          </a>
          <a
            href="https://github.com/broccodynchz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 px-10 py-4 font-semibold text-white transition-all duration-300 hover:border-green/50 hover:bg-white/5"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cody-mcfarland"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 px-10 py-4 font-semibold text-white transition-all duration-300 hover:border-green/50 hover:bg-white/5"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
