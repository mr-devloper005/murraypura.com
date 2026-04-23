export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || '3k1bxbzw9e',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Murraypura',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Profiles & social bookmarking',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Murraypura is a profiles and social bookmarking community built for calm discovery, curated saves, and trustworthy identity pages.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'murraypura.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://murraypura.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

