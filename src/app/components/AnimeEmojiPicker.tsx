'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Sparkles, Smile, X } from 'lucide-react'
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
  placement = 'top',
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
      search ? k.toLowerCase().includes(search.toLowerCase()) || cat.name.toLowerCase().includes(search.toLowerCase()) : true
    ),
  })).filter((cat) => cat.emotes.length > 0)

  const otakuGroup = EMOJI_GROUPS[0]
  const classicGroup = EMOJI_GROUPS[1]

  const handlePick = (val: string) => {
    onSelect(val)
  }

  const alignmentClass = align === 'right' ? 'right-0' : 'left-0'
  const placementClass = placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'

  return (
    <div
      ref={pickerRef}
      className={`absolute ${placementClass} ${alignmentClass} z-50 w-80 max-w-[92vw] bg-accent/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col text-text animate-in fade-in zoom-in-95 duration-150 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header & Tabs */}
      <div className="p-2 border-b border-border/50 bg-accent flex flex-col gap-2">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 bg-background/50 p-1 rounded-xl w-full">
            <button
              type="button"
              onClick={() => setActiveTab('anime')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'anime'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Anime Stickers & Chibi"
            >
              <span>🌸</span>
              <span className="hidden sm:inline">Chibi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kaomoji')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'kaomoji'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Kaomoji Japoneze"
            >
              <span>ʕ•ᴥ•ʔ</span>
              <span className="hidden sm:inline">Kaomoji</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('otaku')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'otaku'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Manga & Otaku Emojis"
            >
              <span>🍙</span>
              <span className="hidden sm:inline">Otaku</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={`flex-1 py-1 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === 'classic'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/5'
              }`}
              title="Emoji-uri Clasice"
            >
              <span>😀</span>
              <span className="hidden sm:inline">Chat</span>
            </button>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg text-text/50 hover:text-text transition-colors shrink-0"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un emote, kaomoji..."
            className="w-full bg-background border border-border/60 rounded-xl pl-8 pr-3 py-1.5 text-xs text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-2 overflow-y-auto max-h-64 h-64 space-y-3 scrollbar-thin">
        {/* TAB 1: ANIME CHIBI STICKERS */}
        {activeTab === 'anime' && (
          <div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-text/50 uppercase tracking-wider mb-2 px-1">
              <Sparkles size={12} className="text-primary" />
              <span>Anime Emotes ({filteredAnimeEmotes.length})</span>
            </div>

            {filteredAnimeEmotes.length === 0 ? (
              <p className="text-center text-xs text-text/40 py-8">Aucun emote trouvé.</p>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {filteredAnimeEmotes.map((emote: AnimeEmote) => (
                  <button
                    key={emote.code}
                    type="button"
                    onClick={() => handlePick(emote.code)}
                    className="group relative flex flex-col items-center justify-center p-2 rounded-xl bg-background/50 border border-border/40 hover:border-primary/60 hover:bg-primary/10 transition-all hover:scale-105"
                    title={`${emote.name} - ${emote.anime}`}
                  >
                    <img
                      src={emote.src}
                      alt={emote.name}
                      className="w-10 h-10 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-transform"
                    />
                    <span className="text-[10px] text-text/70 mt-1 truncate max-w-full font-medium">
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
          <div className="space-y-3">
            {filteredKaomojis.length === 0 ? (
              <p className="text-center text-xs text-text/40 py-8">Aucun kaomoji trouvé.</p>
            ) : (
              filteredKaomojis.map((category) => (
                <div key={category.name}>
                  <p className="text-[11px] font-semibold text-text/50 uppercase tracking-wider mb-1.5 px-1 flex items-center gap-1.5">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.emotes.map((k, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePick(k)}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-background/60 border border-border/50 text-text hover:border-primary hover:bg-primary/15 hover:text-primary transition-all"
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
            <p className="text-[11px] font-semibold text-text/50 uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
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
                    onClick={() => handlePick(emoji)}
                    className="w-9 h-9 flex items-center justify-center text-xl rounded-lg hover:bg-primary/20 hover:scale-120 transition-all"
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
            <p className="text-[11px] font-semibold text-text/50 uppercase tracking-wider mb-2 px-1 flex items-center gap-1">
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
                    onClick={() => handlePick(emoji)}
                    className="w-9 h-9 flex items-center justify-center text-xl rounded-lg hover:bg-primary/20 hover:scale-120 transition-all"
                  >
                    {emoji}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-1.5 bg-background/40 border-t border-border/40 text-[10px] text-text/40 flex items-center justify-between">
        <span>Nakamanet Anime Emotes</span>
        <span className="text-primary font-medium">Click pour insérer</span>
      </div>
    </div>
  )
}
