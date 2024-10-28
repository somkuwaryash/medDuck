// components/Message.tsx
import { MessageProps } from '@/types/chat';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeech';

export function Message({ message }: MessageProps): JSX.Element {
  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(message.text);
    }
  };

  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex items-start gap-2 max-w-[70%]">
        <div className={`message-bubble ${
          message.sender === 'user' ? 'message-bubble-user' : 'message-bubble-bot'
        }`}>
          {message.text}
        </div>
        
        {message.sender === 'bot' && (
          <button
            onClick={toggleSpeaking}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            title={isSpeaking ? 'Stop speaking' : 'Listen to message'}
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5 text-blue-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-400 hover:text-gray-300" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}