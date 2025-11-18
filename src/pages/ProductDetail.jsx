import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PriceRow({link}){
  const href = `/r/${link.slug || ''}`
  return (
    <a href={link.url || href} className="flex items-center justify-between px-3 py-2 rounded border border-white/15 hover:bg-white/10 transition">
      <div className="text-sm text-white/90">{link.retailer}</div>
      <div className="text-white font-medium text-sm">{link.price ? `$${link.price}` : 'View'}</div>
    </a>
  )
}

function ProductDetail(){
  const { id } = useParams()
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async ()=>{
      try{
        const res = await fetch(`${backend}/api/products/${id}`)
        const data = await res.json()
        setProduct(data)
      }catch(e){
        setProduct(null)
      }finally{setLoading(false)}
    }
    load()
  }, [id])

  if (loading) return <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto"><div className="aspect-[16/9] bg-white/10 rounded-2xl animate-pulse"/></div>
  if (!product) return <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto text-white/80">Not found</div>

  const links = product.links || []

  return (
    <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <div className="rounded-2xl overflow-hidden bg-white/10 aspect-square">
        {product.image ? <img src={product.image} alt={product.title} className="w-full h-full object-cover"/> : <div className="w-full h-full grid place-items-center text-white/60">No image</div>}
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-white">{product.title}</h1>
        {product.brand && <p className="text-white/70 text-sm mt-1">{product.brand}</p>}
        {product.summary && <p className="text-white/80 mt-4">{product.summary}</p>}

        <div className="mt-6 space-y-2">
          {links.length ? (
            links.map((l,i)=> <PriceRow key={i} link={l} />)
          ) : (
            <p className="text-white/60 text-sm">No retailer links available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default ProductDetail