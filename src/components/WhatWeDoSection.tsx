import { Laptop } from 'lucide-react'
import { activities } from '../data/landingPageData'
import Reveal from './Reveal'

export default function WhatWeDoSection() {
  return (
    <section
      id="works"
      className="relative z-10 px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              What We Do
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              A launchpad for future developers.
            </h2>

            <p className="mt-6 leading-8 text-white/60">
              APD helps students practice real-world development through
              workshops, collaborative projects, coding activities, and
              community-driven learning.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((activity, index) => (
            <Reveal
              key={activity}
              delay={0.1 + index * 0.08}
            >
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 transition hover:border-yellow-300/40 hover:bg-yellow-400/10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-yellow-300">
                  <Laptop size={21} />
                </div>

                <span className="font-semibold">{activity}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}