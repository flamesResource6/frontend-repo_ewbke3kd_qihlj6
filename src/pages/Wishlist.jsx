import { useEffect, useState } from 'react'

function Wishlist(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId] = useState('anon')

  const load = async ()=>{
    const res = await fetch(`${backend}/api/wishlist?user_id=${userId}`)
    const data = await res.json()
    setItems(data.items||[])
    setLoading(false)
  }

  const remove = async (id)=>{
    await fetch(`${backend}/api/wishlist/${id}`, { method:'DELETE' })
    load()
  }

  useEffect(()=>{load()},[])

  return (
    <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-white py-6">Your Wishlist</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i)=> <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : items.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(i => (
            <div key={i._id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{i.product_id}</p>
                  {i.notes && <p className="text-white/60 text-xs">{i.notes}</p>}
                </div>
                <button onClick={()=>remove(i._id)} className="text-white/80 text-xs hover:text-white">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/70">No saved items yet.</p>
      )}
    </div>
  )
}
export default Wishlist