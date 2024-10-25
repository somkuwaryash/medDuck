// app/image/page.tsx
'use client'
import { useState } from 'react'
import { generateImage } from '@/utils/imageApi'

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isColorBlindMode, setIsColorBlindMode] = useState(true)
  const [contrastLevel, setContrastLevel] = useState<'high' | 'medium' | 'low'>('high')

  const handleSubmit = async (promptText: string) => {
    if (!promptText.trim()) return
    setIsLoading(true)
    setError(null)
    
    try {
      const generatedImageUrl = await generateImage(promptText, 3, {
        enhanceForColorBlind: isColorBlindMode,
        contrastLevel: contrastLevel
      })
      setImageUrl(generatedImageUrl)
    } catch (err) {
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Image Generation</h1>
        <div className="flex items-center gap-2">
          <svg 
            className="w-5 h-5 text-blue-600" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Accessibility Options</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Accessibility Controls */}
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="colorBlindMode"
                checked={isColorBlindMode}
                onChange={(e) => setIsColorBlindMode(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="colorBlindMode" className="text-sm font-medium text-gray-800">
                Optimize for Color Blind Accessibility
              </label>
            </div>
            
            <div className={`space-y-2 ${!isColorBlindMode && 'opacity-50'}`}>
              <label className="block text-sm font-medium text-gray-800">
                Contrast Level
              </label>
              <select
                value={contrastLevel}
                onChange={(e) => setContrastLevel(e.target.value as 'high' | 'medium' | 'low')}
                className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={!isColorBlindMode}
              >
                <option value="high">High Contrast</option>
                <option value="medium">Medium Contrast</option>
                <option value="low">Low Contrast</option>
              </select>
            </div>
          </div>

          {/* Image Generation Form */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-800">
              Image Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSubmit(prompt)}
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
          
          {/* Accessibility Tips */}
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Accessibility Tips</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Use clear, distinct elements in descriptions</li>
              <li>• Mention specific patterns or textures</li>
              <li>• Describe spatial relationships</li>
              <li>• Request high contrast if needed</li>
              <li>• Consider color blind friendly palettes</li>
            </ul>
          </div>
        </div>

        {/* Image Display */}
        <div className="space-y-4">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 h-64 flex items-center justify-center">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Generated" 
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <p className="text-gray-600">Your generated image will appear here</p>
            )}
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}
          
          {imageUrl && isColorBlindMode && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm">
              ℹ️ This image has been optimized for color blind accessibility with 
              {contrastLevel === 'high' && ' high'}
              {contrastLevel === 'medium' && ' medium'}
              {contrastLevel === 'low' && ' low'} 
              contrast.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}