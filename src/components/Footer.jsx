function Footer(){
  return (
    <footer className="px-5 md:px-8 py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-sm text-white/60 space-y-2">
        <p>Affiliate disclosure: We may earn a commission from qualifying purchases.</p>
        <p className="text-white/40">© {new Date().getFullYear()} Roomly. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
