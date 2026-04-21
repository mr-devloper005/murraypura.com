import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'

const stack = [
  { name: 'Next.js', license: 'MIT', note: 'React framework, routing, and server components runtime.' },
  { name: 'React', license: 'MIT', note: 'UI library powering interactive surfaces.' },
  { name: 'Tailwind CSS', license: 'MIT', note: 'Utility-first styling system and design tokens.' },
  { name: 'Lucide', license: 'ISC', note: 'Icon set used across navigation and marketing pages.' },
  { name: 'Radix UI', license: 'MIT', note: 'Accessible primitives for dialogs, menus, and form controls.' },
  { name: 'TypeScript', license: 'Apache-2.0', note: 'Typed JavaScript for safer refactors.' },
  { name: 'Zod', license: 'MIT', note: 'Schema validation for forms and API boundaries.' },
  { name: 'date-fns', license: 'MIT', note: 'Lightweight date formatting utilities.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Open source notices"
      description="Murraypura stands on the shoulders of extraordinary open source projects. Below is a representative list of dependencies shipped in the web client—each retains its original license and copyright."
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-[#e8dfd2] bg-[#fffefb] shadow-[0_18px_50px_rgba(58,42,28,0.05)]">
        <div className="grid grid-cols-[1.2fr_0.5fr_1.3fr] gap-4 border-b border-[#e8dfd2] bg-[#f3ebe0]/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a7568] sm:px-6">
          <span>Project</span>
          <span>License</span>
          <span className="hidden sm:block">Notes</span>
        </div>
        <div className="divide-y divide-[#efe6db]">
          {stack.map((row) => (
            <div key={row.name} className="grid grid-cols-1 gap-2 px-5 py-4 text-sm sm:grid-cols-[1.2fr_0.5fr_1.3fr] sm:items-start sm:px-6">
              <p className="font-semibold text-[#2a1f1a]">{row.name}</p>
              <p className="text-[#6b584c]">{row.license}</p>
              <p className="text-[#6b584c] sm:col-span-1">{row.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[#e8dfd2] bg-white/90 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#2a1f1a]">Fonts &amp; media</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6b584c]">
            Marketing typography may bundle licensed webfonts served through our hosting provider. Photography on demo pages may include royalty-free imagery with attribution requirements noted in the asset manifest when applicable.
          </p>
        </div>
        <div className="rounded-[1.75rem] border border-[#e4d8cc] bg-[#faf6f0] p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#2a1f1a]">Updates</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6b584c]">
            Dependency upgrades happen continuously. If you need a full SPDX export for enterprise procurement, contact us with your company details and we will return a generated bill of materials within five business days.
          </p>
          <Link href="/contact" className="mt-4 inline-flex text-sm font-semibold text-[#c9a227] hover:underline">
            Request a BOM →
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
