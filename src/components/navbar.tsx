'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, PORTAL_URL } from '@/lib/constants'
import { overlayLinkVariants, overlayVariants } from '@/lib/animations'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body-Scroll sperren solange das Overlay offen ist
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-white/80 shadow-[0_1px_0_0_#EEEEE6] backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-wide items-center justify-between px-6 md:h-[72px] md:px-10">
        <Link
          href="/"
          className="font-heading text-xl font-bold text-ink"
          aria-label="Struktura — Startseite"
        >
          Struktura
        </Link>

        {/* Desktop-Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 transition-colors duration-200 hover:text-navy-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PORTAL_URL}
            className="rounded-sm border border-navy-600 bg-transparent px-5 py-2 text-sm text-navy-600 transition-colors duration-200 hover:bg-navy-600 hover:text-white"
          >
            Zum Portal →
          </a>
        </div>

        {/* Mobile-Hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-navy-600 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Fullscreen-Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <span className="font-heading text-xl font-bold text-ink">
                Struktura
              </span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-navy-600"
                onClick={() => setMenuOpen(false)}
                aria-label="Menü schließen"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={overlayLinkVariants}
                  initial="hidden"
                  animate="visible"
                  className="font-heading text-h2 text-navy-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={PORTAL_URL}
                custom={NAV_LINKS.length}
                variants={overlayLinkVariants}
                initial="hidden"
                animate="visible"
                className="mt-4 rounded-sm border border-navy-600 px-8 py-3 font-medium text-navy-600"
              >
                Zum Portal →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
