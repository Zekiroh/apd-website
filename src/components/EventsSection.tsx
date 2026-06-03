import { CalendarDays } from 'lucide-react'
import { events } from '../data/landingPageData'
import Reveal from './Reveal'

export default function EventsSection() {
  return (
    <section
      id="events"
      className="relative z-10 px-6 py-16 sm:py-20 md:py-24"
    >
      <Reveal>
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-white/3 p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Events
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Where students learn, build, and grow.
              </h2>

              <p className="mt-6 leading-8 text-white/60">
                APD events are designed to help members develop technical
                skills, collaborate on meaningful projects, and gain real-world
                experience through learning and innovation.
              </p>
            </div>

            <div className="space-y-4">
              {events.map((event, index) => (
                <Reveal
                  key={event.title}
                  delay={0.1 + index * 0.1}
                >
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-yellow-300/40 hover:bg-yellow-400/10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-bold">
                          {event.title}
                        </h3>

                        <p className="mt-2 leading-7 text-white/60">
                          {event.description}
                        </p>
                      </div>

                      <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200">
                        <CalendarDays size={16} />
                        {event.date}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}