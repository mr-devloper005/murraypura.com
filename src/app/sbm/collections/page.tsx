'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderPlus } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookmarkCollectionCard } from '@/components/sbm/bookmark-collection-card'
import { mockBookmarkCollections } from '@/data/mock-data'
import type { BookmarkCollection } from '@/types'
import { loadFromStorage, storageKeys } from '@/lib/local-storage'

const shell = 'min-h-screen bg-[#faf6f0] text-[#2a1f1a]'
const hero =
  'relative overflow-hidden border-b border-[#e8dfd2] bg-[linear-gradient(165deg,#fffefb_0%,#faf6f0_45%,#f3ebe0_100%)]'
const muted = 'text-[#6b584c]'
const cta =
  'gap-2 rounded-full bg-[#e8c547] px-5 text-[#1a120e] shadow-[0_14px_40px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a]'

export default function BookmarkCollectionsPage() {
  const [storedCollections, setStoredCollections] = useState<BookmarkCollection[]>([])
  const collections = useMemo(() => {
    const map = new Map<string, BookmarkCollection>()
    storedCollections.forEach((collection) => map.set(collection.id, collection))
    mockBookmarkCollections.forEach((collection) => {
      if (!map.has(collection.id)) {
        map.set(collection.id, collection)
      }
    })
    return Array.from(map.values())
  }, [storedCollections])

  useEffect(() => {
    setStoredCollections(loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, []))
  }, [])

  return (
    <div className={shell}>
      <NavbarShell />

      <main>
        <section className={hero}>
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#e8c547]/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#c9a227]/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${muted}`}>Your library</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-[2.75rem]">Bookmark collections</h1>
                <p className={`mt-4 max-w-2xl text-base leading-relaxed ${muted}`}>
                  Organize saved links into curated folders—open a shelf when you need inspiration, research, or a quiet
                  reading list.
                </p>
              </div>
              <Button className={cta} asChild>
                <Link href="/sbm/collections/new">
                  <FolderPlus className="h-4 w-4" />
                  New collection
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {collections.map((collection) => (
              <BookmarkCollectionCard key={collection.id} collection={collection} />
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
