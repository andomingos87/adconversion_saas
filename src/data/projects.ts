import { Project, Video } from '@/types/project'

export const projects: Project[] = [
  {
    id: 1,
    name: 'Campanha de Verão',
    thumbnail: 'https://picsum.photos/seed/summer/800/450',
    videoCount: 5
  },
  {
    id: 2,
    name: 'Black Friday',
    thumbnail: 'https://picsum.photos/seed/black-friday/800/450',
    videoCount: 3
  },
  {
    id: 3,
    name: 'Lançamento Produto',
    thumbnail: 'https://picsum.photos/seed/product/800/450',
    videoCount: 8
  }
]

export const videos: Record<number, Video[]> = {
  1: [
    {
      id: 1,
      title: 'Vídeo Promocional 1',
      url: 'https://example.com/video1.mp4',
      thumbnail: 'https://picsum.photos/seed/promo1/800/450',
      createdAt: '2024-03-20T10:00:00Z'
    },
    {
      id: 2,
      title: 'Vídeo Promocional 2',
      url: 'https://example.com/video2.mp4',
      thumbnail: 'https://picsum.photos/seed/promo2/800/450',
      createdAt: '2024-03-21T14:30:00Z'
    }
  ],
  2: [
    {
      id: 3,
      title: 'Black Friday Teaser',
      url: 'https://example.com/video3.mp4',
      thumbnail: 'https://picsum.photos/seed/bf1/800/450',
      createdAt: '2024-03-22T09:15:00Z'
    }
  ],
  3: [
    {
      id: 4,
      title: 'Novo Produto Reveal',
      url: 'https://example.com/video4.mp4',
      thumbnail: 'https://picsum.photos/seed/launch1/800/450',
      createdAt: '2024-03-23T16:45:00Z'
    },
    {
      id: 5,
      title: 'Features Overview',
      url: 'https://example.com/video5.mp4',
      thumbnail: 'https://picsum.photos/seed/launch2/800/450',
      createdAt: '2024-03-24T11:20:00Z'
    }
  ]
} 