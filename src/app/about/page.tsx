import Link from 'next/link'
import { ArrowRight, Bookmark, Heart, Shield, Sparkles, Users } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { label: 'Active curators', value: '2,500+', detail: 'Users with public collections' },
  { label: 'Bookmarks saved', value: '45,000+', detail: 'Links with notes and tags' },
  { label: 'Collections created', value: '1,200+', detail: 'Organized shelves and libraries' },
]

const pillars = [
  {
    title: 'Identity you can trust',
    body: 'Profiles are built to read like introductions—not dashboards. Avatars, bios, and saved lanes stay visually connected so visitors immediately understand who curates what.',
    icon: Shield,
  },
  {
    title: 'Bookmarks with context',
    body: 'Every save is meant to carry a short note, a category, or a shelf. That context makes returns faster and collaboration kinder than dumping raw URLs into a chat thread.',
    icon: Bookmark,
  },
  {
    title: 'Community without noise',
    body: 'We skip endless feeds of unrelated formats. Murraypura keeps the surface area tight: people, links they stand behind, and the occasional story card worth spotlighting.',
    icon: Heart,
  },
]

const timeline = [
  { title: 'Platform launch', copy: 'Murraypura began as a simple bookmarking tool for a small group of designers and researchers.' },
  { title: 'Public profiles', copy: 'Added profile pages so every collection could be traced back to its curator with context.' },
  { title: 'Community features', copy: 'Introduced sharing, collaboration tools, and the warm editorial experience you see today.' },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="Our story"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a profiles and social bookmarking platform. We help people present who they are, save what inspires them, and invite others into thoughtfully grouped links—without the clutter of generic discovery feeds.`}
      actions={
        <>
          <Button className="rounded-full bg-[#e8c547] text-[#1a120e] hover:bg-[#dfc03a]" asChild>
            <Link href="/sbm">
              Browse bookmarks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full border-[#e4d8cc] bg-white/80 text-[#2a1f1a] hover:bg-[#fffefb]" asChild>
            <Link href="/contact">Talk with us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-[1.75rem] border border-[#e8dfd2] bg-[#fffefb] p-6 shadow-[0_18px_50px_rgba(58,42,28,0.06)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a18b7a]">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-[#2a1f1a]">{item.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#6b584c]">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-[2rem] border border-[#e8dfd2] bg-white/90 p-8 shadow-[0_24px_70px_rgba(58,42,28,0.07)] sm:p-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227]">
          <Sparkles className="h-4 w-4" />
          Why we exist
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#2a1f1a] sm:text-3xl">Calm software for obsessive savers</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6b584c]">
          Most tools treat bookmarks as an afterthought. Murraypura inverts that: collections sit beside identity, typography breathes, and gold-accented calls-to-action highlight the next gentle step—never a hard sell. We believe the best communities grow when people can show their work and the links that shaped it in the same glance.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-[1.75rem] border border-[#e4d8cc] bg-[#f3ebe0]/50 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8c547]/25 text-[#6b4b16]">
              <pillar.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#2a1f1a]">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b584c]">{pillar.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-[2rem] border border-[#e8dfd2] bg-[linear-gradient(180deg,#0b1220_0%,#121a2a_100%)] p-8 text-[#f4efe6] sm:p-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">
          <Users className="h-4 w-4" />
          Milestones
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {timeline.map((item) => (
            <div key={item.title} className="border-l border-[#e8c547]/40 pl-5">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#c9bfb0]">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>

    </PageShell>
  )
}
