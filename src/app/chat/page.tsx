// app/chat/page.tsx
'use client'
import { useState } from 'react'
import { MessageList } from '@/components/MessageList'
import { ChatInput } from '@/components/ChatInput'
import { Message } from '@/types/chat'
import { generateChatResponse, MODELS, ModelId } from '@/utils/api'
import { MessageSquare } from 'lucide-react'

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
      }));
      messageHistory.push({ role: 'user' as const, content: userMessage });

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
    <main className="min-h-screen py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800">
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Header with model selection */}
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h1 className="text-xl font-semibold text-gray-100">AI Chat</h1>
              </div>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ModelId)}
                className="bg-gray-800 border border-gray-700 text-gray-100 rounded-lg 
                         px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
              >
                {MODELS.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
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