'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { useLanguage } from '@/context/language-context'
import type { TranslationKey } from '@/lib/i18n'

function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const isId = lang === 'id'

  return (
    <button
      onClick={() => setLang(isId ? 'en' : 'id')}
      className="relative flex items-center w-[4.5rem] h-8 rounded-full bg-muted/50 shadow-inner border border-border p-1 cursor-pointer overflow-hidden transition-colors hover:bg-muted/80"
      aria-label="Toggle language"
    >
      {/* Sliding Knob */}
      <motion.div
        layout
        className="absolute w-6 h-6 rounded-full bg-background shadow-md border border-border flex items-center justify-center z-10 overflow-hidden"
        animate={{
          left: isId ? "calc(100% - 28px)" : "4px",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="w-full h-full"
          >
            {isId ? (
              // Indonesia Flag
              <div className="w-full h-full flex flex-col">
                <div className="w-full h-1/2 bg-[#ce1126]"></div>
                <div className="w-full h-1/2 bg-white"></div>
              </div>
            ) : (
              // UK Flag
              <div className="w-full h-full bg-[#012169] relative overflow-hidden flex items-center justify-center">
                <div className="absolute w-[150%] h-[4px] bg-white rotate-45"></div>
                <div className="absolute w-[150%] h-[4px] bg-white -rotate-45"></div>
                <div className="absolute w-[150%] h-[2px] bg-[#C8102E] rotate-45"></div>
                <div className="absolute w-[150%] h-[2px] bg-[#C8102E] -rotate-45"></div>
                <div className="absolute w-full h-[6px] bg-white"></div>
                <div className="absolute h-full w-[6px] bg-white"></div>
                <div className="absolute w-full h-[3px] bg-[#C8102E]"></div>
                <div className="absolute h-full w-[3px] bg-[#C8102E]"></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Text inside the pill */}
      <div className="w-full flex justify-between items-center px-1.5 z-0">
        <span className={`text-[11px] font-bold transition-opacity ${isId ? 'opacity-100 text-foreground' : 'opacity-0'}`}>ID</span>
        <span className={`text-[11px] font-bold transition-opacity ${isId ? 'opacity-0' : 'opacity-100 text-foreground'}`}>EN</span>
      </div>
    </button>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) {
          setActiveSection(visibleSection.target.id)
        }
      },
      {
        rootMargin: '-40% 0px -60% 0px',
      }
    )

    const sections = ['home', 'about', 'projects', 'contact']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsOpen(false)
    }
  }

  const navItems: { id: string; labelKey: TranslationKey }[] = [
    { id: 'home', labelKey: 'nav_home' },
    { id: 'about', labelKey: 'nav_about' },
    { id: 'projects', labelKey: 'nav_projects' },
    { id: 'contact', labelKey: 'nav_contact' },
  ]

  return (
    <>
      {/* Desktop Navbar - Modern centered style */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 h-14 items-center"
      >
        <div className="bg-background/80 backdrop-blur border border-muted rounded-full px-6 h-full flex items-center justify-between shadow-lg w-[500px]">
          {/* Desktop Menu */}
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 items-center">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative w-20 text-center text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                >
                  <span className="relative z-10">
                    {t(item.labelKey)}
                  </span>

                  {/* Underline animation */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1.5 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle iconSize={18} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-lg border-b border-muted/50 shadow-sm rounded-b-3xl"
      >
        <div className="px-4 py-2">
          <div className="flex justify-between items-center h-14">
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-bold text-primary"
          >
            Dprasetyo
          </motion.div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle Mobile */}
            <LanguageToggle />
            
            {/* Theme Toggle Button Mobile */}
            <ThemeToggle iconSize={20} />

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        </div>
      </motion.nav>

      {/* Modern Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Slide-up Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-muted rounded-t-3xl z-50 md:hidden max-h-[90vh]"
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-muted rounded-full" />
              </div>

              {/* Menu items */}
              <div className="px-6 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                <div className="mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Navigation
                  </p>
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                          activeSection === item.id
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                            : 'text-foreground hover:bg-muted/50'
                        }`}
                      >
                        {t(item.labelKey)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Theme info */}
                <div className="pt-4 border-t border-muted">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Appearance
                  </p>
                  <p className="text-xs text-foreground/70">
                    Use the toggle above to change appearance.
                  </p>
                </div>

                {/* Bottom spacing */}
                <div className="pb-4" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
