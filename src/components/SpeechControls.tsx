import { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition } from '@/hooks/useSpeech';

// Properly typed WebkitSpeechRecognition interface
interface WebkitSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: { error: string }) => void;
  onresult: (event: {
    resultIndex: number;
    results: {
      [key: number]: {
        [key: number]: {
          transcript: string;
        };
      };
    };
  }) => void;
}

interface SpeechControlsProps {
  onTranscript: (text: string) => void;
  textToSpeak?: string;
}

export function SpeechControls({ onTranscript, textToSpeak }: SpeechControlsProps) {
  const [recognition, setRecognition] = useState<WebkitSpeechRecognition | null>(null);
  const { startListening, isListening } = useSpeechRecognition();
  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  
  const toggleListening = () => {
    if (isListening && recognition) {
      recognition.stop();
      setRecognition(null);
    } else {
      const rec = startListening(onTranscript);
      if (rec) {
        // Cast to unknown first, then to our interface
        setRecognition(rec as unknown as WebkitSpeechRecognition);
      }
    }
  };
  
  const toggleSpeaking = () => {
    if (isSpeaking) {
      stop();
    } else if (textToSpeak) {
      speak(textToSpeak);
    }
  };
  
  return (
    <div className="flex gap-2">
      <button
        onClick={toggleListening}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        title={isListening ? 'Stop listening' : 'Start listening'}
        disabled={!('webkitSpeechRecognition' in window)}
      >
        {isListening ? (
          <MicOff className="w-5 h-5 text-red-500" />
        ) : (
          <Mic className="w-5 h-5 text-gray-400 hover:text-gray-300" />
        )}
      </button>
      
      {textToSpeak && (
        <button
          onClick={toggleSpeaking}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          title={isSpeaking ? 'Stop speaking' : 'Start speaking'}
          disabled={!('speechSynthesis' in window)}
        >
          {isSpeaking ? (
            <VolumeX className="w-5 h-5 text-blue-500" />
          ) : (
            <Volume2 className="w-5 h-5 text-gray-400 hover:text-gray-300" />
          )}
        </button>
      )}
    </div>
  );
}