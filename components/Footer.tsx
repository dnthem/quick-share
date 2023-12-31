import { application_version } from '@/constants'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-primary flex flex-col items-center justify-center text-center">
      <p className="text-white">
        Made by{' '}
        <a
          href="https://dnthem.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline"
        >
          Them Dang
        </a>
        &nbsp; & Hoa Do
      </p>
      <aside>
        version {application_version}
      </aside>
    </footer>
  )
}

export default Footer