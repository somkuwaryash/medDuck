import { useState } from 'react'
import { 
  Lightbulb, 
  Sparkles, 
  Layout, 
  PaintBucket, 
  Glasses,
  ChevronDown
} from 'lucide-react'

export function AccessibilityTips() {
  const [isExpanded, setIsExpanded] = useState(true)

  const tips = [
    {
      icon: Layout,
      title: 'Clear Elements',
      description: 'Use clear, distinct elements in descriptions',
      example: 'e.g., "A red square in front of a blue circle" rather than "shapes"'
    },
    {
      icon: Sparkles,
      title: 'Patterns & Textures',
      description: 'Mention specific patterns and textures',
      example: 'e.g., "rough stone texture", "checkered pattern", "smooth gradient"'
    },
    {
      icon: PaintBucket,
      title: 'Spatial Context',
      description: 'Describe spatial relationships',
      example: 'e.g., "centered in the frame", "in the foreground", "overlapping"'
    },
    {
      icon: Glasses,
      title: 'Contrast Options',
      description: 'Consider requesting high contrast if needed',
      example: 'e.g., "with strong contrast between foreground and background"'
    },
    {
      icon: Lightbulb,
      title: 'Color Palettes',
      description: 'Specify colorblind-friendly palettes',
      example: 'e.g., "using distinct blue and yellow tones" rather than red/green'
    }
  ]

  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-xl overflow-hidden
                    transition-all duration-300 hover:border-gray-700/60">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left
                   hover:bg-gray-800/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Lightbulb className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="font-medium text-gray-200">Accessibility Tips</h3>
            <p className="text-sm text-gray-400">Best practices for creating accessible images</p>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300
                     ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      <div className={`transition-all duration-300 ease-in-out 
                      ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-4 space-y-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            console.log(index);
            return (
              <div 
                key={tip.title}
                className="group relative pl-8 transition-all duration-200 hover:translate-x-1"
              >
                <Icon className="absolute left-0 top-1 w-5 h-5 text-gray-400 
                                group-hover:text-purple-400 transition-colors duration-200" />
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-300 group-hover:text-gray-200">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300">
                    {tip.description}
                  </p>
                  <p className="text-xs text-gray-500 italic group-hover:text-gray-400">
                    {tip.example}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}