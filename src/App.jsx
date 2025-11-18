import Hero from './components/Hero'
import CategoryShortcuts from './components/CategoryShortcuts'
import EmailSignup from './components/EmailSignup'
import FeaturedContent from './components/FeaturedContent'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="px-5 md:px-8 pt-6 pb-3 sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight text-white">Roomly</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#articles" className="hover:text-white">Articles</a>
            <a href="#shop" className="hover:text-white">Shop</a>
            <a href="#collections" className="hover:text-white">Collections</a>
          </nav>
          <a href="#" className="text-sm text-white/80 hover:text-white">Sign in</a>
        </div>
      </header>

      <main className="px-5 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <Hero />
          <CategoryShortcuts />
          <EmailSignup />
          <FeaturedContent />
        </div>
      </main>

      <footer className="px-5 md:px-8 py-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-sm text-white/60">
          <p>Affiliate disclosure: We may earn a commission from qualifying purchases.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
