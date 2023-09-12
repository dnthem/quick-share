import React from 'react'

function Greeting() {
  return (
    <div className=" max-w-[680px] bg-white p-4 rounded-xl">
      <p>Hello there,</p>
      <p>QuickShare is a hassle-free way to upload and share your images in a flash! Whether it's cherished memories, funny moments, or creative snapshots, our platform makes it easy for you to share them with friends, family, and the world.</p>
      <p>Here's how it works:</p>
      <ol className='list-decimal pl-8'>
        <li>Upload your image.</li>
        <li>Get a quick link to share instantly.</li>
      </ol>
      <p>Quick, simple, and free!</p>
      <p>QuickShare is a free service, and we <span className=' capitalize underline text-red-600'>do not </span> responsible for any data privacy or lost.</p>
      <p>Start sharing your world with QuickShare now, and remember to enjoy the journey!</p>
      <p className='text-center'>📤 Share at your own risk, and happy uploading! 🌟</p>
    </div>
  )
}

export default Greeting