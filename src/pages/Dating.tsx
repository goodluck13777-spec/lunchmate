import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Clock, CreditCard, MapPin, Users, X } from 'lucide-react'
import { Page, Stagger } from '../components/ui'
import PageHeader from '../components/PageHeader'
import MateCard from '../components/MateCard'
import { MATES } from '../data'
import type { Mate } from '../data'

const AREAS = ['전체', '성수', '강남', '판교', '신촌', '홍대', '잠실']
const TIMES = ['점심 12:00', '점심 12:30', '퇴근 18:30', '저녁 19:30', '저녁 20:00']
const AGES = ['20대 초반', '20대 중반', '20대 후반', '30대 초반', '30대 중반']

function FilterRow({ label, icon: Icon, options, value, onChange }: { label: string; icon: any; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-sm font-bold text-[#7A6258]">
        <Icon className="h-4 w-4 text-coral-500" /> {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
              value === o ? 'bg-sunset-gradient text-white shadow-glow' : 'bg-white/70 text-[#6E574E] ring-1 ring-coral-100 hover:bg-white'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function BookingModal({ mate, onClose }: { mate: Mate; onClose: () => void }) {
  const [paid, setPaid] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-[#7A6258] backdrop-blur transition hover:bg-white">
          <X className="h-4.5 w-4.5" />
        </button>

        {paid ? (
          <div className="p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sunset-gradient text-white shadow-glow">
              <Check className="h-8 w-8" />
            </motion.div>
            <h3 className="mt-5 font-display text-2xl font-extrabold">신청 완료! 💌</h3>
            <p className="mt-2 text-[#6E574E]">{mate.name}님에게 소개팅 신청을 보냈어요. 수락하면 알림으로 알려드릴게요.</p>
            <button onClick={onClose} className="btn-primary mt-6 w-full justify-center">확인</button>
          </div>
        ) : (
          <>
            <div className={`relative grid h-32 place-items-center bg-gradient-to-br ${mate.gradient} text-6xl`}>{mate.emoji}</div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-extrabold">{mate.name} · {mate.age}</h3>
              <p className="text-[#6E574E]">{mate.job} · {mate.area} · {mate.mbti}</p>

              <div className="mt-5 space-y-3 rounded-2xl bg-cream p-4">
                {[
                  ['일정', '오늘 점심 12:30', Clock],
                  ['장소', '성수 브런치 카페 (추천)', MapPin],
                  ['AI 매칭', `${mate.match}% · 매우 잘 맞아요`, Users],
                ].map(([l, v, Icon]: any) => (
                  <div key={l} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-coral-500 shadow-soft"><Icon className="h-4.5 w-4.5" /></span>
                    <div>
                      <p className="text-xs font-semibold text-[#9B8278]">{l}</p>
                      <p className="text-sm font-bold text-[#3A2820]">{v}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-coral-100 px-4 py-3">
                <span className="font-semibold text-[#6E574E]">소개팅 신청비</span>
                <span className="font-display text-xl font-extrabold text-gradient">₩9,900</span>
              </div>

              <button onClick={() => setPaid(true)} className="btn-primary mt-5 w-full justify-center text-base">
                <CreditCard className="h-5 w-5" /> 신청하고 결제하기
              </button>
              <p className="mt-3 text-center text-xs text-[#9B8278]">상대가 수락하지 않으면 100% 환불돼요 🛟</p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Dating() {
  const [area, setArea] = useState('전체')
  const [time, setTime] = useState('점심 12:30')
  const [ageRange, setAgeRange] = useState('20대 후반')
  const [selected, setSelected] = useState<Mate | null>(null)

  const filtered = useMemo(() => (area === '전체' ? MATES : MATES.filter((m) => m.area === area)), [area])

  return (
    <Page>
      <PageHeader
        eyebrow="1:1 소개팅"
        title={<>오늘, <span className="text-gradient">단 한 사람</span>을 만나요</>}
        desc="지역·시간·희망 연령을 고르면 AI가 가장 잘 맞는 분을 추천해요."
      />

      <section className="section-pad">
        <div className="rounded-[1.75rem] glass p-5 shadow-soft sm:p-6">
          <div className="grid gap-5 md:grid-cols-3">
            <FilterRow label="지역" icon={MapPin} options={AREAS} value={area} onChange={setArea} />
            <FilterRow label="시간" icon={Clock} options={TIMES} value={time} onChange={setTime} />
            <FilterRow label="희망 연령" icon={Users} options={AGES} value={ageRange} onChange={setAgeRange} />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="font-semibold text-[#7A6258]"><span className="font-extrabold text-coral-600">{filtered.length}명</span>의 추천 메이트</p>
          <span className="chip">{area} · {time}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-3xl glass p-12 text-center text-[#7A6258]">
            <div className="text-5xl">🔍</div>
            <p className="mt-3 font-semibold">해당 지역엔 아직 추천이 없어요. 다른 지역을 골라보세요!</p>
          </div>
        ) : (
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m, i) => (
              <div key={m.id} className="cursor-pointer" onClick={() => setSelected(m)}>
                <MateCard mate={m} index={i} />
              </div>
            ))}
          </Stagger>
        )}
      </section>

      <AnimatePresence>
        {selected && <BookingModal mate={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Page>
  )
}
