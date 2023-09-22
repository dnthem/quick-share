import React from 'react'
import { Download } from '@/components'
import Link from 'next/link'

function DownloadPage( {searchParams}: any) {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Link href="/" className="text-blue-500 hover:underline" >Back to home</Link>
      <Download id={searchParams.id}/>
    </main>
  )
}

export default DownloadPage