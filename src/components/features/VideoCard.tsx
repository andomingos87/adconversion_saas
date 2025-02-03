'use client'

import Image from 'next/image'
import { Copy } from 'lucide-react'

interface VideoCardProps {
  thumbnail: string
}

export function VideoCard({ thumbnail }: VideoCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt="Video thumbnail"
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
        <button className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#125CC6] shadow-lg transition-opacity hover:bg-[#125CC6] hover:text-white opacity-0 group-hover:opacity-100">
          <Copy className="h-4 w-4" />
          Replicate
        </button>
      </div>
    </div>
  )
} 