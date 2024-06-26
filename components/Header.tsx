import React from 'react'
import Link from 'next/link'
import Image from 'next/image' 
function Header() {
  return (
    <header
      className="w-full text-center py-4"
    >
      <h1 className="text-4xl font-bold text-white">
        <Link 
         href="/"
         >
          <Image src="/icongif.gif" width={50} height={50} className='object-contain inline' alt='icon'/> 
        &nbsp;QuickShare
        
        
        </Link>
        </h1>
    </header>
  )
}

export default Header