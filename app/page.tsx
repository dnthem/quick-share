import { Container, Greeting } from '@/components'
import Link from 'next/link'
import { Fragment } from 'react'
export default async function Home() {
  return (
    <Fragment>
      <Greeting />
      <span className="text-white my-5">
        Just here for the download? &#8594;&nbsp;

        <Link href="/download" className=" text-orange-500 hover:underline">
          Download
        </Link>
      </span>
      <Container />
    </Fragment>
  )
}
