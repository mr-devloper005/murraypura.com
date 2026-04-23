import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { RegisterForm } from '@/components/auth/register-form'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

const shell = 'min-h-screen bg-[#faf6f0] text-[#2a1f1a]'
const side = 'border border-[#e8dfd2] bg-[#fffefb] shadow-[0_24px_80px_rgba(58,42,28,0.06)]'
const panel = 'border border-[#e8dfd2] bg-white/90 shadow-[0_24px_80px_rgba(58,42,28,0.08)]'
const muted = 'text-[#6b584c]'
const action = 'bg-[#e8c547] text-[#1a120e] hover:bg-[#dfc03a]'

function getRegisterContent(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a directory workflow tuned for clarity.',
      bullets: [
        'Structured onboarding for listings and verification',
        'Location and category lanes that stay easy to scan',
        'A calm surface so customers find you without noise',
      ],
    }
  }
  if (kind === 'editorial') {
    return {
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, drafts, editorial review, and publication scheduling—without a noisy default feed.',
      bullets: [
        'Voice-forward profile that matches long-form work',
        'Clear lanes for pitches, revisions, and launches',
        'Gold-accented actions so the next step always reads cleanly',
      ],
    }
  }
  if (kind === 'visual') {
    return {
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
      bullets: [
        'Hero imagery with editorial contrast, not generic grids',
        'Licensing and collaboration notes beside your work',
        'Navigation that keeps attention on what you publish',
      ],
    }
  }
  return {
    icon: Bookmark,
    title: 'Create your Murraypura account',
    body: 'Join with a profile-first identity, bookmark shelves you can scan in seconds, and collections that feel intentional—not algorithmic.',
    bullets: [
      'Profiles that read like introductions, not dashboards',
      'Bookmark lanes with warm contrast and quick scanning',
      'Sessions saved locally so you can explore without friction',
    ],
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const content = getRegisterContent(productKind)
  const Icon = content.icon

  return (
    <div className={shell}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2.5rem] p-8 lg:p-10 ${side}`}>
            <Icon className="h-8 w-8 text-[#c9a227]" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-[2.75rem]">{content.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${muted}`}>{content.body}</p>
            <div className="mt-8 grid gap-4">
              {content.bullets.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[#3d2f28]/8 bg-white/70 px-4 py-4 text-sm leading-relaxed text-[#4a3d35]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2.5rem] p-8 lg:p-10 ${panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a7568]">New member</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#2a1f1a] sm:text-3xl">Create your account</h2>
            <p className={`mt-3 text-sm leading-relaxed ${muted}`}>
              Use a real email you check—we will use it for sign-in and important updates. Passwords stay on this device until you connect a backend.
            </p>
            <RegisterForm actionClassName={action} />
            <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#efe6db] pt-6 text-sm ${muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#2a1f1a] hover:underline">
                <Sparkles className="h-4 w-4 text-[#c9a227]" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
