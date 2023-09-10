export default {
  title: "/REG/Docs",
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    logo: "https://www.regestaitalia.eu/wp-content/uploads/2019/04/icona-regesta-icona-regesta@0.5x-2.png",
    search: {
      provider: 'local'
    },
    siteTitle: "/REG/Docs",
    nav: [
      {
        text: "ABAP",
        link: "/abap"
      },
      {
        text: "Orchestratore",
        link: "/orchestratore"
      }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Adocs",
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  },
}