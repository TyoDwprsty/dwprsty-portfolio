'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  techStack: string[]
  onClick: () => void
}

export function ProjectCard({ title, description, techStack, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        className="relative bg-card border border-muted rounded-lg p-6 cursor-pointer overflow-hidden group"
      >
        {/* Animated border light effect */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-lg border-2 border-transparent"
            style={{
              background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(203, 41, 87, 0.3), transparent 80%)`,
            }}
          />
        )}

        {/* Animated glow shadow */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? '0 0 30px rgba(203, 41, 87, 0.3), inset 0 0 30px rgba(203, 41, 87, 0.1)'
              : '0 0 0px rgba(203, 41, 87, 0)',
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-lg pointer-events-none"
        />

        {/* Border animation */}
        <motion.div
          animate={{
            borderColor: isHovered ? 'rgb(203, 41, 87)' : 'var(--muted)',
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-lg border border-inherit pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            animate={{ color: isHovered ? 'rgb(203, 41, 87)' : 'var(--primary)' }}
            transition={{ duration: 0.2 }}
            className="text-lg font-semibold mb-3"
          >
            {title}
          </motion.h3>

          <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-5">
            {description}
          </p>

          <div className="space-y-3">
            <motion.div
              className="flex flex-wrap gap-2"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
            >
              {techStack.slice(0, 4).map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="px-2 py-1 bg-muted text-secondary text-xs rounded border border-muted group-hover:border-primary group-hover:bg-[rgba(203,41,87,0.15)] transition-colors duration-300"
                >
                  {tech}
                </motion.span>
              ))}
              {techStack.length > 4 && (
                <span className="px-2 py-1 text-xs text-secondary">
                  +{techStack.length - 4} more
                </span>
              )}
            </motion.div>

            <div className="pt-3 border-t border-muted">
              <motion.p
                animate={{ color: isHovered ? 'rgb(203, 41, 87)' : 'var(--primary)' }}
                transition={{ duration: 0.2 }}
                className="text-xs font-medium"
              >
                Click to view details →
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
