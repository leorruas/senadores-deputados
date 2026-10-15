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

## Situação eleitoral dos senadores — 14/10/2026

**81/81 fichas verificadas quanto ao período da cadeira e ao resultado para o Senado em 2026:** 14 reeleitos, 27 cadeiras com mandato 2023–2031 (não disputadas em 2026) e 40 cadeiras 2019–2027 sem novo mandato eleito para a pessoa que as ocupa no inventário. Esta última categoria **não implica que todos tenham concorrido**. A condição de titular ou suplente está nas fichas individuais. Há notas específicas para candidaturas a governador e à Presidência. Fontes: [cadastro do Senado](https://www12.senado.leg.br/manualdecomunicacao/como-citar-os-senadores), [reeleitos em 2026](https://www12.senado.leg.br/noticias/materias/2026/10/05/em-2027-senado-tera-40-senadores-novos-e-14-reeleitos) e [eleitos por estado](https://www12.senado.leg.br/noticias/materias/2026/10/04/conheca-os-54-senadores-eleitos-neste-domingo).

## Controle das 81 fichas do Senado

[**Abrir acompanhamento por estado**](parlamentares/senadores/ACOMPANHAMENTO.md): 81 senadores em exercício em 14/10/2026, com caixas de seleção para registrar as fichas prontas. **81 criadas, 0 pendentes de criação.** Este é o inventário de pesquisa; [o registro dos votos da PEC 221/2019](votacoes/pec-221-2019.md) fica em documento separado.

## Perfis disponíveis

| Parlamentar | Cargo e UF | Mandato | Situação em outubro de 2026 |
| --- | --- | --- | --- |
| [Eliziane Gama](parlamentares/senadores/eliziane-gama-pt-ma.md) | Senadora, MA (PT; antes PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Cleitinho](parlamentares/senadores/cleitinho-republicanos-mg.md) | Senador, MG (Republicanos) | 2023 a 2031 | Eleito governador de Minas Gerais em 2026; cadeira senatorial até 2031 |
| [Carlos Portinho](parlamentares/senadores/carlos-portinho-pl-rj.md) | Senador, RJ (PL) | Cadeira 2019 a 2027 (1º suplente); eleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Davi Alcolumbre](parlamentares/senadores/davi-alcolumbre-uniao-ap.md) | Senador, AP (União Brasil) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Magno Malta](parlamentares/senadores/magno-malta-pl-es.md) | Senador, ES (PL) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Randolfe Rodrigues](parlamentares/senadores/randolfe-rodrigues-pt-ap.md) | Senador, AP (PT) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Hamilton Mourão](parlamentares/senadores/hamilton-mourao-republicanos-rs.md) | Senador, RS (Republicanos) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Jaime Bagattoli](parlamentares/senadores/jaime-bagattoli-pl-ro.md) | Senador, RO (PL) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Tereza Cristina](parlamentares/senadores/tereza-cristina-pp-ms.md) | Senadora, MS (PP) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Fabiano Contarato](parlamentares/senadores/fabiano-contarato-pt-es.md) | Senador, ES (PT) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Humberto Costa](parlamentares/senadores/humberto-costa-pt-pe.md) | Senador, PE (PT) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Flávio Bolsonaro](parlamentares/senadores/flavio-bolsonaro-pl-rj.md) | Senador, RJ (PL) | 2019 a 2027 | Disputa o 2º turno presidencial em 25/10/2026; cadeira senatorial até 2027 |
| [Omar Aziz](parlamentares/senadores/omar-aziz-psd-am.md) | Senador, AM (PSD) | 2023 a 2031 | Disputa 2º turno para governador do Amazonas em 25/10/2026; cadeira senatorial até 2031 |
| [Oriovisto Guimarães](parlamentares/senadores/oriovisto-guimaraes-psdb-pr.md) | Senador, PR (PSDB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Paulo Paim](parlamentares/senadores/paulo-paim-pt-rs.md) | Senador, RS (PT) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Rogério Marinho](parlamentares/senadores/rogerio-marinho-pl-rn.md) | Senador, RN (PL) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Teresa Leitão](parlamentares/senadores/teresa-leitao-pt-pe.md) | Senadora, PE (PT) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Vanderlan Cardoso](parlamentares/senadores/vanderlan-cardoso-psd-go.md) | Senador, GO (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Zenaide Maia](parlamentares/senadores/zenaide-maia-psd-rn.md) | Senadora, RN (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Jaques Wagner](parlamentares/senadores/jaques-wagner-pt-ba.md) | Senador, BA (PT) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Efraim Filho](parlamentares/senadores/efraim-filho-pl-pb.md) | Senador, PB (PL) | 2023 a 2031 | Concorreu ao governo de Paraíba em 2026; cadeira senatorial até 2031 |
| [Sergio Moro](parlamentares/senadores/sergio-moro-pl-pr.md) | Senador, PR (PL) | 2023 a 2031 | Eleito governador de Paraná em 2026; cadeira senatorial até 2031 |

