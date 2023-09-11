import { Container, Hello } from '@/components'
import Link from 'next/link'
export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center p-24 bg-primary">
      <Hello />
      <Link href="/download" className="text-blue-500 hover:underline" >Download</Link>
      <Container />
    </main>
  )
}
