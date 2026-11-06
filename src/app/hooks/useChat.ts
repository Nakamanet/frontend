'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'
import api from '../lib/axios'

export interface Message {
  _id: string
  room: string
  user_id: string
  username: string
  avatar_url: string | null
  content: string
  created_at: string
  is_hidden?: boolean
  is_banned?: boolean
  is_admin?: boolean
}

interface UserStatus {
  id: number
  username: string
  is_banned: boolean
  is_admin: boolean
  role?: string
}

export const GUEST_MESSAGE_LIMIT = 20

const TOXIC_PATTERNS = [
  /suicide/i,
  /\bkill\b/i,
  /\btuer\b/i,
  /\bcr[eèé]ve\b/i,
  /\bmort\b/i,
  /\bnique\b/i,
  /\bbaise\b/i,
  /\bpute\b/i,
  /\bfdp\b/i,
  /\bsalope\b/i,
  /\bconnard\b/i,
  /\bconnasse\b/i,
  /\bb[aâ]tard\b/i,
  /\bencul[eé]\b/i,
  /\bchienne\b/i,
  /\bcochon\b/i,
  /\bmerde\b/i,
  /\bfuck\b/i,
  /\bbitch/i,
  /\basshole\b/i,
  /\bcunt\b/i,
  /\bdick\b/i,
  /\bpussy\b/i,
  /\bwhore\b/i,
  /\bslut\b/i,
  /\bnigger\b/i,
  /\bfaggot\b/i,
]

export function isToxicText(text?: string | null): boolean {
  if (!text) return false
  const lower = text.toLowerCase()
  return TOXIC_PATTERNS.some((pattern) => pattern.test(lower))
}

export function useChat(room: string, { allowGuest = false }: { allowGuest?: boolean } = {}) {
  const { isLoggedIn, user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [userStatuses, setUserStatuses] = useState<Record<string, UserStatus>>({})
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)
  const roomRef = useRef(room)
  const isGuestRef = useRef(!isLoggedIn)

  useEffect(() => {
    isGuestRef.current = !isLoggedIn
  }, [isLoggedIn])

  // keep roomRef in sync with the latest room prop
  useEffect(() => {
    roomRef.current = room
  }, [room])

  // Fetch banned / admin statuses for users in the chat
  useEffect(() => {
    const missingUsernames = Array.from(
      new Set(
        messages
          .map((m) => m.username)
          .filter((u) => u && typeof u === 'string' && u !== 'Anonymous' && !userStatuses[u])
      )
    )

    if (missingUsernames.length === 0) return

    api
      .get<Record<string, UserStatus>>('/users/statuses', {
        params: { usernames: missingUsernames.join(',') },
      })
      .then(({ data }) => {
        if (data && typeof data === 'object') {
          setUserStatuses((prev) => ({ ...prev, ...data }))
        }
      })
      .catch((err) => {
        console.error('Failed to load user statuses for chat:', err)
      })
  }, [messages, userStatuses])

  const enrichedMessages = useMemo(() => {
    return messages.map((m) => {
      const status = userStatuses[m.username] || (m.user_id ? userStatuses[m.user_id] : null)
      return {
        ...m,
        is_hidden: Boolean(m.is_hidden || isToxicText(m.content)),
        is_banned: status ? status.is_banned : m.is_banned,
        is_admin: status ? status.is_admin : m.is_admin,
      }
    })
  }, [messages, userStatuses])

  // connect once
  useEffect(() => {
    const token = isLoggedIn ? localStorage.getItem('token') : null
    if (!token && !allowGuest) return

    const socket = io(process.env.NEXT_PUBLIC_CHAT_URL!, {
      auth: token
        ? {
            token,
            username: user?.username,
            avatar_url: user?.avatar_url ?? null,
          }
        : {},
      forceNew: true,
    })

    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    socket.on('history', (history: Message[]) => {
      const sanitized = history.map((msg) => ({
        ...msg,
        is_hidden: Boolean(msg.is_hidden || isToxicText(msg.content)),
      }))
      setMessages(isGuestRef.current ? sanitized.slice(-GUEST_MESSAGE_LIMIT) : sanitized)
    })

    socket.on('chat:message', (message: Message) => {
      setMessages((prev) => {
        // Only append if the message belongs to the room we're currently viewing
        if (message.room !== roomRef.current) return prev
        const enriched = {
          ...message,
          is_hidden: Boolean(message.is_hidden || isToxicText(message.content)),
        }
        const next = [...prev, enriched]
        return isGuestRef.current ? next.slice(-GUEST_MESSAGE_LIMIT) : next
      })
    })

    socket.on('connect_error', (err) => {
      console.error('Chat connection error:', err.message)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [isLoggedIn, allowGuest])

  // join / switch room whenever room changes (or once connected)
  useEffect(() => {
    if (!connected || !socketRef.current || !room) return
    setMessages([]) // clear old room's messages while we wait for history
    socketRef.current.emit('chat:join', room)
  }, [connected, room])

  const sendMessage = (content: string) => {
    const isSelfBanned = Boolean(user?.is_deleted || (user?.banned_until && new Date(user.banned_until) > new Date()))
    if (isSelfBanned || !content.trim() || !socketRef.current || !room) return
    socketRef.current.emit('chat:message', {
      room,
      content,
      username: user?.username ?? 'Anonymous',
      avatar_url: user?.avatar_url ?? null,
      is_banned: isSelfBanned,
      is_admin: Boolean(user?.is_admin || user?.role === 'admin'),
    })
  }

  return { messages: enrichedMessages, connected, sendMessage }
}
