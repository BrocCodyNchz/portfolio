import { useState } from 'react'
import { Header } from './components/layout/Header'
import { HeroSection } from './components/features/HeroSection'
import { AboutSection } from './components/features/AboutSection'
import { ContactSection } from './components/features/ContactSection'
import { Footer } from './components/layout/Footer'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleCloseMenu = () => setIsMenuOpen(false)

  return (
    <div className="min-h-screen bg-black bg-space-overlay">
      <Header isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} onCloseMenu={handleCloseMenu} />
      <main>
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
