import Link from 'next/link'
import { ArrowRight, Clock, Globe2, Laptop, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Senior Product Designer',
    location: 'Remote (UTC-8 to UTC+1)',
    type: 'Full-time',
    level: 'Senior',
    focus: 'Design bookmark flows, profile identity surfaces, and editorial marketing pages.',
  },
  {
    title: 'Frontend Engineer',
    location: 'Hybrid · New York',
    type: 'Full-time',
    level: 'Mid / Senior',
    focus: 'Ship accessible UI in Next.js, polish motion, and collaborate with design on the luxe theme system.',
  },
  {
    title: 'Community Programs Lead',
    location: 'Remote',
    type: 'Part-time',
    level: 'Mid',
    focus: 'Welcome curators, moderate featured collections, and host monthly virtual shelf walks.',
  },
]

const benefits = [
  { title: 'Remote-first', body: 'Core hours overlap for collaboration; async by default for deep work.', icon: Globe2 },
  { title: 'Learning budget', body: '$1,800 / year for courses, conferences, or studio visits.', icon: Sparkles },
  { title: 'Hardware stipend', body: 'Refresh laptop + display every three years with a simple approval flow.', icon: Laptop },
  { title: 'Calm PTO', body: 'Minimum three disconnected weeks encouraged; team coverage built in.', icon: Clock },
]

const process = [
  { step: '01', title: 'Intro call', copy: '30 minutes with hiring manager—tell us what you save and who inspires your work.' },
  { step: '02', title: 'Skills conversation', copy: 'Practical exercise or portfolio walkthrough, no whiteboard riddles.' },
  { step: '03', title: 'Meet the team', copy: 'Casual chats with future peers across product, design, and community.' },
  { step: '04', title: 'Offer', copy: 'Transparent compensation bands and a written summary of role expectations.' },
]

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title={`Build the future of ${SITE_CONFIG.name}`}
      description="We are a small team obsessed with profiles, social bookmarking, and gentle UX. If you love typography, respectful community tooling, and shipping polished interfaces, you will feel at home here."
      actions={
        <Button className="rounded-full bg-[#e8c547] text-[#1a120e] hover:bg-[#dfc03a]" asChild>
          <Link href="/contact">
            Start a conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-[1.75rem] border border-[#e8dfd2] bg-[#fffefb] p-6 shadow-[0_18px_50px_rgba(58,42,28,0.06)]"
            >
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#e8c547]/25 px-3 py-1 text-xs font-semibold text-[#5c4810]">{role.level}</span>
                <span className="rounded-full border border-[#e4d8cc] bg-white px-3 py-1 text-xs font-semibold text-[#6b584c]">{role.type}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#2a1f1a]">{role.title}</h2>
              <p className="mt-1 text-sm text-[#8a7568]">{role.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#6b584c]">{role.focus}</p>
              <Button variant="outline" className="mt-5 rounded-full border-[#e4d8cc] bg-white text-[#2a1f1a] hover:bg-[#faf6f0]" asChild>
                <Link href="/contact">Discuss this role</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-[#e8dfd2] bg-[linear-gradient(180deg,#fffefb_0%,#f3ebe0_100%)] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#2a1f1a]">Why join now</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#6b584c]">
              Murraypura is entering a season of refinement: richer profile cards, smarter collection sharing, and calmer onboarding. Early hires shape rituals, design language, and how we talk to curators everywhere.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#e4d8cc] bg-white/90 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#2a1f1a]">Benefits &amp; rhythm</h3>
            <div className="mt-5 grid gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-3 rounded-2xl border border-[#efe6db] bg-[#faf6f0]/80 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8c547]/20 text-[#6b4b16]">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2a1f1a]">{b.title}</p>
                    <p className="mt-1 text-sm text-[#6b584c]">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-[2rem] border border-[#e8dfd2] bg-[#0b1220] p-8 text-[#f4efe6] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">Interview journey</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">What to expect</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold text-[#e8c547]">{p.step}</p>
              <p className="mt-2 text-base font-semibold text-white">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#c9bfb0]">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-[1.75rem] border border-[#e4d8cc] bg-[#fffefb] p-6 text-center sm:p-8">
        <p className="text-sm font-semibold text-[#2a1f1a]">Equal opportunity</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#6b584c]">
          We welcome applicants of every background, identity, and experience level. If you need accommodations during the process, mention it in your first note—we will make it work.
        </p>
      </div>
    </PageShell>
  )
}
