import React from 'react'
import Link from 'next/link'
function Header() {
  return (
    <header
      className="bg-primary flex flex-col items-center justify-center text-center py-4"
    >
      <h1 className="text-4xl font-bold text-white">
        <Link 
         href="/"
         >
        QuickShare
        </Link>
        </h1>
    </header>
  )
}

export default Header