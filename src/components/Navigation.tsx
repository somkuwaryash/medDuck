// components/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : ''
  }

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/')}`}
            >
              Chat
            </Link>
            <Link 
              href="/image"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/image')}`}
            >
              Image Generation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}