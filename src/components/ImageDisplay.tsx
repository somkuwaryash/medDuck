// components/ImageDisplay.tsx
import { ImageDisplayProps } from '@/types/image'

export function ImageDisplay({ imageUrl, error, isLoading }: ImageDisplayProps) {
    if (error) {
      return (
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-800">
          <p className="text-red-400">{error}</p>
        </div>
      )
    }
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400">Generating your image...</p>
          </div>
        </div>
      )
    }
  
    if (!imageUrl) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
          <p className="text-gray-400">Your generated image will appear here</p>
        </div>
      )
    }
  
    return (
      <div className="rounded-lg overflow-hidden bg-gray-800">
        <img 
          src={imageUrl} 
          alt="Generated" 
          className="w-full h-auto"
          style={{ maxHeight: '512px', objectFit: 'contain' }}
        />
      </div>
    )
  }