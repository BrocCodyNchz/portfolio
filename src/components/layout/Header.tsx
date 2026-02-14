/**
 * Header - Navigation bar with hamburger menu
 *
 * @purpose Provides main navigation with responsive hamburger menu
 * @param isMenuOpen - Whether mobile menu is expanded
 * @param onMenuToggle - Callback to toggle menu state
 * @param onCloseMenu - Callback to close menu (e.g. on link click)
 */

interface HeaderProps {
  isMenuOpen: boolean
  onMenuToggle: () => void
  onCloseMenu: () => void
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Header({ isMenuOpen, onMenuToggle, onCloseMenu }: HeaderProps) {
  const handleLinkClick = () => {
    onCloseMenu()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-lg transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-semibold tracking-tight text-white transition-colors hover:text-green">
          Cody McFarland
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-grey-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={onMenuToggle}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-grey-900/50 transition-all hover:border-green/30 hover:bg-grey-900 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-5 bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[73px] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onCloseMenu}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed right-0 top-[73px] z-50 w-72 border-l border-white/10 bg-grey-900/95 backdrop-blur-xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col p-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 text-base font-medium text-grey-300 transition-colors hover:text-green"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
