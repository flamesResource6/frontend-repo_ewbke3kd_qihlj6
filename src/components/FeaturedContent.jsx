import { useEffect, useState } from 'react'

function FeaturedContent() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backend}/api/products?limit=6&room=Living%20Room`)
        const data = await res.json()
        setProducts(data.items || [])
      } catch (e) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="shop" className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-xl font-semibold">Curated picks</h3>
        <a href="#" className="text-white/70 text-sm hover:text-white">View all</a>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id || p.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-[4/3] bg-white/10">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full grid place-items-center text-white/50 text-sm">Image</div>
                )}
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium line-clamp-1">{p.title}</p>
                {p.brand && <p className="text-white/60 text-xs">{p.brand}</p>}
                <div className="mt-2 flex gap-2">
                  <a href="#" className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-medium">Buy</a>
                  <button className="px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs">Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default FeaturedContent
