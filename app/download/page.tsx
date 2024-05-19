import React from 'react'
import { DownloadPage as Download } from '@/components'
import Link from 'next/link'

function DownloadPage({ searchParams }: any) {
  return (
    <>
      <Link href="/" className="text-blue-500 hover:underline" >Back to home</Link>
      <div aria-label='Download Section' className="flex flex-col items-center justify-center rounded-md p-4 bg-white">
        <Download id={searchParams.id} />
      </div>
    </>
  )
}

export default DownloadPage