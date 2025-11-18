import Hero from '../components/Hero'
import CategoryShortcuts from '../components/CategoryShortcuts'
import EmailSignup from '../components/EmailSignup'
import FeaturedContent from '../components/FeaturedContent'

function Home(){
  return (
    <div className="px-5 md:px-8 pb-16">
      <div className="max-w-6xl mx-auto">
        <Hero />
        <CategoryShortcuts />
        <EmailSignup />
        <FeaturedContent />
      </div>
    </div>
  )
}
export default Home