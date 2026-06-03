import { Sparkles } from 'lucide-react'
import Reveal from './Reveal'

export default function RecognitionSection() {
  return (
    <section className="relative z-10 px-6 py-16 sm:py-20 md:py-24">
      <Reveal>
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-linear-to-br from-yellow-400/15 via-white/3 to-amber-500/10 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-300/25 bg-yellow-400/10 text-yellow-300 shadow-lg shadow-yellow-500/10">
              <Sparkles size={38} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Recognition
              </p>

              <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Making APD visible to the FEU community.
              </h2>

              <p className="mt-6 max-w-3xl leading-8 text-white/65">
                This website serves as APD&apos;s digital front door — helping
                students discover the organization, connect with fellow
                developers, and participate in projects, events, and learning
                initiatives.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}