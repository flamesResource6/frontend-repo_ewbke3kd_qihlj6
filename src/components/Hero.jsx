import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent pointer-events-none"></div>

      <div className="relative z-10 h-full flex items-end">
        <div className="p-8 md:p-12">
          <span className="inline-block text-xs tracking-widest uppercase text-white/70">Editorial + Shop</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-white leading-tight">
            Design your dream spaces with curated looks and shoppable guides
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Explore room-by-room style guides, moodboards, and the best products from top retailers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#shop" className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-medium hover:bg-white/90 transition">Shop the look</a>
            <a href="#articles" className="px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition">Read guides</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
