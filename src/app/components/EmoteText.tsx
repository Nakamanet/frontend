'use client'

import React from 'react'
import { ANIME_EMOTE_MAP } from '@/app/lib/emotes'

interface EmoteTextProps {
  text: string
  className?: string
}

export default function EmoteText({ text, className = '' }: EmoteTextProps) {
  if (!text) return null

  // Matches shortcodes like :anya_heh:
  const parts = text.split(/(:(?:[a-zA-Z0-9_]+):)/g)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const emote = ANIME_EMOTE_MAP[part]
        if (emote) {
          return (
            <img
              key={index}
              src={emote.src}
              alt={emote.name}
              title={`${emote.name} (${emote.anime})`}
              className="inline-block w-6 h-6 object-contain align-middle mx-0.5 select-none hover:scale-125 transition-transform"
              loading="lazy"
            />
          )
        }
        return part
      })}
    </span>
  )
}
