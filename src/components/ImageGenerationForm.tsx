// components/ImageGenerationForm.tsx
import { ImageGenerationFormProps } from '@/types/image'

export function ImageGenerationForm({ 
  onSubmit, 
  isLoading, 
  prompt, 
  setPrompt 
}: ImageGenerationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(prompt)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Image Description
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
    </form>
  )
}

// components/ImageDisplay.tsx
import { ImageDisplayProps } from '@/types/image'

export function ImageDisplay({ imageUrl, error, isLoading }: ImageDisplayProps) {
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500">Generating your image...</p>
        </div>
      </div>
    )
  }

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Your generated image will appear here</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <img 
        src={imageUrl} 
        alt="Generated" 
        className="w-full h-auto"
        style={{ maxHeight: '512px', objectFit: 'contain' }}
      />
    </div>
  )
}