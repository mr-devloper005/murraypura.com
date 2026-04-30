'use client'

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonProps {
  title: string
  description: string
}

export function ShareButton({ title, description }: ShareButtonProps) {
  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  )
}
