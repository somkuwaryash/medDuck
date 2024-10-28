import { MessageProps } from '@/types/chat'
import { Volume2, VolumeX } from 'lucide-react'
import { useSpeechSynthesis } from '@/hooks/useSpeech'

export function Message({ message }: MessageProps): JSX.Element {
  const { speak, stop, isSpeaking } = useSpeechSynthesis()

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(message.text)
    }
  }

  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} px-4 py-2`}
    >
      <div className="flex items-start gap-3 max-w-[80%] group">
        {message.sender === 'bot' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <span className="text-blue-500 text-sm font-medium">AI</span>
          </div>
        )}

        <div className={`relative rounded-2xl px-4 py-3 transition-shadow duration-200
          ${message.sender === 'user'
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            : 'bg-gray-800/50 text-gray-100 shadow-lg shadow-black/5'}`}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-50">
            <div className={`w-full h-full ${
              message.sender === 'user'
                ? 'bg-gradient-to-br from-blue-400/20 to-transparent'
                : 'bg-gradient-to-br from-gray-700/20 to-transparent'
            }`} />
          </div>

          <div className="relative">
            {message.text}
          </div>
        </div>

        {message.sender === 'bot' && (
          <button
            onClick={toggleSpeaking}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     p-2 rounded-lg hover:bg-gray-800/50"
            title={isSpeaking ? 'Stop speaking' : 'Listen to message'}
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4 text-blue-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-400 hover:text-gray-300" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}