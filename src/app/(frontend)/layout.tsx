import { SanityLive } from '@/sanity/lib/live'
import { Header } from "@/components/Header";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section className="bg-white min-h-screen">
      <Header />
      {children}
      <SanityLive />
    </section>
  )
}