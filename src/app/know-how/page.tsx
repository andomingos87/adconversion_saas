'use client'

import { Search, BookOpen, Star, Clock, TrendingUp } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'Como criar anúncios efetivos',
    description: 'Aprenda as melhores práticas para criar anúncios que convertem.',
    category: 'Marketing',
    readTime: '5 min',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Otimizando seus vídeos',
    description: 'Dicas para melhorar o desempenho dos seus anúncios em vídeo.',
    category: 'Otimização',
    readTime: '7 min',
    rating: 4.9
  },
  {
    id: 3,
    title: 'Guia de copywriting',
    description: 'Como escrever textos persuasivos para seus anúncios.',
    category: 'Copywriting',
    readTime: '10 min',
    rating: 4.7
  }
]

export default function KnowHow() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#1E2329] dark:text-white">Base de Conhecimento</h1>
        <p className="mt-1 text-[#1E2329]/70 dark:text-gray-400">
          Explore nossos artigos e aprenda a maximizar seus resultados
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1E2329]/50 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar artigos..."
          className="w-full rounded-lg border border-[#E6E8EA] bg-white py-3 pl-12 pr-4 text-[#1E2329] placeholder-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="group cursor-pointer rounded-lg border border-[#E6E8EA] bg-white p-6 transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg dark:hover:shadow-black/10"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-[#1E2329]/70 dark:text-gray-400">{article.rating}</span>
                </div>
              </div>
            </div>
            <h3 className="mb-2 font-medium text-[#1E2329] dark:text-white">{article.title}</h3>
            <p className="mb-4 text-sm text-[#1E2329]/70 dark:text-gray-400">{article.description}</p>
            <div className="flex items-center gap-4 text-sm text-[#1E2329]/70 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 