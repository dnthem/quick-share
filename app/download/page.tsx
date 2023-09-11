import React from 'react'
import { Download } from '@/components'
function DownloadPage( {searchParams}: any) {
  console.log(searchParams.id);
  return (
    <div>
      <Download id={searchParams.id}/>
    </div>
  )
}

export default DownloadPage