// app/image/page.tsx
'use client'
import { useState } from 'react'
import { generateImage } from '@/utils/imageApi'
import { AccessibilityControls } from '@/components/image-generation/AccessibilityControls'
import { PromptForm } from '@/components/image-generation/PromptForm'
import { ImagePreview } from '@/components/image-generation/ImagePreview'
import { AccessibilityTips } from '@/components/image-generation/AccessibilityTips'

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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-6">
        <h1 className="text-xl font-semibold text-gray-100 mb-6">AI Image Generation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
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
            <AccessibilityTips />
          </div>
          
          <ImagePreview
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            isColorBlindMode={isColorBlindMode}
            contrastLevel={contrastLevel}
          />
        </div>
      </div>
    </div>
  );
}