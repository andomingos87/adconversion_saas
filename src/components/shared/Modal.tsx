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
  footer?: React.ReactNode
  fullHeight?: boolean
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  containerClassName = 'max-w-2xl',
  footer,
  fullHeight = false
}: ModalProps) {
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

          <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative ${fullHeight ? 'h-screen' : 'min-h-[200px] max-h-[90vh]'} w-full flex flex-col bg-white shadow-xl ring-1 ring-black/5 dark:bg-gray-800 dark:ring-white/10 ${containerClassName}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {title && (
                <header className="flex items-center justify-between border-b border-[#E6E8EA] px-6 py-4 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-[#1E2329] dark:text-white">{title}</h2>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-[#1E2329]/70 transition-colors hover:bg-[#E6E8EA] hover:text-[#1E2329] dark:text-gray-400 dark:hover:bg-gray-700/80 dark:hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </header>
              )}

              {/* Content */}
              <main className="flex-1 overflow-y-auto px-6 py-4">
                {children}
              </main>

              {/* Footer */}
              {footer && (
                <footer className="border-t border-[#E6E8EA] bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                  {footer}
                </footer>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 