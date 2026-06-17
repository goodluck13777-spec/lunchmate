import { Link } from 'react-router-dom'
import { Heart, Instagram, Sparkles } from 'lucide-react'
import { NAV } from '../data'

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="section-pad">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sunset-gradient px-7 py-14 text-white shadow-glow sm:px-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-grape-500/30 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/20 backdrop-blur">
                  <Heart className="h-5 w-5" fill="white" strokeWidth={0} />
                </span>
                <span className="font-display text-xl font-extrabold">LunchMate</span>
              </div>
              <p className="mt-4 max-w-xs text-white/85">
                점심 한 끼로 시작하는 설렘. 바쁜 당신을 위한 가장 자연스러운 만남.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles className="h-4 w-4" /> AI 매칭 정확도 94%
              </div>
            </div>
            <div>
              <h4 className="font-bold">바로가기</h4>
              <ul className="mt-4 space-y-2.5 text-white/85">
                {NAV.slice(1).map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="transition hover:text-white">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold">함께해요</h4>
              <ul className="mt-4 space-y-2.5 text-white/85">
                <li><Link to="/signup" className="transition hover:text-white">회원가입</Link></li>
                <li><Link to="/mypage" className="transition hover:text-white">마이페이지</Link></li>
                <li className="transition hover:text-white">고객센터</li>
                <li className="transition hover:text-white">제휴 문의</li>
              </ul>
              <a href="#" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
                <Instagram className="h-4 w-4" /> @lunchmate
              </a>
            </div>
          </div>
          <div className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm text-white/75 sm:flex-row">
            <p>© 2026 LunchMate. Made with 🧡 in Seoul.</p>
            <div className="flex gap-5">
              <span>이용약관</span>
              <span>개인정보처리방침</span>
              <span>사업자정보</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
