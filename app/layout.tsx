import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
