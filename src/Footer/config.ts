import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'promptSection',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texto del Prompt',
        },
        link({
          name: 'button',
          label: 'Botón del Prompt',
          appearances: false,
        }),
      ],
    },
    {
      name: 'contactInfo',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Clase del ícono de FontAwesome (ej: fas fa-phone)',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Icono como imagen (opcional)',
        },
        link({
          label: 'Enlace de contacto',
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
