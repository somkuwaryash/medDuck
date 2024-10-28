// components/MessageList.tsx
import { MessageListProps } from '@/types/chat'
import { Message } from './Message'

export function MessageList({ messages }: MessageListProps): JSX.Element {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin 
                    scrollbar-thumb-gray-700 scrollbar-track-gray-800">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}