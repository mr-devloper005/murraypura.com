import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Agreement to these terms',
    body: `By accessing ${SITE_CONFIG.name}, creating an account, or saving content, you agree to these Terms of Service and to any additional guidelines we post in-product. If you disagree, please discontinue use.`,
  },
  {
    title: 'Eligibility & accounts',
    body: 'You must be able to form a binding contract in your jurisdiction. You are responsible for safeguarding credentials and for all activity under your account. Notify us promptly if you suspect unauthorized access.',
  },
  {
    title: 'Profiles, bookmarks, and licenses you grant',
    body: 'You retain ownership of text, imagery, and links you submit. You grant Murraypura a worldwide, non-exclusive license to host, display, compress, and distribute that content solely to operate, promote, and improve the service. You may delete eligible content subject to technical retention windows described in our Privacy Policy.',
  },
  {
    title: 'Acceptable use',
    body: 'Do not harass others, distribute malware, scrape the service in a way that degrades performance, attempt to bypass security, or publish illegal material. Curated collections must not promote violence, discrimination, or non-consensual intimate imagery.',
  },
  {
    title: 'Third-party links',
    body: 'Bookmarks may point to external websites. We do not control third-party content and are not responsible for their practices. Follow links thoughtfully, especially when leaving our authenticated experience.',
  },
  {
    title: 'Disclaimers',
    body: 'The platform is provided “as is.” We strive for reliability but do not guarantee uninterrupted access or error-free behavior. To the fullest extent permitted by law, we disclaim implied warranties of merchantability and fitness for a particular purpose.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the extent permitted by law, Murraypura and its suppliers will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or goodwill arising from your use of the service.',
  },
  {
    title: 'Termination',
    body: 'You may close your account at any time where self-service tools exist. We may suspend or terminate access if you materially breach these terms or if we must comply with law. Certain provisions survive termination (e.g., licenses granted for archival retention, dispute terms).',
  },
  {
    title: 'Changes',
    body: 'We may update these terms to reflect new features or legal requirements. We will post the revised date at the top of this page and, when changes are material, provide additional notice as required by law.',
  },
  {
    title: 'Governing law & disputes',
    body: 'Unless a different governing law is mandated for consumers in your region, these terms are governed by the laws of the jurisdiction Murraypura designates in future corporate filings, without regard to conflict-of-law rules. Please contact us before initiating formal disputes so we can attempt a good-faith resolution.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`These terms govern your use of ${SITE_CONFIG.name}. They are written to be readable alongside our Privacy and Cookie policies.`}
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <aside className="lg:sticky lg:top-28 lg:w-56 lg:shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a18b7a]">Sections</p>
          <ul className="mt-4 space-y-2 text-sm text-[#6b584c]">
            {sections.map((s) => (
              <li key={s.title}>
                <a href={`#${encodeURIComponent(s.title)}`} className="hover:text-[#2a1f1a] hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
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

          <div className="rounded-[1.75rem] border border-[#0b1220] bg-[#0b1220] p-6 text-sm leading-relaxed text-[#e8dfd2]">
            Questions about compliance or partnerships?{' '}
            <Link href="/contact" className="font-semibold text-[#e8c547] hover:underline">
              Contact the team
            </Link>
            .
          </div>
        </div>
      </div>
    </PageShell>
  )
}
