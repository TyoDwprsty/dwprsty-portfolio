'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import GlobeIcon from './social-icon/Globe'
import GithubIcon from './social-icon/GitHub'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    title: string
    description: string
    fullDescription: string
    techStack: string[]
    link?: string
    github?: string
  }
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-card border border-muted rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 30px rgba(203, 41, 87, 0.1)',
              }}
            />

            <div className="sticky top-0 flex justify-between items-start p-6 border-b border-muted bg-card relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold text-primary mb-2">{project.title}</h2>
                <p className="text-sm text-secondary">{project.description}</p>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-muted rounded transition-colors text-secondary hover:text-primary ml-4 flex-shrink-0"
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="p-6 space-y-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-primary mb-3">Project Details</h3>
                <p className="text-foreground leading-relaxed text-sm">{project.fullDescription}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-primary mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-muted text-secondary text-sm rounded border border-muted hover:border-primary transition-colors duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-muted"
              >
                {project.link && (
                  <motion.a
                    href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(203, 41, 87, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded text-center text-sm transition-colors"
                  >
                    <GlobeIcon size={18} />
                    View Live
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github.startsWith('http') ? project.github : `https://${project.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-muted text-secondary font-medium rounded border border-muted hover:border-primary hover:bg-[rgba(203,41,87,0.1)] text-center text-sm transition-colors duration-300"
                  >
                    <GithubIcon size={18} />
                    View Code
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
