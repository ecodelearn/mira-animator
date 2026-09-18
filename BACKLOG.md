# Backlog

Ideias registradas ao final de uma sessão de teste (2026-09-18), ainda não
implementadas. Não são compromissos nem prazos: são direções para retomar.

Origem: a mesma fábula (Escorpião e Sapo) foi produzida em duas gerações, uma com
o pipeline de slides em D3 (`mira-animator` / template de deck) e outra com a skill
`/mira-history`. A comparação entre as duas revelou lacunas que orientam os dois
itens abaixo.

## 1. Mix `mira-animator` + `mira-history`

O `/mira-history` entrega narrativa, ritmo, câmera, clima, legendas sincronizadas,
música com ducking e QR, mas com **sprites rígidos** (sem cauda, braço ou boca
articulados) e cenário mais esquemático. O pipeline em D3 entrega mais **detalhe de
animação** (ex.: o ferrão que se move de forma quase analógica até o ponto da
picada) e cenários mais ricos.

O mix deve trazer o detalhe do D3 sem perder a cadência do `/mira-history`:

- [ ] **Ação articulada**: permitir que um ator tenha *partes nomeadas* (ex.:
  `ferrao`, `cauda`) e que uma ação mire a parte, movendo-a até o alvo, em vez de
  girar o corpo inteiro.
- [ ] **Cenário rico por momento**: cenários internos/subaquáticos (ex.: fundo do
  rio com peixes, algas e feixes de luz), reaproveitando elementos e o estilo de
  cena do pipeline D3.
- [ ] **Pergunta de design**: como expor isso no vocabulário fechado do
  `mira/historia.js` sem virar código livre? (ex.: `partes` no ator + ação
  `moverParte`).

## 2. `mira-arcade` (ideia a amadurecer)

Skill/produto de **minigames** com interação do usuário:

- Interação por **teclado ou mouse** para mover objetos e alcançar objetivos.
- Cada cena é um **micro-desafio** com meta (pegar, desviar, montar, atravessar).
- Reaproveita o motor de cena/loop do Mira e o pipeline de decks `file://`/QR.
- Componentes prováveis: física simples, colisão, placar, tempo, estados de
  vitória/derrota.
- Em aberto: skill do `mira-animator`, runtime novo, ou template de deck
  interativo; e qual o primeiro minigame de validação.

## Relacionado (já implementado, nesta mesma sessão)

- Campos `camada` e `rotacao` no ator, e ações `girar` e `camada` no
  `/mira-history` (ver CHANGELOG, "Não lançado").
