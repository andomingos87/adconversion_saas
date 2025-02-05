'use client'

import { useState } from 'react'
import { HelpCircle, Plus } from 'lucide-react'
import { ProjectSelectionModal } from '@/components/features/ProjectSelectionModal'
import { AdWizard } from '@/components/features/AdWizard'
import { Project } from '@/types/project'
import { UserMenu } from './UserMenu'

export function Header() {
  const [showProjectSelection, setShowProjectSelection] = useState(false)
  const [showAdWizard, setShowAdWizard] = useState(false)
  const [adWizardData, setAdWizardData] = useState<{
    projectId: number
    projectName: string
    language?: string
    platform?: string
  } | null>(null)

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
    <>
      <header className="fixed left-60 right-0 top-0 z-40 h-[60px] border-b border-[#E6E8EA] bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-full items-center justify-end px-6">
          <div className="flex items-center gap-6">
            <button className="text-[#1E2329] hover:text-[#125CC6] dark:text-gray-200 dark:hover:text-blue-400">
              <HelpCircle className="h-6 w-6" />
            </button>

            <button
              className="flex items-center gap-2 rounded-lg bg-[#125CC6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#125CC6]/90 dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={() => setShowProjectSelection(true)}
            >
              <Plus className="h-5 w-5" />
              Gerar Novo Anúncio
            </button>

            <div className="relative z-50">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

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
    </>
  )
} 