import { VideoCard } from '@/components/features/VideoCard'

const templateVideos = [
  { id: 1, thumbnail: 'https://picsum.photos/800/450?random=1' },
  { id: 2, thumbnail: 'https://picsum.photos/800/450?random=2' },
  { id: 3, thumbnail: 'https://picsum.photos/800/450?random=3' },
  { id: 4, thumbnail: 'https://picsum.photos/800/450?random=4' },
  { id: 5, thumbnail: 'https://picsum.photos/800/450?random=5' },
  { id: 6, thumbnail: 'https://picsum.photos/800/450?random=6' },
  { id: 7, thumbnail: 'https://picsum.photos/800/450?random=7' },
  { id: 8, thumbnail: 'https://picsum.photos/800/450?random=8' },
  { id: 9, thumbnail: 'https://picsum.photos/800/450?random=9' },
  { id: 10, thumbnail: 'https://picsum.photos/800/450?random=10' },
  { id: 11, thumbnail: 'https://picsum.photos/800/450?random=11' },
  { id: 12, thumbnail: 'https://picsum.photos/800/450?random=12' },
]

export default function Templates() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1E2329]">Video Templates</h1>
        <p className="mt-1 text-[#1E2329]/70">
          Choose a template to create your video ad
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {templateVideos.map((video) => (
          <VideoCard
            key={video.id}
            thumbnail={video.thumbnail}
          />
        ))}
      </div>
    </div>
  )
} 