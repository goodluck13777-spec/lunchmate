import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight, Brain, Clock, Coffee, Heart, MapPin, Sparkles, Star, Users, Utensils,
} from 'lucide-react'
import { Page, Reveal, Stagger, staggerItem, FloatingBlob, SectionHeading } from '../components/ui'
import MateCard from '../components/MateCard'
import { MATES, PLACES, REVIEWS, STATS, STEPS } from '../data'

const FEATURES = [
  { icon: Clock, title: '점심시간 소개팅', desc: '12시 점심 한 끼, 1시간이면 충분해요. 바쁜 일상 속 가장 가벼운 설렘.', color: 'from-coral-400 to-sunset-500' },
  { icon: Coffee, title: '퇴근 후 소개팅', desc: '하루를 마무리하며 와인 한 잔. 여유로운 저녁의 진짜 대화.', color: 'from-sunset-400 to-coral-400' },
  { icon: Users, title: '그룹 미팅', desc: '3:3부터 6:6까지. 친구들과 함께라 더 편안한 만남.', color: 'from-grape-400 to-coral-400' },
  { icon: Brain, title: 'AI 성향 매칭', desc: 'MBTI·관심사·연애 스타일을 분석해 가장 잘 맞는 상대를 찾아요.', color: 'from-coral-500 to-grape-500' },
  { icon: MapPin, title: '장소 자동 추천', desc: '둘 다 좋아할 제휴 카페·레스토랑을 동선까지 고려해 추천.', color: 'from-sunset-500 to-coral-400' },
  { icon: Heart, title: '진심 어린 후기', desc: '3,200쌍의 진짜 성공 스토리가 다음 인연을 응원해요.', color: 'from-coral-400 to-grape-400' },
]

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yCards = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative grain overflow-hidden pb-16 pt-28 sm:pt-36">
      <FloatingBlob className="left-[-8%] top-24 h-72 w-72 bg-coral-300/40" />
      <FloatingBlob className="right-[-6%] top-10 h-80 w-80 bg-sunset-400/40" delay={1.5} />
      <FloatingBlob className="bottom-0 left-1/3 h-72 w-72 bg-grape-400/30" delay={3} />

      <div className="section-pad relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y: yText, opacity }}>
          <Reveal>
            <span className="chip mb-5 shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-coral-500" /> AI가 찾아주는 운명의 점심 메이트
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              점심 한 끼로<br />시작하는 <span className="text-gradient">설렘</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#6E574E]">
              바쁜 직장인과 학생을 위한 소개팅 · 그룹 미팅 플랫폼.
              점심시간, 퇴근 후 — 가장 자연스러운 순간에 가장 잘 맞는 사람을 만나보세요.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/signup" className="btn-primary text-base">
                무료로 시작하기 <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <Link to="/ai" className="btn-ghost text-base">
                <Brain className="h-4.5 w-4.5" /> AI 매칭 체험
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-3">
                {['🌷', '🏔️', '📚', '🎧'].map((e, i) => (
                  <span key={i} className="grid h-10 w-10 place-items-center rounded-full border-2 border-cream bg-white text-lg shadow-soft">{e}</span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-coral-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />)}
                </div>
                <p className="text-sm font-semibold text-[#6E574E]">12.8만+ 명이 함께하는 중</p>
              </div>
            </div>
          </Reveal>
        </motion.div>

        <motion.div style={{ y: yCards }} className="relative">
          <div className="relative mx-auto max-w-sm">
            <motion.div
              className="absolute -left-10 -top-6 z-20 w-44 rounded-3xl glass p-4 shadow-soft"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-grape-500/15 text-grape-600"><Brain className="h-4.5 w-4.5" /></span>
                <div>
                  <p className="text-xs font-semibold text-[#9B8278]">AI 매칭 점수</p>
                  <p className="font-display text-lg font-extrabold text-gradient">96%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-8 top-1/3 z-20 w-40 rounded-3xl glass p-4 shadow-soft"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-sunset-400/20 text-sunset-600"><MapPin className="h-4.5 w-4.5" /></span>
                <div>
                  <p className="text-xs font-semibold text-[#9B8278]">추천 장소</p>
                  <p className="text-sm font-bold text-[#3A2820]">성수 브런치 카페</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 left-1/4 z-20 inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 shadow-soft"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Utensils className="h-4 w-4 text-coral-500" />
              <span className="text-sm font-bold text-[#3A2820]">오늘 점심 12:30 ☀️</span>
            </motion.div>

            <MateCard mate={MATES[0]} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="section-pad relative -mt-2">
      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="glass rounded-3xl p-5 text-center shadow-soft">
            <div className="text-3xl">{s.emoji}</div>
            <div className="mt-2 font-display text-2xl font-extrabold text-gradient sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-sm font-semibold text-[#7A6258]">{s.label}</div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}

