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

const WORD_LIMIT = 50

type Segment = { spoiler: boolean; text: string }

const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length

function truncate(segments: Segment[], limit: number): Segment[] {
  const result: Segment[] = []
  let remaining = limit
  for (const segment of segments) {
    const words = segment.text.split(/\s+/).filter(Boolean)
    if (words.length <= remaining) {
      result.push(segment)
      remaining -= words.length
    } else {
      result.push({ ...segment, text: words.slice(0, remaining).join(' ') })
      break
    }
  }
  return result
}

export default function CharacterDescription({ text }: { text: string | null | undefined }) {
  const [voirPlus, setVoirPlus] = useState(false)

  if (!text) return <p className="text-sm text-text-muted italic">Pas de description.</p>

  const segments: Segment[] = text.split(/(<spoiler>[\s\S]*?<\/spoiler>)/gi).map((part) => {
    const match = part.match(/<spoiler>([\s\S]*?)<\/spoiler>/i)
    return match ? { spoiler: true, text: clean(match[1]) } : { spoiler: false, text: clean(part) }
  })

  const isLong = segments.reduce((total, segment) => total + countWords(segment.text), 0) > WORD_LIMIT
  const displayed = isLong && !voirPlus ? truncate(segments, WORD_LIMIT) : segments

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm leading-relaxed">
        {displayed.map((segment, i) =>
          segment.spoiler ? <SpoilerSpan key={i} content={segment.text} /> : <span key={i}>{segment.text}</span>
        )}
        {isLong && !voirPlus && '...'}
      </p>
      {isLong && (
        <div className="flex justify-end">
          <button onClick={() => setVoirPlus(!voirPlus)}>{voirPlus ? 'Voir moins' : 'Voir plus'}</button>
        </div>
      )}
    </div>
  )
}
