// components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${pathname === '/' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              Home
            </Link>
            <Link 
              href="/chat"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${pathname === '/chat' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              Chat
            </Link>
            <Link 
              href="/image"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${pathname === '/image' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            >
              Image Generation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}