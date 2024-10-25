// app/page.tsx
'use client'
import { useState } from 'react'
import { ChatHeader } from '@/components/ChatHeader'
import { MessageList } from '@/components/MessageList'
import { ChatInput } from '@/components/ChatInput'
import { Message } from '@/types/chat'
import { generateMedicalResponse } from '@/utils/api'

export default function ChatInterface(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! I'm your medical assistant. Please note that I'm starting up and might take a few seconds to be ready. How can I help you today?", 
      sender: "bot" 
    }
  ])
  const [inputMessage, setInputMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user"
    }
    
    const loadingMessage: Message = {
      id: messages.length + 2,
      text: "",
      sender: "bot",
      isLoading: true
    }
    
    setMessages(prev => [...prev, userMessage, loadingMessage])
    setIsLoading(true)
    setInputMessage("")
    setError(null)

    try {
      // Enhanced prompt for better medical responses
      const prompt = `Medical Context: You are a medical AI assistant. Please provide a clear and accurate response to the following medical question.
Question: ${inputMessage}
Response:`

      const response = await generateMedicalResponse(prompt)
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id
          ? { ...msg, text: response, isLoading: false }
          : msg
      ))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id
          ? { 
              ...msg, 
              text: "I apologize, but I'm currently experiencing high load. Please try again in a few seconds.", 
              isLoading: false 
            }
          : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <ChatHeader />
        {error && (
          <div className="bg-red-50 p-4 border-l-4 border-red-500">
            <p className="text-red-700">{error}</p>
          </div>
        )}
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