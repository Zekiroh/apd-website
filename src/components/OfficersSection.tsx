import { ArrowUpRight, GraduationCap, UserRound } from 'lucide-react'
import { adviser, committeeHeads, executiveBoard } from '../data/landingPageData'
import Reveal from './Reveal'

type Officer = {
  role: string
  name: string
  badge?: string
  profileUrl?: string
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

      <div className="flex flex-wrap justify-center gap-5">
        {officers.map((officer, index) => (
          <div
            key={officer.role}
            className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
          >
            <Reveal delay={delayStart + 0.1 + index * 0.06}>
              <a
                href={officer.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <div className="flex h-80 flex-col rounded-3xl border border-white/10 bg-white/3 p-6 text-center transition group-hover:-translate-y-2 group-hover:border-yellow-300/40 group-hover:bg-white/6">
                  <div className="mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-yellow-300/20 bg-yellow-400/10 text-yellow-300">
                    <UserRound size={34} />
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <div className="flex flex-1 items-center justify-center">
                      <h4 className="text-lg font-bold leading-snug">
                        {officer.role}
                      </h4>
                    </div>

                    <div className="mt-4 min-h-13">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <p className="text-sm leading-6 text-white/50 transition group-hover:text-white/70">
                          {officer.name}
                        </p>

                        {officer.badge && (
                          <span className="rounded-full border border-yellow-300/30 bg-yellow-400/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-yellow-300">
                            {officer.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-semibold text-yellow-300/75 transition group-hover:text-yellow-300">
                      View Profile
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
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

                  <a
                    href={adviser.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-2xl font-black outline-none transition hover:text-yellow-300 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {adviser.name}
                    <ArrowUpRight size={18} />
                  </a>

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