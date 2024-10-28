// components/image-generation/AccessibilityControls.tsx
import { SlidersHorizontal } from 'lucide-react';

interface AccessibilityProps {
  isColorBlindMode: boolean;
  setIsColorBlindMode: (value: boolean) => void;
  contrastLevel: 'high' | 'medium' | 'low';
  setContrastLevel: (value: 'high' | 'medium' | 'low') => void;
}

export function AccessibilityControls({
  isColorBlindMode,
  setIsColorBlindMode,
  contrastLevel,
  setContrastLevel
}: AccessibilityProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-4">

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="colorBlindMode"
            checked={isColorBlindMode}
            onChange={(e) => setIsColorBlindMode(e.target.checked)}
            className="w-4 h-4 bg-gray-700 border-gray-600 rounded text-blue-500 
                     focus:ring-blue-500 focus:ring-offset-gray-800"
          />
          <label htmlFor="colorBlindMode" className="text-sm font-medium text-gray-200">
            Optimize for Color Blind Accessibility
          </label>
        </div>
        
        <div className={`space-y-2 ${!isColorBlindMode && 'opacity-50'}`}>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-200">Contrast Level</label>
          </div>
          <select
            value={contrastLevel}
            onChange={(e) => setContrastLevel(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md 
                     text-gray-200 focus:ring-2 focus:ring-blue-500"
            disabled={!isColorBlindMode}
          >
            <option value="high">High Contrast</option>
            <option value="medium">Medium Contrast</option>
            <option value="low">Low Contrast</option>
          </select>
        </div>
      </div>
    </div>
  );
}