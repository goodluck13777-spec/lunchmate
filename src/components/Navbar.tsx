import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, User, X } from 'lucide-react'
import { NAV } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="section-pad pt-3 sm:pt-4">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'glass shadow-soft' : 'bg-white/30 backdrop-blur-md border border-white/40'
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 pl-1">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sunset-gradient text-white shadow-glow">
              <Heart className="h-4.5 w-4.5" fill="white" strokeWidth={0} />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              Lunch<span className="text-gradient">Mate</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'text-coral-600' : 'text-[#5C4A42] hover:text-coral-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-coral-50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/mypage"
              className="hidden items-center gap-2 rounded-full border border-coral-100 bg-white/70 px-4 py-2 text-sm font-semibold text-[#5C4A42] transition hover:bg-white sm:inline-flex"
            >
              <User className="h-4 w-4" /> 마이
            </Link>
            <Link to="/signup" className="hidden rounded-full bg-sunset-gradient px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 sm:inline-flex">
              시작하기
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-coral-600 lg:hidden"
              aria-label="메뉴"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="section-pad mt-2 lg:hidden"
          >
            <div className="glass rounded-3xl p-3 shadow-soft">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-base font-semibold ${
                      isActive ? 'bg-coral-50 text-coral-600' : 'text-[#5C4A42]'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 p-1">
                <Link to="/mypage" className="btn-ghost w-full justify-center py-3">마이페이지</Link>
                <Link to="/signup" className="btn-primary w-full justify-center py-3">시작하기</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
