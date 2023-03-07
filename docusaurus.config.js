// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'hoop.dev',
  tagline: 'Replace Jump Servers & VPNs with the dynamic SSH',
  url: 'https://hoop.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://hoopartifacts.s3.amazonaws.com/branding/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'hoop logo',
          src: 'https://uploads-ssl.webflow.com/6381011b9a644125428eb040/63810228f0ef3494882cbd57_hoop-logo-black.svg',
          href: "https://hoop.dev/",
          target: '_self',
        },
        items: [
          {to: 'https://hoop.dev/pricing', label: 'Pricing', position: 'right', target: '_self',},
            {to: 'https://hoop.dev/blog', label: 'Blog', position: 'right',
           target: '_self'
          },
          {
            type: 'doc',
            docId: 'setting-up/index',
            position: 'right',
            label: 'Docs',
          },
          {
            href: 'https://app.hoop.dev',
            label: 'LOGIN',
            position: 'right',
          },
        ],
      },
      docs: {
          sidebar: {
              autoCollapseCategories: true,
          },
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Quickstarts',
            items: [
              {
                label: 'Kubernetes',
                to: '/docs/quickstarts',
              },
                {
                    label: 'Docker',
                    to: '/docs/quickstarts/docker',
                },
                {
                    label: 'Unix',
                    to: '/docs/quickstarts/docker',
                },
            ],
          },
            {
                title: 'Solutions',
                items: [
                    {
                        label: 'SSH',
                        to: '/docs',
                    },
                    {
                        label: 'VPN',
                        to: '/docs/quickstarts/docker',
                    },
                    {
                        label: 'Jump Server',
                        to: '/docs',
                    },
                ],
            },
            {
                title: 'Product',
                items: [
                    {
                        label: 'SSH',
                        to: '/docs/plugins/audit',
                    },
                    {
                        label: 'Audit Trails',
                        to: '/docs/plugins/audit',
                    },
                    {
                        label: 'PII Redact',
                        to: '/docs/plugins/dlp',
                    },
                ],
            },
            {
                title: 'Industries',
                items: [
                    {
                        label: 'Fintech',
                        to: '/docs/plugins/audit',
                    },
                    {
                        label: 'Healthtech',
                        to: '/docs/plugins/audit',
                    },
                    {
                        label: 'Highly Regulated',
                        to: '/docs/plugins/dlp',
                    },
                ],
            },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} hoop.dev.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
