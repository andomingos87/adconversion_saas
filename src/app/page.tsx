import { StatsGrid } from '@/components/layout/StatsGrid'
import { VideoCard } from '@/components/features/VideoCard'

const trendingVideos = [
  {
    id: 1,
    title: 'Summer Collection Ad',
    views: 12500,
    thumbnail: 'https://picsum.photos/800/450?random=1',
  },
  {
    id: 2,
    title: 'Tech Product Launch',
    views: 8300,
    thumbnail: 'https://picsum.photos/800/450?random=2',
  },
  {
    id: 3,
    title: 'Food Delivery Service',
    views: 15700,
    thumbnail: 'https://picsum.photos/800/450?random=3',
  },
  {
    id: 4,
    title: 'Fitness App Promo',
    views: 9900,
    thumbnail: 'https://picsum.photos/800/450?random=4',
  },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1E2329]">Dashboard</h1>
        <p className="mt-1 text-[#1E2329]/70">
          Manage your videos and monitor your statistics
        </p>
      </div>

      <StatsGrid />

      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#1E2329]">Trending Videos</h2>
          <p className="mt-1 text-[#1E2329]/70">
            Most popular videos on the platform
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {trendingVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              views={video.views}
              thumbnail={video.thumbnail}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#1E2329]">Recent Creations</h2>
          <p className="mt-1 text-[#1E2329]/70">
            Your recent videos will appear here
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-[#E6E8EA] p-8">
          <div className="text-center">
            <p className="text-[#1E2329]">No videos created yet</p>
            <p className="mt-1 text-sm text-[#1E2329]/70">
              Click "Generate New Ad" to create your first video
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
