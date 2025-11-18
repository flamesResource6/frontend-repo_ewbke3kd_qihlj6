import { useEffect, useState } from 'react'

function Collections(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async ()=>{
      const res = await fetch(`${backend}/api/collections?limit=24`)
      const data = await res.json()
      setItems(data.items||[])
      setLoading(false)
    }
    load()
  },[])

  return (
    <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-white py-6">Collections</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i)=> <div key={i} className="aspect-[4/3] rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ):(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(c=> (
            <div key={c._id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-[4/3] bg-white/10">{c.cover_image ? <img src={c.cover_image} className="w-full h-full object-cover"/> : null}</div>
              <div className="p-4">
                <p className="text-white font-medium">{c.title}</p>
                {c.description && <p className="text-white/70 text-sm mt-1 line-clamp-2">{c.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default Collections