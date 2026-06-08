'use client'
import { useState } from 'react'
import { useChat } from '@/app/hooks/useChat'

export default function ChatBox() {
  const { messages, connected, sendMessage } = useChat()
  const [input, setInput] = useState('')

  const handleSend = () => {
    console.log('sending message:', input)
    if (!input.trim()) return
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-3 border-b">
        <span className="font-semibold">General Chat</span>
        <span className={`text-xs ${connected ? 'text-green-500' : 'text-red-500'}`}>
          {connected ? '● online' : '● offline'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {messages.map((msg) => (
          <div key={msg._id} className="flex items-start gap-2">
            {msg.avatar_url && (
              <img src={msg.avatar_url} alt={msg.username} className="w-7 h-7 rounded-full" />
            )}
            <div>
              <span className="text-xs font-semibold">{msg.username}</span>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 p-3 border-t">
        <input
          className="flex-1 border rounded px-3 py-1 text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Send
        </button>
      </div>
    </div>
  )
}
