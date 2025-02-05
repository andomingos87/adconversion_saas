'use client'

import { Search } from 'lucide-react'
import { HelpCard } from '@/components/features/HelpCard'
import { 
  PlayCircle, 
  Settings, 
  PaintBucket, 
  FileVideo,
  Share2,
  CreditCard,
} from 'lucide-react'

const helpTopics = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of AdConversion and how to create your first video ad.',
    icon: PlayCircle,
  },
  {
    title: 'Platform Settings',
    description: 'Configure your account, preferences, and notification settings.',
    icon: Settings,
  },
  {
    title: 'Customization Options',
    description: 'Discover all the ways you can customize your video templates.',
    icon: PaintBucket,
  },
  {
    title: 'Video Management',
    description: 'Learn how to organize, edit, and manage your video projects.',
    icon: FileVideo,
  },
  {
    title: 'Sharing & Export',
    description: 'Export your videos and share them across different platforms.',
    icon: Share2,
  },
  {
    title: 'Billing & Plans',
    description: 'Understand our pricing plans and billing process.',
    icon: CreditCard,
  },
]

export default function Support() {
  return (
    <div className="space-y-12">
      {/* Help Center Section */}
      <section>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-[#1E2329] dark:text-white">Central de Ajuda</h1>
          <p className="mt-2 text-[#1E2329]/70 dark:text-gray-400">
            Encontre respostas para suas dúvidas e aprenda a usar o AdConversion
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E2329]/50 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar artigos de ajuda..."
              className="w-full rounded-lg border border-[#E6E8EA] bg-white py-3 pl-12 pr-4 text-[#1E2329] placeholder-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic) => (
            <HelpCard
              key={topic.title}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
            />
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-[#1E2329] dark:text-white">Fale Conosco</h2>
          <p className="mt-2 text-[#1E2329]/70 dark:text-gray-400">
            Precisa de mais ajuda? Nossa equipe de suporte está aqui para você
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-[#E6E8EA] p-8 text-center dark:border-gray-700">
          <p className="text-[#1E2329]/70 dark:text-gray-400">Formulário de contato em breve...</p>
        </div>
      </section>
    </div>
  )
} 