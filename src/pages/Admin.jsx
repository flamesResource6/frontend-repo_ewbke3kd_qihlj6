import { useEffect, useState } from 'react'

function Field({label, ...props}){
  return (
    <label className="block text-sm text-white/80">
      <span className="block mb-1">{label}</span>
      <input {...props} className="w-full bg-white/10 text-white placeholder:text-white/50 px-3 py-2 rounded" />
    </label>
  )
}

function Admin(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [status, setStatus] = useState('')

  const addProduct = async (e)=>{
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const payload = {
      title: f.get('title'),
      brand: f.get('brand') || undefined,
      room: f.get('room') || undefined,
      style: f.get('style') || undefined,
      image: f.get('image') || undefined,
    }
    const res = await fetch(`${backend}/api/products`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setStatus(res.ok ? 'Product created' : 'Error creating product')
    e.currentTarget.reset()
  }

  const addArticle = async (e)=>{
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const payload = {
      title: f.get('title'),
      slug: f.get('slug'),
      hero_image: f.get('hero_image') || undefined,
      excerpt: f.get('excerpt') || undefined,
      content: f.get('content') || undefined,
    }
    const res = await fetch(`${backend}/api/articles`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setStatus(res.ok ? 'Article created' : 'Error creating article')
    e.currentTarget.reset()
  }

  const addLink = async (e)=>{
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const payload = {
      slug: f.get('slug'),
      target: f.get('target'),
      utm_source: f.get('utm_source') || undefined,
      utm_medium: f.get('utm_medium') || undefined,
      utm_campaign: f.get('utm_campaign') || undefined,
    }
    const res = await fetch(`${backend}/api/links`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    setStatus(res.ok ? 'Link created' : 'Error creating link')
    e.currentTarget.reset()
  }

  return (
    <div className="px-5 md:px-8 pb-16 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-white py-6">Admin</h1>
      {status && <div className="mb-4 text-white/80 text-sm">{status}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={addProduct} className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <h2 className="text-white font-medium">Add Product</h2>
          <Field label="Title" name="title" required/>
          <Field label="Brand" name="brand" />
          <Field label="Room" name="room" />
          <Field label="Style" name="style" />
          <Field label="Image URL" name="image" />
          <button className="px-3 py-2 rounded bg-white text-slate-900 text-sm">Create</button>
        </form>

        <form onSubmit={addArticle} className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <h2 className="text-white font-medium">Add Article</h2>
          <Field label="Title" name="title" required/>
          <Field label="Slug" name="slug" required/>
          <Field label="Hero image URL" name="hero_image" />
          <Field label="Excerpt" name="excerpt" />
          <Field label="Content (HTML)" name="content" />
          <button className="px-3 py-2 rounded bg-white text-slate-900 text-sm">Create</button>
        </form>

        <form onSubmit={addLink} className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <h2 className="text-white font-medium">Add Link</h2>
          <Field label="Slug" name="slug" required/>
          <Field label="Target URL" name="target" required/>
          <Field label="UTM Source" name="utm_source" />
          <Field label="UTM Medium" name="utm_medium" />
          <Field label="UTM Campaign" name="utm_campaign" />
          <button className="px-3 py-2 rounded bg-white text-slate-900 text-sm">Create</button>
        </form>
      </div>
    </div>
  )
}
export default Admin