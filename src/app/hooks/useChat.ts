'use client'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'

interface Message {
  _id: string
  user_id: string
  username: string
  avatar_url: string | null
  content: string
  created_at: string
}

export function useChat() {
  const { isLoggedIn,user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [connected, setConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    console.log('useChat effect fired, isLoggedIn:', isLoggedIn)

    if (!isLoggedIn) return

    console.log('token:', localStorage.getItem('token'))

    const token = localStorage.getItem('token')
    if (!token) return

    const socket = io(process.env.NEXT_PUBLIC_CHAT_URL!, {
        auth: {
            token,
            username:   user?.username,
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
        console.log('chat:message received:', message)
        setMessages((prev) => [...prev, message])
    })

    socket.on('connect_error', (err) => {
      console.error('Chat connection error:', err.message)
    })

    return () => {
      socket.disconnect()
    }
  }, [isLoggedIn])

  const sendMessage = (content: string) => {
    console.log('sendMessage called, socket connected:', socketRef.current?.connected)
    if (!content.trim() || !socketRef.current) return
    socketRef.current.emit('chat:message', {
            content,
            username:   user?.username ?? 'Anonymous',
            avatar_url: user?.avatar_url ?? null,
        })
    }

  return { messages, connected, sendMessage }
}
