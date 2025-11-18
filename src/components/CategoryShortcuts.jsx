import { Sofa, BedDouble, CookingPot, Bath, Monitor } from 'lucide-react'

const rooms = [
  { name: 'Living Room', icon: Sofa, slug: 'living-room' },
  { name: 'Bedroom', icon: BedDouble, slug: 'bedroom' },
  { name: 'Kitchen', icon: CookingPot, slug: 'kitchen' },
  { name: 'Bathroom', icon: Bath, slug: 'bathroom' },
  { name: 'Home Office', icon: Monitor, slug: 'home-office' },
]

function CategoryShortcuts() {
  return (
    <section className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
      {rooms.map(({ name, icon: Icon, slug }) => (
        <a key={slug} href={`#/category/${slug}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">{name}</p>
              <p className="text-white/60 text-xs">Guides, moodboards, picks</p>
            </div>
          </div>
        </a>
      ))}
    </section>
  )
}

export default CategoryShortcuts
