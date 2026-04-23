import Link from 'next/link'
import { Bookmark, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'
import { LoginForm } from '@/components/auth/login-form'

const shell = 'min-h-screen bg-[#faf6f0] text-[#2a1f1a]'
const side = 'border border-[#e8dfd2] bg-[#fffefb] shadow-[0_24px_80px_rgba(58,42,28,0.06)]'
const panel = 'border border-[#e8dfd2] bg-white/90 shadow-[0_24px_80px_rgba(58,42,28,0.08)]'
const muted = 'text-[#6b584c]'
const action = 'bg-[#e8c547] text-[#1a120e] hover:bg-[#dfc03a]'

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  return (
    <div className={shell}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2.5rem] p-8 lg:p-10 ${side}`}>
            <Bookmark className="h-8 w-8 text-[#c9a227]" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-[2.75rem]">Welcome back to your saved web</h1>
            <p className={`mt-5 text-sm leading-8 ${muted}`}>
              Sign in to keep your profile, collections, and bookmarks in sync on this device. Sessions stay in local storage so you can return without friction.
            </p>
            <div className="mt-8 grid gap-4">
              {['Profiles that feel personal, not crowded', 'Bookmark lanes you can scan in seconds', 'A calmer surface for everyday saving'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#3d2f28]/8 bg-white/70 px-4 py-4 text-sm leading-relaxed text-[#4a3d35]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2.5rem] p-8 lg:p-10 ${panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a7568]">Member access</p>
            <LoginForm actionClassName={action} />
            <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${muted}`}>
              <Link href="/forgot-password" className="hover:text-[#2a1f1a] hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#2a1f1a] hover:underline">
                <Sparkles className="h-4 w-4 text-[#c9a227]" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
