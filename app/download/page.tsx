import React from 'react'
import { DownloadPage as Download } from '@/components'
import Link from 'next/link'

function DownloadPage({ searchParams }: any) {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Link href="/" className="text-blue-500 hover:underline" >Back to home</Link>
      <div aria-label='Download Section' className="flex flex-col items-center justify-center min-h-screen">
        <Download id={searchParams.id} />
      </div>
    </main>
  )
}

export default DownloadPage