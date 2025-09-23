import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Footer as FooterType, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import styles from './Footer.module.css'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  const navItems = footerData?.navItems || []
  const contactInfo = footerData?.contactInfo || []
  const promptText = footerData?.promptSection?.text
  const promptButton = footerData?.promptSection?.button
  const logoData = footerData.logo as Media | undefined

  return (
    <footer className={`relative w-full bg-black text-white ${styles.footer}`}>
      <div className="container mx-auto py-16 px-4 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-full border-t border-gray-700 mb-8"></div>

          {/* Navegación */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} className={`hover:text-gray-400 ${styles.navLink}`} />
            ))}
          </nav>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo (izquierda) */}
          <div className="flex justify-center md:justify-start">
            {logoData && (
              <Image
                src={logoData.url}
                alt={logoData.alt || 'Logo'}
                width={logoData.width || 300}
                height={logoData.height || 85}
              />
            )}
          </div>

          {/* Prompt (centro) */}
          <div className="text-center flex flex-col items-center">
            {promptText && <p className={styles.promptText}>{promptText}</p>}

            {promptButton?.label && (
              <a
                href={
                  promptButton.type === 'custom'
                    ? promptButton.url
                    : promptButton.type === 'reference' && promptButton.reference
                      ? `/${promptButton.reference.value}`
                      : '#'
                }
                className={styles.promptButton}
                target={promptButton.newTab ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                {promptButton.label}
              </a>
            )}
          </div>

          {/* Contact Info (derecha) */}
          <div className="flex justify-center md:justify-end">
            <ul className="space-y-2">
              {contactInfo.map((item, i) => (
                <li key={i}>
                  <CMSLink
                    {...item.link}
                    className={`flex items-center hover:text-gray-400 ${styles.contactLink}`}
                  >
                    {item.image?.url ? (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.link.label}
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                    ) : (
                      item.icon && <i className={`${item.icon} mr-2`} />
                    )}
                    {!item.image?.url && !item.icon && item.link.label}
                  </CMSLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
