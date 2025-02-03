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
          <h1 className="text-3xl font-semibold text-[#1E2329]">Help Center</h1>
          <p className="mt-2 text-[#1E2329]/70">
            Find answers to your questions and learn how to use AdConversion
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E2329]/50" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full rounded-lg border border-[#E6E8EA] bg-white py-3 pl-12 pr-4 text-[#1E2329] placeholder-[#1E2329]/50 outline-none focus:border-[#125CC6]"
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
          <h2 className="text-2xl font-semibold text-[#1E2329]">Contact Us</h2>
          <p className="mt-2 text-[#1E2329]/70">
            Need more help? Our support team is here for you
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-[#E6E8EA] p-8 text-center">
          <p className="text-[#1E2329]/70">Contact form coming soon...</p>
        </div>
      </section>
    </div>
  )
} 