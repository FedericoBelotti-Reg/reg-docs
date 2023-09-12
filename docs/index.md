---
layout: home

# Hero section
hero:
  name: /REG/Docs
  image:
    light: /logo_light.svg
    dark: /logo_dark.svg
  tagline: Documentazione DEV
  actions:
    - theme: brand
      text: Get Started
      link: /get-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/FedericoBelotti-Reg/reg-docs

# Features section
features:
  - icon: 
      src: /abap_logo.svg
    title: ABAP
    details: Can't live with it, can't live without it...
    link: /abap/get-started
  - icon: 
      src: /csharp.svg
    title: Orchestratore
    details: Il nostro middleware per lo scambio dati tra SAP e sistemi esterni.
    link: /orchestratore/get-started

# Meta property
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: /REG/Docs
  - - meta
    - property: og:image
      content: https://user-images.githubusercontent.com/62628408/200117602-4b274d14-b1b2-4f61-8dcd-9f9482c677a0.png
  - - meta
    - property: og:url
      content: https://vitejs.dev/blog/announcing-vite3
  - - meta
    - name: title
      content: /REG/Docs
  - - meta
    - name: twitter:card
      content: https://user-images.githubusercontent.com/62628408/200117602-4b274d14-b1b2-4f61-8dcd-9f9482c677a0.png
  - - link
    - rel: icon
      type: image/svg
      href: logo.svg
---