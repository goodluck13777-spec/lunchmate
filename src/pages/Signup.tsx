import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Briefcase, Check, GraduationCap, PartyPopper, Sparkles } from 'lucide-react'
import { Page, FloatingBlob } from '../components/ui'
import { DATE_STYLES, INTERESTS, MBTI_LIST } from '../data'

const TOTAL = 4

function Pill({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-sunset-gradient text-white shadow-glow scale-105'
          : 'bg-white/70 text-[#6E574E] ring-1 ring-coral-100 hover:bg-white'
      }`}
    >
      {children}
    </button>
  )
}

export default function Signup() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [type, setType] = useState<'학생' | '직장인' | null>(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [mbti, setMbti] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [smoke, setSmoke] = useState<string>('')
  const [drink, setDrink] = useState<string>('')
  const [style, setStyle] = useState<string>('')

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 6 ? [...prev, i] : prev))

  const canNext =
    (step === 0 && type && name && age) ||
    (step === 1 && mbti) ||
    (step === 2 && interests.length >= 2) ||
    (step === 3 && smoke && drink && style)

  const next = () => (step < TOTAL - 1 ? setStep((s) => s + 1) : setDone(true))

  if (done) {
    return (
      <Page>
        <section className="relative grain min-h-[80vh] overflow-hidden pt-32">
          <FloatingBlob className="left-1/4 top-20 h-72 w-72 bg-coral-300/40" />
          <FloatingBlob className="right-1/4 top-32 h-72 w-72 bg-grape-400/30" delay={1.5} />
          <div className="section-pad relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-lg rounded-[2.5rem] glass p-10 text-center shadow-soft"
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sunset-gradient text-white shadow-glow"
              >
                <PartyPopper className="h-10 w-10" />
              </motion.div>
              <h2 className="mt-6 font-display text-3xl font-extrabold">환영해요, {name}님! 🎉</h2>
              <p className="mt-3 text-[#6E574E]">
                프로필 등록이 완료됐어요. AI가 <span className="font-bold text-coral-600">{mbti}</span> · {interests.length}개 관심사를 분석해
                가장 잘 맞는 메이트를 찾고 있어요.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[type, mbti, style, ...interests.slice(0, 3)].map((t, i) => (
                  <span key={i} className="chip">{t}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/ai" className="btn-primary">AI 매칭 결과 보기 <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/dating" className="btn-ghost">메이트 둘러보기</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Page>
    )
  }

  return (
    <Page>
      <section className="relative grain overflow-hidden pt-28 sm:pt-32">
        <FloatingBlob className="left-[-6%] top-20 h-64 w-64 bg-coral-300/35" />
        <FloatingBlob className="right-[-6%] top-10 h-72 w-72 bg-sunset-400/35" delay={2} />
        <div className="section-pad relative">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <span className="chip mb-4 shadow-soft"><Sparkles className="h-3.5 w-3.5 text-coral-500" /> 1분 프로필 등록</span>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">나를 소개할 시간이에요</h1>
            </div>

            {/* progress */}
            <div className="mt-8 flex items-center gap-2">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-coral-100">
                  <motion.div
                    className="h-full rounded-full bg-sunset-gradient"
                    initial={false}
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold text-[#9B8278]">STEP {step + 1} / {TOTAL}</p>

            <div className="mt-6 rounded-[2rem] glass p-6 shadow-soft sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  {step === 0 && (
                    <div>
                      <h3 className="font-display text-xl font-extrabold">먼저, 어떤 분이세요?</h3>
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {([['직장인', Briefcase, '💼'], ['학생', GraduationCap, '🎓']] as const).map(([t, Icon, e]) => (
                          <button
                            key={t}
                            onClick={() => setType(t)}
                            className={`rounded-3xl border-2 p-6 text-center transition-all ${
                              type === t ? 'border-coral-400 bg-coral-50 shadow-soft' : 'border-transparent bg-white/70 ring-1 ring-coral-100'
                            }`}
                          >
                            <div className="text-4xl">{e}</div>
                            <p className="mt-2 font-bold">{t}</p>
                          </button>
                        ))}
                      </div>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-semibold text-[#7A6258]">닉네임</label>
                          <input
                            value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 지우"
                            className="mt-1.5 w-full rounded-2xl border border-coral-100 bg-white/80 px-4 py-3 outline-none transition focus:border-coral-300 focus:ring-2 focus:ring-coral-100"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#7A6258]">나이</label>
                          <input
                            value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))} placeholder="예: 28" inputMode="numeric"
                            className="mt-1.5 w-full rounded-2xl border border-coral-100 bg-white/80 px-4 py-3 outline-none transition focus:border-coral-300 focus:ring-2 focus:ring-coral-100"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="font-display text-xl font-extrabold">당신의 MBTI는?</h3>
                      <p className="mt-1 text-sm text-[#9B8278]">성향 매칭의 핵심 재료예요.</p>
                      <div className="mt-5 grid grid-cols-4 gap-2.5">
                        {MBTI_LIST.map((m) => (
                          <button
                            key={m}
                            onClick={() => setMbti(m)}
                            className={`rounded-2xl py-3 text-sm font-bold transition-all ${
                              mbti === m ? 'bg-sunset-gradient text-white shadow-glow scale-105' : 'bg-white/70 text-[#6E574E] ring-1 ring-coral-100 hover:bg-white'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="font-display text-xl font-extrabold">관심사 & 취미를 골라주세요</h3>
                      <p className="mt-1 text-sm text-[#9B8278]">2~6개 선택 · {interests.length}개 선택됨</p>
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {INTERESTS.map((i) => (
                          <Pill key={i} active={interests.includes(i)} onClick={() => toggleInterest(i)}>
                            {interests.includes(i) && <Check className="mr-1 inline h-3.5 w-3.5" />}#{i}
                          </Pill>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-display text-lg font-extrabold">흡연 여부</h3>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {['비흡연', '가끔', '흡연'].map((o) => <Pill key={o} active={smoke === o} onClick={() => setSmoke(o)}>{o}</Pill>)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-extrabold">음주 여부</h3>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {['안 해요', '가끔', '즐겨요'].map((o) => <Pill key={o} active={drink === o} onClick={() => setDrink(o)}>{o}</Pill>)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-extrabold">연애 스타일</h3>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {DATE_STYLES.map((o) => <Pill key={o} active={style === o} onClick={() => setStyle(o)}>{o}</Pill>)}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-semibold text-[#7A6258] transition hover:bg-white ${step === 0 ? 'invisible' : ''}`}
                >
                  <ArrowLeft className="h-4 w-4" /> 이전
                </button>
                <button
                  onClick={next}
                  disabled={!canNext}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-glow"
                >
                  {step === TOTAL - 1 ? '완료하기' : '다음'} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
