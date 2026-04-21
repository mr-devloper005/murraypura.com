import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Profiles & bookmarking',
  },
  footer: {
    tagline: 'Profiles & bookmarking',
  },
  hero: {
    badge: 'Curated for calm discovery',
    title: ['A refined home for', 'profiles and saved links.'],
    description: 'Murraypura brings together public profiles and social bookmarking so you can follow people, save lanes, and return without algorithmic noise.',
    primaryCta: {
      label: 'Open bookmarks',
      href: '/sbm',
    },
    secondaryCta: {
      label: 'Browse profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search profiles, collections, and saved links',
    focusLabel: 'Focus',
    featureCardBadge: 'Curator spotlight',
    featureCardTitle: 'Fresh saves and profile updates stay at the center of the experience.',
    featureCardDescription: 'The homepage keeps bookmark lanes and identity surfaces connected so visitors always know where to go next.',
  },
  home: {
    metadata: {
      title: 'Profiles and social bookmarking',
      description: 'Murraypura is a warm, editorial space for public profiles, curated bookmarks, and returning to what matters.',
      openGraphTitle: 'Profiles and social bookmarking',
      openGraphDescription: 'Save links with context, spotlight curators, and explore collections built for calm discovery.',
      keywords: ['profiles', 'social bookmarking', 'saved links', 'Murraypura', 'collections'],
    },
    introBadge: 'About Murraypura',
    introTitle: 'Built for identity-first profiles and intentional bookmarking.',
    introParagraphs: [
      'Murraypura focuses on two surfaces only: who people are on their profile pages, and what they save across bookmark collections.',
      'Instead of mixing in listings, classifieds, or document libraries, the experience stays narrow—so navigation stays obvious and every screen reinforces the same story.',
      'Whether someone starts with a profile or a shelf of links, they can move between both without losing context.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Editorial homepage rhythm inspired by luxury wellness brands—applied to bookmarking.',
      'Gold accent CTAs, serif headlines, and soft cream panels for calmer scanning.',
      'Sections dedicated to curators, collections, and community proof—not generic feeds.',
      'Lightweight interactions that keep saving and browsing fast.',
    ],
    primaryLink: {
      label: 'View bookmarks',
      href: '/sbm',
    },
    secondaryLink: {
      label: 'Meet profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start saving',
    title: 'Keep profiles and bookmarks in one connected, quieter experience.',
    description: 'Murraypura is tuned for social bookmarking and public profiles—nothing extra cluttering the path.',
    primaryCta: {
      label: 'Browse bookmarks',
      href: '/sbm',
    },
    secondaryCta: {
      label: 'Open profiles',
      href: '/profile',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'A SBM , Profile site for Murraypura, built for clean discovery and structured publishing.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
