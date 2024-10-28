import React from 'react';
import Link from 'next/link';
import { Camera, MessageSquare, Mic, Volume2, Brain } from 'lucide-react';
import GroqBanner from '@/components/GroqBanner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            AI For Everyone, Without Barriers
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience truly inclusive AI with voice interactions, color-blind optimized images, and intelligent assistance
          </p>
        </div>

        {/* Groq Partnership Banner */}
        <GroqBanner />

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Chat Feature */}
          <Link href="/chat" className="group">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">Smart Chat</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Get instant assistance through text or voice interactions
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Mic className="h-4 w-4" />
                  Voice Input
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 className="h-4 w-4" />
                  Text-to-Speech
                </span>
              </div>
            </div>
          </Link>

          {/* Image Generation Feature */}
          <Link href="/image" className="group">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Camera className="h-6 w-6 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-100">Accessible Images</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Create AI images with color-blind friendly options and voice descriptions
              </p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>Color-blind Optimized</span>
                <span>•</span>
                <span>Voice Descriptions</span>
              </div>
            </div>
          </Link>

          {/* AI Assistant Feature */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">AI Assistant</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Powered by Groq for lightning-fast, intelligent responses
            </p>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>Real-time Processing</span>
              <span>•</span>
              <span>Smart Responses</span>
            </div>
          </div>
        </div>

        {/* Accessibility Showcase */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">Voice Interaction</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <Mic className="h-5 w-5 text-blue-500 mt-1" />
                <p>Natural voice commands and dictation for hands-free operation</p>
              </div>
              <div className="flex items-start gap-3">
                <Volume2 className="h-5 w-5 text-blue-500 mt-1" />
                <p>Clear text-to-speech for all chat responses and image descriptions</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-semibold text-gray-100 mb-6">Visual Adaptation</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-blue-500 mt-1" />
                <p>Color-blind friendly image generation with adjustable contrast levels</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500 mt-1" />
                <p>Clear, high-contrast interface with screen reader optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}