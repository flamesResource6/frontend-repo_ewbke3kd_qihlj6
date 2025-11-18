import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, Heart, LayoutDashboard } from 'lucide-react'

function Header() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <header className="px-5 md:px-8 pt-6 pb-3 sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-950/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="font-semibold tracking-tight text-white">Roomly</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link to="/articles" className="hover:text-white">Articles</Link>
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <Link to="/collections" className="hover:text-white">Collections</Link>
        </nav>
        <form onSubmit={onSearch} className="flex-1 hidden md:flex max-w-sm items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
          <Search size={16} className="text-white/70" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products and articles" className="bg-transparent outline-none text-sm placeholder:text-white/60 text-white w-full" />
        </form>
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="text-white/80 hover:text-white flex items-center gap-1 text-sm"><Heart size={16}/> Wishlist</Link>
          <Link to="/admin" className="text-white/80 hover:text-white flex items-center gap-1 text-sm"><LayoutDashboard size={16}/> Admin</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
