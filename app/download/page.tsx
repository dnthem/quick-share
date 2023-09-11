import React, { Suspense } from 'react'
import { Download } from '@/components'
import Link from 'next/link'


function Loading() {
  return <p>🌀 Loading...</p>
}

function DownloadPage( {searchParams}: any) {
  return (
    <main className="flex flex-col items-center">
      <h1
        className='text-4xl font-bold text-center mt-8 mb-4'
      >Download</h1>
      <Link href="/" className="text-blue-500 hover:underline" >Back to home</Link>
      <Suspense fallback={<Loading />}>
        <Download id={searchParams.id}/>
      </Suspense>
    </main>
  )
}

export default DownloadPage