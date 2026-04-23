import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans } from 'next/font/google'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans-brand',
  display: 'swap',
})

const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display-brand',
  display: 'swap',
})

const fontScript = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script-brand',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe, brandPack } = getFactoryState()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontScript.variable}`}
    >
      <body
        data-site-shell={recipe.homeLayout}
        data-motion-pack={recipe.motionPack}
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
