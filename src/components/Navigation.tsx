// components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <span className="text-xl font-semibold">AI Assistant</span>
          <div className="flex gap-4">
            <Link 
              href="/image"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/image' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Generate Images
            </Link>
            <Link 
              href="/chat"
              className={`px-3 py-2 rounded-md transition-colors ${
                pathname === '/chat' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              Chat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
