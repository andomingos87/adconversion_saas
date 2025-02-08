'use client'

interface StepHeaderProps {
  currentStep: number
  totalSteps: number
  title: string
  subtitle: string
}

export function StepHeader({
  currentStep,
  totalSteps,
  title,
  subtitle
}: StepHeaderProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm text-[#1E2329]/70 dark:text-gray-400">
          <span>Etapa {currentStep} de {totalSteps}</span>
          <span>{Math.round(progress)}% Concluído</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6E8EA] dark:bg-gray-700">
          <div
            className="h-full bg-[#125CC6] transition-all duration-300 dark:bg-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="mb-1 text-xl font-medium text-[#1E2329] dark:text-white">{title}</h2>
        <p className="text-sm text-[#1E2329]/70 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
} 