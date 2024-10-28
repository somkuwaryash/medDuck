import { useState } from 'react'
import { Loader2, AlertCircle, Info, ImageIcon, Wand2 } from 'lucide-react'
import { analyzeImage, getBase64FromDataUrl } from '@/utils/imageAnalysis'

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
  const [showOverlay, setShowOverlay] = useState(false)

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
      {/* Main Image Container with Hover Effects */}
      <div 
        className="relative bg-gray-900/40 border border-gray-800/60 rounded-xl overflow-hidden
                   transition-all duration-300 group"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <div className="relative">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <div className="absolute inset-0 animate-pulse-ring" />
            </div>
            <p className="text-gray-400 animate-pulse">Creating your masterpiece...</p>
          </div>
        ) : imageUrl ? (
          <div className="relative aspect-square">
            <img 
              src={imageUrl} 
              alt="Generated artwork" 
              className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent
                          transition-opacity duration-300 flex flex-col justify-end p-6
                          ${showOverlay ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={handleAnalyzeImage}
                disabled={isAnalyzing}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg
                         py-3 px-4 text-white font-medium flex items-center justify-center gap-2
                         hover:bg-white/20 transition-all duration-200 group
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wand2 className={`w-4 h-4 transition-all duration-200 
                                ${isAnalyzing ? 'animate-spin' : 'group-hover:rotate-12'}`} />
                {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 space-y-3">
            <div className="p-4 rounded-full bg-gray-800/50">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400">Your creation will appear here</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3
                      animate-slideIn">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Analysis Error */}
      {analysisError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3
                      animate-slideIn">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-red-400">{analysisError}</p>
        </div>
      )}

      {/* Analysis Results with Animation */}
      {analysis && (
        <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg p-4 
                      transform transition-all duration-300 hover:border-gray-700/60">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-medium text-gray-200">Analysis Results</h3>
            {isAnalyzing && (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            )}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{analysis}</p>
        </div>
      )}

      {/* Accessibility Info Badge */}
      {imageUrl && isColorBlindMode && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3
                      animate-fadeIn">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-400 font-medium mb-1">Accessibility Optimized</p>
            <p className="text-blue-400/80 text-sm">
              Enhanced for color blind accessibility with {contrastLevel} contrast
            </p>
          </div>
        </div>
      )}
    </div>
  )
}