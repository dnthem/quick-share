import { Container, Hello } from '@/components'
export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center p-24 bg-primary">
      <Hello />
      
      <Container />

    </main>
  )
}
