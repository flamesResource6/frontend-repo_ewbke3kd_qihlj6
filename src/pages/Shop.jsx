import { useEffect, useState } from 'react'

function Shop(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({room:'', style:'', tag:'', q:''})

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.room) params.set('room', filters.room)
    if (filters.style) params.set('style', filters.style)
    if (filters.tag) params.set('tag', filters.tag)
    if (filters.q) params.set('q', filters.q)
    params.set('limit','24')
    const res = await fetch(`${backend}/api/products?${params.toString()}`)
    const data = await res.json()
    setItems(data.items||[])
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  useEffect(()=>{ const t=setTimeout(load, 300); return ()=>clearTimeout(t) }, [filters])

  return (
    <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-3 items-center py-6">
        <select value={filters.room} onChange={e=>setFilters(f=>({...f, room:e.target.value}))} className="bg-white/10 text-white text-sm px-3 py-2 rounded">
          <option value="">All rooms</option>
          {['Living Room','Bedroom','Kitchen','Bathroom','Home Office'].map(r=> <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={filters.style} onChange={e=>setFilters(f=>({...f, style:e.target.value}))} className="bg-white/10 text-white text-sm px-3 py-2 rounded">
          <option value="">All styles</option>
          {['Modern','Minimal','Boho','Scandi','Industrial'].map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <input value={filters.tag} onChange={e=>setFilters(f=>({...f, tag:e.target.value}))} placeholder="Tag" className="bg-white/10 text-white/90 placeholder:text-white/60 text-sm px-3 py-2 rounded" />
        <input value={filters.q} onChange={e=>setFilters(f=>({...f, q:e.target.value}))} placeholder="Search" className="bg-white/10 text-white/90 placeholder:text-white/60 text-sm px-3 py-2 rounded flex-1 min-w-[160px]" />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({length:12}).map((_,i)=> <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(p=> (
            <a key={p._id} href={`/product/${p._id}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-[4/3] bg-white/10">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (<div className="w-full h-full grid place-items-center text-white/50 text-sm">Image</div>)}
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium line-clamp-1">{p.title}</p>
                {p.brand && <p className="text-white/60 text-xs">{p.brand}</p>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
export default Shop