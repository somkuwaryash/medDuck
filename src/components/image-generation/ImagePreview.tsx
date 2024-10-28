// components/image-generation/ImagePreview.tsx
import { useState } from 'react'
import { analyzeImage, getBase64FromDataUrl } from '@/utils/imageAnalysis'
import { Loader2, AlertCircle, Info } from 'lucide-react'

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
  const [analysis, setAnalysis] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState<string>('')

  const handleAnalyzeImage = async () => {
    if (!imageUrl) return
    
    setIsAnalyzing(true)
    setAnalysisError('')
    try {
      const base64Data = getBase64FromDataUrl(imageUrl)
      const description = await analyzeImage(base64Data)
      setAnalysis(description)
    } catch (err) {
      console.error('Analysis failed:', err)
      setAnalysisError('Failed to analyze image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Image Container */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg aspect-square flex flex-col items-center justify-center overflow-hidden p-4">
        {isLoading ? (
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-400">Creating your masterpiece...</p>
          </div>
        ) : imageUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full h-[80%] mb-4 flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt="Generated artwork" 
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            
            <button
              onClick={handleAnalyzeImage}
              disabled={isAnalyzing}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors
                ${isAnalyzing 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </span>
              ) : 'Analyze Image'}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-gray-400">Your creation will appear here</p>
            <p className="text-gray-500 text-sm">Generate an image to get started</p>
          </div>
        )}
      </div>
      
      {/* Generation Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Analysis Error */}
      {analysisError && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-400">{analysisError}</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-medium text-gray-200">Image Analysis</h3>
            {isAnalyzing && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            )}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{analysis}</p>
        </div>
      )}

      {/* Accessibility Info */}
      {imageUrl && isColorBlindMode && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-400">
            <p className="font-medium mb-1">Accessibility Optimized</p>
            <p>This image has been enhanced for color blind accessibility with {contrastLevel} contrast settings.</p>
          </div>
        </div>
      )}
    </div>
  )
}