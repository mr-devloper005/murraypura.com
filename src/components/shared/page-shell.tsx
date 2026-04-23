'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  const pathname = usePathname()
  const showPublicWayfinding = !pathname?.startsWith('/dashboard')

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2a1f1a]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#e8dfd2] bg-[linear-gradient(165deg,#fffefb_0%,#faf6f0_45%,#f3ebe0_100%)]">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#e8c547]/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#c9a227]/10 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a7568]">{eyebrow}</p>
            ) : null}
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem]">{title}</h1>
            {description ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6b584c]">{description}</p> : null}
            {actions ? (
              <div className="mt-8 flex flex-wrap gap-3 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-2 [&_a]:rounded-full [&_a]:px-5 [&_a]:py-2.5 [&_a]:text-sm [&_a]:font-semibold [&_button]:rounded-full [&_button]:px-5 [&_button]:py-2.5">
                {actions}
              </div>
            ) : null}
            {showPublicWayfinding ? (
              <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold text-[#6b584c]">
                <Link href="/" className="rounded-full border border-[#e4d8cc] bg-white/80 px-4 py-2 text-[#2a1f1a] shadow-sm hover:bg-[#fffefb]">
                  Home
                </Link>
                <Link href="/profile" className="rounded-full border border-[#e4d8cc] bg-white/80 px-4 py-2 text-[#2a1f1a] shadow-sm hover:bg-[#fffefb]">
                  Profiles
                </Link>
                <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[#e8c547] px-4 py-2 text-[#1a120e] shadow-[0_10px_30px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a]">
                  Bookmarks
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
