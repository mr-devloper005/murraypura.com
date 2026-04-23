'use client'

import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const formPanel =
  'rounded-[2rem] border border-[#e8dfd2] bg-[#fffefb] p-8 shadow-[0_24px_70px_rgba(58,42,28,0.07)] sm:p-10'
const field = 'mt-2 border-[#e4d8cc] bg-white/90'
const action = 'w-full rounded-full bg-[#e8c547] text-[#1a120e] shadow-[0_14px_40px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a] sm:w-auto'

export function ContactForm() {
  const { toast } = useToast()

  return (
    <div className={formPanel}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8a7568]">
        <Mail className="h-4 w-4 text-[#c9a227]" />
        Send a message
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#2a1f1a]">Tell us what you need</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#6b584c]">
        The more context you share—URLs, collection names, or screenshots—the faster we can help.
      </p>
      <form
        className="mt-8 grid gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          toast({
            title: 'Message captured (demo)',
            description: 'Wire this form to your inbox or support tool when you are ready.',
          })
        }}
      >
        <div>
          <Label htmlFor="contact-name" className="text-sm font-medium text-[#2a1f1a]">
            Name
          </Label>
          <Input id="contact-name" name="name" className={field} placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="contact-email" className="text-sm font-medium text-[#2a1f1a]">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            className={field}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="contact-subject" className="text-sm font-medium text-[#2a1f1a]">
            Topic
          </Label>
          <Input id="contact-subject" name="subject" className={field} placeholder="What do you need help with?" />
        </div>
        <div>
          <Label htmlFor="contact-body" className="text-sm font-medium text-[#2a1f1a]">
            Message
          </Label>
          <Textarea
            id="contact-body"
            name="message"
            className={`min-h-[160px] ${field}`}
            placeholder="Share the full context so we can respond with the right next step."
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button type="submit" className={action}>
            Send message
          </Button>
          <p className="text-xs text-[#8a7568]">Demo: connect this form to email or a ticketing API later.</p>
        </div>
      </form>
    </div>
  )
}
