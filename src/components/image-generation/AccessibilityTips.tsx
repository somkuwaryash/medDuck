// components/image-generation/AccessibilityTips.tsx
export function AccessibilityTips() {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
        <h3 className="font-medium text-gray-200 mb-3">Accessibility Tips</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Use clear, distinct elements in descriptions</li>
          <li>• Mention specific patterns and textures</li>
          <li>• Describe spatial relationships</li>
          <li>• Consider requesting high contrast if needed</li>
          <li>• Specify colorblind-friendly palettes</li>
        </ul>
      </div>
    )
  }
  