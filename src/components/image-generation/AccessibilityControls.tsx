import { SlidersHorizontal, Eye } from 'lucide-react'

interface AccessibilityProps {
  isColorBlindMode: boolean
  setIsColorBlindMode: (value: boolean) => void
  contrastLevel: 'high' | 'medium' | 'low'
  setContrastLevel: (value: 'high' | 'medium' | 'low') => void
}

export function AccessibilityControls({
  isColorBlindMode,
  setIsColorBlindMode,
  contrastLevel,
  setContrastLevel
}: AccessibilityProps) {
  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-xl p-6 space-y-6
                    transition-all duration-300 hover:border-gray-700/60">
      {/* Color Blind Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Eye className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="font-medium text-gray-200">Color Blind Mode</p>
            <p className="text-sm text-gray-400">Optimize image for better visibility</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isColorBlindMode}
            onChange={(e) => setIsColorBlindMode(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-500" />
        </label>
      </div>

      {/* Contrast Level Control */}
      <div className={`space-y-3 transition-opacity duration-200 
                    ${!isColorBlindMode && 'opacity-50 pointer-events-none'}`}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Contrast Level</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setContrastLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                       ${contrastLevel === level
                         ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                         : 'bg-gray-800/50 text-gray-400 border border-transparent hover:bg-gray-800'}`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}