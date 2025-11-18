import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function InlineProduct({p}){
  return (
    <a href={p.url || '#'} className="flex items-center justify-between px-3 py-2 rounded border border-white/15 hover:bg-white/10 transition">
      <div className="text-sm text-white/90">{p.title || p.retailer}</div>
      <div className="text-white font-medium text-sm">Shop</div>
    </a>
  )
}

function ArticleDetail(){
  const { slug } = useParams()
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async ()=>{
      try{
        const res = await fetch(`${backend}/api/articles/${slug}`)
        const data = await res.json()
        setArticle(data)
      }catch(e){
        setArticle(null)
      }finally{ setLoading(false) }
    }
    load()
  }, [slug])

  if (loading) return <div className="px-5 md:px-8 pb-16 max-w-3xl mx-auto"><div className="aspect-video rounded-2xl bg-white/10 animate-pulse"/></div>
  if (!article) return <div className="px-5 md:px-8 pb-16 max-w-3xl mx-auto text-white/70">Not found</div>

  const inline = article.inline_products || []

  return (
    <div className="px-5 md:px-8 pb-16 max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-2xl bg-white/10 aspect-video mb-6">
        {article.hero_image ? <img src={article.hero_image} alt={article.title} className="w-full h-full object-cover"/> : null}
      </div>
      <h1 className="text-3xl font-semibold text-white">{article.title}</h1>
      {article.excerpt && <p className="text-white/80 mt-3">{article.excerpt}</p>}
      {article.content && <div className="prose prose-invert mt-6" dangerouslySetInnerHTML={{__html: article.content}} />}

      {inline.length ? (
        <div className="mt-8">
          <h3 className="text-white font-semibold mb-3">Shop this look</h3>
          <div className="space-y-2">
            {inline.map((p,i)=> <InlineProduct key={i} p={p} />)}
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default ArticleDetail