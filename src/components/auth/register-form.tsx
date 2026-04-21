'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

const inputClass =
  'h-12 rounded-full border border-[#3d2f28]/12 bg-white/80 px-4 text-sm text-[#2a1f1a] shadow-inner outline-none ring-offset-2 placeholder:text-[#8a7568] focus-visible:ring-2 focus-visible:ring-[#c9a227]/50 disabled:opacity-60'

type RegisterFormProps = {
  actionClassName: string
}

export function RegisterForm({ actionClassName }: RegisterFormProps) {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({
        title: 'Missing fields',
        description: 'Enter your name, email, and password to continue.',
        variant: 'destructive',
      })
      return
    }
    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', description: 'Re-enter your password in both fields.', variant: 'destructive' })
      return
    }
    await signup(name.trim(), email.trim(), password)
    toast({ title: 'Welcome aboard', description: 'Your account is saved on this device.' })
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <input
        className={inputClass}
        placeholder="Full name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        disabled={isLoading}
      />
      <input
        className={inputClass}
        placeholder="Email address"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        disabled={isLoading}
      />
      <input
        className={inputClass}
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        disabled={isLoading}
      />
      <input
        className={inputClass}
        placeholder="Confirm password"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(ev) => setConfirmPassword(ev.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60 ${actionClassName}`}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Creating account…' : 'Create account'}
        {!isLoading ? <ArrowRight className="h-4 w-4" /> : null}
      </button>
    </form>
  )
}
