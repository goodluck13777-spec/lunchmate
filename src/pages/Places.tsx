import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, MapPin, Star } from 'lucide-react'
import { Page, Stagger, staggerItem } from '../components/ui'
import PageHeader from '../components/PageHeader'
import { PLACES } from '../data'

const CATS = ['전체', '제휴 카페', '브런치', '레스토랑'] as const

export default function Places() {
  const [cat, setCat] = useState<(typeof CATS)[number]>('전체')
  const places = useMemo(() => (cat === '전체' ? PLACES : PLACES.filter((p) => p.category === cat)), [cat])

  return (
    <Page>
      <PageHeader
        eyebrow="장소 자동 추천"
        title={<>첫 만남이 빛나는 <span className="text-gradient">완벽한 장소</span></>}
        desc="두 사람의 위치와 취향을 고려해 LunchMate가 제휴 공간을 추천해요. 특별 혜택은 덤!"
      />

      <section className="section-pad">
        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                cat === c ? 'bg-sunset-gradient text-white shadow-glow scale-105' : 'bg-white/70 text-[#6E574E] ring-1 ring-coral-100 hover:bg-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p) => (
            <motion.div
              key={p.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[1.75rem] bg-white/70 shadow-soft ring-1 ring-white/60 backdrop-blur-xl"
            >
              <div className={`relative grid h-48 place-items-center bg-gradient-to-br ${p.gradient} text-7xl`}>
                <span className="transition duration-500 group-hover:scale-110">{p.emoji}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-coral-600 shadow backdrop-blur">{p.category}</span>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                  <Star className="h-3 w-3" fill="currentColor" strokeWidth={0} /> {p.rating}
                </span>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-[#3A2820] backdrop-blur">
                  <MapPin className="h-3 w-3 text-coral-500" /> {p.area}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-sunset-600">{p.tag}</p>
                <h3 className="mt-1.5 font-display text-xl font-extrabold">{p.name}</h3>
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-coral-50 px-4 py-3">
                  <Gift className="h-5 w-5 shrink-0 text-coral-500" />
                  <span className="text-sm font-bold text-coral-700">{p.perk}</span>
                </div>
                <button className="mt-4 w-full rounded-full border border-coral-200 bg-white/70 py-3 font-bold text-coral-600 transition hover:bg-white">
                  이 장소로 만남 잡기
                </button>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>
    </Page>
  )
}
