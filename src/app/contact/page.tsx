import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, MapPin, Phone, Sparkles, Bookmark, Mail } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { ContactForm } from '@/components/contact/contact-form'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const laneCard =
  'rounded-[1.75rem] border border-[#e8dfd2] bg-[#fffefb] p-6 shadow-[0_18px_50px_rgba(58,42,28,0.06)] transition-shadow hover:shadow-[0_22px_56px_rgba(58,42,28,0.08)]'
const iconWrap = 'flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8c547]/25 text-[#6b4b16]'
function heroForKind(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      title: 'Directory support that skips the generic queue',
      description:
        'Whether you are onboarding a business, expanding coverage, or fixing a listing, tell us the lane and we will route it to the right person.',
    }
  }
  if (kind === 'editorial') {
    return {
      title: 'Editorial, partnerships, and contributor help',
      description:
        'Pitch long-form ideas, align on newsletter placements, or ask workflow questions—we read every note and reply with clear next steps.',
    }
  }
  if (kind === 'visual') {
    return {
      title: 'Visual features, licensing, and creator collaborations',
      description:
        'Reach out for gallery launches, rights conversations, media kits, and campaign-level visual work.',
    }
  }
  return {
    title: 'Talk with the team behind profiles and bookmarks',
    description:
      'Share what you are trying to publish, curate, or fix. We route collection, profile, and bookmark questions to the right lane instead of one-size-fits-all support.',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const hero = heroForKind(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          {
            icon: Building2,
            title: 'Business onboarding',
            body: 'Add listings, verify operational details, and bring your business surface live quickly.',
          },
          {
            icon: Phone,
            title: 'Partnership support',
            body: 'Talk through bulk publishing, local growth, and operational setup questions.',
          },
          {
            icon: MapPin,
            title: 'Coverage requests',
            body: 'Need a new geography or category lane? We can shape the directory around it.',
          },
        ]
      : productKind === 'editorial'
        ? [
            {
              icon: FileText,
              title: 'Editorial submissions',
              body: 'Pitch essays, columns, and long-form ideas that fit the publication.',
            },
            {
              icon: Mail,
              title: 'Newsletter partnerships',
              body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.',
            },
            {
              icon: Sparkles,
              title: 'Contributor support',
              body: 'Get help with voice, formatting, and publication workflow questions.',
            },
          ]
        : productKind === 'visual'
          ? [
              {
                icon: ImageIcon,
                title: 'Creator collaborations',
                body: 'Discuss gallery launches, creator features, and visual campaigns.',
              },
              {
                icon: Sparkles,
                title: 'Licensing and use',
                body: 'Reach out about usage rights, commercial requests, and visual partnerships.',
              },
              {
                icon: Mail,
                title: 'Media kits',
                body: 'Request creator decks, editorial support, or visual feature placement.',
              },
            ]
          : [
              {
                icon: Bookmark,
                title: 'Collection submissions',
                body: 'Suggest resources, boards, and links that deserve a place in the library.',
              },
              {
                icon: Mail,
                title: 'Resource partnerships',
                body: 'Coordinate curation projects, reference pages, and link programs.',
              },
              {
                icon: Sparkles,
                title: 'Curator support',
                body: 'Need help organizing shelves, collections, or profile-connected boards?',
              },
            ]

  return (
    <PageShell
      eyebrow={`Contact ${SITE_CONFIG.name}`}
      title={hero.title}
      description={hero.description}
      actions={
        <>
          <Button className="rounded-full bg-[#e8c547] text-[#1a120e] hover:bg-[#dfc03a]" asChild>
            <Link href="/sbm">
              Browse bookmarks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full border-[#e4d8cc] bg-white/80 text-[#2a1f1a] hover:bg-[#fffefb]" asChild>
            <Link href="/help">Help center</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="space-y-4">
          {lanes.map((lane) => (
            <div key={lane.title} className={laneCard}>
              <div className={iconWrap}>
                <lane.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-[#2a1f1a]">{lane.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#6b584c]">{lane.body}</p>
            </div>
          ))}
          <div className="rounded-[1.5rem] border border-[#e4d8cc] bg-[#f3ebe0]/40 px-5 py-4 text-sm leading-relaxed text-[#6b584c]">
            <span className="font-semibold text-[#2a1f1a]">Response time.</span> We aim to reply within two business days. Urgent abuse or
            safety issues should also go through your account tools where available.
          </div>
        </div>

        <ContactForm />
      </div>
    </PageShell>
  )
}
