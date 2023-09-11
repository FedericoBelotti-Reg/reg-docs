# Info

Non trovi qualcosa? Vuoi metterci del tuo per arricchire il know-how del reparto?  
Modifica qualsiasi pagina di questo sito tramite GitHub e crea una pull request: qualcuno, prima o poi, accetterà le tue proposte!

## Contatti

<script setup>
import {
  VPTeamPage,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/FedericoBelotti-Reg.png',
    name: 'Federico Belotti',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://www.github.com/FedericoBelotti-Reg' },
      { icon: 'linkedin', link: 'https://linkedin.com/federico.belotti' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>