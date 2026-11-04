'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Sparkles, X } from 'lucide-react'
import {
  ANIME_EMOTES,
  KAOMOJI_CATEGORIES,
  EMOJI_GROUPS,
  AnimeEmote,
} from '@/app/lib/emotes'

interface AnimeEmojiPickerProps {
  onSelect: (value: string) => void
  onClose?: () => void
  className?: string
  align?: 'left' | 'right'
  placement?: 'top' | 'bottom'
}

type TabType = 'anime' | 'kaomoji' | 'otaku' | 'classic'

export default function AnimeEmojiPicker({
  onSelect,
  onClose,
  className = '',
  align = 'left',
  placement = 'bottom',
}: AnimeEmojiPickerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('anime')
  const [search, setSearch] = useState('')
  const pickerRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const filteredAnimeEmotes = ANIME_EMOTES.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.character.toLowerCase().includes(search.toLowerCase()) ||
      e.anime.toLowerCase().includes(search.toLowerCase())
  )

  const filteredKaomojis = KAOMOJI_CATEGORIES.map((cat) => ({
    ...cat,
    emotes: cat.emotes.filter((k) =>
      search
        ? k.toLowerCase().includes(search.toLowerCase()) || cat.name.toLowerCase().includes(search.toLowerCase())
        : true
    ),
  })).filter((cat) => cat.emotes.length > 0)

  const otakuGroup = EMOJI_GROUPS[0]
  const classicGroup = EMOJI_GROUPS[1]

  const alignmentClass = align === 'right' ? 'right-0' : 'left-0'
  const placementClass = placement === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'

  return (
    <div
      ref={pickerRef}
      className={`absolute ${placementClass} ${alignmentClass} z-50 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-accent/95 backdrop-blur-md border border-border/80 shadow-2xl rounded-2xl overflow-hidden flex flex-col text-text animate-in fade-in zoom-in-95 duration-150 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header & Tabs */}
      <div className="p-2 border-b border-border/50 bg-accent/90 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 bg-background/60 p-0.5 rounded-xl w-full">
            <button
              type="button"
              onClick={() => setActiveTab('anime')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'anime'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Anime Stickers & Chibi"
            >
              <span>🌸</span>
              <span className="hidden xs:inline sm:inline">Chibi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kaomoji')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'kaomoji'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Kaomoji Japoneze"
            >
              <span>ʕ•ᴥ•ʔ</span>
              <span className="hidden xs:inline sm:inline">Kaomoji</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('otaku')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'otaku'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Manga & Otaku Emojis"
            >
              <span>🍙</span>
              <span className="hidden xs:inline sm:inline">Otaku</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={`flex-1 py-1 px-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'classic'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Emoji-uri Chat"
            >
              <span>😀</span>
              <span className="hidden xs:inline sm:inline">Chat</span>
            </button>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg text-text/50 hover:text-text transition-colors shrink-0"
              aria-label="Fermer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-background border border-border/60 rounded-xl pl-7 pr-2.5 py-1 text-xs text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Content Area - Compact Height */}
      <div className="p-2 overflow-y-auto max-h-48 h-48 space-y-2.5 scrollbar-thin">
        {/* TAB 1: ANIME CHIBI STICKERS */}
        {activeTab === 'anime' && (
          <div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-text/50 uppercase tracking-wider mb-1.5 px-0.5">
              <Sparkles size={11} className="text-primary" />
              <span>Anime Emotes ({filteredAnimeEmotes.length})</span>
            </div>

            {filteredAnimeEmotes.length === 0 ? (
              <p className="text-center text-xs text-text/40 py-6">Aucun emote trouvé.</p>
            ) : (
              <div className="grid grid-cols-4 gap-1.5">
                {filteredAnimeEmotes.map((emote: AnimeEmote) => (
                  <button
                    key={emote.code}
                    type="button"
                    onClick={() => onSelect(emote.code)}
                    className="group flex flex-col items-center justify-center p-1.5 rounded-xl bg-background/50 border border-border/40 hover:border-primary/60 hover:bg-primary/10 transition-all hover:scale-105"
                    title={`${emote.name} (${emote.anime})`}
                  >
                    <img
                      src={emote.src}
                      alt={emote.name}
                      className="w-8 h-8 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-transform"
                    />
                    <span className="text-[9px] text-text/70 mt-0.5 truncate max-w-full font-medium">
                      {emote.character.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KAOMOJI */}
        {activeTab === 'kaomoji' && (
          <div className="space-y-2">
            {filteredKaomojis.length === 0 ? (
              <p className="text-center text-xs text-text/40 py-6">Aucun kaomoji trouvé.</p>
            ) : (
              filteredKaomojis.map((category) => (
                <div key={category.name}>
                  <p className="text-[10px] font-semibold text-text/50 uppercase tracking-wider mb-1 px-0.5 flex items-center gap-1">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.emotes.map((k, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onSelect(k)}
                        className="px-2 py-0.5 text-[11px] font-mono rounded-lg bg-background/60 border border-border/50 text-text hover:border-primary hover:bg-primary/15 hover:text-primary transition-all"
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: OTAKU & MANGA EMOJIS */}
        {activeTab === 'otaku' && (
          <div>
            <p className="text-[10px] font-semibold text-text/50 uppercase tracking-wider mb-1.5 px-0.5 flex items-center gap-1">
              <span>{otakuGroup.icon}</span>
              <span>{otakuGroup.name}</span>
            </p>
            <div className="grid grid-cols-7 gap-1">
              {otakuGroup.emojis
                .filter((em) => (search ? em.includes(search) : true))
                .map((emoji, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-primary/20 hover:scale-115 transition-all"
                  >
                    {emoji}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: CHAT & POPULAR EMOJIS */}
        {activeTab === 'classic' && (
          <div>
            <p className="text-[10px] font-semibold text-text/50 uppercase tracking-wider mb-1.5 px-0.5 flex items-center gap-1">
              <span>{classicGroup.icon}</span>
              <span>{classicGroup.name}</span>
            </p>
            <div className="grid grid-cols-7 gap-1">
              {classicGroup.emojis
                .filter((em) => (search ? em.includes(search) : true))
                .map((emoji, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-primary/20 hover:scale-115 transition-all"
                  >
                    {emoji}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-2.5 py-1 bg-background/50 border-t border-border/40 text-[9px] text-text/40 flex items-center justify-between">
        <span>Nakamanet Emotes</span>
        <span className="text-primary font-medium">Click pour insérer</span>
      </div>
    </div>
  )
}