| [Alessandro Vieira](parlamentares/senadores/alessandro-vieira-mdb-se.md) | Senador, SE (MDB) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Rogério Carvalho](parlamentares/senadores/rogerio-carvalho-pt-se.md) | Senador, SE (PT) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Soraya Thronicke](parlamentares/senadores/soraya-thronicke-psb-ms.md) | Senadora, MS (PSB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Dr. Hiran](parlamentares/senadores/dr-hiran-pp-rr.md) | Senador, RR (PP) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Wellington Fagundes](parlamentares/senadores/wellington-fagundes-pl-mt.md) | Senador, MT (PL) | 2023 a 2031 | Concorreu ao governo de Mato Grosso em 2026; cadeira senatorial até 2031 |
| [Professora Dorinha Seabra](parlamentares/senadores/professora-dorinha-seabra-uniao-to.md) | Senadora, TO (União Brasil) | 2023 a 2031 | Disputa 2º turno para governador do Tocantins em 25/10/2026; cadeira senatorial até 2031 |

| [Weverton](parlamentares/senadores/weverton-pdt-ma.md) | Senador, MA (PDT) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Flávio Arns](parlamentares/senadores/flavio-arns-psb-pr.md) | Senador, PR (PSB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Veneziano Vital do Rêgo](parlamentares/senadores/veneziano-vital-do-rego-mdb-pb.md) | Senador, PB (MDB) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |

| [Renan Calheiros](parlamentares/senadores/renan-calheiros-mdb-al.md) | Senador, AL (MDB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Eduardo Braga](parlamentares/senadores/eduardo-braga-mdb-am.md) | Senador, AM (MDB) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Damares Alves](parlamentares/senadores/damares-alves-republicanos-df.md) | Senadora, DF (Republicanos) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |

| [Ciro Nogueira](parlamentares/senadores/ciro-nogueira-pp-pi.md) | Senador, PI (PP) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Marcelo Castro](parlamentares/senadores/marcelo-castro-mdb-pi.md) | Senador, PI (MDB) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Otto Alencar](parlamentares/senadores/otto-alencar-psd-ba.md) | Senador, BA (PSD) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |

| [Beto Faro](parlamentares/senadores/beto-faro-pt-pa.md) | Senador, PA (PT) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Jader Barbalho](parlamentares/senadores/jader-barbalho-mdb-pa.md) | Senador, PA (MDB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Zequinha Marinho](parlamentares/senadores/zequinha-marinho-podemos-pa.md) | Senador, PA (Podemos) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Daniella Ribeiro](parlamentares/senadores/daniella-ribeiro-pp-pb.md) | Senadora, PB (PP) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Fernando Dueire](parlamentares/senadores/fernando-dueire-psd-pe.md) | Senador, PE (PSD) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Nelsinho Trad](parlamentares/senadores/nelsinho-trad-psd-ms.md) | Senador, MS (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Ana Paula Lobato](parlamentares/senadores/ana-paula-lobato-psb-ma.md) | Senadora, MA (PSB) | Cadeira 2023 a 2031 (1º suplente) | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Mara Gabrilli](parlamentares/senadores/mara-gabrilli-psd-sp.md) | Senadora, SP (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Romário](parlamentares/senadores/romario-sem-partido-rj.md) | Senador, RJ (sem partido) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |

