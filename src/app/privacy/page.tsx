import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Who this policy covers',
    body: 'This policy describes how Murraypura collects, uses, stores, and shares information when you browse marketing pages, create an account, save bookmarks, or maintain a public profile. If you interact with us only as a reader, we still collect limited technical data to keep the service reliable.',
  },
  {
    title: 'Information we collect',
    body: 'Account details you provide (name, email, password hash), profile content you choose to publish, bookmarks and collection metadata, communications you send to support, device and log data (IP address, browser type, approximate region), and cookies as described in our Cookie Policy.',
  },
  {
    title: 'How we use information',
    body: 'We use your data to authenticate sessions, render your profile and collections to visitors you authorize, improve search and recommendations inside the product, monitor abuse, send essential service emails, and analyze aggregated usage to guide product decisions.',
  },
  {
    title: 'Legal bases (where applicable)',
    body: 'Depending on your region, we may rely on performance of a contract (providing the service you signed up for), legitimate interests (securing the platform and understanding feature usage), or consent (optional analytics or marketing messages when we explicitly ask).',
  },
  {
    title: 'Sharing & subprocessors',
    body: 'We share information with infrastructure providers that host our application and database, email delivery services, and security vendors. We do not sell your personal information. Any future subprocessors will be listed here with a summary of their role.',
  },
  {
    title: 'Retention',
    body: 'We keep account data while your profile is active. Bookmark content may remain in backups for a limited period after deletion. Logs with technical identifiers are rotated on a regular schedule unless needed to investigate misuse.',
  },
  {
    title: 'Your choices & rights',
    body: 'You may access, correct, or delete much of your information from account settings. You can export a machine-readable copy of your bookmarks where the feature is available. Residents of certain regions may have additional rights—contact us and we will verify and respond within statutory timelines.',
  },
  {
    title: 'Children',
    body: 'Murraypura is not directed to children under 16, and we do not knowingly collect their personal information. If you believe we have collected data from a child, please contact us so we can delete it promptly.',
  },
  {
    title: 'International transfers',
    body: 'If you access the service from outside the country where our servers reside, your information may be transferred and processed across borders. We implement safeguards consistent with applicable law.',
  },
  {
    title: 'Updates & contact',
    body: 'We may revise this policy when features change. Material updates will be highlighted in-product or via email when appropriate. Questions? Reach the privacy desk through the contact page with “Privacy” in the subject line.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="We treat profiles and bookmark libraries as personal creative spaces. This page explains, in plain language, what we collect and the choices you keep along the way."
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <aside className="lg:sticky lg:top-28 lg:w-56 lg:shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a18b7a]">On this page</p>
          <ul className="mt-4 space-y-2 text-sm text-[#6b584c]">
            {sections.map((s) => (
              <li key={s.title}>
                <a href={`#${encodeURIComponent(s.title)}`} className="hover:text-[#2a1f1a] hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-[#e8dfd2] bg-[#fffefb] p-4 text-xs leading-relaxed text-[#6b584c]">
            Quick tip: bookmark this policy in your Murraypura shelf so updates are easy to track.
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <div className="rounded-[1.5rem] border border-[#e8dfd2] bg-[#fffefb] px-5 py-4 text-sm text-[#6b584c]">
            <span className="font-semibold text-[#2a1f1a]">Last updated:</span> April 21, 2026
          </div>

          {sections.map((section) => (
            <section
              key={section.title}
              id={encodeURIComponent(section.title)}
              className="scroll-mt-28 rounded-[1.75rem] border border-[#e8dfd2] bg-white/90 p-6 shadow-[0_14px_40px_rgba(58,42,28,0.04)] sm:p-8"
            >
              <h2 className="text-lg font-semibold tracking-tight text-[#2a1f1a]">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6b584c]">{section.body}</p>
            </section>
          ))}

          <div className="rounded-[1.75rem] border border-[#e4d8cc] bg-[#f3ebe0]/60 p-6 text-center text-sm text-[#6b584c]">
            Related:{' '}
            <Link href="/cookies" className="font-semibold text-[#2a1f1a] hover:underline">
              Cookie Policy
            </Link>{' '}
            ·{' '}
            <Link href="/terms" className="font-semibold text-[#2a1f1a] hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
