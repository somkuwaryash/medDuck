// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-800 p-6">
          <h1 className="text-2xl font-semibold text-gray-100 mb-4">
            Welcome to AI Assistant
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/chat" 
              className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 
                       transition-colors duration-200"
            >
              <h2 className="text-xl font-medium text-gray-100 mb-2">
                Chat Interface
              </h2>
              <p className="text-gray-400">
                Interact with our AI assistant through text conversations
              </p>
            </Link>
            
            <Link 
              href="/image" 
              className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 
                       transition-colors duration-200"
            >
              <h2 className="text-xl font-medium text-gray-100 mb-2">
                Image Generation
              </h2>
              <p className="text-gray-400">
                Create AI-generated images from text descriptions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}