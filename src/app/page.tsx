'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Camera, MessageSquare, Mic, Volume2, Brain } from 'lucide-react';
import GroqBanner from '@/components/GroqBanner';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-950">
      {/* Cursor spotlight effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.07), transparent 40%)`
        }}
      />

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Hero Section with reveal animation */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            AI For Everyone, Without Barriers
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience truly inclusive AI with voice interactions, color-blind optimized images, and intelligent assistance
          </p>
        </div>

        {/* Groq Banner with fade-in */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <GroqBanner />
        </div>

        {/* Main Features Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" ref={featuresRef}>
          {/* Chat Feature */}
          <Link href="/chat" className="group scroll-reveal">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 
                          hover:border-blue-500/50 transition-all duration-300 transform 
                          hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">Smart Chat</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Get instant assistance through text or voice interactions
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                  <Mic className="h-4 w-4" />
                  Voice Input
                </span>
                <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                  <Volume2 className="h-4 w-4" />
                  Text-to-Speech
                </span>
              </div>
            </div>
          </Link>

          {/* Image Generation Feature */}
          <Link href="/image" className="group scroll-reveal">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 
                          hover:border-purple-500/50 transition-all duration-300 transform 
                          hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-6 w-6 text-purple-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">Accessible Images</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Create AI images with color-blind friendly options and voice descriptions
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span className="group-hover:text-purple-400 transition-colors">Color-blind Optimized</span>
                <span>•</span>
                <span className="group-hover:text-purple-400 transition-colors">Voice Descriptions</span>
              </div>
            </div>
          </Link>

          {/* AI Assistant Feature */}
          <div className="group scroll-reveal">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 
                          hover:border-pink-500/50 transition-all duration-300 transform 
                          hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-pink-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-pink-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">AI Assistant</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Powered by Groq for lightning-fast, intelligent responses
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span className="group-hover:text-pink-400 transition-colors">Real-time Processing</span>
                <span>•</span>
                <span className="group-hover:text-pink-400 transition-colors">Smart Responses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Showcase with scroll animations */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 
                         hover:border-blue-500/20 transition-all duration-300 scroll-reveal">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">Voice Interaction</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <Mic className="h-5 w-5 text-blue-500 mt-1" />
                <p>Natural voice commands and dictation for hands-free operation</p>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <Volume2 className="h-5 w-5 text-blue-500 mt-1" />
                <p>Clear text-to-speech for all chat responses and image descriptions</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 
                         hover:border-purple-500/20 transition-all duration-300 scroll-reveal">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">Visual Adaptation</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <Camera className="h-5 w-5 text-purple-500 mt-1" />
                <p>Color-blind friendly image generation with adjustable contrast levels</p>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
                <p>Clear, high-contrast interface with screen reader optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}