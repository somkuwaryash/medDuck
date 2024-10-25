// components/Message.tsx
import { MessageProps } from '@/types/chat'

export function Message({ message }: MessageProps): JSX.Element {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          message.sender === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
