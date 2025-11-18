import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Collections from './pages/Collections'
import SearchPage from './pages/Search'
import Wishlist from './pages/Wishlist'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App