// components/ChatInput.tsx
import { ChatInputProps } from '@/types/chat'

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  handleSubmit,
  isLoading 
}: ChatInputProps): JSX.Element {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-800">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-gray-100 
                   border border-gray-700 focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="button"
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}