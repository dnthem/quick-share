import React from 'react'

function Loading() {

  return (
    <div className="flex justify-center p-4">
      <div className="animate-bounce">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
      <div className="animate-bounce">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
      <div className="animate-bounce">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default Loading