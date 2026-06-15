'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { BioCard } from '@/components/bio-card'
import { ProjectCard } from '@/components/project-card'
import { ProjectModal } from '@/components/project-modal'
import { ExternalLink, Terminal } from 'lucide-react'
import GithubIcon from './social-icon/GitHub'
import LinkedInIcon from './social-icon/LinkedIn'
import MailFilledIcon from './social-icon/Mail'
import ReactIcon from './social-icon/React'
import NextJsIcon from './social-icon/NextJs'
import TypeScriptIcon from './social-icon/TypeScript'
import NodeJsIcon from './social-icon/nodejs'
import TailwindCSS from './social-icon/tailwindcss.svg'

interface Project {
  id: string
  title: string
  description: string
  project_details: string
  techstack: string
  project_url: string
  image_url: string | null
  created_at: Date
}

interface MappedProject {
  id: string
  title: string
  description: string
  fullDescription: string
  techStack: string[]
  link?: string
  project_details: string
  techstack: string
  project_url: string
  image_url: string | null
  created_at: Date
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<MappedProject | null>(null)

  // Contact form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const [formError, setFormError] = useState('')

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('loading')
    setFormError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMessage }),
      })
      const data = await res.json()

      if (!res.ok) {
        setFormError(data.error || 'Something went wrong. Please try again.')
        setFormStatus('error')
      } else {
        setFormStatus('success')
        setFormName('')
        setFormEmail('')
        setFormMessage('')
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.')
      setFormStatus('error')
    }
  }

  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <BioCard />

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center md:pt-32 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-primary"
          >
            Hi, I&apos;m Dwi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-secondary mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Crafting beautiful, performant web experiences with modern technologies. Passionate about
            clean code, user experience, and solving complex problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(203, 41, 87, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded transition-colors"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-muted text-secondary font-semibold rounded border border-muted hover:border-primary hover:bg-[rgba(203,41,87,0.1)] transition-colors duration-300"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-primary mb-8"
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                "I'm a full-stack developer with a passion for creating intuitive, high-performance web applications. With expertise in modern frontend frameworks and backend technologies, I deliver solutions that are both beautiful and functional.",
                "My journey in tech started with curiosity about how things work on the internet. Over the years, I've developed a strong foundation in React, Next.js, Vue.js, and database design.",
                "When I'm not coding, I enjoy learning new technologies, contributing to open-source projects, and exploring the intersection of design and development.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-foreground leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Skills</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Node.js',
                    'PostgreSQL',
                    'Laravel',
                    'Tailwind CSS',
                    'Vue.js',
                  ].map((skill, index) => {
                    const getSkillIcon = (name: string) => {
                      switch (name) {
                        case 'React':
                          return <ReactIcon size={16} className="text-primary group-hover:text-accent" />
                        case 'Next.js':
                          return <NextJsIcon size={16} className="text-primary group-hover:text-accent" />
                        case 'Node.js':
                          return <NodeJsIcon size={16} className="text-primary group-hover:text-accent" />
                        case 'Tailwind CSS':
                          return <Image src={TailwindCSS} alt="Tailwind CSS" width={16} height={16} className="text-primary group-hover:text-accent" />
                        case 'TypeScript':
                          return <TypeScriptIcon size={16} className="text-primary group-hover:text-accent" />
                          
                        default:
                          return <Terminal size={16} className="text-primary group-hover:text-accent" />
                      }
                    }

                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-muted rounded text-sm text-secondary border border-transparent hover:border-primary hover:bg-[rgba(203,41,87,0.1)] transition-colors duration-300 flex items-center gap-2 group cursor-default"
                      >
                        {getSkillIcon(skill)}
                        {skill}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-primary mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-secondary mb-12 text-lg"
          >
            A selection of recent work that showcases my skills and expertise
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const mappedProject: MappedProject = {
                ...project,
                fullDescription: project.project_details,
                techStack: project.techstack.split(',').map((t) => t.trim()),
                link: project.project_url ? (project.project_url.startsWith('http') ? project.project_url : `https://${project.project_url}`) : undefined,
              }
              return (
                <ProjectCard
                  key={mappedProject.id}
                  {...mappedProject}
                  onClick={() => setSelectedProject(mappedProject)}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-primary mb-8 text-center"
          >
            Let&apos;s Connect
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Get in Touch</h3>
                <p className="text-foreground leading-relaxed">
                  I&apos;m always interested in hearing about new projects and opportunities. Whether you have a
                  question or just want to say hello, feel free to reach out!
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:dwi@dwprsty.com"
                  className="flex items-center gap-3 p-4 bg-card border border-muted rounded hover:border-primary transition-colors group"
                >
                  <MailFilledIcon className="text-primary group-hover:text-accent" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-primary">Email</p>
                    <p className="text-xs text-secondary">dwi@dwprsty.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/dwi-prasetyo-b0b416240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-card border border-muted rounded hover:border-primary transition-colors group"
                >
                  <LinkedInIcon className="text-primary group-hover:text-accent" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-primary">LinkedIn</p>
                    <p className="text-xs text-secondary">linkedin.com/in/DwiPrasetyo</p>
                  </div>
                </a>

                <a
                  href="https://github.com/TyoDwprsty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-card border border-muted rounded hover:border-primary transition-colors group"
                >
                  <GithubIcon className="text-primary group-hover:text-accent" size={24} />
                  <div>
                    <p className="text-sm font-semibold text-primary">GitHub</p>
                    <p className="text-xs text-secondary">github.com/TyoDwprsty</p>
                  </div>
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-primary mb-2">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2 bg-card border border-muted rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="What you called as?"
                  disabled={formStatus === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-primary mb-2">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-card border border-muted rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                  placeholder="your.email@example.com"
                  disabled={formStatus === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-primary mb-2">Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-card border border-muted rounded focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                  placeholder="Feel free to drop couple words about why you're here..."
                  disabled={formStatus === 'loading'}
                />
              </div>

              {formStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded px-4 py-2"
                >
                  {formError}
                </motion.p>
              )}

              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full px-4 py-3 bg-green-500/10 border border-green-500/30 text-green-400 font-semibold rounded text-center"
                >
                  ✓ Message sent! I&apos;ll get back to you soon.
                </motion.div>
              ) : (
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-muted py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary text-sm">
            © 2026 Dwprsty. All rights reserved. Built with React, Next.js, and Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </div>
  )
}
