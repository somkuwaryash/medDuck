// components/Message.tsx
import { MessageProps } from '@/types/chat'

export function Message({ message }: MessageProps): JSX.Element {
    return (
      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`message-bubble ${
          message.sender === 'user' ? 'message-bubble-user' : 'message-bubble-bot'
        }`}>
          {message.text}
        </div>
      </div>
    )
  }