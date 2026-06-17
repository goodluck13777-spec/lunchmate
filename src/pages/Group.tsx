import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Flame, MapPin, Sparkles, Users } from 'lucide-react'
import { Page, Stagger, staggerItem } from '../components/ui'
import PageHeader from '../components/PageHeader'
import { GROUP_ROOMS } from '../data'
import type { GroupRoom } from '../data'

const SIZES = ['전체', '3:3', '4:4', '5:5', '6:6'] as const

function capacity(size: GroupRoom['size']) {
  return parseInt(size.split(':')[0], 10)
}

function Dots({ filled, total, color }: { filled: number; total: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < filled ? color : 'bg-coral-100'}`} />
      ))}
    </div>
  )
}

function RoomCard({ room }: { room: GroupRoom }) {
  const cap = capacity(room.size)
  const total = cap * 2
  const filled = room.filledM + room.filledF
  const pct = Math.round((filled / total) * 100)
  const almost = pct >= 75

  return (
    <motion.div variants={staggerItem} whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-soft ring-1 ring-white/60 backdrop-blur-xl">
      {almost && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-coral-500 px-2.5 py-1 text-xs font-bold text-white shadow-glow">
          <Flame className="h-3 w-3" /> 마감임박
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-coral-400 to-sunset-500 text-2xl shadow-glow">{room.emoji}</span>
        <div>
          <span className="rounded-full bg-grape-500/10 px-2.5 py-0.5 text-xs font-extrabold text-grape-600">{room.size}</span>
          <h3 className="mt-1 font-display text-lg font-extrabold leading-tight">{room.title}</h3>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-[#7A6258]">
        <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-coral-400" /> {room.area}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-coral-400" /> {room.time}</span>
        <span className="inline-flex items-center gap-1">✨ {room.vibe}</span>
      </div>

      <div className="mt-5 space-y-2.5 rounded-2xl bg-cream p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#3A2820]">💙 남성 {room.filledM}/{cap}</span>
          <Dots filled={room.filledM} total={cap} color="bg-gradient-to-r from-sky-400 to-blue-500" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#3A2820]">💗 여성 {room.filledF}/{cap}</span>
          <Dots filled={room.filledF} total={cap} color="bg-gradient-to-r from-coral-400 to-coral-500" />
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-coral-100">
          <motion.div
            className="h-full rounded-full bg-sunset-gradient"
            initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#9B8278]">호스트 · {room.host}</span>
        <button className="rounded-full bg-sunset-gradient px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5">
          참여 신청
        </button>
      </div>
    </motion.div>
  )
}

export default function Group() {
  const [size, setSize] = useState<(typeof SIZES)[number]>('전체')
  const rooms = useMemo(
    () => GROUP_ROOMS.filter((r) => size === '전체' || r.size === size),
    [size],
  )
  const liveCount = GROUP_ROOMS.length

  return (
    <Page>
      <PageHeader
        eyebrow="그룹 미팅"
        title={<>친구들과 함께라 <span className="text-gradient">더 편안하게</span></>}
        desc="3:3부터 6:6까지. 실시간 모집 현황을 보고 바로 합류하세요."
      >
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-coral-600 shadow-soft ring-1 ring-coral-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral-500" />
          </span>
          지금 {liveCount}개 모임이 모집 중
        </div>
      </PageHeader>

      <section className="section-pad">
        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                size === s ? 'bg-sunset-gradient text-white shadow-glow scale-105' : 'bg-white/70 text-[#6E574E] ring-1 ring-coral-100 hover:bg-white'
              }`}
            >
              {s === '전체' ? '전체' : `${s} 미팅`}
            </button>
          ))}
        </div>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
        </Stagger>

        <div className="mt-12 overflow-hidden rounded-[2rem] bg-romance-gradient p-8 text-center text-white shadow-glow">
          <Sparkles className="mx-auto h-8 w-8" />
          <h3 className="mt-3 font-display text-2xl font-extrabold">원하는 모임이 없나요?</h3>
          <p className="mt-2 text-white/90">직접 호스트가 되어 친구들과 모임을 열어보세요.</p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-coral-600 shadow-2xl transition hover:-translate-y-0.5">
            <Users className="h-5 w-5" /> 새 모임 만들기
          </button>
        </div>
      </section>
    </Page>
  )
}
