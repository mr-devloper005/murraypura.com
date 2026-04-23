import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

const cookies = [
  {
    title: 'Essential cookies',
    body: 'Required for authentication, session continuity, and security features such as rate limiting. These cookies cannot be disabled if you wish to stay signed in.',
    examples: 'session_id, csrf_token, auth_refresh',
  },
  {
    title: 'Functional preferences',
    body: 'Remember UI choices like theme selection, collapsed navigation state, or last-used collection filters. They make repeat visits feel familiar.',
    examples: 'layout_prefs, filter_defaults',
  },
  {
    title: 'Analytics (optional where offered)',
    body: 'If enabled, we measure aggregate page views, performance timings, and error rates. Data is minimized and used to prioritize engineering work—not to sell advertising profiles.',
    examples: 'analytics_client_id (pseudonymous)',
  },
  {
    title: 'Communication tokens',
    body: 'Short-lived values that help us confirm email addresses or deep links from newsletters. They expire automatically after use.',
    examples: 'verify_token, campaign_ref',
  },
]

const controls = [
  'Browser settings let you block or delete cookies; blocking essential cookies may break login.',
  'When in-product toggles exist for optional analytics, changes apply on the next successful save.',
  'Do Not Track signals are respected where technically feasible; contact us if you need manual adjustments.',
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="Cookies help Murraypura remember who you are, keep collections safe, and understand how the interface performs in the real world. Here is how we use them."
    >
      <div className="rounded-[1.5rem] border border-[#e8dfd2] bg-[#fffefb] px-5 py-4 text-sm text-[#6b584c]">
        <span className="font-semibold text-[#2a1f1a]">Last updated:</span> April 21, 2026
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {cookies.map((c) => (
          <div key={c.title} className="rounded-[1.75rem] border border-[#e8dfd2] bg-white/90 p-6 shadow-[0_14px_40px_rgba(58,42,28,0.04)] sm:p-8">
            <h2 className="text-lg font-semibold text-[#2a1f1a]">{c.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#6b584c]">{c.body}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#a18b7a]">Representative keys</p>
            <p className="mt-1 rounded-xl border border-dashed border-[#e4d8cc] bg-[#faf6f0] px-3 py-2 font-mono text-xs text-[#4a3d35]">{c.examples}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-[#e4d8cc] bg-[#f3ebe0]/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#2a1f1a]">Your controls</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#6b584c]">
            {controls.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8c547]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-between rounded-[1.75rem] border border-[#0b1220] bg-[#0b1220] p-6 text-[#f4efe6] sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c49a]">Need help?</p>
            <p className="mt-3 text-sm leading-relaxed text-[#c9bfb0]">
              If you are unsure which cookies are active on your account, reach out with your browser type—we will walk you through exportable diagnostics.
            </p>
          </div>
          <Link href="/privacy" className="mt-6 inline-flex text-sm font-semibold text-[#e8c547] hover:underline">
            Read the Privacy Policy →
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
