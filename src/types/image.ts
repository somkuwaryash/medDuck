// types/image.ts
export interface ImageGenerationFormProps {
    onSubmit: (prompt: string) => Promise<void>
    isLoading: boolean
    prompt: string
    setPrompt: (prompt: string) => void
  }
  
  export interface ImageDisplayProps {
    imageUrl: string | null
    error: string | null
    isLoading: boolean
  }