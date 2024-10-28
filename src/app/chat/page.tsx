// app/chat/page.tsx
'use client'
import { useState } from 'react'
import { MessageList } from '@/components/MessageList'
import { ChatInput } from '@/components/ChatInput'
import { generateMedicalResponse } from '@/utils/api'
import { Message } from '@/types/chat'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi! I'm your medical AI assistant. How can I help you today?", 
      sender: "bot" 
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
      const response = await generateMedicalResponse(userMessage)
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        sender: 'bot'
      }])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I apologize, but I'm having trouble right now. Could you try asking again?",
        sender: 'bot'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800">
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h1 className="text-xl font-semibold text-gray-100">Medical AI Assistant</h1>
            </div>
            
            <MessageList messages={messages} />
            
            <ChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSubmit={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  )
}