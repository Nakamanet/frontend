'use client'

import { useState } from 'react'

function SpoilerSpan({ content }: { content: string }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <span
      onClick={(e) => { e.stopPropagation(); setRevealed(true) }}
      className={`cursor-pointer rounded px-2 py-0.5 ${revealed ? '' : 'border border-primary text-transparent bg-base-100 select-none'}`}
    >
      {revealed ? content : 'Spoil'}
    </span>
  )
}

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'",
}

function clean(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z#0-9]+;/gi, (e) => HTML_ENTITIES[e] ?? e)
    .replace(/^b["']|["']$/g, '')
    .trim()
}

export default function CharacterDescription({ text }: { text: string | null | undefined }) {
  if (!text) return <p className="text-sm text-text-muted italic">Pas de description.</p>

  const parts = text.split(/(<spoiler>[\s\S]*?<\/spoiler>)/gi)

  return (
    <p className="text-sm leading-relaxed">
      {parts.map((part, i) => {
        const match = part.match(/<spoiler>([\s\S]*?)<\/spoiler>/i)
        if (match) {
          return <SpoilerSpan key={i} content={clean(match[1])} />
        }
        return <span key={i}>{clean(part)}</span>
      })}
    </p>
  )
}
