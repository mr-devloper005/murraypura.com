'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import type { BookmarkCollection } from '@/types'
import { cn } from '@/lib/utils'

const cardClass =
  'rounded-[2rem] border border-[#e8dfd2] bg-[#fffefb] shadow-[0_24px_70px_rgba(58,42,28,0.07)] gap-0 py-0'
const field = 'mt-2 border-[#e4d8cc] bg-white/90'
const action = 'rounded-full bg-[#e8c547] text-[#1a120e] shadow-[0_14px_40px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a]'

export default function NewCollectionPage() {
  const [isPrivate, setIsPrivate] = useState(false)
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { toast } = useToast()

  return (
    <PageShell
      title="New Collection"
      description="Organize your saved links into a curated folder."
      actions={
        <Button variant="outline" className="rounded-full border-[#e4d8cc] bg-white/80 text-[#2a1f1a] hover:bg-[#fffefb]" asChild>
          <Link href="/sbm/collections">Back to collections</Link>
        </Button>
      }
    >
      <Card className={cardClass}>
        <CardContent className="space-y-5 p-8 sm:p-10">
          <div>
            <label className="text-sm font-medium text-[#2a1f1a]">Collection name</label>
            <Input
              className={field}
              placeholder="Design systems"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#2a1f1a]">Description</label>
            <Textarea
              className={cn(field, 'min-h-[100px]')}
              placeholder="What belongs in this folder?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-[#e8dfd2] bg-white/70 px-4 py-4">
            <div>
              <p className="text-sm font-medium text-[#2a1f1a]">Private collection</p>
              <p className="text-xs text-[#6b584c]">Only visible to you.</p>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
          <Button
            className={action}
            onClick={() => {
              if (!name.trim()) {
                toast({ title: 'Name required', description: 'Give your collection a name.' })
                return
              }
              const newCollection: BookmarkCollection = {
                id: `user-collection-${Date.now()}`,
                name: name.trim(),
                description: description.trim() || 'Personal collection',
                updatedAt: new Date().toISOString(),
                isPrivate,
                bookmarks: [],
                coverImages: ['/placeholder.svg?height=240&width=240'],
              }
              const stored = loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, [])
              saveToStorage(storageKeys.bookmarkCollections, [newCollection, ...stored])
              setSaved(true)
              toast({ title: 'Collection created', description: 'Your collection is ready.' })
            }}
          >
            Create collection
          </Button>
          {saved && <p className="text-sm text-[#6b584c]">Collection created.</p>}
        </CardContent>
      </Card>
    </PageShell>
  )
}