| [Alan Rick](parlamentares/senadores/alan-rick-republicanos-ac.md) | Senador, AC (Republicanos) | 2023 a 2031 | Disputa 2º turno para governador do Acre em 25/10/2026; cadeira senatorial até 2031 |
| [Marcio Bittar](parlamentares/senadores/marcio-bittar-pl-ac.md) | Senador, AC (PL) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Sérgio Petecão](parlamentares/senadores/sergio-petecao-psd-ac.md) | Senador, AC (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Dra. Eudócia](parlamentares/senadores/dra-eudocia-psdb-al.md) | Senadora, AL (PSDB) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Lucas Barreto](parlamentares/senadores/lucas-barreto-psd-ap.md) | Senador, AP (PSD) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Roberta Acioly](parlamentares/senadores/roberta-acioly-republicanos-rr.md) | Senadora, RR (Republicanos) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Ivete da Silveira](parlamentares/senadores/ivete-da-silveira-mdb-sc.md) | Senadora, SC (MDB) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Jorge Seif](parlamentares/senadores/jorge-seif-pl-sc.md) | Senador, SC (PL) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Esperidião Amin](parlamentares/senadores/esperidiao-amin-pp-sc.md) | Senador, SC (PP) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Carlos Viana](parlamentares/senadores/carlos-viana-psd-mg.md) | Senador, MG (PSD na lista de referência) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Izalci Lucas](parlamentares/senadores/izalci-lucas-pl-df.md) | Senador, DF (PL) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Giordano](parlamentares/senadores/giordano-podemos-sp.md) | Senador, SP (Podemos) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Cid Gomes](parlamentares/senadores/cid-gomes-psb-ce.md) | Senador, CE (PSB) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Confúcio Moura](parlamentares/senadores/confucio-moura-mdb-ro.md) | Senador, RO (MDB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Styvenson Valentim](parlamentares/senadores/styvenson-valentim-podemos-rn.md) | Senador, RN (Podemos) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |

| [Plínio Valério](parlamentares/senadores/plinio-valerio-psdb-am.md) | Senador, AM (PSDB) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Jayme Campos](parlamentares/senadores/jayme-campos-uniao-mt.md) | Senador, MT (União Brasil) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Laércio Oliveira](parlamentares/senadores/laercio-oliveira-pp-se.md) | Senador, SE (PP) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |

| [Carlos Fávaro](parlamentares/senadores/carlos-favaro-psd-mt.md) | Senador, MT (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Astronauta Marcos Pontes](parlamentares/senadores/astronauta-marcos-pontes-pl-sp.md) | Senador, SP (PL) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Jussara Lima](parlamentares/senadores/jussara-lima-psd-pi.md) | Senadora, PI (PSD) | Cadeira 2023 a 2031 (1º suplente) | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |

| [Marcos Rogério](parlamentares/senadores/marcos-rogerio-pl-ro.md) | Senador, RO (PL) | 2019 a 2027 | Eleito governador de Rondônia em 2026; cadeira senatorial até 2027 |
| [Eduardo Gomes](parlamentares/senadores/eduardo-gomes-pl-to.md) | Senador, TO (PL) | 2019 a 2027; reeleito para 2027 a 2035 | Reeleito para o Senado em 2026 (mandato 2027–2035) |
| [Irajá](parlamentares/senadores/iraja-psd-to.md) | Senador, TO (PSD) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Renan Filho](parlamentares/senadores/renan-filho-mdb-al.md) | Senador eleito, AL (MDB) | 2023 a 2031 | Concorreu ao governo de Alagoas em 2026; cadeira senatorial até 2031 |
| [Camilo Santana](parlamentares/senadores/camilo-santana-pt-ce.md) | Senador eleito, CE (PT) | 2023 a 2031 | Cadeira senatorial 2023–2031; não disputada ao Senado em 2026 |
| [Chico Rodrigues](parlamentares/senadores/chico-rodrigues-psb-rr.md) | Senador, RR (PSB na lista de referência) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Jorge Kajuru](parlamentares/senadores/jorge-kajuru-psb-go.md) | Senador, GO (PSB) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Wilder Morais](parlamentares/senadores/wilder-morais-pl-go.md) | Senador, GO (PL) | 2023 a 2031 | Concorreu ao governo de Goiás em 2026; cadeira senatorial até 2031 |
| [Luis Carlos Heinze](parlamentares/senadores/luis-carlos-heinze-pp-rs.md) | Senador, RS (PP) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Angelo Coronel](parlamentares/senadores/angelo-coronel-republicanos-ba.md) | Senador, BA (Republicanos na lista de referência) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Sargento Reginauro](parlamentares/senadores/sargento-reginauro-psdb-ce.md) | Senador, CE (PSDB na lista de referência) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Leany Lemos](parlamentares/senadores/leany-lemos-psb-df.md) | Senadora, DF (PSB na lista de referência) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

| [Marcos do Val](parlamentares/senadores/marcos-do-val-avante-es.md) | Senador, ES (Avante na lista de referência) | 2019 a 2027 | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |
| [Renzo Braz](parlamentares/senadores/renzo-braz-pp-mg.md) | Senador, MG (PP na lista de referência) | Cadeira 2019 a 2027 (1º suplente) | Cadeira até janeiro de 2027; sem novo mandato no Senado em 2026 |

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
