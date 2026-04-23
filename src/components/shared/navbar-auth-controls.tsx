'use client'

import Link from 'next/link'
import { ChevronDown, LayoutGrid, LogOut, Plus, User, FileText, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="hidden h-10 gap-1 rounded-full bg-[#e8c547] px-4 text-[#1a120e] shadow-[0_12px_28px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a] sm:flex"
          >
            <Plus className="h-4 w-4" />
            Create
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-[#e8dfd2] bg-[#fffefb]">
          {SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => {
            const Icon = taskIcons[task.key] || LayoutGrid
            return (
              <DropdownMenuItem key={task.key} asChild>
                <Link href={`/create/${task.key}`}>
                  <Icon className="mr-2 h-4 w-4" />
                  Create {task.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2 rounded-full border border-[#e4d8cc] bg-[#fffefb]/95 py-1 pl-1 pr-1.5 shadow-[0_8px_24px_rgba(58,42,28,0.06)]">
        <Avatar className="h-9 w-9 border border-[#e4d8cc]" title={user?.name ?? 'Account'}>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="bg-[#f3ebe0] text-[#2a1f1a]">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          className="h-9 gap-2 rounded-full bg-[#e8c547] px-3 text-sm font-semibold text-[#1a120e] shadow-[0_8px_22px_rgba(232,197,71,0.35)] hover:bg-[#dfc03a] hover:text-[#1a120e]"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="max-sm:sr-only">Sign out</span>
        </Button>
      </div>
    </>
  )
}
