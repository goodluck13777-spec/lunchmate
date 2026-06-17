import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarHeart, CreditCard, Heart, Settings, Sparkles } from 'lucide-react'
import { Page, FloatingBlob } from '../components/ui'
import { MATES } from '../data'

const TABS = [
  { key: 'history', label: '참여 이력', icon: CalendarHeart },
  { key: 'liked', label: '찜한 상대', icon: Heart },
  { key: 'payments', label: '결제 내역', icon: CreditCard },
] as const

const HISTORY = [
  { emoji: '☕', title: '지우님과 점심 소개팅', date: '6월 14일 12:30', place: '아우어 베이커리 성수', status: '완료', color: 'text-emerald-600 bg-emerald-50' },
  { emoji: '🍷', title: '성수 와인바 3:3 그룹 미팅', date: '6월 7일 19:30', place: '소소한 풍경', status: '완료', color: 'text-emerald-600 bg-emerald-50' },
  { emoji: '🥐', title: '강남 브런치 4:4 미팅', date: '6월 20일 12:00', place: '브런치 앤 모어', status: '예정', color: 'text-coral-600 bg-coral-50' },
]

const PAYMENTS = [
  { title: '1:1 소개팅 신청비', date: '6월 14일', amount: '9,900', method: '카카오페이' },
  { title: '그룹 미팅 (3:3) 참여비', date: '6월 7일', amount: '15,000', method: '신용카드' },
  { title: '프리미엄 매칭 1개월', date: '6월 1일', amount: '19,900', method: '신용카드' },
]

export default function MyPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('history')

  return (
    <Page>
      <section className="relative grain overflow-hidden pt-28 sm:pt-32">
        <FloatingBlob className="left-[-6%] top-16 h-64 w-64 bg-coral-300/30" />
        <FloatingBlob className="right-[-6%] top-8 h-72 w-72 bg-grape-400/25" delay={2} />
        <div className="section-pad relative">
          {/* profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2rem] glass p-7 shadow-soft sm:p-9"
          >
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative">
                <div className="grid h-24 w-24 place-items-center rounded-3xl bg-sunset-gradient text-5xl shadow-glow">🙂</div>
                <span className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full bg-white text-coral-500 shadow-soft ring-1 ring-coral-100">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <h1 className="font-display text-2xl font-extrabold">수민</h1>
                  <span className="rounded-full bg-grape-500/10 px-2.5 py-0.5 text-xs font-bold text-grape-600">ENFP</span>
                  <span className="rounded-full bg-coral-50 px-2.5 py-0.5 text-xs font-bold text-coral-600">직장인</span>
                </div>
                <p className="mt-1 text-[#6E574E]">서울 성수 · 28세 · 프리미엄 멤버 👑</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                  {['카페투어', '전시·미술', '재즈'].map((t) => (
                    <span key={t} className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-coral-600 ring-1 ring-coral-100">#{t}</span>
                  ))}
                </div>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-white/70 px-5 py-2.5 font-semibold text-coral-600 transition hover:bg-white">
                <Settings className="h-4.5 w-4.5" /> 프로필 수정
              </button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-coral-50 pt-6">
              {[['매칭 횟수', '24'], ['찜한 상대', '6'], ['성공 매칭', '3']].map(([l, v]) => (
                <div key={l} className="text-center">
                  <div className="font-display text-2xl font-extrabold text-gradient">{v}</div>
                  <div className="text-sm font-semibold text-[#7A6258]">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* tabs */}
          <div className="mt-8 flex gap-2 rounded-full bg-white/60 p-1.5 shadow-soft ring-1 ring-white/60 backdrop-blur">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-3 text-sm font-bold transition ${
                  tab === t.key ? 'text-white' : 'text-[#6E574E] hover:text-coral-500'
                }`}
              >
                {tab === t.key && (
                  <motion.span layoutId="mypage-tab" className="absolute inset-0 -z-10 rounded-full bg-sunset-gradient shadow-glow" transition={{ type: 'spring', stiffness: 360, damping: 30 }} />
                )}
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          {/* content */}
          <div className="mt-6 pb-4">
            {tab === 'history' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                {HISTORY.map((h, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-3xl bg-white/70 p-5 shadow-soft ring-1 ring-white/60 backdrop-blur">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-cream text-2xl">{h.emoji}</span>
                    <div className="flex-1">
                      <p className="font-display font-extrabold">{h.title}</p>
                      <p className="text-sm text-[#7A6258]">{h.date} · {h.place}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${h.color}`}>{h.status}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === 'liked' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MATES.slice(0, 6).map((m) => (
                  <div key={m.id} className="flex items-center gap-3 rounded-3xl bg-white/70 p-4 shadow-soft ring-1 ring-white/60 backdrop-blur">
                    <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${m.gradient} text-2xl shadow-glow`}>{m.emoji}</span>
                    <div className="flex-1">
                      <p className="font-display font-extrabold">{m.name} · {m.age}</p>
                      <p className="text-sm text-[#7A6258]">{m.area} · {m.mbti}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-coral-50 px-2.5 py-1 text-xs font-bold text-coral-600">
                      <Sparkles className="h-3 w-3" /> {m.match}%
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === 'payments' && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl bg-white/70 shadow-soft ring-1 ring-white/60 backdrop-blur">
                {PAYMENTS.map((p, i) => (
                  <div key={i} className={`flex items-center justify-between gap-4 p-5 ${i !== PAYMENTS.length - 1 ? 'border-b border-coral-50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-coral-50 text-coral-500"><CreditCard className="h-5 w-5" /></span>
                      <div>
                        <p className="font-bold">{p.title}</p>
                        <p className="text-sm text-[#9B8278]">{p.date} · {p.method}</p>
                      </div>
                    </div>
                    <span className="font-display text-lg font-extrabold text-[#3A2820]">₩{p.amount}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Page>
  )
}
