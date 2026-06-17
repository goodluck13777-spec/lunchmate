import { motion } from 'framer-motion'
import { Heart, MapPin, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { Mate } from '../data'

export default function MateCard({ mate, index = 0 }: { mate: Mate; index?: number }) {
  const [liked, setLiked] = useState(false)
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[1.75rem] bg-white/70 p-3 shadow-soft backdrop-blur-xl ring-1 ring-white/60"
    >
      <div className={`relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-gradient-to-br ${mate.gradient}`}>
        <div className="absolute inset-0 grid place-items-center text-[5.5rem] opacity-90 transition-transform duration-500 group-hover:scale-110">
          {mate.emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-coral-600 shadow backdrop-blur">
          <Sparkles className="h-3 w-3" /> {mate.match}% 매칭
        </div>

        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 shadow backdrop-blur transition active:scale-90"
          aria-label="찜하기"
        >
          <Heart className={`h-4.5 w-4.5 transition ${liked ? 'text-coral-500' : 'text-[#9B8278]'}`} fill={liked ? '#FF5A5F' : 'none'} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-xl font-extrabold drop-shadow">
                {mate.name} <span className="text-base font-semibold">{mate.age}</span>
              </p>
              <p className="text-sm text-white/90 drop-shadow">{mate.job}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-1 text-xs font-semibold backdrop-blur">
              <MapPin className="h-3 w-3" /> {mate.area}
            </span>
          </div>
        </div>
      </div>

      <div className="px-2 pb-1 pt-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-grape-500/10 px-2.5 py-1 text-xs font-bold text-grape-600">{mate.mbti}</span>
          {mate.interests.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full bg-coral-50 px-2.5 py-1 text-xs font-semibold text-coral-600">#{t}</span>
          ))}
        </div>
        <p className="mt-2.5 line-clamp-2 px-0.5 text-sm leading-relaxed text-[#6E574E]">{mate.bio}</p>
      </div>
    </motion.div>
  )
}
