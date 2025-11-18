import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

function SearchPage(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [results, setResults] = useState({products:[], articles:[]})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async ()=>{
      setLoading(true)
      const res = await fetch(`${backend}/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data)
      setLoading(false)
    }
    if (q) load()
  }, [q])

  if (!q) return <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto text-white/80">Type something to search.</div>

  return (
    <div className="px-5 md:px-8 pb-16 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-white py-6">Search results for "{q}"</h1>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({length:9}).map((_,i)=> <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />)}
        </div>
      ) : (
        <>
          <h2 className="text-white/80 text-sm mt-4 mb-2">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {results.products.map(p => (
              <Link key={p._id} to={`/product/${p._id}`} className="block overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="aspect-[4/3] bg-white/10">{p.image ? <img src={p.image} className="w-full h-full object-cover"/> : null}</div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium line-clamp-1">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-white/80 text-sm mt-6 mb-2">Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.articles.map(a => (
              <Link key={a._id} to={`/articles/${a.slug}`} className="block overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="aspect-video bg-white/10">{a.hero_image ? <img src={a.hero_image} className="w-full h-full object-cover"/> : null}</div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium line-clamp-1">{a.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
export default SearchPage