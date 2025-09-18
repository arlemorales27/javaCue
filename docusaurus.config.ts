import { themes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Programación 1',
  tagline: 'Curso de Programación 1 Coorporación Universitaria Empresarial Alexander von Humboldt',
  favicon: 'img/favicon.ico',

  // REMOVE THIS LINE - Está causando conflicto
  // future: { v4: true },

  url: 'https://arlemorales27.github.io',
  baseUrl: '/javaCue/',

  organizationName: 'arlemorales27',
  projectName: 'javaCue',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: { 
          sidebarPath: './sidebars.ts',
          // Agrega esta configuración
          routeBasePath: '/docs', // Esto asegura que la ruta base sea /docs
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          // Simplifica estas opciones
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: { 
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    navbar: {
      title: '',
      logo: { alt: 'CUE Logo', src: 'img/logo.png' },
      items: [
        { 
          type: 'docSidebar', 
          sidebarId: 'tutorialSidebar', 
          position: 'left', 
          label: 'Temáticas' 
        },
        { 
          to: '/docs/recursos', 
          label: 'Recursos', 
          position: 'left' 
        },
        // Agrega el blog al navbar si lo usas
        { to: '/blog', label: 'Blog', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
            { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
            { label: 'X', href: 'https://x.com/docusaurus' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/facebook/docusaurus' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CUE Alexander von Humboldt.`,
    },
    prism: { 
      additionalLanguages: ['java'], 
      theme: themes.oneDark 
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
