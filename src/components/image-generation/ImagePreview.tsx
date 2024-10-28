// components/image-generation/ImagePreview.tsx
interface ImagePreviewProps {
    imageUrl: string | null
    isLoading: boolean
    error: string | null
    isColorBlindMode: boolean
    contrastLevel: string
  }
  
  export function ImagePreview({ 
    imageUrl, 
    isLoading, 
    error, 
    isColorBlindMode, 
    contrastLevel 
  }: ImagePreviewProps) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg aspect-square flex items-center justify-center overflow-hidden p-4">
          {isLoading ? (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400">Creating your masterpiece...</p>
            </div>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          ) : (
            <p className="text-gray-400">Your creation will appear here</p>
          )}
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}
  
        {imageUrl && isColorBlindMode && (
          <div className="bg-blue-900/20 border border-blue-800 text-blue-400 p-4 rounded-lg text-sm">
            ℹ️ This image has been optimized for color blind accessibility with {contrastLevel} contrast.
          </div>
        )}
      </div>
    )
  }
  