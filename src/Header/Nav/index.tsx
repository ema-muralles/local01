'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

// 1. Import the CSS module. The path should be relative.
import styles from '../Header.module.css'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    // 2. Replace the Tailwind classes with the CSS module class.
    <nav className={styles.navContainer}>
      {navItems.map(({ link }, i) => {
        // You can use a conditional to apply different styles.
        // For example, if you want the last link to be a button.
        const isCta = i === navItems.length - 1

        return (
          <CMSLink
            key={i}
            {...link}
            // 3. Apply the appropriate class.
            className={isCta ? styles.ctaButton : styles.navLink}
            appearance="link"
          />
        )
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        {/* 4. Apply the search icon class. */}
        <SearchIcon className={styles.searchIcon} />
      </Link>
    </nav>
  )
}
