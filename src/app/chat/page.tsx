// app/chat/page.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageList } from '@/components/MessageList'
import { ChatInput } from '@/components/ChatInput'
import { Message } from '@/types/chat'
import { generateChatResponse, MODELS, ModelId } from '@/utils/api'
import { MessageSquare, ChevronDown } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your AI assistant. How can I help you today?", 
      sender: "bot" 
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ModelId>('gemma-7b-it')
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle clicks outside model selector
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage("")
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userMessage,
      sender: 'user'
    }])
    setIsLoading(true)

    try {
      const messageHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))
      messageHistory.push({ role: 'user' as const, content: userMessage })

      const response = await generateChatResponse(messageHistory, selectedModel)
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        sender: 'bot'
      }])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I apologize, but I'm having trouble responding right now. Could you try again?",
        sender: 'bot'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-6 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800/50 overflow-hidden">
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Header with animated model selection */}
            <div className="p-4 border-b border-gray-800/50 flex items-center justify-between 
                          backdrop-blur-md bg-gray-900/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <h1 className="text-xl font-semibold text-gray-100">AI Chat</h1>
              </div>

              {/* Custom model selector */}
              <div className="relative" ref={selectRef}>
                <button
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 
                           border border-gray-700/50 text-gray-300 text-sm hover:bg-gray-800 
                           transition-colors duration-200"
                >
                  <span>{MODELS.find(m => m.id === selectedModel)?.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 
                    ${isSelectOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu with animation */}
                <div className={`absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl 
                              border border-gray-700/50 transform transition-all duration-200 origin-top
                              ${isSelectOpen 
                                ? 'opacity-100 scale-100 translate-y-0' 
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                  {MODELS.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id)
                        setIsSelectOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-sm text-left transition-colors duration-200
                                ${selectedModel === model.id 
                                  ? 'bg-blue-500/10 text-blue-400' 
                                  : 'text-gray-300 hover:bg-gray-700/50'}`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Messages with scroll container */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 
                          scrollbar-track-transparent">
              <MessageList messages={messages} />
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input section with blur effect */}
            <div className="border-t border-gray-800/50 backdrop-blur-md bg-gray-900/30">
              <ChatInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSubmit={handleSendMessage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}