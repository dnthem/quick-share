import React from 'react'
import { Download } from '@/components'
import Link from 'next/link'
function DownloadPage( {searchParams}: any) {
  return (
    <div className="flex flex-col items-center">
      <h1
        className='text-4xl font-bold text-center mt-8 mb-4'
      >Download</h1>
      <Link href="/" className="text-blue-500 hover:underline" >Back to home</Link>
      <Download id={searchParams.id}/>
    </div>
  )
}

export default DownloadPage