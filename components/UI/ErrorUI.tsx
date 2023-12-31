import React from 'react'

function ErrorUI({error}: {error: string}) {
  if (error === '') return null;

  return (
    <p className="text-red-500">{error}!</p>
  )
}

export default ErrorUI