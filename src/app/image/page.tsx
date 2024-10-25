// app/image/page.tsx
'use client'
import { useState } from 'react'
import { ImageGenerationForm } from '@/components/ImageGenerationForm'
import { ImageDisplay } from '@/components/ImageDisplay'
import { generateImage } from '@/utils/imageApi'

export default function ImageGeneration(): JSX.Element {
  const [prompt, setPrompt] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (promptText: string): Promise<void> => {
    setIsLoading(true)
    setError(null)
    setImageUrl(null)

    try {
      const enhancedPrompt = `Generate a high quality, realistic image of: ${promptText}. 
        Make it detailed and well-composed.`
      
      const generatedImageUrl = await generateImage(enhancedPrompt)
      setImageUrl(generatedImageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              AI Image Generation
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-4">
                <ImageGenerationForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  prompt={prompt}
                  setPrompt={setPrompt}
                />
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Tips for better results:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Be specific about what you want to see</li>
                    <li>• Include details about style, lighting, and composition</li>
                    <li>• Mention specific artistic styles if desired</li>
                    <li>• Keep descriptions clear and concise</li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Image Display */}
              <div className="space-y-4">
                <ImageDisplay
                  imageUrl={imageUrl}
                  error={error}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}