// components/ChatInput.tsx
import { ChatInputProps } from '@/types/chat'

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  handleSubmit 
}: ChatInputProps): JSX.Element {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  )
}
