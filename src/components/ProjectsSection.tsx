import { featuredProjects } from '../data/landingPageData'
import Reveal from './Reveal'

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
                Featured Projects
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Turning student ideas into real outputs.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-white/55">
              APD projects serve as a space for members to practice,
              collaborate, and showcase what they can build.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={0.1 + index * 0.1}
            >
              <div className="group h-full rounded-3xl border border-white/10 bg-white/3 p-7 transition hover:-translate-y-2 hover:border-yellow-300/40 hover:bg-yellow-400/10">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                    <project.icon size={28} />
                  </div>

                  <span className="rounded-full border border-yellow-300/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold">{project.title}</h3>

                <p className="mt-3 leading-7 text-white/60">
                  {project.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}