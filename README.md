# Arquivo parlamentar

Arquivo público de acompanhamento de senadores e deputados: votos nominais, emendas, PECs, declarações e mudanças de posicionamento, com referências e histórico de atualizações.

O desenvolvimento está organizado no [plano por fases](PLANO-DE-FASES.md): primeiro pesquisa de perfis em lotes, depois assuntos, votações e divisão entre Senado e Câmara.

## Votações acompanhadas

[Abrir índice de votações](https://leorruas.github.io/senadores-deputados/votacoes/). As propostas são cadastradas em [\`_data/votacoes.yml\`](_data/votacoes.yml), com páginas individuais em \`votacoes/\`. O primeiro registro é o [dossiê da PEC 221/2019 — fim da escala 6x1](votacoes/pec-221-2019.md), com origem em 2019, PEC de Erika Hilton (2025), substitutivo de Leo Prates, cronologia de votações em 2026 e links para os **dois mapas nominais completos da Câmara**. O script [\`scripts/importar_votos_pec_221_2019.py\`](scripts/importar_votos_pec_221_2019.py) importa as listas nominais com verificação dos totais oficiais, publicadas em [\`_data/votos_pec_221_2019.json\`](_data/votos_pec_221_2019.json). **A importação dos dois turnos foi concluída com validação das contagens: 472/22 no primeiro e 461/19 no segundo.** Relatos durante a sessão do Senado não são votos oficiais.

## Navegação e pesquisa nos índices

Os três índices — [Parlamentares](https://leorruas.github.io/senadores-deputados/), [Senado](https://leorruas.github.io/senadores-deputados/senado/) e [Câmara](https://leorruas.github.io/senadores-deputados/camara/) — exibem **30 registros por página**. As buscas e os filtros são calculados sobre **todos os registros** de cada índice, não apenas os da página atual. Quando restam até 30 resultados, não há controles de paginação. Mudar um filtro ou a busca volta à página 1, e o endereço preserva os filtros e a página (`?uf=MG&partido=PT&pagina=2`).

## Índice da Câmara dos Deputados

[**Consultar lista da Câmara**](https://leorruas.github.io/senadores-deputados/camara/) — **513 deputados em exercício** na data do último retrato oficial (57ª legislatura). O inventário está em [`_data/deputados_camara.json`](_data/deputados_camara.json), importado da [API dos Dados Abertos da Câmara](https://dadosabertos.camara.leg.br/api/v2/deputados) pelo [script de importação](scripts/importar_deputados_camara.py). O arquivo tem identificador oficial, nome parlamentar, partido, UF e link de cadastro. A atualização automática ocorre semanalmente às segundas-feiras, com opção de execução manual no [workflow](.github/workflows/atualizar-camara.yml). A importação só publica nova lista depois de validar 513 deputados, 27 UFs, dados obrigatórios e identificadores únicos.

**Importante:** essa lista é um inventário de deputados em exercício, **não 513 perfis pesquisados**, e não é a composição eleita em 2026 para a próxima legislatura. Suplentes assumidos podem constar entre os 513; licenciados podem não constar. O retrato registra a filiação informada pela Câmara naquele momento. Para consultas de votos por matéria e turno, usar os registros nominais, nunca inferir voto pela filiação partidária.

[**Abrir índice do Senado**](https://leorruas.github.io/senadores-deputados/senado/) — acesso às 81 fichas iniciadas, ainda com pesquisa documental pendente em parte delas.

## Controle das 81 fichas do Senado

[**Abrir acompanhamento por estado**](parlamentares/senadores/ACOMPANHAMENTO.md): 81 senadores em exercício em 14/10/2026, com caixas de seleção para registrar as fichas prontas. **81 criadas, 0 pendentes de criação.** Este é o inventário de pesquisa; [o registro dos votos da PEC 221/2019](votacoes/pec-221-2019.md) fica em documento separado.

## Perfis disponíveis

| Parlamentar | Cargo e UF | Mandato | Situação em outubro de 2026 |
| --- | --- | --- | --- |
| [Eliziane Gama](parlamentares/senadores/eliziane-gama-pt-ma.md) | Senadora, MA (PT; antes PSD) | 2019 a 2027 | Não reeleita |
| [Cleitinho](parlamentares/senadores/cleitinho-republicanos-mg.md) | Senador, MG (Republicanos) | 2023 a 2031 | Mandato em curso |
| [Carlos Portinho](parlamentares/senadores/carlos-portinho-pl-rj.md) | Senador, RJ (PL) | Reeleito para 2027 a 2035 | Reeleito |
| [Davi Alcolumbre](parlamentares/senadores/davi-alcolumbre-uniao-ap.md) | Senador, AP (União Brasil) | 2023 a 2031 | Mandato em curso |
| [Magno Malta](parlamentares/senadores/magno-malta-pl-es.md) | Senador, ES (PL) | 2023 a 2031 | Mandato em curso |
| [Randolfe Rodrigues](parlamentares/senadores/randolfe-rodrigues-pt-ap.md) | Senador, AP (PT) | 2019 a 2027 | Não reeleito |
| [Hamilton Mourão](parlamentares/senadores/hamilton-mourao-republicanos-rs.md) | Senador, RS (Republicanos) | 2023 a 2031 | Mandato em curso |
| [Jaime Bagattoli](parlamentares/senadores/jaime-bagattoli-pl-ro.md) | Senador, RO (PL) | 2023 a 2031 | Mandato em curso |
| [Tereza Cristina](parlamentares/senadores/tereza-cristina-pp-ms.md) | Senadora, MS (PP) | 2023 a 2031 | Mandato em curso |
| [Fabiano Contarato](parlamentares/senadores/fabiano-contarato-pt-es.md) | Senador, ES (PT) | 2019 a 2027 | Não reeleito |
| [Humberto Costa](parlamentares/senadores/humberto-costa-pt-pe.md) | Senador, PE (PT) | Reeleito para 2027 a 2035 | Reeleito |
| [Flávio Bolsonaro](parlamentares/senadores/flavio-bolsonaro-pl-rj.md) | Senador, RJ (PL) | 2019 a 2027 | Situação posterior pendente |
| [Omar Aziz](parlamentares/senadores/omar-aziz-psd-am.md) | Senador, AM (PSD) | 2023 a 2031 | Mandato em curso |
| [Oriovisto Guimarães](parlamentares/senadores/oriovisto-guimaraes-psdb-pr.md) | Senador, PR (PSDB) | 2019 a 2027 | Eleição de 2026 a verificar |
| [Paulo Paim](parlamentares/senadores/paulo-paim-pt-rs.md) | Senador, RS (PT) | 2019 a 2027 | Não concorreu em 2026 |
| [Rogério Marinho](parlamentares/senadores/rogerio-marinho-pl-rn.md) | Senador, RN (PL) | 2023 a 2031 | Mandato em curso |
| [Teresa Leitão](parlamentares/senadores/teresa-leitao-pt-pe.md) | Senadora, PE (PT) | 2023 a 2031 | Mandato em curso; não disputou em 2026 |
| [Vanderlan Cardoso](parlamentares/senadores/vanderlan-cardoso-psd-go.md) | Senador, GO (PSD) | 2019 a 2027 | Não reeleito |
| [Zenaide Maia](parlamentares/senadores/zenaide-maia-psd-rn.md) | Senadora, RN (PSD) | 2019 a 2027 | Não reeleita |

| [Jaques Wagner](parlamentares/senadores/jaques-wagner-pt-ba.md) | Senador, BA (PT) | Reeleito para 2027 a 2035 | Reeleito |
| [Efraim Filho](parlamentares/senadores/efraim-filho-pl-pb.md) | Senador, PB (PL) | 2023 a 2031 | Mandato em curso |
| [Sergio Moro](parlamentares/senadores/sergio-moro-pl-pr.md) | Senador, PR (PL) | 2023 a 2031 | Mandato em curso |

| [Alessandro Vieira](parlamentares/senadores/alessandro-vieira-mdb-se.md) | Senador, SE (MDB) | 2019 a 2027 | Eleição de 2026 a verificar |
| [Rogério Carvalho](parlamentares/senadores/rogerio-carvalho-pt-se.md) | Senador, SE (PT) | 2019 a 2027 | Eleição de 2026 a verificar |
| [Soraya Thronicke](parlamentares/senadores/soraya-thronicke-psb-ms.md) | Senadora, MS (PSB) | 2019 a 2027 | Eleição de 2026 a verificar |

| [Dr. Hiran](parlamentares/senadores/dr-hiran-pp-rr.md) | Senador, RR (PP) | 2023 a 2031 | Mandato em curso |
| [Wellington Fagundes](parlamentares/senadores/wellington-fagundes-pl-mt.md) | Senador, MT (PL) | 2023 a 2031 | Mandato em curso |
| [Professora Dorinha Seabra](parlamentares/senadores/professora-dorinha-seabra-uniao-to.md) | Senadora, TO (União Brasil) | 2023 a 2031 | Mandato em curso |

| [Weverton](parlamentares/senadores/weverton-pdt-ma.md) | Senador, MA (PDT) | 2019 a 2027 | Eleição a verificar |
| [Flávio Arns](parlamentares/senadores/flavio-arns-psb-pr.md) | Senador, PR (PSB) | 2019 a 2027 | Eleição a verificar |
| [Veneziano Vital do Rêgo](parlamentares/senadores/veneziano-vital-do-rego-mdb-pb.md) | Senador, PB (MDB) | 2019 a 2027 | Eleição a verificar |

| [Renan Calheiros](parlamentares/senadores/renan-calheiros-mdb-al.md) | Senador, AL (MDB) | 2019 a 2027 | Eleição a verificar |
| [Eduardo Braga](parlamentares/senadores/eduardo-braga-mdb-am.md) | Senador, AM (MDB) | 2019 a 2027 | Eleição a verificar |
| [Damares Alves](parlamentares/senadores/damares-alves-republicanos-df.md) | Senadora, DF (Republicanos) | 2023 a 2031 | Mandato em curso |

| [Ciro Nogueira](parlamentares/senadores/ciro-nogueira-pp-pi.md) | Senador, PI (PP) | 2019 a 2027 | Eleição a verificar |
| [Marcelo Castro](parlamentares/senadores/marcelo-castro-mdb-pi.md) | Senador, PI (MDB) | 2019 a 2027 | Eleição a verificar |
| [Otto Alencar](parlamentares/senadores/otto-alencar-psd-ba.md) | Senador, BA (PSD) | 2023 a 2031 | Mandato em curso |

| [Beto Faro](parlamentares/senadores/beto-faro-pt-pa.md) | Senador, PA (PT) | 2023 a 2031 | Mandato em curso |
| [Jader Barbalho](parlamentares/senadores/jader-barbalho-mdb-pa.md) | Senador, PA (MDB) | 2019 a 2027 | Eleição a verificar |
| [Zequinha Marinho](parlamentares/senadores/zequinha-marinho-podemos-pa.md) | Senador, PA (Podemos) | 2019 a 2027 | Eleição a verificar |

| [Daniella Ribeiro](parlamentares/senadores/daniella-ribeiro-pp-pb.md) | Senadora, PB (PP) | 2019 a 2027 | Situação eleitoral a verificar |
| [Fernando Dueire](parlamentares/senadores/fernando-dueire-psd-pe.md) | Senador, PE (PSD) | A verificar | Situação eleitoral a verificar |
| [Nelsinho Trad](parlamentares/senadores/nelsinho-trad-psd-ms.md) | Senador, MS (PSD) | 2019 a 2027 | Situação eleitoral a verificar |

| [Ana Paula Lobato](parlamentares/senadores/ana-paula-lobato-psb-ma.md) | Senadora, MA (PSB) | 2023 a 2031 | Mandato em curso |
| [Mara Gabrilli](parlamentares/senadores/mara-gabrilli-psd-sp.md) | Senadora, SP (PSD) | 2019 a 2027 | Eleição a verificar |
| [Romário](parlamentares/senadores/romario-sem-partido-rj.md) | Senador, RJ (sem partido) | 2019 a 2027 | Eleição a verificar |

| [Alan Rick](parlamentares/senadores/alan-rick-republicanos-ac.md) | Senador, AC (Republicanos) | 2019 a 2027 | Eleição a verificar |
| [Marcio Bittar](parlamentares/senadores/marcio-bittar-pl-ac.md) | Senador, AC (PL) | 2019 a 2027 | Eleição a verificar |
| [Sérgio Petecão](parlamentares/senadores/sergio-petecao-psd-ac.md) | Senador, AC (PSD) | 2019 a 2027 | Eleição a verificar |

| [Dra. Eudócia](parlamentares/senadores/dra-eudocia-psdb-al.md) | Senadora, AL (PSDB) | Exercício em 2026 | Detalhes do mandato a verificar |
| [Lucas Barreto](parlamentares/senadores/lucas-barreto-psd-ap.md) | Senador, AP (PSD) | Exercício em 2026 | Detalhes do mandato a verificar |
| [Roberta Acioly](parlamentares/senadores/roberta-acioly-republicanos-rr.md) | Senadora, RR (Republicanos) | Exercício em 2026 | Detalhes do mandato a verificar |

| [Ivete da Silveira](parlamentares/senadores/ivete-da-silveira-mdb-sc.md) | Senadora, SC (MDB) | Exercício em 2026 | Situação eleitoral a verificar |
| [Jorge Seif](parlamentares/senadores/jorge-seif-pl-sc.md) | Senador, SC (PL) | Exercício em 2026 | Situação eleitoral a verificar |
| [Esperidião Amin](parlamentares/senadores/esperidiao-amin-pp-sc.md) | Senador, SC (PP) | Exercício em 2026 | Situação eleitoral a verificar |

| [Carlos Viana](parlamentares/senadores/carlos-viana-psd-mg.md) | Senador, MG (PSD na lista de referência) | Exercício em 2026 | Histórico partidário a conferir |
| [Izalci Lucas](parlamentares/senadores/izalci-lucas-pl-df.md) | Senador, DF (PL) | Exercício em 2026 | Eleição de 2026 a verificar |
| [Giordano](parlamentares/senadores/giordano-podemos-sp.md) | Senador, SP (Podemos) | Exercício em 2026 | Eleição de 2026 a verificar |

| [Cid Gomes](parlamentares/senadores/cid-gomes-psb-ce.md) | Senador, CE (PSB) | Exercício em 2026 | Mandato a conferir |
| [Confúcio Moura](parlamentares/senadores/confucio-moura-mdb-ro.md) | Senador, RO (MDB) | Exercício em 2026 | Mandato a conferir |
| [Styvenson Valentim](parlamentares/senadores/styvenson-valentim-podemos-rn.md) | Senador, RN (Podemos) | Exercício em 2026 | Mandato a conferir |

| [Plínio Valério](parlamentares/senadores/plinio-valerio-psdb-am.md) | Senador, AM (PSDB) | Exercício em 2026 | Situação eleitoral a verificar |
| [Jayme Campos](parlamentares/senadores/jayme-campos-uniao-mt.md) | Senador, MT (União Brasil) | Exercício em 2026 | Situação eleitoral a verificar |
| [Laércio Oliveira](parlamentares/senadores/laercio-oliveira-pp-se.md) | Senador, SE (PP) | Exercício em 2026 | Situação eleitoral a verificar |

| [Carlos Fávaro](parlamentares/senadores/carlos-favaro-psd-mt.md) | Senador, MT (PSD) | Exercício em 2026 | Detalhes do mandato a conferir |
| [Astronauta Marcos Pontes](parlamentares/senadores/astronauta-marcos-pontes-pl-sp.md) | Senador, SP (PL) | 2023 a 2031 | Mandato em curso |
| [Jussara Lima](parlamentares/senadores/jussara-lima-psd-pi.md) | Senadora, PI (PSD) | Exercício em 2026 | Detalhes do mandato a conferir |

| [Marcos Rogério](parlamentares/senadores/marcos-rogerio-pl-ro.md) | Senador, RO (PL) | Exercício em 2026 | Situação eleitoral a verificar |
| [Eduardo Gomes](parlamentares/senadores/eduardo-gomes-pl-to.md) | Senador, TO (PL) | Exercício em 2026 | Situação eleitoral a verificar |
| [Irajá](parlamentares/senadores/iraja-psd-to.md) | Senador, TO (PSD) | Exercício em 2026 | Situação eleitoral a verificar |

| [Renan Filho](parlamentares/senadores/renan-filho-mdb-al.md) | Senador eleito, AL (MDB) | 2023 a 2031 | Períodos de licença/exercício a conferir |
| [Camilo Santana](parlamentares/senadores/camilo-santana-pt-ce.md) | Senador eleito, CE (PT) | 2023 a 2031 | Períodos de licença/exercício a conferir |
| [Chico Rodrigues](parlamentares/senadores/chico-rodrigues-psb-rr.md) | Senador, RR (PSB na lista de referência) | Exercício a conferir | Pesquisa inicial incompleta |

| [Jorge Kajuru](parlamentares/senadores/jorge-kajuru-psb-go.md) | Senador, GO (PSB) | Exercício a verificar | Pesquisa legislativa pendente |
| [Wilder Morais](parlamentares/senadores/wilder-morais-pl-go.md) | Senador, GO (PL) | Exercício a verificar | Pesquisa legislativa pendente |
| [Luis Carlos Heinze](parlamentares/senadores/luis-carlos-heinze-pp-rs.md) | Senador, RS (PP) | Exercício a verificar | Pesquisa legislativa pendente |

| [Angelo Coronel](parlamentares/senadores/angelo-coronel-republicanos-ba.md) | Senador, BA (Republicanos na lista de referência) | Exercício a verificar | Pesquisa documental pendente |
| [Sargento Reginauro](parlamentares/senadores/sargento-reginauro-psdb-ce.md) | Senador, CE (PSDB na lista de referência) | Exercício a verificar | Pesquisa documental pendente |
| [Leany Lemos](parlamentares/senadores/leany-lemos-psb-df.md) | Senadora, DF (PSB na lista de referência) | Exercício a verificar | Pesquisa documental pendente |

| [Marcos do Val](parlamentares/senadores/marcos-do-val-avante-es.md) | Senador, ES (Avante na lista de referência) | Exercício a verificar | Pesquisa documental pendente |
| [Renzo Braz](parlamentares/senadores/renzo-braz-pp-mg.md) | Senador, MG (PP na lista de referência) | Exercício a verificar | Pesquisa documental pendente |

## Acompanhamento de votações

- [PEC 221/2019: fim da escala 6x1](votacoes/pec-221-2019.md): registro iniciado em 14/10/2026 com quatro manifestações “sim” informadas durante o acompanhamento da sessão. A confirmação de voto nominal depende do mapa oficial do Senado; os turnos e eventuais destaques serão registrados separadamente.

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


## Direção visual

O site usa os mesmos fundamentos gráficos do projeto [Você votaria nesta proposta?](https://github.com/leorruas/campanha): **Archivo**, fundo branco, texto preto, verde **#00823f**, amarelo **#f4c400**, grades modulares, letras grandes, números de índice e linhas finas. Os cartões foram substituídos por uma listagem editorial. As páginas de perfil usam título tipográfico, dados de mandato em uma coluna própria e índice lateral de leitura. A busca permite links com `?q=`; o atalho `/` abre a busca e `Esc` a limpa. A tipografia e a estrutura se adaptam a telas menores.
