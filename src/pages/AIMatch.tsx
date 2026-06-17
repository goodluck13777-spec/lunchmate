import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowRight, Brain, Heart, RefreshCw, Sparkles } from 'lucide-react'
import { Page, Reveal } from '../components/ui'
import PageHeader from '../components/PageHeader'
import { MATES } from '../data'

const BREAKDOWN = [
  { label: '성향 궁합', key: 'mbti', emoji: '🧠' },
  { label: '관심사 일치', key: 'interest', emoji: '🎯' },
  { label: '라이프스타일', key: 'life', emoji: '🌿' },
  { label: '대화 코드', key: 'talk', emoji: '💬' },
]

function scoresFor(match: number) {
  return {
    mbti: Math.min(99, match + 2),
    interest: Math.min(99, match - 1),
    life: Math.max(60, match - 8),
    talk: Math.min(99, match + 1),
  }
}

function Gauge({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] })
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return () => { controls.stop(); unsub() }
  }, [value])

  const R = 84
  const C = 2 * Math.PI * R
  return (
    <div className="relative grid h-56 w-56 place-items-center">
      <svg className="h-56 w-56 -rotate-90" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={R} fill="none" stroke="#FFE0D9" strokeWidth="16" />
        <defs>
          <linearGradient id="gauge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF5A5F" />
            <stop offset="0.5" stopColor="#FF8E53" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="100" cy="100" r={R} fill="none" stroke="url(#gauge)" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (C * value) / 100 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-5xl font-extrabold text-gradient">{display}%</div>
        <div className="text-sm font-bold text-[#9B8278]">매칭 점수</div>
      </div>
    </div>
  )
}

export default function AIMatch() {
  const [idx, setIdx] = useState(0)
  const [analyzing, setAnalyzing] = useState(true)
  const mate = MATES[idx]
  const scores = scoresFor(mate.match)
  const myInterests = ['카페투어', '전시·미술', '재즈', '러닝', '와인']
  const common = mate.interests.filter((i) => myInterests.includes(i))

  const run = () => {
    setAnalyzing(true)
    const t = setTimeout(() => setAnalyzing(false), 1500)
    return () => clearTimeout(t)
  }
  useEffect(run, [idx])

  return (
    <Page>
      <PageHeader
        eyebrow="AI 성향 매칭"
        title={<>데이터가 찾아낸 <span className="text-gradient">완벽한 케미</span></>}
        desc="12.8만 매칭 데이터로 성향·관심사·라이프스타일을 분석해요."
      />

      <section className="section-pad">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* left: candidate + gauge */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] glass p-8 text-center shadow-soft">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-coral-300/30 blur-3xl" />
              <div className="flex items-center justify-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-coral-50 text-3xl ring-1 ring-coral-100">🙋</div>
                <Heart className="h-7 w-7 text-coral-500" fill="#FF5A5F" strokeWidth={0} />
                <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${mate.gradient} text-3xl shadow-glow`}>{mate.emoji}</div>
              </div>
              <p className="mt-3 font-bold text-[#3A2820]">나 <span className="font-normal text-[#9B8278]">×</span> {mate.name} ({mate.mbti})</p>

              <div className="mt-4 grid place-items-center">
                <AnimatePresence mode="wait">
                  {analyzing ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid h-56 w-56 place-items-center">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <Brain className="h-12 w-12 text-coral-400" />
                      </motion.div>
                      <p className="mt-4 font-semibold text-[#9B8278]">AI가 분석 중이에요…</p>
                    </motion.div>
                  ) : (
                    <motion.div key="gauge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <Gauge value={mate.match} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="mt-2 text-[#6E574E]">{mate.match >= 90 ? '운명적인 케미예요! 💘' : '함께라면 즐거울 거예요 ✨'}</p>

              <button onClick={() => setIdx((i) => (i + 1) % MATES.length)} className="btn-ghost mt-5">
                <RefreshCw className="h-4 w-4" /> 다른 상대 분석하기
              </button>
            </div>
          </Reveal>

          {/* right: breakdown */}
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] glass p-8 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-xl font-extrabold">
                <Sparkles className="h-5 w-5 text-coral-500" /> 세부 분석 리포트
              </h3>
              <div className="mt-6 space-y-5">
                {BREAKDOWN.map((b, i) => {
                  const v = (scores as any)[b.key] as number
                  return (
                    <div key={b.key}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="font-semibold text-[#3A2820]">{b.emoji} {b.label}</span>
                        <span className="font-display font-extrabold text-coral-600">{analyzing ? '··' : `${v}%`}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-coral-100">
                        <motion.div
                          className="h-full rounded-full bg-sunset-gradient"
                          initial={{ width: 0 }}
                          animate={{ width: analyzing ? 0 : `${v}%` }}
                          transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 rounded-2xl bg-cream p-5">
                <p className="text-sm font-bold text-[#7A6258]">🎯 공통 관심사</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {common.length ? common.map((c) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-coral-600 shadow-soft"
                    >#{c}</motion.span>
                  )) : <span className="text-sm text-[#9B8278]">서로의 새로운 취향을 발견할 기회예요!</span>}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#6E574E]">
                  AI 코멘트 · {mate.name}님과는 <b className="text-coral-600">{common[0] ?? '대화 코드'}</b> 이야기로 자연스럽게 시작해보세요.
                  {mate.mbti.startsWith('E') ? ' 활발한 대화를 즐기는 분이에요.' : ' 깊이 있는 대화를 좋아하는 분이에요.'}
                </p>
              </div>

              <Link to="/dating" className="btn-primary mt-6 w-full justify-center">
                이 분과 소개팅 신청 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
