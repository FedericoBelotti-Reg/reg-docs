export default {
  title: "/REG/Docs",
  head: [["link", { rel: "icon", href: "/logo_dark.svg" }]],
  cleanUrls: true,
  themeConfig: {
    logo: {
      dark: "/logo_dark.svg",
      light: "/logo_light.svg",
    },
    search: {
      provider: "local",
    },
    siteTitle: "/REG/Docs",
    nav: [
      {
        text: "ABAP",
        link: "/abap/get-started",
        activeMatch: "abap",
      },
      {
        text: "CDS",
        link: "cds",
      },
      {
        text: "Orchestratore",
        link: "/orchestratore/get-started",
      },
    ],
    sidebar: {
      "/abap/": {
        base: "/abap/",
        items: [
          {
            text: "ABAP",
            items: [
              {
                text: "Get Started",
                link: "get-started",
              },
              {
                text: "Dynamic Programming",
                link: "dynamic-programming",
              },
              {
                text: "Pillole",
                link: "pillole",
              },
            ],
          },
        ],
      },
      "/orchestratore/": {
        base: "/orchestratore/",
        items: [
          {
            text: "Orchestratore",
            items: [
              {
                text: "Get Started",
                link: "get-started",
              },
              {
                text: "Plugins",
                link: "plugins",
              },
            ],
          },
        ],
      },
    },
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Modifica questa pagina su GitHub",
    },
  },
};
