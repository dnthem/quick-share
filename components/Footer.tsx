import { application_version } from '@/constants'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full text-center">
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
        &nbsp; & &nbsp;
        <a
          href="https://www.linkedin.com/in/hoado52/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline">
          Hoa Do
        </a>
      </p>
      <aside>
        version {application_version}
      </aside>
    </footer>
  )
}

export default Footer