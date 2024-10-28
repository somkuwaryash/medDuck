import { useState, useRef } from 'react';
import { ChatInputProps } from '@/types/chat';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import type { WebkitSpeechRecognition, SpeechRecognitionEvent } from '@/types/speech';

export function ChatInput({ 
  inputMessage, 
  setInputMessage, 
  handleSubmit,
  isLoading 
}: ChatInputProps): JSX.Element {
  const [recognition, setRecognition] = useState<WebkitSpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTranscript = (text: string) => {
    setInputMessage(inputMessage ? `${inputMessage} ${text}` : text);
  };

  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = Array.from({ length: event.results.length }, (_, i) => {
        const result = event.results[i][0];
        return result.transcript;
      }).join(' ');
      
      handleTranscript(results);
    };

    recognition.start();
    setRecognition(recognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    if (isListening) {
      stopListening();
    }
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-800">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 
                     border border-gray-700 focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        <button
          type="button"
          onClick={toggleListening}
          className={`p-3 rounded-lg transition-colors duration-200 flex items-center justify-center
            ${isListening 
              ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'}`}
          disabled={isLoading}
          title={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>

        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 min-w-[5rem]
            ${isLoading || !inputMessage.trim() 
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Send'
          )}
        </button>
      </div>

      {isListening && (
        <div className="mt-2 flex items-center gap-2 text-sm text-blue-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Listening... (Click microphone or &quot;Send&quot; to stop)
        </div>
      )}
    </form>
  );
}