'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface BioInspectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BioInspectionModal({ isOpen, onClose }: BioInspectionModalProps) {
  const [rotationY, setRotationY] = useState(0)
  const [rotationX, setRotationX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Handle mouse move for 3D rotation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const angleY = ((x - centerX) / centerX) * 25
    const angleX = ((centerY - y) / centerY) * 25

    setRotationY(angleY)
    setRotationX(angleX)
  }

  const handleMouseLeave = () => {
    setRotationY(0)
    setRotationX(0)
  }

  const techStack = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl"
          >
            {/* 3D Card Container */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-96 cursor-grab active:cursor-grabbing"
              style={{
                perspective: '1000px',
              }}
            >
              {/* 3D Rotating Card */}
              <motion.div
                animate={{
                  rotateY: rotationY,
                  rotateX: rotationX,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-card to-background border border-muted rounded-2xl p-8 flex flex-col justify-between shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Ambient light effect */}
                  <motion.div
                    animate={{
                      boxShadow: `
                        inset ${rotationY * 2}px ${rotationX * 2}px 30px rgba(203, 41, 87, 0.15),
                        0 0 40px rgba(203, 41, 87, 0.2)
                      `,
                    }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                  />

                  {/* Header */}
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-bold text-primary mb-2"
                    >
                      Dwi Prasetyo
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-secondary mb-4"
                    >
                      Full Stack Developer
                    </motion.p>
                  </div>

                  {/* Bio and Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      Passionate about building beautiful, performant web experiences with modern technologies.
                    </p>

                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary/10 text-secondary text-xs rounded-full border border-primary/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Hint */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xs text-muted-foreground text-center mt-4"
                  >
                  </motion.p>
                </div>
              </motion.div>

            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute -top-10 right-0 p-2 text-secondary hover:text-primary transition-colors"
            >
              <X size={24} />
            </motion.button>

            {/* Info Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-xs text-muted-foreground mt-6"
            >
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
