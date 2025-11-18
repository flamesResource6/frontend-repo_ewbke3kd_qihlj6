import { useEffect, useState } from 'react'

function Articles(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async ()=>{
    setLoading(true)
    const res = await fetch(`${backend}/api/articles?limit=24`)
    const data = await res.json()
    setItems(data.items||[])
    setLoading(false)
  }
  useEffect(()=>{load()},[])

  return (
    <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-white py-6">Articles</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i)=> <div key={i} className="aspect-video rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ):(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(a=> (
            <a key={a._id} href={`/articles/${a.slug}`} className="block overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-video bg-white/10">{a.hero_image ? <img src={a.hero_image} className="w-full h-full object-cover"/> : null}</div>
              <div className="p-4">
                <p className="text-white font-medium">{a.title}</p>
                {a.excerpt && <p className="text-white/70 text-sm mt-1 line-clamp-2">{a.excerpt}</p>}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
export default Articles