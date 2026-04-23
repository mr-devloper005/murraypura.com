'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Folder, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { BookmarkCard } from '@/components/sbm/bookmark-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { mockBookmarkCollections } from '@/data/mock-data'
import type { BookmarkCollection } from '@/types'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

const shell = 'min-h-screen bg-[#faf6f0] text-[#2a1f1a]'
const hero =
  'relative overflow-hidden border-b border-[#e8dfd2] bg-[linear-gradient(165deg,#fffefb_0%,#faf6f0_45%,#f3ebe0_100%)]'
const muted = 'text-[#6b584c]'
const cardShell = 'rounded-[1.75rem] border border-[#e8dfd2] bg-[#fffefb] shadow-[0_24px_70px_rgba(58,42,28,0.07)]'
const emptyCta = 'rounded-full bg-[#e8c547] text-[#1a120e] shadow-[0_14px_40px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a]'

export default function BookmarkCollectionDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [storedCollections, setStoredCollections] = useState<BookmarkCollection[]>([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { toast } = useToast()
  const collection = useMemo(() => {
    const map = new Map<string, BookmarkCollection>()
    storedCollections.forEach((item) => map.set(item.id, item))
    mockBookmarkCollections.forEach((item) => {
      if (!map.has(item.id)) map.set(item.id, item)
    })
    return map.get(id)
  }, [id, storedCollections])

  useEffect(() => {
    setStoredCollections(loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, []))
  }, [])

  if (!collection) {
    return (
      <div className={shell}>
        <NavbarShell />
        <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className={cn(cardShell, 'gap-0 py-0 shadow-[0_24px_70px_rgba(58,42,28,0.07)]')}>
            <CardContent className="p-10 text-center">
              <h1 className="text-2xl font-semibold text-[#2a1f1a]">Collection not found</h1>
              <p className={`mt-2 ${muted}`}>Try exploring other bookmark collections.</p>
              <Button className={`mt-6 ${emptyCta}`} asChild>
                <Link href="/sbm/collections">Back to collections</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={shell}>
      <NavbarShell />

      <main>
        <section className={hero}>
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#e8c547]/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#c9a227]/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
            <Link
              href="/sbm/collections"
              className={`inline-flex items-center gap-2 text-sm font-medium ${muted} hover:text-[#2a1f1a]`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to collections
            </Link>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${muted}`}>
                  <Folder className="h-4 w-4 text-[#c9a227]" />
                  Bookmark collection
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#2a1f1a] sm:text-4xl">{collection.name}</h1>
                <p className={`mt-3 max-w-2xl text-base leading-relaxed ${muted}`}>{collection.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {collection.isPrivate && (
                  <Badge variant="secondary" className="border border-[#e4d8cc] bg-[#f3ebe0] text-[#5c4810]">
                    Private
                  </Badge>
                )}
                <Badge variant="outline" className="border-[#e4d8cc] bg-white/80 text-[#2a1f1a]">
                  {collection.bookmarks.length} bookmarks
                </Badge>
                {collection.id.startsWith('user-') && (
                  <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>
                    Delete Collection
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {collection.bookmarks.length === 0 ? (
            <Card className={cn(cardShell, 'gap-0 py-0 shadow-[0_24px_70px_rgba(58,42,28,0.07)]')}>
              <CardContent className="p-10 text-center sm:p-12">
                <h2 className="text-lg font-semibold text-[#2a1f1a]">No bookmarks yet</h2>
                <p className={`mt-2 text-sm ${muted}`}>Start saving links to populate this collection.</p>
                <Button className={`mt-6 ${emptyCta}`} asChild>
                  <Link href="/sbm">Explore bookmarks</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {collection.bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </motion.div>
          )}
        </section>
      </main>

      <Footer />

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this collection?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will remove the collection from your saved folders.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                const next = storedCollections.filter((item) => item.id !== collection.id)
                saveToStorage(storageKeys.bookmarkCollections, next)
                setStoredCollections(next)
                setConfirmDelete(false)
                toast({ title: 'Collection deleted', description: 'The collection was removed.' })
              }}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
