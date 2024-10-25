// components/MessageList.tsx
import { MessageListProps } from '@/types/chat'
import { Message } from './Message'

export function MessageList({ messages }: MessageListProps): JSX.Element {
  return (
    <div className="h-[500px] overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}