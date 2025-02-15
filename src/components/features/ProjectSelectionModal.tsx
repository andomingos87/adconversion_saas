'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/shared/Modal'
import { Project } from '@/types/project'
import { projects } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useProjects } from '@/hooks/useProjects'
import { Language } from '@/types/project'

interface ProjectSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProject: (project: Project | null, language?: string, platform?: string) => void
}

type Platform = 'meta' | 'youtube'

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
  const [projects, setProjects] = useState<Project[]>([])
  
  const { createProject, getProjects, loading, error } = useProjects()

  useEffect(() => {
    if (isOpen) {
      loadProjects()
    }
  }, [isOpen])

  const loadProjects = async () => {
    const projectsList = await getProjects()
    setProjects(projectsList)
  }

  const handleNext = async () => {
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
        const newProject = await createProject(projectName, language)
        if (newProject) {
          onSelectProject(newProject, language)
          handleClose()
        }
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
      containerClassName="w-[95%] max-w-3xl my-4"
    >
      <div className="flex flex-col space-y-6">
        {step === 'select' && (
          <>
            <div className="text-center">
              <h3 className="text-lg font-medium text-[#1E2329] dark:text-gray-200">Seus Projetos</h3>
              <p className="mt-1 text-sm text-[#1E2329]/70 dark:text-gray-400">
                Selecione um projeto existente ou crie um novo
              </p>
            </div>

            <div className="grid max-h-[50vh] gap-4 overflow-y-auto pr-2">
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
          </>
        )}

        {step === 'create' && (
          <>
            <div className="text-center">
              <h3 className="text-lg font-medium text-[#1E2329] dark:text-gray-200">Novo Projeto</h3>
              <p className="mt-1 text-sm text-[#1E2329]/70 dark:text-gray-400">
                Digite um nome para identificar seu projeto
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Digite o nome do projeto..."
                  className="w-full rounded-lg border border-[#E6E8EA] bg-white p-3 text-sm text-[#1E2329] placeholder:text-[#1E2329]/50 outline-none focus:border-[#125CC6] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </>
        )}

        {step === 'platform' && (
          <>
            <div className="text-center">
              <h3 className="text-lg font-medium text-[#1E2329] dark:text-gray-200">Plataforma</h3>
              <p className="mt-1 text-sm text-[#1E2329]/70 dark:text-gray-400">
                Escolha onde você deseja publicar seus vídeos
              </p>
            </div>

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
          </>
        )}

        {step === 'language' && (
          <>
            <div className="text-center">
              <h3 className="text-lg font-medium text-[#1E2329] dark:text-gray-200">Idioma</h3>
              <p className="mt-1 text-sm text-[#1E2329]/70 dark:text-gray-400">
                Selecione o idioma principal do seu projeto
              </p>
            </div>

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
          </>
        )}

        <div className="flex items-center justify-between pt-2">
          {step === 'select' ? (
            <>
              <Button
                variant="secondary"
                className="text-gray-500 hover:text-[#125CC6] dark:text-gray-300 dark:hover:text-[#125CC6]"
                onClick={() => setStep('create')}
              >
                + Criar Novo Projeto
              </Button>

              <Button
                onClick={handleNext}
                disabled={!selectedProject}
                className="bg-[#125CC6] text-white hover:bg-[#125CC6]/90 dark:bg-[#125CC6] dark:hover:bg-[#125CC6]/80 disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                Continuar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                className="text-gray-500 hover:text-[#125CC6] dark:text-gray-300 dark:hover:text-[#125CC6]"
                onClick={() => {
                  if (step === 'create') setStep('select')
                  if (step === 'platform') setStep('select')
                  if (step === 'language') setStep('create')
                }}
              >
                Voltar
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  (step === 'create' && !projectName.trim()) ||
                  (step === 'platform' && !platform) ||
                  (step === 'language' && !language)
                }
                className="bg-[#125CC6] text-white hover:bg-[#125CC6]/90 dark:bg-[#125CC6] dark:hover:bg-[#125CC6]/80 disabled:bg-gray-300 dark:disabled:bg-gray-700"
              >
                Continuar
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
} 