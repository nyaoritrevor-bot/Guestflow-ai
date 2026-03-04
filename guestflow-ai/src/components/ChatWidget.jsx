import { useState } from 'react'
import { sendGuestMessage } from '../services/api'

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m GuestFlow AI 👋 How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await sendGuestMessage(updatedMessages)
      setMessages([...updatedMessages, { role: 'assistant', content: reply }])
    } catch (error) {
      setMessages([...updatedMessages, { 
        role: 'assistant', content: 'Sorry, something went wrong. Please try again.' 
      }])
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
      
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4">
        <h3 className="font-bold text-lg">GuestFlow AI</h3>
        <p className="text-emerald-100 text-xs">Always here to help</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs text-sm px-4 py-2 rounded-2xl leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-500 text-white rounded-br-sm' 
                : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-400 text-sm px-4 py-2 rounded-2xl shadow-sm">
              typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex border-t border-gray-200 bg-white">
        <input
          className="flex-1 px-4 py-3 text-sm outline-none"
          placeholder="Ask about booking, services..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-5 bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </div>

    </div>
  )
}