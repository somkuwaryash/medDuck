// types/chat.ts
export interface Message {
    id: number
    text: string
    sender: 'user' | 'bot'
    isLoading?: boolean
  }
  
  export interface ChatInputProps {
    inputMessage: string
    setInputMessage: (message: string) => void
    handleSubmit: (e: React.FormEvent) => void
    isLoading: boolean
  }
  
  export interface MessageProps {
    message: Message
  }
  
  export interface MessageListProps {
    messages: Message[]
  }