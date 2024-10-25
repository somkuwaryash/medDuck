// app/chat/page.tsx
'use client'
import { useState } from 'react'
import { MessageList } from '@/components/MessageList'
import { ChatInput } from '@/components/ChatInput'
import { generateMedicalResponse } from '@/utils/api'
import { Message } from '@/types/chat'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi! I'm your AI assistant. How can I help you today?", 
      sender: "bot" 
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user"
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await generateMedicalResponse(inputMessage)
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: response,
        sender: "bot" as const
      }])
    } catch (error) {
        console.error("Error generating response:", error)
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Sorry, I'm having trouble right now. Please try again.",
        sender: "bot" as const
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-6 h-[calc(100vh-8rem)]">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-semibold">AI Chat Assistant</h1>
        </div>
        
        <MessageList messages={messages} />
        
        <ChatInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}