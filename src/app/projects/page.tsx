'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/features/ProjectCard'
import { VideoGallery } from '@/components/features/VideoGallery'
import { AdWizard } from '@/components/features/AdWizard'
import { ProjectSelectionModal } from '@/components/features/ProjectSelectionModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Project } from '@/types/project'
import { projects, videos } from '@/data/projects'

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [showProjectSelection, setShowProjectSelection] = useState(false)
  const [showAdWizard, setShowAdWizard] = useState(false)
  const [adWizardData, setAdWizardData] = useState<{
    projectId: number
    projectName: string
    language?: string
    platform?: string
  } | null>(null)

  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId)
    : null

  const selectedVideos = selectedProjectId 
    ? videos[selectedProjectId] || []
    : []

  const handleProjectSelect = (
    project: Project | null,
    language?: string,
    platform?: string
  ) => {
    if (project) {
      setAdWizardData({
        projectId: project.id,
        projectName: project.name,
        language,
        platform
      })
      setShowProjectSelection(false)
      setShowAdWizard(true)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#1E2329] dark:text-white">Meus Projetos</h1>
        {/* <Button onClick={() => setShowProjectSelection(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Gerar Novo Anúncio
        </Button> */}
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isSelected={project.id === selectedProjectId}
              onSelect={() => setSelectedProjectId(project.id)}
            />
          ))}
        </div>

        {selectedProject && (
          <VideoGallery
            projectName={selectedProject.name}
            videos={selectedVideos}
          />
        )}
      </div>

      <ProjectSelectionModal
        isOpen={showProjectSelection}
        onClose={() => setShowProjectSelection(false)}
        onSelectProject={handleProjectSelect}
      />

      <AdWizard
        isOpen={showAdWizard}
        onClose={() => {
          setShowAdWizard(false)
          setAdWizardData(null)
        }}
        projectId={adWizardData?.projectId || 0}
        projectName={adWizardData?.projectName || ''}
      />
    </div>
  )
} 