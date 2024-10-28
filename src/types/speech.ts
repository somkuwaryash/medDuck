// types/speech.ts

export interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }
  
  export interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message?: string;
  }
  
  export interface SpeechRecognitionResult {
    0: SpeechRecognitionAlternative;
    length: number;
    isFinal: boolean;
  }
  
  export interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
  
  export interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
  }
  
  export interface WebkitSpeechRecognition {
    continuous: boolean;
    interimResults: boolean;
    start: () => void;
    stop: () => void;
    onstart: (event: Event) => void;
    onend: (event: Event) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
  }
  
  declare global {
    interface Window {
      webkitSpeechRecognition?: new () => WebkitSpeechRecognition;
    }
  }