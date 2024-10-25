// components/ImageGenerationForm.tsx
import { useState } from 'react'
import { generateImage } from '@/utils/imageApi'

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isColorBlindMode, setIsColorBlindMode] = useState(true)
  const [contrastLevel, setContrastLevel] = useState<'high' | 'medium' | 'low'>('high')

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return
    setIsLoading(true)
    setError(null)
    
    try {
      const generatedImageUrl = await generateImage(prompt, 3, {
        enhanceForColorBlind: isColorBlindMode,
        contrastLevel
      })
      setImageUrl(generatedImageUrl)
    } catch (err) {
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Accessibility Controls */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="colorBlindMode"
                checked={isColorBlindMode}
                onChange={(e) => setIsColorBlindMode(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="colorBlindMode" className="text-sm font-medium">
                Optimize for Color Blind Accessibility
              </label>
            </div>
            
            <div className={isColorBlindMode ? 'opacity-100' : 'opacity-50 pointer-events-none'}>
              <label className="block text-sm font-medium mb-2">Contrast Level</label>
              <select
                value={contrastLevel}
                onChange={(e) => setContrastLevel(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full p-2 border rounded-lg"
                disabled={!isColorBlindMode}
              >
                <option value="high">High Contrast</option>
                <option value="medium">Medium Contrast</option>
                <option value="low">Low Contrast</option>
              </select>
            </div>
          </div>

          {/* Image Generation */}
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full p-3 border rounded-lg min-h-[100px]"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          {/* Image Display */}
          {imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Generated" 
                className="w-full h-auto max-h-[512px] object-contain"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
