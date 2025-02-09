'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/shared/Modal'
import { StepHeader } from './StepHeader'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Trash2, 
  RefreshCw,
  Edit,
  Video,
  Film,
  Users,
  Check,
  X
} from 'lucide-react'

interface AdWizardProps {
  isOpen: boolean
  onClose: () => void
  projectId: number
  projectName: string
}

type VideoStyle = 'ugc' | 'broll' | 'cinematic'
type VideoFormat = 'landscape' | 'portrait'

const mockHooks = [
  {
    id: 1,
    text: 'Problem-Solution',
    description: 'Apresente um problema comum e mostre como seu produto resolve.'
  },
  {
    id: 2,
    text: 'Before-After',
    description: 'Compare a vida antes e depois de usar seu produto.'
  },
  {
    id: 3,
    text: 'Day in Life',
    description: 'Mostre como seu produto se encaixa na rotina diária.'
  }
]

const mockScripts = [
  {
    id: 1,
    title: 'Engaging Problem-Solution',
    content: 'Struggling with [problem]? Introducing [product], the revolutionary solution that...'
  },
  {
    id: 2,
    title: 'Feature Showcase',
    content: 'Discover the power of [product] with its amazing features like...'
  }
]

export function AdWizard({ isOpen, onClose, projectId, projectName }: AdWizardProps) {
  useEffect(() => {
    console.log('AdWizard mounted')
    console.log('isOpen:', isOpen)
    console.log('projectId:', projectId)
    console.log('projectName:', projectName)
  }, [isOpen, projectId, projectName])

  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  const [landingPage, setLandingPage] = useState('')
  const [selectedHooks, setSelectedHooks] = useState<string[]>([])
  const [selectedScript, setSelectedScript] = useState<number | null>(null)
  const [videoStyle, setVideoStyle] = useState<VideoStyle | null>(null)
  const [videoFormat, setVideoFormat] = useState<VideoFormat | null>(null)
  const [showCaptions, setShowCaptions] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)
  const [editingHookId, setEditingHookId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [availableScripts, setAvailableScripts] = useState<typeof mockScripts>([])
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0)
  const [showDeleteScriptConfirm, setShowDeleteScriptConfirm] = useState<number | null>(null)
  const [editingScriptId, setEditingScriptId] = useState<number | null>(null)
  const [editingScriptContent, setEditingScriptContent] = useState('')
  const [activeTab, setActiveTab] = useState<'format' | 'captions' | 'avatar'>('format')
  const [selectedCaptionTemplate, setSelectedCaptionTemplate] = useState<number | null>(null)

  const mockCaptionTemplates = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Template ${i + 1}`,
    preview: `/templates/${i + 1}.png`
  }))

  const mockAvatars = {
    landscape: [
      { id: 1, name: 'Avatar 1', preview: '/avatars/landscape/1.mp4' },
      { id: 2, name: 'Avatar 2', preview: '/avatars/landscape/2.mp4' },
    ],
    portrait: [
      { id: 1, name: 'Avatar 1', preview: '/avatars/portrait/1.mp4' },
      { id: 2, name: 'Avatar 2', preview: '/avatars/portrait/2.mp4' },
    ]
  }

  useEffect(() => {
    // Simula a chamada da API que retorna 6 scripts
    setAvailableScripts(mockScripts)
  }, [])

  const handleEditHook = (hook: typeof mockHooks[0]) => {
    setEditingHookId(hook.id)
    setEditingText(hook.text)
  }

  const handleSaveHook = (id: number) => {
    // Aqui você atualizaria no backend
    // Por enquanto vamos apenas atualizar o estado local
    const updatedHooks = mockHooks.map(hook => 
      hook.id === id ? { ...hook, text: editingText } : hook
    )
    // Atualizar mockHooks (você precisará transformá-lo em um estado)
    setEditingHookId(null)
    setEditingText('')
  }

  const handleDeleteHook = (id: number) => {
    // Aqui você deletaria no backend
    // Por enquanto vamos apenas remover do estado local
    const updatedHooks = mockHooks.filter(hook => hook.id !== id)
    // Atualizar mockHooks
    setShowDeleteConfirm(null)
    
    // Se o hook deletado estava selecionado, limpar seleção
    if (selectedHooks.includes(mockHooks.find(h => h.id === id)?.text || '')) {
      setSelectedHooks([])
    }
  }

  const handleDeleteScript = (scriptId: number) => {
    setAvailableScripts(prev => prev.filter(script => script.id !== scriptId))
    setShowDeleteScriptConfirm(null)
  }

  const handleEditScript = (script: typeof mockScripts[0]) => {
    setEditingScriptId(script.id)
    setEditingScriptContent(script.content)
  }

  const handleSaveScript = (id: number) => {
    setAvailableScripts(prev => 
      prev.map(script => 
        script.id === id ? { ...script, content: editingScriptContent } : script
      )
    )
    setEditingScriptId(null)
    setEditingScriptContent('')
  }

  const handleGenerateNewScripts = () => {
    // Aqui você chamaria a API para gerar novos scripts
    // Por enquanto vamos apenas resetar com os scripts mock
    setAvailableScripts(mockScripts)
    setCurrentScriptIndex(0)
  }

  const steps = [
    {
      title: 'Fale sobre seu Produto',
      subtitle: 'Comece compartilhando o essencial sobre seu produto.',
      content: (
        <div className="mx-auto max-w-2xl space-y-4">
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descreva seu produto..."
            className="h-40 w-full rounded-lg border border-[#E6E8EA] bg-white p-4 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
        </div>
      ),
      isValid: () => productDescription.trim().length > 0
    },
    {
      title: 'Landing Page',
      subtitle: 'Informe a URL da sua landing page.',
      content: (
        <div className="mx-auto max-w-2xl space-y-4">
          <input
            type="url"
            value={landingPage}
            onChange={(e) => setLandingPage(e.target.value)}
            placeholder="Digite a URL da landing page..."
            className="w-full rounded-lg border border-[#E6E8EA] bg-white p-4 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
        </div>
      ),
      isValid: () => {
        try {
          new URL(landingPage)
          return true
        } catch {
          return false
        }
      }
    },
    {
      title: 'Escolha o Gancho',
      subtitle: 'Selecione a frase que melhor se conecta com seu público.',
      content: (
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="grid gap-4">
            {mockHooks.map((hook) => (
              <div
                key={hook.id}
                className={`group relative w-full rounded-lg border p-4 transition-all hover:border-[#125CC6] hover:shadow-sm dark:hover:border-blue-500 ${
                  selectedHooks.includes(hook.text)
                    ? 'border-[#125CC6] bg-[#125CC6]/5 dark:border-blue-500 dark:bg-blue-500/20'
                    : 'border-[#E6E8EA] dark:border-gray-700'
                }`}
              >
                {editingHookId === hook.id ? (
                  <div className="flex items-start gap-4">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 resize-none rounded-lg border border-[#E6E8EA] bg-white p-3 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveHook(hook.id)}
                        className="rounded-full p-2 text-[#125CC6] hover:bg-[#125CC6]/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingHookId(null)
                          setEditingText('')
                        }}
                        className="rounded-full p-2 text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedHooks([hook.text])}
                    className="flex w-full items-start justify-between gap-4"
                  >
                    <p className="flex-1 text-left text-sm text-[#1E2329] dark:text-gray-200">
                      {hook.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditHook(hook)
                        }}
                        className="rounded-full p-2 text-[#1E2329]/50 hover:bg-[#125CC6]/10 hover:text-[#125CC6] dark:text-gray-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-400"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDeleteConfirm(hook.id)
                        }}
                        className="rounded-full p-2 text-[#1E2329]/50 hover:bg-[#125CC6]/10 hover:text-[#125CC6] dark:text-gray-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          {mockHooks.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-[#E6E8EA] p-8 dark:border-gray-700">
              <RefreshCw className="h-8 w-8 text-[#1E2329]/50 dark:text-gray-400" />
              <div className="text-center">
                <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                  Nenhuma frase disponível
                </p>
                <button
                  onClick={() => {/* Função para gerar novas frases */}}
                  className="mt-2 text-sm font-medium text-[#125CC6] hover:underline dark:text-blue-400"
                >
                  Gerar novas frases
                </button>
              </div>
            </div>
          )}
        </div>
      ),
      isValid: () => selectedHooks.length === 1
    },
    {
      title: 'Selecione o Script',
      subtitle: 'Escolha o script que melhor se encaixa no seu anúncio.',
      content: (
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {availableScripts.slice(currentScriptIndex, currentScriptIndex + 2).map((script) => (
              <div
                key={script.id}
                className={`group relative rounded-lg border p-6 transition-all hover:border-[#125CC6] hover:shadow-sm dark:hover:border-blue-500 ${
                  selectedScript === script.id
                    ? 'border-[#125CC6] bg-[#125CC6]/5 dark:border-blue-500 dark:bg-blue-500/20'
                    : 'border-[#E6E8EA] dark:border-gray-700'
                }`}
              >
                {editingScriptId === script.id ? (
                  <div className="flex flex-col gap-4">
                    <textarea
                      value={editingScriptContent}
                      onChange={(e) => setEditingScriptContent(e.target.value)}
                      className="h-32 w-full resize-none rounded-lg border border-[#E6E8EA] bg-white p-3 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleSaveScript(script.id)}
                        className="rounded-full p-2 text-[#125CC6] hover:bg-[#125CC6]/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingScriptId(null)
                          setEditingScriptContent('')
                        }}
                        className="rounded-full p-2 text-red-500 hover:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedScript(script.id)}
                      className="mb-4 w-full text-left"
                    >
                      <h3 className="mb-2 font-medium text-[#1E2329] dark:text-gray-200">
                        {script.title}
                      </h3>
                      <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                        {script.content}
                      </p>
                    </button>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditScript(script)
                        }}
                        className="rounded-full p-2 text-[#1E2329]/50 hover:bg-[#125CC6]/10 hover:text-[#125CC6] dark:text-gray-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-400"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDeleteScriptConfirm(script.id)
                        }}
                        className="rounded-full p-2 text-[#1E2329]/50 hover:bg-[#125CC6]/10 hover:text-[#125CC6] dark:text-gray-400 dark:hover:bg-blue-500/20 dark:hover:text-blue-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}

                {showDeleteScriptConfirm === script.id && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/95 dark:bg-gray-800/95">
                    <div className="text-center">
                      <p className="mb-4 text-sm text-[#1E2329] dark:text-gray-200">
                        Tem certeza que deseja excluir este script?
                      </p>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleDeleteScript(script.id)}
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                        >
                          Excluir
                        </button>
                        <button
                          onClick={() => setShowDeleteScriptConfirm(null)}
                          className="rounded-lg bg-[#E6E8EA] px-4 py-2 text-sm text-[#1E2329] hover:bg-[#E6E8EA]/80 dark:bg-gray-700 dark:text-gray-200"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {availableScripts.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-[#E6E8EA] p-8 dark:border-gray-700">
              <RefreshCw className="h-8 w-8 text-[#1E2329]/50 dark:text-gray-400" />
              <div className="text-center">
                <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                  Nenhum script disponível
                </p>
                <button
                  onClick={handleGenerateNewScripts}
                  className="mt-2 text-sm font-medium text-[#125CC6] hover:underline dark:text-blue-400"
                >
                  Gerar novos scripts
                </button>
              </div>
            </div>
          )}
        </div>
      ),
      isValid: () => selectedScript !== null
    },
    {
      title: 'Selecione o Estilo',
      subtitle: 'Escolha o formato de vídeo que você prefere para seu anúncio.',
      content: (
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            <button
              onClick={() => setVideoStyle('ugc')}
              className={`flex flex-col gap-2 rounded-lg border p-3 text-center transition-colors ${
                videoStyle === 'ugc'
                  ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                  : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
              }`}
            >
              <h3 className="font-medium text-[#1E2329] dark:text-white">UGC</h3>
              <div className="group relative flex-1 overflow-hidden rounded-lg">
                <video 
                  src="/videos/ugc.mp4" 
                  className="h-full w-full object-cover"
                  loop 
                  muted 
                  playsInline
                  controls={false}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                  onClick={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                Apenas Avatar IA
              </p>
            </button>

            <button
              onClick={() => setVideoStyle('broll')}
              className={`flex flex-col gap-2 rounded-lg border p-3 text-center transition-colors ${
                videoStyle === 'broll'
                  ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                  : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
              }`}
            >
              <h3 className="font-medium text-[#1E2329] dark:text-white">B-ROLL</h3>
              <div className="group relative flex-1 overflow-hidden rounded-lg">
                <video 
                  src="/videos/broll.mp4" 
                  className="h-full w-full object-cover"
                  loop 
                  muted 
                  playsInline
                  controls={false}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                  onClick={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                Avatar + Vídeo Stock
              </p>
            </button>

            <button
              onClick={() => setVideoStyle('cinematic')}
              className={`flex flex-col gap-2 rounded-lg border p-3 text-center transition-colors ${
                videoStyle === 'cinematic'
                  ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                  : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
              }`}
            >
              <h3 className="font-medium text-[#1E2329] dark:text-white">CINEMATIC</h3>
              <div className="group relative flex-1 overflow-hidden rounded-lg">
                <video 
                  src="/videos/cinematic.mp4" 
                  className="h-full w-full object-cover"
                  loop 
                  muted 
                  playsInline
                  controls={false}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                  onClick={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                Vídeo Stock Premium
              </p>
            </button>
          </div>
        </div>
      ),
      isValid: () => videoStyle !== null
    },
    {
      title: 'Configurações Finais',
      subtitle: 'Configure os detalhes finais do seu vídeo.',
      content: (
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Tabs */}
          <nav className="flex justify-center gap-8 border-b border-[#E6E8EA] dark:border-gray-700">
            {[
              { id: 'format', label: 'Formato' },
              { id: 'captions', label: 'Legendas' },
              { id: 'avatar', label: 'Avatar' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#125CC6] dark:text-blue-400'
                    : 'text-[#1E2329]/70 hover:text-[#1E2329] dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-[#125CC6] dark:bg-blue-400" />
                )}
              </button>
            ))}
          </nav>

          <div className="py-6">
            {/* Format Tab Content */}
            {activeTab === 'format' && (
              <div className="flex justify-center gap-12">
                {[
                  { id: 'landscape', label: 'Paisagem', ratio: '16:9' },
                  { id: 'portrait', label: 'Retrato', ratio: '9:16' }
                ].map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setVideoFormat(format.id as VideoFormat)}
                    className={`group flex flex-col items-center gap-4 rounded-xl p-4 transition-all hover:bg-[#125CC6]/5 dark:hover:bg-blue-500/10 ${
                      videoFormat === format.id ? 'text-[#125CC6] dark:text-blue-400' : 'text-[#1E2329] dark:text-gray-200'
                    }`}
                  >
                    <div className={`relative flex items-center justify-center rounded-lg border-2 transition-colors ${
                      videoFormat === format.id 
                        ? 'border-[#125CC6] bg-[#125CC6]/5 dark:border-blue-500 dark:bg-blue-500/20' 
                        : 'border-[#E6E8EA] dark:border-gray-700'
                    }`}>
                      {format.id === 'landscape' ? (
                        <div className="h-32 w-56 p-2">
                          <div className="h-full w-full rounded bg-current/10" />
                        </div>
                      ) : (
                        <div className="h-56 w-32 p-2">
                          <div className="h-full w-full rounded bg-current/10" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{format.label}</p>
                      <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">{format.ratio}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Captions Tab Content */}
            {activeTab === 'captions' && (
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-2">
                  <label className="flex items-center gap-3 rounded-lg border border-[#E6E8EA] px-4 py-2 dark:border-gray-700">
                    <input
                      type="checkbox"
                      checked={showCaptions}
                      onChange={(e) => setShowCaptions(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#125CC6] focus:ring-[#125CC6] dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-[#1E2329] dark:text-gray-200">Adicionar Legendas</span>
                  </label>
                </div>

                {showCaptions && (
                  <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-[#E6E8EA] bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="grid grid-cols-3 gap-4">
                      {mockCaptionTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => setSelectedCaptionTemplate(template.id)}
                          className={`group relative aspect-[2.42/1] w-full overflow-hidden rounded-lg transition-transform hover:scale-[1.02] ${
                            selectedCaptionTemplate === template.id
                              ? 'ring-2 ring-[#125CC6] ring-offset-2 dark:ring-blue-500 dark:ring-offset-gray-800'
                              : ''
                          }`}
                        >
                          <img
                            src={template.preview}
                            alt={template.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="text-sm font-medium text-white">Selecionar</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!showCaptions && (
                  <div className="flex flex-col items-center justify-center space-y-2 py-12 text-center">
                    <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                      Ative as legendas para visualizar os templates disponíveis
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Avatar Tab Content */}
            {activeTab === 'avatar' && (
              <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 gap-6">
                  {mockAvatars[videoFormat || 'landscape'].map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setShowAvatar(true)}
                      className={`group relative aspect-video overflow-hidden rounded-xl transition-transform hover:scale-[1.02] ${
                        showAvatar
                          ? 'ring-2 ring-[#125CC6] ring-offset-2 dark:ring-blue-500 dark:ring-offset-gray-800'
                          : 'ring-1 ring-[#E6E8EA] dark:ring-gray-700'
                      }`}
                    >
                      <video 
                        src={avatar.preview}
                        className="h-full w-full object-cover"
                        loop 
                        muted 
                        playsInline
                        controls={false}
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause()
                          e.currentTarget.currentTime = 0
                        }}
                        onClick={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="text-sm font-medium text-white">Selecionar Avatar</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      isValid: () => videoFormat !== null
    }
  ]

  const handleClose = () => {
    console.log('Closing AdWizard')
    setCurrentStep(1)
    setDirection(0)
    setProductDescription('')
    setLandingPage('')
    setSelectedHooks([])
    setSelectedScript(null)
    setVideoStyle(null)
    setVideoFormat(null)
    setShowCaptions(false)
    setShowAvatar(false)
    onClose()
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        containerClassName="max-w-none"
        title={`Novo Anúncio - ${projectName}`}
        fullHeight={true}
        footer={
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setDirection(-1)
                setCurrentStep((prev) => prev - 1)
              }}
              disabled={currentStep === 1}
              className="rounded-lg px-6 py-2.5 text-sm font-medium text-[#1E2329] transition-colors hover:bg-[#E6E8EA] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Voltar
            </button>

            <button
              onClick={() => {
                if (currentStep === steps.length) {
                  handleClose()
                  return
                }

                if (currentStepData.isValid()) {
                  setDirection(1)
                  setCurrentStep((prev) => prev + 1)
                }
              }}
              disabled={!currentStepData.isValid()}
              className="rounded-lg bg-[#125CC6] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#125CC6]/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-600/90"
            >
              {currentStep === steps.length ? 'Concluir' : 'Próximo'}
            </button>
          </div>
        }
      >
        <div className="flex flex-col">
          <StepHeader
            currentStep={currentStep}
            totalSteps={steps.length}
            title={steps[currentStep - 1].title}
            subtitle={steps[currentStep - 1].subtitle}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction === 1 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 1 ? -20 : 20 }}
              transition={{ duration: 0.2 }}
              className="mt-8 flex-1"
            >
              {currentStepData.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Confirmar Exclusão"
        containerClassName="max-w-md"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="rounded-lg border border-[#E6E8EA] px-4 py-2 text-sm text-[#1E2329] hover:border-[#125CC6] hover:text-[#125CC6] dark:border-gray-700 dark:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={() => showDeleteConfirm && handleDeleteHook(showDeleteConfirm)}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        }
      >
        <p className="text-[#1E2329] dark:text-white">
          Tem certeza que deseja excluir esta frase?
        </p>
      </Modal>
    </>
  )
} 