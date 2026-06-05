import {
  DiscordLogoIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons'
import { ArrowUpRight } from 'lucide-react'
import apdLogo from '../assets/apd-logo.png'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/10 px-6 py-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="flex flex-col gap-4 xs:flex-row xs:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-300/20 bg-black/40 p-1.5">
                <img
                  src={apdLogo}
                  alt="APD Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">APD Website</h2>

                <p className="mt-1 text-white/50">
                  Assemblage of Programmers and Developers
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-lg leading-7 text-white/55">
              Building future developers through learning, collaboration,
              innovation, and real-world project experience.
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                Affiliated With
              </p>

              <a
                href="https://www.feudiliman.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 outline-none transition-colors duration-200 hover:text-yellow-300 focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                FEU Diliman

                <ArrowUpRight
                  size={14}
                  className="text-yellow-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Connect With APD
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:apd.feud@gmail.com"
                className="group rounded-2xl border border-white/10 bg-white/3 px-4 py-3 transition hover:border-yellow-300/40 hover:bg-yellow-400/10"
              >
                <div className="flex items-center gap-3">
                  <EnvelopeClosedIcon className="h-4 w-4 text-yellow-300" />

                  <div>
                    <p className="text-sm font-medium text-white">Email</p>

                    <p className="text-sm text-white/55 transition group-hover:text-white/75">
                      apd.feud@gmail.com
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.facebook.com/FEUD.APD"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/3 px-4 py-3 transition hover:border-yellow-300/40 hover:bg-yellow-400/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-yellow-300">ⓕ</span>

                  <div>
                    <p className="text-sm font-medium text-white">Facebook</p>

                    <p className="text-sm text-white/55 transition group-hover:text-white/75">
                      Assemblage of Programmers and Developers
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://discord.gg/hBnjBTfyF"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/3 px-4 py-3 transition hover:border-yellow-300/40 hover:bg-yellow-400/10"
              >
                <div className="flex items-center gap-3">
                  <DiscordLogoIcon className="h-4 w-4 text-yellow-300" />

                  <div>
                    <p className="text-sm font-medium text-white">Discord</p>

                    <p className="text-sm text-white/55 transition group-hover:text-white/75">
                      Join our community
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
            <p>
              © 2026 Assemblage of Programmers and Developers (APD). All rights
              reserved.
            </p>

            <p>
              Empowering future developers through technology and innovation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}