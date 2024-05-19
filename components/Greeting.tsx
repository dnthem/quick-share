import { application_version } from '@/constants'
import React from 'react'

function Greeting() {
  return (
    <div className=" max-w-[50rem] bg-white p-4 rounded-xl">
      <p>Hello there 👋,</p>
      <p>QuickShare is a hassle-free way to upload and share your images in a flash! Whether it's cherished memories, funny moments, or creative snapshots, our platform makes it easy for you to share them with friends, family, and the world.</p>
      <p>Here's how it works:</p>
      <ol className='list-decimal pl-8'>
        <li>Upload your image. (less than 10Mb)</li>
        <li>Get a quick link to share instantly.</li>
      </ol>
      <p>Quick, simple, and free!</p>
      <p>Start sharing your world with QuickShare now, and remember to enjoy the journey!</p>
      <p>We are <span className=' capitalize underline text-red-600'>NOT</span> responsible for any data privacy breach and data loss.</p>
      <p>Please be advised that your images will be removed on every Sunday at 1AM.</p>
      <p className='text-center'>📤 Happy Uploading and Sharing! 🌟</p>
      <details className='text-center'>
        <summary>📝 New Updates: </summary>
        <p>
          <span className='font-bold'>Version {application_version}</span>
          <ul className='list-disc pl-8 text-left'>
            <li>Fix styling</li>
          </ul>
        </p>
      </details>
    </div>
  )
}

export default Greeting