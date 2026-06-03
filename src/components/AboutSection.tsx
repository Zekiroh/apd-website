import { highlights } from '../data/landingPageData'
import Reveal from './Reveal'

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              About APD
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Built for students who want to create, not just consume tech.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={0.1 + index * 0.1}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/3 p-6 transition hover:-translate-y-2 hover:border-yellow-300/40 hover:bg-white/6 sm:p-7">
                <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                  <item.icon size={28} />
                </div>

                <h3 className="text-2xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-7 text-white/60">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}