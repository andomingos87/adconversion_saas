import { Header } from '@/components/layout/Header'

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 container-base">
      <Header />
      <main>{children}</main>
    </div>
  )
} 