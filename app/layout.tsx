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
      <body className='relative' suppressHydrationWarning={true}>
      <Header />
        {children}
      <Footer />
      </body>
    </html>
  )
}
