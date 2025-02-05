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
  Users
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
  'Problem-Solution',
  'Before-After',
  'Day in Life',
  'Tutorial Style',
  'Review Format',
  'Comparison',
  'Behind the Scenes',
  'Quick Tips',
  'Challenge-Based'
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

  const steps = [
    {
      title: 'Fale sobre seu Produto',
      subtitle: 'Comece compartilhando o essencial sobre seu produto.',
      content: (
        <div className="space-y-4">
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descreva seu produto..."
            className="h-32 w-full rounded-lg border border-[#E6E8EA] bg-white p-3 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
        </div>
      ),
      isValid: () => productDescription.trim().length > 0
    },
    {
      title: 'Landing Page',
      subtitle: 'Informe a URL da sua landing page.',
      content: (
        <div className="space-y-4">
          <input
            type="url"
            value={landingPage}
            onChange={(e) => setLandingPage(e.target.value)}
            placeholder="Digite a URL da landing page..."
            className="w-full rounded-lg border border-[#E6E8EA] bg-white p-3 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-500"
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
      title: 'Escolha os Ganchos',
      subtitle: 'Selecione 3 ganchos poderosos para capturar a atenção do seu público!',
      content: (
        <div className="space-y-4">
          <div className="grid gap-2">
            {mockHooks.map((hook) => (
              <button
                key={hook}
                onClick={() => {
                  if (selectedHooks.includes(hook)) {
                    setSelectedHooks(selectedHooks.filter(h => h !== hook))
                  } else if (selectedHooks.length < 3) {
                    setSelectedHooks([...selectedHooks, hook])
                  }
                }}
                className={`flex items-center justify-between rounded-lg border p-3 text-sm transition-colors ${
                  selectedHooks.includes(hook)
                    ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                    : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
                }`}
                disabled={selectedHooks.length >= 3 && !selectedHooks.includes(hook)}
              >
                {hook}
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setSelectedHooks([])}
              className="flex items-center gap-2 rounded-lg border border-[#E6E8EA] px-3 py-2 text-sm text-[#1E2329] hover:border-[#125CC6] hover:text-[#125CC6] dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <Trash2 className="h-4 w-4" />
              Limpar
            </button>
            <button
              onClick={() => {
                const shuffled = [...mockHooks].sort(() => Math.random() - 0.5)
                setSelectedHooks(shuffled.slice(0, 3))
              }}
              className="flex items-center gap-2 rounded-lg border border-[#E6E8EA] px-3 py-2 text-sm text-[#1E2329] hover:border-[#125CC6] hover:text-[#125CC6] dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <RefreshCw className="h-4 w-4" />
              Gerar Novos
            </button>
          </div>
        </div>
      ),
      isValid: () => selectedHooks.length === 3
    },
    {
      title: 'Selecione o Script',
      subtitle: 'Escolha o script que melhor se encaixa no seu anúncio.',
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {mockScripts.map((script) => (
              <div
                key={script.id}
                className={`rounded-lg border p-4 transition-colors ${
                  selectedScript === script.id
                    ? 'border-[#125CC6] bg-[#125CC6]/5 dark:border-blue-500 dark:bg-blue-500/20'
                    : 'border-[#E6E8EA] dark:border-gray-700'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-[#1E2329] dark:text-white">{script.title}</h3>
                  <div className="flex gap-2">
                    <button className="text-[#1E2329]/70 hover:text-[#125CC6] dark:text-gray-400 dark:hover:text-blue-400">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-[#1E2329]/70 hover:text-[#125CC6] dark:text-gray-400 dark:hover:text-blue-400">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mb-4 text-sm text-[#1E2329]/70 dark:text-gray-400">{script.content}</p>
                <button
                  onClick={() => setSelectedScript(script.id)}
                  className={`w-full rounded-lg border p-2 text-sm transition-colors ${
                    selectedScript === script.id
                      ? 'border-[#125CC6] bg-white text-[#125CC6] dark:border-blue-500 dark:bg-gray-800 dark:text-blue-400'
                      : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500'
                  }`}
                >
                  {selectedScript === script.id ? 'Selecionado' : 'Selecionar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
      isValid: () => selectedScript !== null
    },
    {
      title: 'Selecione o Estilo',
      subtitle: 'Escolha o formato de vídeo que você prefere para seu anúncio.',
      content: (
        <div className="grid gap-6 md:grid-cols-3">
          <button
            onClick={() => setVideoStyle('ugc')}
            className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
              videoStyle === 'ugc'
                ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10 dark:bg-blue-500/30">
              <Users className="h-6 w-6 text-[#125CC6] dark:text-blue-400" />
            </div>
            <div>
              <h3 className="mb-1 font-medium text-[#1E2329] dark:text-white">UGC</h3>
              <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">Apenas Avatar IA</p>
            </div>
          </button>

          <button
            onClick={() => setVideoStyle('broll')}
            className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
              videoStyle === 'broll'
                ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10 dark:bg-blue-500/30">
              <Video className="h-6 w-6 text-[#125CC6] dark:text-blue-400" />
            </div>
            <div>
              <h3 className="mb-1 font-medium text-[#1E2329] dark:text-white">B-ROLL</h3>
              <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">Avatar + Vídeo Stock</p>
            </div>
          </button>

          <button
            onClick={() => setVideoStyle('cinematic')}
            className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
              videoStyle === 'cinematic'
                ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10 dark:bg-blue-500/30">
              <Film className="h-6 w-6 text-[#125CC6] dark:text-blue-400" />
            </div>
            <div>
              <h3 className="mb-1 font-medium text-[#1E2329] dark:text-white">CINEMATIC</h3>
              <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">Vídeo Stock Premium</p>
            </div>
          </button>
        </div>
      ),
      isValid: () => videoStyle !== null
    },
    {
      title: 'Configurações Finais',
      subtitle: 'Configure os detalhes finais do seu vídeo.',
      content: (
        <div className="space-y-6">
          <div className="mt-8 space-y-4">
            <h3 className="font-medium text-[#1E2329] dark:text-white">Formato do Vídeo</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setVideoFormat('landscape')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                  videoFormat === 'landscape'
                    ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                    : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
                }`}
              >
                Paisagem (16:9)
              </button>
              <button
                onClick={() => setVideoFormat('portrait')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                  videoFormat === 'portrait'
                    ? 'border-[#125CC6] bg-[#125CC6]/5 text-[#125CC6] dark:border-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                    : 'border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:bg-[#125CC6]/5 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-blue-500/20'
                }`}
              >
                Retrato (9:16)
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="font-medium text-[#1E2329] dark:text-white">Opções Adicionais</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showCaptions}
                  onChange={(e) => setShowCaptions(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#125CC6] focus:ring-[#125CC6] dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-500"
                />
                <span className="text-sm text-[#1E2329] dark:text-gray-200">Adicionar Legendas</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showAvatar}
                  onChange={(e) => setShowAvatar(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#125CC6] focus:ring-[#125CC6] dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-500"
                />
                <span className="text-sm text-[#1E2329] dark:text-gray-200">Mostrar Avatar</span>
              </label>
            </div>
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="max-w-3xl"
      title={`Novo Anúncio - ${projectName}`}
    >
      <div className="space-y-8">
        <StepHeader
          currentStep={currentStep}
          totalSteps={steps.length}
          title={steps[currentStep - 1].title}
          subtitle={steps[currentStep - 1].subtitle}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ x: 10 * direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10 * direction, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-[300px]"
          >
            {steps[currentStep - 1].content}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => {
              setDirection(-1)
              setCurrentStep((prev) => prev - 1)
            }}
            disabled={currentStep === 1}
            className="flex items-center gap-2 rounded-lg border border-[#E6E8EA] px-4 py-2 text-sm text-[#1E2329] transition-colors hover:border-[#125CC6] hover:text-[#125CC6] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </button>

          <button
            onClick={() => {
              if (currentStep === steps.length) {
                handleClose()
                return
              }
              setDirection(1)
              setCurrentStep((prev) => prev + 1)
            }}
            disabled={!steps[currentStep - 1].isValid()}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              currentStep === steps.length
                ? 'bg-[#125CC6] text-white hover:bg-[#125CC6]/90 dark:bg-blue-500 dark:hover:bg-blue-600'
                : 'border border-[#E6E8EA] text-[#1E2329] hover:border-[#125CC6] hover:text-[#125CC6] dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:text-blue-400'
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {currentStep === steps.length ? (
              'Finalizar'
            ) : (
              <>
                Próximo
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
} 