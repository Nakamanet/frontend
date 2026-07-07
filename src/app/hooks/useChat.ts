'use client'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'

interface Message {
  _id: string
  room: string
  user_id: string
  username: string
  avatar_url: string | null
  content: string
  created_at: string
}

export function useChat(room: string) {
  const { isLoggedIn, user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  // connect once
  useEffect(() => {
    if (!isLoggedIn) return

    const token = localStorage.getItem('token')
    if (!token) return

    const socket = io(process.env.NEXT_PUBLIC_CHAT_URL!, {
      auth: {
        token,
        username: user?.username,
        avatar_url: user?.avatar_url ?? null,
      },
    })

    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    socket.on('history', (history: Message[]) => {
      setMessages(history)
    })

    socket.on('chat:message', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    socket.on('connect_error', (err) => {
      console.error('Chat connection error:', err.message)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [isLoggedIn])

  // join / switch room whenever room changes (or once connected)
  useEffect(() => {
    if (!connected || !socketRef.current || !room) return
    setMessages([]) // clear old room's messages while we wait for history
    socketRef.current.emit('chat:join', room)
  }, [connected, room])

  const sendMessage = (content: string) => {
    console.log('[useChat] sending, room =', room)
    if (!content.trim() || !socketRef.current || !room) return
    socketRef.current.emit('chat:message', {
      room,
      content,
      username: user?.username ?? 'Anonymous',
      avatar_url: user?.avatar_url ?? null,
    })
  }

  return { messages, connected, sendMessage }
}
