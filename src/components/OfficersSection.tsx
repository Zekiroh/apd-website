import { GraduationCap, UserRound } from 'lucide-react'
import { adviser, committeeHeads, executiveBoard } from '../data/landingPageData'
import Reveal from './Reveal'

type Officer = {
  role: string
  name: string
}

type OfficerGroupProps = {
  title: string
  description: string
  officers: Officer[]
  delayStart: number
}

function OfficerGroup({
  title,
  description,
  officers,
  delayStart,
}: OfficerGroupProps) {
  return (
    <div className="mt-10">
      <Reveal delay={delayStart}>
        <div className="mb-5">
          <h3 className="text-2xl font-black text-white">{title}</h3>

          <p className="mt-2 max-w-2xl leading-7 text-white/55">
            {description}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {officers.map((officer, index) => (
          <Reveal
            key={officer.role}
            delay={delayStart + 0.1 + index * 0.06}
          >
            <div className="flex h-full min-h-62.5 flex-col rounded-3xl border border-white/10 bg-white/3 p-6 text-center transition hover:-translate-y-2 hover:border-yellow-300/40 hover:bg-white/6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-300/20 bg-yellow-400/10 text-yellow-300">
                <UserRound size={34} />
              </div>

              <div className="mt-6 flex flex-1 flex-col justify-center">
                <h4 className="text-lg font-bold leading-snug">
                  {officer.role}
                </h4>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {officer.name}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function OfficersSection() {
  return (
    <section
      id="officers"
      className="relative z-10 px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              Officers
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              The people leading APD forward.
            </h2>

            <p className="mt-6 leading-8 text-white/60">
              Meet the adviser, executive board, and committee heads guiding
              APD&apos;s initiatives, projects, and student-led technology
              community.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-4xl border border-yellow-300/20 bg-linear-to-br from-yellow-400/15 via-white/3 to-black/30 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-yellow-300/30 bg-yellow-400/10 text-yellow-300 shadow-lg shadow-yellow-500/10">
                  <GraduationCap size={38} />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                    Adviser
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    {adviser.name}
                  </h3>

                  <p className="mt-1 text-white/55">{adviser.role}</p>
                </div>
              </div>

              <p className="max-w-md leading-7 text-white/60">
                Provides guidance, oversight, and support as APD continues to
                build a stronger student developer community.
              </p>
            </div>
          </div>
        </Reveal>

        <OfficerGroup
          title="Executive Board"
          description="The core officers responsible for APD's leadership, operations, communication, and organizational direction."
          officers={executiveBoard}
          delayStart={0.2}
        />

        <OfficerGroup
          title="Committee Heads"
          description="The committee leads supporting APD's development, documentation, logistics, programs, and student activities."
          officers={committeeHeads}
          delayStart={0.35}
        />
      </div>
    </section>
  )
}