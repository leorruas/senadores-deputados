# Arquivo parlamentar

Arquivo público de acompanhamento de senadores e deputados: votos nominais, emendas, PECs, declarações e mudanças de posicionamento, com referências e histórico de atualizações.

## Perfis disponíveis

| Parlamentar | Cargo e UF | Mandato | Situação em outubro de 2026 |
| --- | --- | --- | --- |
| [Vanderlan Cardoso](parlamentares/senadores/vanderlan-cardoso-psd-go.md) | Senador, GO (PSD) | 2019 a 2027 | Não reeleito |
| [Eliziane Gama](parlamentares/senadores/eliziane-gama-pt-ma.md) | Senadora, MA (PT; anteriormente PSD) | 2019 a 2027 | Não reeleita |

## Site de consulta

Este repositório também contém um site gerado por Jekyll, com índice, busca, filtros e páginas individuais a partir dos arquivos Markdown. **Os Markdown são a fonte única de cada perfil**: não é necessário alimentar um banco separado.

Depois de habilitar o GitHub Pages em **Settings → Pages → Build and deployment → Source: GitHub Actions**, o fluxo [Publicar arquivo parlamentar](.github/workflows/pages.yml) gera e publica o site no endereço previsto:

**https://leorruas.github.io/senadores-deputados/**

O endereço só estará ativo depois de uma publicação bem-sucedida. Consulte a aba **Actions** para verificar o resultado. O fluxo roda automaticamente após alterações na branch `main` e também pode ser executado manualmente.

## Como incluir um parlamentar

1. Copie o [MODELO.md](MODELO.md) para `parlamentares/senadores/` ou `parlamentares/deputados/`, conforme o cargo.
2. No início do novo Markdown, preencha os metadados YAML entre `---`: nome, partido, UF, cargo, mandato, situação eleitoral, data da revisão, endereço da página, temas e resumo.
3. Registre os atos com **data e fonte**, diferenciando voto nominal, voto simbólico, declaração, proposta e emenda.
4. Acrescente uma entrada em “Registro de atualizações” sempre que a ficha ganhar fatos, correções ou novas hipóteses.

O índice do site lê automaticamente os arquivos que tenham `layout: perfil`, sem cadastro manual. Buscas cobrem nome, sigla, UF, resumo e temas.

## Organização

```text
_config.yml              Configuração Jekyll
index.html               Índice e filtros
metodologia.md           Critérios editoriais
_layouts/                Estruturas visuais
assets/                   CSS e JavaScript
parlamentares/senadores/  Perfis no Senado
parlamentares/deputados/  Local de futuros perfis na Câmara
.github/workflows/        Publicação automática
MODELO.md                Modelo para novos perfis
```

## Critérios editoriais

**Votação nominal:** data, proposição, turno, objeto e registro individual. **Votação simbólica:** resultado coletivo, sem atribuir um voto individual. **Proposta, PEC e emenda:** distinguir primeiro autor, signatário, relator e autor de emenda. **Declaração:** data, fonte, contexto e cuidado com mudanças no sentido da fala. **Interpretação:** hipóteses identificadas e abertas à revisão. **Mandato:** distinguir resultado eleitoral e prazo de exercício. Priorizar Senado, Câmara e TSE; complementar com jornalismo identificado.

A pesquisa é incremental: **um campo ainda não investigado não equivale a ausência de atuação**. Versões anteriores podem ser auditadas nos commits. O acervo é independente e não é publicação oficial do Congresso.

## Linguagem dos perfis

Escrever para quem não acompanha o Congresso diariamente. Usar frases curtas e explicar PEC, comissão, emenda e votação quando necessário. Para cada proposta, dizer em linguagem direta **o que mudaria na vida das pessoas** e quem ganha poder de decisão. Distinguir “assinou”, “propôs”, “disse” e “votou”. Evitar elogios automáticos, rótulos políticos sem prova e termos vagos como “flexibilização” para mudanças que podem reduzir direitos. O texto pode ter uma leitura crítica, mas deve deixar claras as evidências, as perguntas abertas e os limites da pesquisa.
