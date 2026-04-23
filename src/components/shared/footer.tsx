import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Instagram } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Help', href: '/help' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'X', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-lg border border-[#d7deca] bg-white px-3 py-2 text-sm font-medium text-[#1f2617] hover:bg-[#ebefdf]">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/8 p-2">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="relative overflow-hidden bg-[#0b1220] text-[#f4efe6]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] px-6 py-10 sm:px-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#d8c49a]">Concierge onboarding</p>
            <h3 className="mt-4 text-center text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Your bookmarks deserve a calmer home</h3>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-[#c9bfb0]">Schedule a walkthrough of profiles and collections, or jump straight into saving with a free account.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#e8c547] px-6 py-3 text-sm font-semibold text-[#1a120e] shadow-[0_12px_40px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a]"
              >
                Schedule a consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5">
                Browse saved links
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">Quick links</h4>
              <ul className="mt-4 space-y-3 text-sm text-[#e8dfd2]">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                {footerLinks.platform.map((item: any) => (
                  <li key={item.name}>
                    <Link href={item.href} className="hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center text-center lg:px-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12 bg-white/5 p-2">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="64" height="64" className="h-full w-full object-contain" />
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-white">{SITE_CONFIG.name}</p>
              <p className="mt-2 max-w-xs text-xs uppercase tracking-[0.24em] text-[#c9a227]">{siteContent.footer.tagline}</p>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:justify-end">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">Company</h4>
                <ul className="mt-4 space-y-3 text-sm text-[#e8dfd2]">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">Legal &amp; policies</h4>
                <ul className="mt-4 space-y-3 text-sm text-[#e8dfd2]">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-[#a89b8c] sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Crafted for intentional saving.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/12 bg-white/5 p-2.5 text-[#f4efe6] hover:bg-white/10 hover:text-white"
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-slate-950">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
