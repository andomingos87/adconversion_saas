'use client'

import { useState } from 'react'
import { Modal } from '@/components/shared/Modal'
import { Project } from '@/types/project'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'

interface ProjectSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProject: (project: Project | null, language?: string, platform?: string) => void
}

type Platform = 'meta' | 'youtube'
type Language = 'pt-BR' | 'en'

export function ProjectSelectionModal({
  isOpen,
  onClose,
  onSelectProject
}: ProjectSelectionModalProps) {
  const [step, setStep] = useState<'select' | 'create' | 'platform' | 'language'>('select')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState('')
  const [platform, setPlatform] = useState<Platform | null>(null)
  const [language, setLanguage] = useState<Language | null>(null)

  const handleNext = () => {
    if (step === 'select') {
      if (selectedProject) {
        setStep('platform')
      }
    } else if (step === 'create') {
      if (projectName.trim()) {
        setStep('language')
      }
    } else if (step === 'platform') {
      if (platform && selectedProject) {
        onSelectProject(selectedProject, undefined, platform)
        handleClose()
      }
    } else if (step === 'language') {
      if (language) {
        // Aqui você pode criar o projeto com o nome e idioma selecionados
        const newProject: Project = {
          id: projects.length + 1,
          name: projectName,
          thumbnail: '/images/projects/default.jpg',
          videoCount: 0
        }
        onSelectProject(newProject, language)
        handleClose()
      }
    }
  }

  const handleClose = () => {
    setStep('select')
    setSelectedProject(null)
    setProjectName('')
    setPlatform(null)
    setLanguage(null)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === 'select'
          ? 'Selecione um Projeto'
          : step === 'create'
          ? 'Criar Novo Projeto'
          : step === 'platform'
          ? 'Selecione a Plataforma'
          : 'Selecione o Idioma'
      }
      containerClassName="max-w-2xl h-auto my-8"
    >
      <div className="flex flex-col space-y-6">
        {step === 'select' && (
          <>
            <div className="grid max-h-[60vh] gap-4 overflow-y-auto pr-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                    selectedProject?.id === project.id
                      ? 'border-[#125CC6] bg-[#125CC6]/5'
                      : 'border-[#E6E8EA] hover:border-[#125CC6] dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-16 w-24 overflow-hidden rounded-lg">
                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1E2329] dark:text-gray-200">{project.name}</h3>
                    <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                      {project.videoCount} vídeos
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="secondary"
                className="text-gray-500 hover:text-[#125CC6] dark:text-gray-300 dark:hover:text-[#125CC6]"
                onClick={() => setStep('create')}
              >
               +  Criar Novo Projeto
              </Button>

              <Button
                onClick={handleNext}
                disabled={!selectedProject}
                className="bg-[#125CC6] text-white hover:bg-[#125CC6]/90 dark:bg-[#125CC6] dark:hover:bg-[#125CC6]/80 disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                Continuar
              </Button>
            </div>
          </>
        )}

        {step === 'create' && (
          <>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#1E2329] dark:text-gray-200">
                  Nome do Projeto
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Digite o nome do projeto..."
                  className="w-full rounded-lg border border-[#E6E8EA] dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-sm text-[#1E2329] dark:text-gray-200 placeholder-[#1E2329]/50 dark:placeholder-gray-400 outline-none focus:border-[#125CC6]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="secondary" 
                className="text-gray-500 hover:text-[#125CC6] dark:text-gray-300 dark:hover:text-[#125CC6]"
                onClick={() => setStep('select')}
              >
                Voltar
              </Button>

              <Button
                onClick={handleNext}
                disabled={!projectName.trim()}
                className="bg-[#125CC6] text-white hover:bg-[#125CC6]/90 dark:bg-[#125CC6] dark:hover:bg-[#125CC6]/80 disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                Continuar
              </Button>
            </div>
          </>
        )}

        {step === 'platform' && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => setPlatform('meta')}
                className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
                  platform === 'meta'
                    ? 'border-[#125CC6] bg-[#125CC6]/5'
                    : 'border-[#E6E8EA] dark:border-gray-700 hover:border-[#125CC6]'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10">
                  <Image
                    src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/facebook.svg"
                    alt="Meta"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E2329] dark:text-gray-200">Meta</h3>
                  <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                    Facebook e Instagram
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPlatform('youtube')}
                className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
                  platform === 'youtube'
                    ? 'border-[#125CC6] bg-[#125CC6]/5'
                    : 'border-[#E6E8EA] dark:border-gray-700 hover:border-[#125CC6]'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10">
                  <Image
                    src="https://raw.githubusercontent.com/gilbarbara/logos/main/logos/youtube-icon.svg"
                    alt="YouTube"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E2329] dark:text-gray-200">YouTube</h3>
                  <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                    YouTube Shorts e Ads
                  </p>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="secondary"
                className="text-gray-500 hover:text-[#125CC6] dark:text-gray-300 dark:hover:text-[#125CC6]"
                onClick={() => setStep('select')}
              >
                Voltar

              </Button>

              <Button
                onClick={handleNext}
                disabled={!platform}
              >
                Continuar
              </Button>
            </div>
          </>
        )}

        {step === 'language' && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => setLanguage('pt-BR')}
                className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
                  language === 'pt-BR'
                    ? 'border-[#125CC6] bg-[#125CC6]/5'
                    : 'border-[#E6E8EA] dark:border-gray-700 hover:border-[#125CC6]'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10">
                  <Image
                    src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/br.svg"
                    alt="Português"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E2329] dark:text-gray-200">Português</h3>
                  <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                    Português do Brasil
                  </p>
                </div>
              </button>

              <button
                onClick={() => setLanguage('en')}
                className={`flex flex-col items-center gap-4 rounded-lg border p-6 text-center transition-colors ${
                  language === 'en'
                    ? 'border-[#125CC6] bg-[#125CC6]/5'
                    : 'border-[#E6E8EA] dark:border-gray-700 hover:border-[#125CC6]'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#125CC6]/10">
                  <Image
                    src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg"
                    alt="English"
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-[#1E2329] dark:text-gray-200">English</h3>
                  <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">
                    American English
                  </p>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="secondary"
                onClick={() => setStep('create')}
              >
                Voltar
              </Button>

              <Button
                onClick={handleNext}
                disabled={!language}
              >
                Continuar
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
} 