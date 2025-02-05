'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  containerClassName?: string
}

export function Modal({ isOpen, onClose, title, children, containerClassName = 'max-w-2xl' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`relative w-full rounded-lg bg-white p-6 shadow-xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 ${containerClassName}`}
                onClick={(e) => e.stopPropagation()}
              >
                {title && (
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-[#1E2329] dark:text-white">{title}</h2>
                    <button
                      onClick={onClose}
                      className="rounded-lg p-2 text-[#1E2329]/70 transition-colors hover:bg-[#E6E8EA] hover:text-[#1E2329] dark:text-gray-400 dark:hover:bg-gray-700/80 dark:hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}

                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {children}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 