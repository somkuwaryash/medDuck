// components/image-generation/PromptForm.tsx
interface PromptFormProps {
    prompt: string;
    setPrompt: (value: string) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
  }
  
  export function PromptForm({ prompt, setPrompt, onSubmit, isLoading }: PromptFormProps) {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault() // Prevent form submission
      if (!prompt.trim() || isLoading) return
      await onSubmit(e)
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg 
                    text-gray-100 placeholder-gray-400 min-h-[120px] max-h-[300px] 
                    resize-y focus:ring-2 focus:ring-blue-500 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className={`w-full p-3 rounded-lg font-medium transition-all duration-200
            ${isLoading || !prompt.trim()
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
              <span>Generating...</span>
            </div>
          ) : 'Generate Image'}
        </button>
      </form>
    )
  }