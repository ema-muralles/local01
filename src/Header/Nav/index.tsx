'use client'

import React, { useState, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X, ChevronDown } from 'lucide-react'
import styles from '../Header.module.css'

type NavItem = NonNullable<HeaderType['navItems']>[number]
type SubItem = NonNullable<NavItem['subItems']>[number]

const DESKTOP_THRESHOLD = 1007 // Usa la misma medida que en tu CSS

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const navItems = data?.navItems || []

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_THRESHOLD)
    }

    // Comprobar el tamaño de la ventana en la carga inicial
    handleResize()

    // Agregar el listener para cambios de tamaño
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderNavItem = (item: NavItem, i: number, isMobile: boolean) => {
    if (item.type === 'link' && item.link) {
      const isCta = i === navItems.length - 1
      // No renderiza el CTA en móvil, a menos que quieras tenerlo ahí.
      if (isMobile && isCta) return null
      return (
        <CMSLink key={i} {...item.link} className={isCta ? styles.ctaButton : styles.navLink} />
      )
    }

    if (item.type === 'dropdown' && item.subItems?.length) {
      const isDropdownOpen = openDropdown === i
      const isTriggerActive = isMobile && isDropdownOpen ? styles.dropdownOpen : ''

      return (
        <div key={i} className={styles.dropdown}>
          <button
            className={`${styles.dropdownTrigger} ${isTriggerActive}`}
            onClick={() => {
              if (isMobile) {
                setOpenDropdown(isDropdownOpen ? null : i)
              }
            }}
          >
            {item.label || 'Menu'}
            <ChevronDown size={16} style={{ marginLeft: '0.3rem' }} />
          </button>
          <div
            className={`${styles.dropdownMenu} ${
              isMobile && isDropdownOpen ? styles.dropdownMenuShow : ''
            }`}
          >
            {item.subItems.map((subItem: SubItem, j: number) => (
              <CMSLink key={j} {...subItem.link} className={styles.dropdownItem} />
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <>
      {/* Si es móvil, renderiza el botón de hamburguesa */}
      {!isDesktop && (
        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      )}

      {/* Renderiza el menú de escritorio */}
      {isDesktop && (
        <nav className={styles.navContainer}>
          {navItems.map((item, i) => renderNavItem(item, i, false))}
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className={styles.searchIcon} />
          </Link>
        </nav>
      )}

      {/* Renderiza el menú móvil si isOpen es true */}
      {!isDesktop && isOpen && (
        <div className={`${styles.mobileMenu} ${isOpen ? styles.visible : ''}`}>
          {navItems.map((item, i) => renderNavItem(item, i, true))}
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className={styles.searchIcon} />
          </Link>
        </div>
      )}
    </>
  )
}
