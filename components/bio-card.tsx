'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BioInspectionModal } from './bio-inspection-modal'
import { Terminal } from 'lucide-react'
import ReactIcon from './social-icon/React'
import NextJsIcon from './social-icon/NextJs'
import TypeScriptIcon from './social-icon/TypeScript'
import NodeJsIcon from './social-icon/nodejs'
import TailwindCSS from './social-icon/tailwindcss.svg'

export function BioCard() {
  const [isInspecting, setIsInspecting] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Mobile Bubble */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3 },
            x: { type: "spring", stiffness: 300, damping: 25 },
            y: { type: "spring", stiffness: 300, damping: 25 }
          }}
          drag
          dragMomentum={false}
          onDragEnd={(event, info) => {
            // Determine if the bubble is dropped on the left or right half of the screen
            const isLeftHalf = info.point.x < window.innerWidth / 2;
            
            // Calculate the x coordinate for the left edge.
            // Screen width - 64 (bubble width) - 24 (right spacing) - 24 (left spacing target) = window.innerWidth - 112
            const baseSnapX = isLeftHalf ? -(window.innerWidth - 112) : 0;
            // Add microscopic jitter to force Framer Motion to animate even if the logical target hasn't changed.
            const snapX = baseSnapX + (Math.random() * 0.0001);

            // Clamp Y to prevent going off-screen vertically.
            // Starts 24px from bottom, element is 64px tall (88px total from bottom).
            // Keep 24px padding at top and bottom.
            const minY = -(window.innerHeight - 112);
            const maxY = 0;
            const baseSnapY = Math.max(minY, Math.min(maxY, info.offset.y));
            const snapY = baseSnapY + (Math.random() * 0.0001);

            setPosition({
              x: snapX,
              y: snapY,
            })
          }}
          className="fixed bottom-6 right-6 z-40 cursor-grab active:cursor-grabbing"
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: position.x,
            y: position.y
          }}
        >
          <motion.button
            onClick={() => setIsInspecting(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(203,41,87,0.3)] bg-background"
          >
            <motion.div
              animate={{
                boxShadow: [
                  'inset 0 0 20px rgba(203, 41, 87, 0.15), 0 0 30px rgba(203, 41, 87, 0.2)',
                  'inset 0 0 30px rgba(203, 41, 87, 0.25), 0 0 50px rgba(203, 41, 87, 0.3)',
                  'inset 0 0 20px rgba(203, 41, 87, 0.15), 0 0 30px rgba(203, 41, 87, 0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full pointer-events-none z-20"
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full">
              <Image 
                src="/images/logo-dwprsty.webp" 
                alt="Profile Logo" 
                width={64} 
                height={64} 
                className="object-cover w-full h-full"
              />
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Desktop Compact Card */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed right-6 bottom-6 z-40"
        >
          <motion.div
            whileHover={{
              boxShadow: '0 0 30px rgba(203, 41, 87, 0.3)',
            }}
            onClick={() => setIsInspecting(true)}
            className="bg-card border border-muted rounded-xl p-5 backdrop-blur cursor-pointer w-64 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-primary">Dwi Prasetyo</h3>
                <p className="text-xs text-secondary">Full Stack Developer</p>
              </div>

              <p className="text-xs leading-relaxed text-foreground line-clamp-2">
                Building beautiful web experiences with modern tech.
              </p>

              <div className="space-y-2">
                <p className="text-xs font-semibold font-mono text-primary uppercase tracking-wider">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech) => {
                    const getSkillIcon = (name: string) => {
                      switch (name) {
                        case 'React':
                          return <ReactIcon size={12} className="text-primary mr-1" />
                        case 'Next.js':
                          return <NextJsIcon size={12} className="text-primary mr-1" />
                        case 'Node.js':
                          return <NodeJsIcon size={12} className="text-primary mr-1" />
                        case 'Tailwind CSS':
                          return <Image src={TailwindCSS} alt="Tailwind CSS" width={12} height={12} className="text-primary mr-1" />
                        case 'TypeScript':
                          return <TypeScriptIcon size={12} className="text-primary mr-1" />
                        default:
                          return <Terminal size={12} className="text-primary mr-1" />
                      }
                    }
                    return (
                      <span
                        key={tech}
                        className="flex items-center px-2 py-0.5 bg-primary/10 text-secondary text-xs rounded border border-primary/30"
                      >
                        {getSkillIcon(tech)}
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </div>

              <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-accent transition-colors">
                View Profile
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 3D Inspection Modal */}
      <BioInspectionModal isOpen={isInspecting} onClose={() => setIsInspecting(false)} />
    </>
  )
}
