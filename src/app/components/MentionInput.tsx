// src/app/components/MentionInput.tsx
'use client'
import { useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { searchMentions, MentionUser } from '@/app/lib/mentions'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  rows?: number
  maxLength?: number
}

export default function MentionInput({ value, onChange, placeholder, className, rows, maxLength }: Props) {
  const [mentionQuery, setMentionQuery] = useState<string | null>(null)
  const [cursorPos, setCursorPos] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { data: suggestions = [] } = useQuery({
    queryKey: ['mentions', mentionQuery],
    queryFn: () => searchMentions(mentionQuery!),
    enabled: mentionQuery !== null && mentionQuery.length > 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    const pos = e.target.selectionStart
    onChange(text)
    setCursorPos(pos)

    const beforeCursor = text.slice(0, pos)
    const match = beforeCursor.match(/@([a-zA-Z0-9_]*)$/)

    setMentionQuery(match ? match[1] : null)
  }

  const selectMention = (user: MentionUser) => {
    const beforeCursor = value.slice(0, cursorPos)
    const afterCursor = value.slice(cursorPos)
    const newBefore = beforeCursor.replace(/@([a-zA-Z0-9_]*)$/, `@${user.handle} `)

    const newValue = newBefore + afterCursor
    onChange(newValue)
    setMentionQuery(null)

    requestAnimationFrame(() => {
      const newPos = newBefore.length
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(newPos, newPos)
    })
  }

  return (
    <div className="relative">
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        rows={rows}
        maxLength={maxLength}
      />

      {mentionQuery !== null && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-64 bg-base-100 border border-base-300 rounded-[10px] shadow-lg overflow-hidden">
          {suggestions.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => selectMention(user)}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-base-200 transition-colors text-left"
            >
              <div className="w-7 h-7 rounded-full bg-muted overflow-hidden shrink-0">
                {user.avatar_url && (
                  <Image src={user.avatar_url} alt={user.handle} width={28} height={28} className="object-cover" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user.username}</p>
                <p className="text-xs text-base-content/50 truncate">@{user.handle}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
