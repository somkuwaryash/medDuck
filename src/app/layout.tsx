// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DoctorDuck',
  description: 'Chat and Image Generation with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <Header />
        <div className="pt-16"> {/* Add padding top to account for fixed header */}
          {children}
        </div>
      </body>
    </html>
  )
}