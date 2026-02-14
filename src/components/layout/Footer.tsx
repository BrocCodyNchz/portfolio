/**
 * Footer - Site footer with minimal branding
 *
 * @purpose Provides footer with copyright and optional links
 */

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-grey-500">© {CURRENT_YEAR} Cody McFarland. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="text-sm text-grey-500 transition-colors hover:text-green">
              About
            </a>
            <a href="#contact" className="text-sm text-grey-500 transition-colors hover:text-green">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
