import React from 'react'

function Loading({isLoading}: {isLoading: boolean}) {
  
  if (!isLoading) return null;
  return (
    <p className="text-blue-500">Loading...</p>
  )
}

export default Loading