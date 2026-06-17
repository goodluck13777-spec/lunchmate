import type { ReactNode } from 'react'
import { Reveal, FloatingBlob } from './ui'

export default function PageHeader({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string
  title: ReactNode
  desc?: string
  children?: ReactNode
}) {
  return (
    <section className="relative grain overflow-hidden pb-8 pt-28 sm:pt-36">
      <FloatingBlob className="left-[-6%] top-16 h-64 w-64 bg-coral-300/35" />
      <FloatingBlob className="right-[-6%] top-8 h-72 w-72 bg-sunset-400/35" delay={2} />
      <div className="section-pad relative text-center">
        <Reveal>
          <span className="chip mb-5 shadow-soft">✨ {eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display text-[2.4rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
        </Reveal>
        {desc && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#6E574E]">{desc}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.15}>{children}</Reveal>}
      </div>
    </section>
  )
}