function Features() {
  return (
    <section className="section-pad mt-28">
      <SectionHeading
        eyebrow="왜 LunchMate일까요"
        title={<>설렘을 설계하는 <span className="text-gradient">6가지 방법</span></>}
        desc="가벼운 한 끼부터 진지한 만남까지. 당신의 하루에 자연스럽게 스며드는 인연."
      />
      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl bg-white/70 p-7 shadow-soft ring-1 ring-white/60 backdrop-blur-xl"
          >
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.color} opacity-10 blur-2xl transition group-hover:opacity-25`} />
            <span className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-glow`}>
              <f.icon className="h-7 w-7" />
            </span>
            <h3 className="relative mt-5 font-display text-xl font-extrabold">{f.title}</h3>
            <p className="relative mt-2.5 leading-relaxed text-[#6E574E]">{f.desc}</p>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="section-pad mt-28">
      <SectionHeading
        eyebrow="이렇게 진행돼요"
        title={<>단 <span className="text-gradient">4단계</span>, 1분이면 충분해요</>}
      />
      <div className="relative mt-14">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-coral-200 via-sunset-400/40 to-transparent lg:block" />
        <div className="grid gap-5 lg:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.05}>
              <div className={`flex flex-col items-center gap-6 lg:flex-row ${i % 2 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`flex-1 ${i % 2 ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                  <div className="glass inline-block rounded-3xl p-6 text-left shadow-soft">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{s.emoji}</span>
                      <span className="font-display text-sm font-extrabold text-coral-400">STEP {s.step}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-extrabold">{s.title}</h3>
                    <p className="mt-1.5 max-w-sm text-[#6E574E]">{s.desc}</p>
                  </div>
                </div>
                <span className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sunset-gradient font-display font-extrabold text-white shadow-glow">
                  {s.step}
                </span>
                <div className="hidden flex-1 lg:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MatePreview() {
  return (
    <section className="section-pad mt-28">
      <div className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center">
        <SectionHeading
          center={false}
          eyebrow="오늘의 추천"
          title={<>당신을 기다리는 <span className="text-gradient">메이트</span></>}
          desc="AI가 당신의 성향을 분석해 가장 잘 맞는 분들을 골랐어요."
        />
        <Link to="/dating" className="btn-ghost shrink-0">전체 보기 <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MATES.slice(0, 3).map((m, i) => <MateCard key={m.id} mate={m} index={i} />)}
      </Stagger>
    </section>
  )
}

function PlacesPreview() {
  return (
    <section className="section-pad mt-28">
      <SectionHeading
        eyebrow="장소 자동 추천"
        title={<>분위기까지 <span className="text-gradient">완벽한 곳</span>으로</>}
        desc="LunchMate 제휴 카페·레스토랑에서 특별한 첫 만남을 시작하세요."
      />
      <Stagger className="mt-10 grid gap-5 sm:grid-cols-3">
        {PLACES.slice(0, 3).map((p) => (
          <motion.div key={p.id} variants={staggerItem} whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl bg-white/70 shadow-soft ring-1 ring-white/60 backdrop-blur-xl">
            <div className={`relative grid h-40 place-items-center bg-gradient-to-br ${p.gradient} text-6xl`}>
              <span className="transition group-hover:scale-110">{p.emoji}</span>
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-coral-600 shadow">{p.category}</span>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} /> {p.rating}
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold text-sunset-600">📍 {p.area} · {p.tag}</p>
              <h3 className="mt-1.5 font-display text-lg font-extrabold">{p.name}</h3>
              <p className="mt-2 inline-flex rounded-full bg-coral-50 px-3 py-1 text-xs font-bold text-coral-600">🎁 {p.perk}</p>
            </div>
          </motion.div>
        ))}
      </Stagger>
      <div className="mt-8 text-center">
        <Link to="/places" className="btn-ghost">제휴 장소 더 보기 <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  )
}

function ReviewsPreview() {
  return (
    <section className="section-pad mt-28">
      <SectionHeading
        eyebrow="진짜 성공 스토리"
        title={<>점심이 <span className="text-gradient">인연</span>이 된 순간</>}
      />
      <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <motion.div key={r.id} variants={staggerItem} className="relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-soft ring-1 ring-white/60 backdrop-blur-xl">
            <div className={`mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${r.gradient} text-2xl shadow-glow`}>{r.emoji}</div>
            <div className="flex items-center gap-1 text-coral-500">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />)}
            </div>
            <h3 className="mt-3 font-display text-lg font-extrabold">"{r.title}"</h3>
            <p className="mt-2 line-clamp-3 leading-relaxed text-[#6E574E]">{r.body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-coral-50 pt-4">
              <span className="font-bold text-coral-600">{r.couple}</span>
              <span className="text-xs font-semibold text-[#9B8278]">D+{r.days}</span>
            </div>
          </motion.div>
        ))}
      </Stagger>
      <div className="mt-8 text-center">
        <Link to="/reviews" className="btn-ghost">후기 전체 보기 <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="section-pad mt-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-romance-gradient px-7 py-16 text-center text-white shadow-glow sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -left-10 top-0 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-sunset-400/40 blur-3xl" />
          <motion.div
            className="pointer-events-none absolute right-12 top-10 text-4xl"
            animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >💌</motion.div>
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles className="h-4 w-4" /> 지금 가입하면 첫 매칭 무료
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              오늘 점심, 운명을 만날<br />준비가 되셨나요?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/90">1분 프로필 등록으로 가장 잘 맞는 사람을 만나보세요.</p>
            <Link to="/signup" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-coral-600 shadow-2xl transition hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.3)]">
              무료로 시작하기 <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <MatePreview />
      <PlacesPreview />
      <ReviewsPreview />
      <FinalCTA />
    </Page>
  )
}
