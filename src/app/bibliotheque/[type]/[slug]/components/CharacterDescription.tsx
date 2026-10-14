'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from '@/app/context/TranslationContext'
import Loader from '@/app/components/Loader'

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
  const { lang, translateBatch } = useTranslation()
  const [voirPlus, setVoirPlus] = useState(false)
  const [translatedSegments, setTranslatedSegments] = useState<Segment[] | null>(null)
  const [loadingTranslation, setLoadingTranslation] = useState(false)
  const [showOriginal, setShowOriginal] = useState(false)

  // Compute original segments
  const originalSegments = useMemo<Segment[]>(() => {
    if (!text) return []
    return text.split(/(<spoiler>[\s\S]*?<\/spoiler>)/gi).map((part) => {
      const match = part.match(/<spoiler>([\s\S]*?)<\/spoiler>/i)
      return match ? { spoiler: true, text: clean(match[1]) } : { spoiler: false, text: clean(part) }
    }).filter(s => s.text.length > 0)
  }, [text])

  // Translate segments when language is French
  useEffect(() => {
    let isCancelled = false

    if (lang === 'fr' && originalSegments.length > 0) {
      const batch: Record<string, string> = {}
      originalSegments.forEach((seg, idx) => {
        if (seg.text.trim()) {
          batch[idx.toString()] = seg.text
        }
      })

      if (Object.keys(batch).length > 0) {
        setLoadingTranslation(true)
        translateBatch(batch)
          .then((res) => {
            if (!isCancelled) {
              const updated = originalSegments.map((seg, idx) => ({
                ...seg,
                text: res[idx.toString()] || seg.text,
              }))
              setTranslatedSegments(updated)
            }
          })
          .finally(() => {
            if (!isCancelled) setLoadingTranslation(false)
          })
      }
    } else {
      setTranslatedSegments(null)
      setLoadingTranslation(false)
      setShowOriginal(false)
    }

    return () => {
      isCancelled = true
    }
  }, [lang, originalSegments, translateBatch])

  if (!text) {
    return (
      <p className="text-sm text-text-muted italic">
        {lang === 'fr' ? 'Pas de description.' : 'No description.'}
      </p>
    )
  }

  const activeSegments = (!showOriginal && lang === 'fr' && translatedSegments)
    ? translatedSegments
    : originalSegments

  const isLong = activeSegments.reduce((total, segment) => total + countWords(segment.text), 0) > WORD_LIMIT
  const displayed = isLong && !voirPlus ? truncate(activeSegments, WORD_LIMIT) : activeSegments

  return (
    <div className="flex flex-col gap-2">
      {/* Translation status & original VO toggle */}
      {lang === 'fr' && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            {loadingTranslation ? (
              <span className="flex items-center gap-1 text-primary animate-pulse">
                <Loader variant="inline" size="xs" /> Traduction de la bio...
              </span>
            ) : translatedSegments ? (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                🇫🇷 Traduit en français
              </span>
            ) : null}
          </div>
          {translatedSegments && (
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-[11px] text-text-muted hover:text-primary transition-colors underline cursor-pointer"
            >
              {showOriginal ? 'Afficher en français' : 'Voir en VO'}
            </button>
          )}
        </div>
      )}

      <p className="text-sm leading-relaxed text-text/90">
        {displayed.map((segment, i) =>
          segment.spoiler ? <SpoilerSpan key={i} content={segment.text} /> : <span key={i}>{segment.text}</span>
        )}
        {isLong && !voirPlus && '...'}
      </p>

      {isLong && (
        <div className="flex justify-end">
          <button
            onClick={() => setVoirPlus(!voirPlus)}
            className="text-primary hover:underline text-xs font-medium cursor-pointer"
          >
            {voirPlus
              ? (lang === 'fr' ? 'Voir moins' : 'Show less')
              : (lang === 'fr' ? 'Voir plus' : 'Show more')}
          </button>
        </div>
      )}
    </div>
  )
}

