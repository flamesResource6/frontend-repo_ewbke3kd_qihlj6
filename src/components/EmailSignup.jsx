import { useState } from 'react'

function EmailSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${backend}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'hero-checklist', interests: ['living-room'] })
      })
      if (!res.ok) throw new Error('Failed to subscribe')
      setStatus('success')
      setEmail('')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="md:flex items-center justify-between gap-6">
        <div className="mb-4 md:mb-0">
          <h3 className="text-white text-xl font-semibold">Free: 10-item Living Room Checklist</h3>
          <p className="text-white/70 text-sm">Get the PDF and weekly picks in your inbox.</p>
        </div>
        <form onSubmit={onSubmit} className="flex w-full md:w-auto gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 md:w-72 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="px-4 py-2 rounded-xl bg-white text-slate-900 font-medium hover:bg-white/90 transition">Get it</button>
        </form>
      </div>
      {status === 'success' && <p className="mt-3 text-emerald-300 text-sm">Success! Check your inbox.</p>}
      {status === 'error' && <p className="mt-3 text-rose-300 text-sm">Something went wrong. Please try again.</p>}
    </section>
  )
}

export default EmailSignup
