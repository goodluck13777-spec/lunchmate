import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, PenLine, Star, X } from 'lucide-react'
import { Page, Stagger, staggerItem } from '../components/ui'
import PageHeader from '../components/PageHeader'
import { REVIEWS, STATS } from '../data'

function WriteModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
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
        className="relative w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl"
      >
        <button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream text-[#7A6258] transition hover:bg-coral-50">
          <X className="h-4.5 w-4.5" />
        </button>
        {sent ? (
          <div className="py-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sunset-gradient text-white shadow-glow">
              <Check className="h-8 w-8" />
            </motion.div>
            <h3 className="mt-4 font-display text-2xl font-extrabold">후기 등록 완료! 💛</h3>
            <p className="mt-2 text-[#6E574E]">소중한 이야기를 들려주셔서 감사해요. 다음 인연을 응원할게요.</p>
            <button onClick={onClose} className="btn-primary mt-6 w-full justify-center">확인</button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-extrabold">후기 작성</h3>
            <p className="mt-1 text-[#9B8278]">당신의 설레는 경험을 들려주세요.</p>
            <div className="mt-5 flex justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(i + 1)}>
                  <Star className={`h-9 w-9 transition ${i < rating ? 'text-coral-500' : 'text-coral-100'}`} fill={i < rating ? '#FF5A5F' : 'none'} />
                </button>
              ))}
            </div>
            <textarea
              value={text} onChange={(e) => setText(e.target.value)} rows={4}
              placeholder="어떤 만남이었나요? 자유롭게 적어주세요."
              className="mt-5 w-full resize-none rounded-2xl border border-coral-100 bg-cream px-4 py-3 outline-none transition focus:border-coral-300 focus:ring-2 focus:ring-coral-100"
            />
            <button onClick={() => setSent(true)} disabled={!text.trim()} className="btn-primary mt-5 w-full justify-center disabled:opacity-40">
              후기 등록하기
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Reviews() {
  const [open, setOpen] = useState(false)
  return (
    <Page>
      <PageHeader
        eyebrow="후기 & 성공 사례"
        title={<>점심이 <span className="text-gradient">인연</span>이 된 순간들</>}
        desc="LunchMate에서 시작된 진짜 이야기. 다음 주인공은 당신이에요."
      >
        <button onClick={() => setOpen(true)} className="btn-primary mt-6">
          <PenLine className="h-4.5 w-4.5" /> 내 후기 작성하기
        </button>
      </PageHeader>

      <section className="section-pad">
        <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <motion.div key={s.label} variants={staggerItem} className="glass rounded-3xl p-5 text-center shadow-soft">
              <div className="text-3xl">{s.emoji}</div>
              <div className="mt-2 font-display text-2xl font-extrabold text-gradient sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-sm font-semibold text-[#7A6258]">{s.label}</div>
            </motion.div>
          ))}
        </Stagger>

        <Stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...REVIEWS, ...REVIEWS].map((r, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-soft ring-1 ring-white/60 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${r.gradient} text-xl shadow-glow`}>{r.emoji}</span>
                <div>
                  <p className="font-display font-extrabold text-coral-600">{r.couple}</p>
                  <p className="text-xs font-semibold text-[#9B8278]">📍 {r.area} · D+{r.days}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-coral-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />)}
              </div>
              <h3 className="mt-2 font-display text-lg font-extrabold">"{r.title}"</h3>
              <p className="mt-2 leading-relaxed text-[#6E574E]">{r.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {r.tags.map((t) => <span key={t} className="rounded-full bg-coral-50 px-2.5 py-1 text-xs font-semibold text-coral-600">#{t}</span>)}
              </div>
              <div className="mt-4 flex items-center gap-1.5 border-t border-coral-50 pt-3 text-sm font-semibold text-[#9B8278]">
                <Heart className="h-4 w-4 text-coral-400" fill="#FF9E8A" strokeWidth={0} /> 이 후기가 도움 됐어요
              </div>
            </motion.div>
          ))}
        </Stagger>
      </section>

      <AnimatePresence>{open && <WriteModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </Page>
  )
}
