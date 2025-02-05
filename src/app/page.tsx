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
        <h1 className="text-2xl font-semibold text-[#1E2329] dark:text-white">Dashboard</h1>
        <p className="mt-1 text-[#1E2329]/70 dark:text-gray-400">
          Gerencie seus vídeos e monitore suas estatísticas
        </p>
      </div>

      <StatsGrid />

      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#1E2329] dark:text-white">Vídeos em Alta</h2>
          <p className="mt-1 text-[#1E2329]/70 dark:text-gray-400">
            Vídeos mais populares na plataforma
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
          <h2 className="text-xl font-semibold text-[#1E2329] dark:text-white">Criações Recentes</h2>
          <p className="mt-1 text-[#1E2329]/70 dark:text-gray-400">
            Seus vídeos recentes aparecerão aqui
          </p>
        </div>

        <div className="rounded-lg border border-dashed border-[#E6E8EA] p-8 dark:border-gray-700">
          <div className="text-center">
            <p className="text-[#1E2329] dark:text-white">Nenhum vídeo criado ainda</p>
            <p className="mt-1 text-sm text-[#1E2329]/70 dark:text-gray-400">
              Clique em "Gerar Novo Anúncio" para criar seu primeiro vídeo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
