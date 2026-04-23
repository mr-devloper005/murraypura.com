import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, MessageCircle, Users, Wand2 } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Community | ${SITE_CONFIG.name}`,
  description: `Connect around curated bookmarks and public profiles on ${SITE_CONFIG.name}.`,
}

const programs = [
  {
    title: 'Shelf walks',
    body: 'Monthly live sessions where curators screen-share a collection, explain why each link matters, and take questions.',
    icon: Bookmark,
  },
  {
    title: 'Profile spotlights',
    body: 'Nominate someone whose public page teaches you something new—we feature rotating voices from the directory.',
    icon: Users,
  },
  {
    title: 'Feedback studio',
    body: 'Share UI notes or bookmark workflows you wish existed. Highest-voted ideas get prototype explorations in the open.',
    icon: Wand2,
  },
]

const guidelines = [
  'Lead with generosity: credit original authors and tools when you reshare a collection.',
  'Keep discussions kind and specific—reference the link or profile you are reacting to.',
  'No drive-by promotion. Share work when it answers a question or fits a themed thread.',
  'Respect privacy. If a profile is quiet, assume they are listening—not an invitation for cold outreach spam.',
]

export default function CommunityPage() {
  return (
    <PageShell
      eyebrow="Community"
      title="A softer place to talk about saves"
      description={`The ${SITE_CONFIG.name} community gathers around profiles and bookmark lanes—not generic feeds. Whether you are refining a research shelf or celebrating a friend’s new public page, these programs keep conversation grounded and useful.`}
      actions={
        <Button className="rounded-full bg-[#e8c547] text-[#1a120e] hover:bg-[#dfc03a]" asChild>
          <Link href="/sbm">
            Explore public collections
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((item) => (
          <div key={item.title} className="rounded-[1.75rem] border border-[#e8dfd2] bg-[#fffefb] p-6 shadow-[0_16px_48px_rgba(58,42,28,0.05)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8c547]/25 text-[#6b4b16]">
              <item.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[#2a1f1a]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6b584c]">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="rounded-[2rem] border border-[#e8dfd2] bg-white/90 p-8 shadow-[0_20px_60px_rgba(58,42,28,0.06)]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#a18b7a]">
            <MessageCircle className="h-4 w-4" />
            Conversation guidelines
          </div>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[#6b584c]">
            {guidelines.map((rule) => (
              <li key={rule} className="flex gap-3 rounded-2xl border border-[#efe6db] bg-[#faf6f0]/80 px-4 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#e8c547]" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-[#0b1220] bg-[#0b1220] p-8 text-[#f4efe6]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">Get involved</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Start small, stay consistent</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#c9bfb0]">
            Publish a profile paragraph, save five links with a sentence each, or comment thoughtfully on someone else’s shelf. Momentum compounds when the UI stays out of your way.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8c547] px-5 py-3 text-sm font-semibold text-[#1a120e] hover:bg-[#dfc03a]"
            >
              Polish your profile
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/help" className="text-center text-sm font-semibold text-[#e8dfd2] hover:text-white hover:underline">
              Read community help →
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
