import { Footer, Header } from '@/components'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QuickShare',
  description: 'QuickShare is a hassle-free way to upload and share your images in a flash! Whether it\'s cherished memories, funny moments, or creative snapshots, our platform makes it easy for you to share them with friends, family, and the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative bg-primary flex flex-col h-[100vh]'>
        <Header />
        <main className="flex-1 text-center flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
