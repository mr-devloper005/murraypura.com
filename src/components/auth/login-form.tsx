'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

type LoginFormProps = {
  actionClassName: string
}

export function LoginForm({ actionClassName }: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Enter your email and password to continue.', variant: 'destructive' })
      return
    }
    await login(email.trim(), password)
    toast({ title: 'Signed in', description: 'Your session is saved on this device.' })
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <input
        className="h-12 rounded-full border border-[#3d2f28]/12 bg-white/80 px-4 text-sm text-[#2a1f1a] shadow-inner outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#c9a227]/50"
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        disabled={isLoading}
      />
      <input
        className="h-12 rounded-full border border-[#3d2f28]/12 bg-white/80 px-4 text-sm text-[#2a1f1a] shadow-inner outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#c9a227]/50"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60 ${actionClassName}`}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Signing in…' : 'Sign in'}
        {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
      </button>
    </form>
  )
}
