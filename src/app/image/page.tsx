// app/image/page.tsx
'use client'
import { useState } from 'react'
import { generateImage } from '@/utils/imageApi'
import { AccessibilityControls } from '@/components/image-generation/AccessibilityControls'
import { PromptForm } from '@/components/image-generation/PromptForm'
import { ImagePreview } from '@/components/image-generation/ImagePreview'
import { AccessibilityTips } from '@/components/image-generation/AccessibilityTips'
import { Camera, Sparkles } from 'lucide-react'

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isColorBlindMode, setIsColorBlindMode] = useState(true)
  const [contrastLevel, setContrastLevel] = useState<'high' | 'medium' | 'low'>('high')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      console.error('Generation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                         bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI Image Generation
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-3">
            Create Accessible AI-Generated Images
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate unique images with built-in accessibility features. Perfect for creating 
            inclusive visual content that everyone can appreciate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generation Controls */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 
                          rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-800/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Camera className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-100">
                    Image Controls
                  </h2>
                </div>
              </div>
              <div className="p-4 space-y-6">
                <AccessibilityControls
                  isColorBlindMode={isColorBlindMode}
                  setIsColorBlindMode={setIsColorBlindMode}
                  contrastLevel={contrastLevel}
                  setContrastLevel={setContrastLevel}
                />
                <PromptForm
                  prompt={prompt}
                  setPrompt={setPrompt}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Tips Panel - Only show on desktop */}
            <div className="hidden lg:block">
              <AccessibilityTips />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-3">
            <ImagePreview
              imageUrl={imageUrl}
              isLoading={isLoading}
              error={error}
              isColorBlindMode={isColorBlindMode}
              contrastLevel={contrastLevel}
            />
          </div>
          
          {/* Tips Panel - Show on mobile after preview */}
          <div className="lg:hidden">
            <AccessibilityTips />
          </div>
        </div>

        {/* Recent Generations Section (Optional) */}
        {imageUrl && (
          <div className="mt-12 pt-8 border-t border-gray-800/60">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-100">Recent Generations</h2>
              <button 
                onClick={() => setImageUrl(null)}
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Clear History
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Show only the last generated image for now */}
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-800/50 
                            border border-gray-700/50 hover:border-gray-600/50 
                            transition-all duration-300">
                <img 
                  src={imageUrl} 
                  alt="Recent generation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}