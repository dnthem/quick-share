import { Container, Greeting } from '@/components'
import Link from 'next/link'
export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center bg-primary">
      <Greeting />
      <span className="text-white my-5">
        Just here for the download? &#8594;&nbsp;

        <Link href="/download" className=" text-orange-500 hover:underline">
          Download
        </Link>
      </span>
      <Container />
    </main>
  )
}
