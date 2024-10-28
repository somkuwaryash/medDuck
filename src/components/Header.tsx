// components/Header.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Image as ImageIcon, Home, Menu, X } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20)
      }, 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Image', href: '/image', icon: ImageIcon },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300
                ${isScrolled 
                  ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
                  : 'bg-transparent'}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2 transition-all duration-300"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 
                          flex items-center justify-center overflow-hidden transition-all duration-300
                          group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25">
              <span className="font-bold text-xl text-white transform transition-transform duration-300
                             group-hover:-translate-y-px">
                DD
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <span className="font-semibold text-lg text-gray-100 hidden sm:block
                           transition-colors duration-300 group-hover:text-blue-400">
              DoctorDuck
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 
                           transition-all duration-300 group
                           ${isActive(item.href)
                             ? 'bg-gray-800 text-white' 
                             : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white
                     hover:bg-gray-800/50 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 transition-transform duration-200 rotate-90" />
            ) : (
              <Menu className="w-6 h-6 transition-transform duration-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav className="py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg flex items-center space-x-3 
                           transition-all duration-200
                           ${isActive(item.href)
                             ? 'bg-gray-800 text-white' 
                             : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}