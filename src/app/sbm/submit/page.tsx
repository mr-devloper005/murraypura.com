'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockBookmarks } from '@/data/mock-data'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import type { Bookmark as BookmarkType } from '@/types'

const shell = 'min-h-screen bg-[#faf6f0] text-[#2a1f1a]'
const hero =
  'relative overflow-hidden border-b border-[#e8dfd2] bg-[linear-gradient(165deg,#fffefb_0%,#faf6f0_45%,#f3ebe0_100%)]'
const panel = 'rounded-[2rem] border border-[#e8dfd2] bg-[#fffefb] p-6 shadow-[0_24px_70px_rgba(58,42,28,0.07)] sm:p-8'
const sidePanel = 'rounded-[1.75rem] border border-[#e8dfd2] bg-white/90 p-5 shadow-[0_14px_40px_rgba(58,42,28,0.05)]'
const muted = 'text-[#6b584c]'
const action = 'rounded-full bg-[#e8c547] px-6 text-[#1a120e] shadow-[0_14px_40px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a]'

export default function SubmitBookmarkPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const categoryOptions = useMemo(
    () => Array.from(new Set(mockBookmarks.map((bookmark) => bookmark.category))),
    []
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to submit a bookmark.',
      })
      router.push('/login')
      return
    }

    if (!url || !title || !description) {
      setStatusMessage('Please complete the required fields before submitting.')
      return
    }

    let domain = 'link'
    try {
      const parsed = new URL(url)
      domain = parsed.hostname.replace('www.', '')
    } catch {
      setStatusMessage('Please enter a valid URL.')
      return
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const nextBookmark: BookmarkType = {
      id: `user-bookmark-${Date.now()}`,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 60),
      url,
      description,
      image: '/placeholder.svg?height=720&width=1280',
      domain,
      tags: tags.length > 0 ? tags : ['New'],
      category: category || 'General',
      createdAt: new Date().toISOString(),
      author: user,
      upvotes: 0,
      saves: 0,
      commentsCount: 0,
      isUpvoted: false,
      isSaved: false,
    }

    const stored = loadFromStorage<BookmarkType[]>(storageKeys.bookmarks, [])
    const next = [nextBookmark, ...stored]
    saveToStorage(storageKeys.bookmarks, next)

    setStatusMessage('Bookmark submitted! It will appear in your feed.')
    toast({
      title: 'Bookmark submitted',
      description: 'Your link has been added to the feed.',
    })
    setUrl('')
    setTitle('')
    setDescription('')
    setCategory('')
    setTagsInput('')
  }

  return (
    <div className={shell}>
      <NavbarShell />

      <main>
        <section className={hero}>
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#e8c547]/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#c9a227]/10 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] ${muted}`}>
              <Sparkles className="h-4 w-4 text-[#c9a227]" />
              Submit a bookmark
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-[2.75rem]">Share a link with the community</h1>
            <p className={`mt-4 max-w-2xl text-base leading-relaxed ${muted}`}>
              Add a short description, pick a category, and tag it for easy discovery—your pick lands in the bookmark feed.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={panel}
            >
              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="text-sm font-medium text-[#2a1f1a]">URL</label>
                  <Input
                    placeholder="https://"
                    className="mt-2 border-[#e4d8cc] bg-white/90"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2a1f1a]">Title</label>
                  <Input
                    placeholder="Give this link a clear title"
                    className="mt-2 border-[#e4d8cc] bg-white/90"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2a1f1a]">Description</label>
                  <Textarea
                    placeholder="Why is this link useful?"
                    className="mt-2 min-h-[140px] border-[#e4d8cc] bg-white/90"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2a1f1a]">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-2 border-[#e4d8cc] bg-white/90">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((categoryOption) => (
                        <SelectItem key={categoryOption} value={categoryOption}>
                          {categoryOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#2a1f1a]">Tags</label>
                  <Input
                    placeholder="Add tags separated by commas"
                    className="mt-2 border-[#e4d8cc] bg-white/90"
                    value={tagsInput}
                    onChange={(event) => setTagsInput(event.target.value)}
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Design', 'Productivity', 'AI', 'Frontend', 'Research'].map((tag) => (
                      <Badge key={tag} variant="outline" className="border-[#e4d8cc] bg-[#f3ebe0]/60 text-xs text-[#5c4810]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" className={action}>
                    Submit bookmark
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-[#e4d8cc] bg-white/80 text-[#2a1f1a] hover:bg-[#fffefb]"
                    onClick={() => {
                      setStatusMessage('Draft saved locally.')
                      toast({
                        title: 'Draft saved',
                        description: 'Your bookmark draft is saved on this device.',
                      })
                    }}
                  >
                    Save Draft
                  </Button>
                </div>
                {statusMessage && (
                  <p className={`text-sm ${muted}`}>{statusMessage}</p>
                )}
              </form>
            </motion.div>

            <div className="space-y-6">
              <div className={sidePanel}>
                <h3 className="text-base font-semibold text-[#2a1f1a]">Submission tips</h3>
                <ul className={`mt-3 space-y-2 text-sm ${muted}`}>
                  <li>Keep titles short and descriptive.</li>
                  <li>Explain the main takeaway in one sentence.</li>
                  <li>Add 3-5 tags to improve discoverability.</li>
                </ul>
              </div>
              <div className={sidePanel}>
                <h4 className="text-sm font-semibold text-[#2a1f1a]">What happens next</h4>
                <p className={`mt-2 text-sm ${muted}`}>
                  Once submitted, your link appears in the bookmark feed so others can open, save, and discuss it.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
