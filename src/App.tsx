import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dating from './pages/Dating'
import Group from './pages/Group'
import AIMatch from './pages/AIMatch'
import Places from './pages/Places'
import Reviews from './pages/Reviews'
import MyPage from './pages/MyPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }), [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <div className="relative min-h-screen mesh-bg">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dating" element={<Dating />} />
          <Route path="/group" element={<Group />} />
          <Route path="/ai" element={<AIMatch />} />
          <Route path="/places" element={<Places />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
