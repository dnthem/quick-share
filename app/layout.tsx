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
      <header
        className="bg-primary flex flex-col items-center justify-center text-center pt-4"
      >
        <h1 className="text-4xl font-bold text-white">QuickShare</h1>
      </header>
        {children}
        <footer className="bg-primary flex flex-col items-center justify-center text-center">
          <p className="text-white">
            Made with ❤️ by{' '}
            <a
              href="https://dnthem.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline"
            >
              dnthem
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}
