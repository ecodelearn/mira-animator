# Roteiro: <título da história>

> Escrito pela skill `/mira-history` em `references/history-roteiro.md`, ANTES do `mira/historia.js`.
> Deck: `<pasta>` · data: `<AAAA-MM-DD>` · cenas: `<n>` · duração estimada: `<s>`

## A história em uma frase

<quem quer o quê, o que impede, como termina>

## Elenco (atores)

| Ator | O que é | Asset (catálogo ou origem) | Altura | Variantes |
|---|---|---|---|---|
| `pata` | a mãe | catálogo `pata.svg` | 150 | |
| `feio` | o protagonista | catálogo `patinho-cinza.svg` | 90 | `cisne: cisne.svg` |
| `ovo1..ovo4` | os ovos | procedural (`tipo: 'ovo'`) | 46 | estados fechado, rachado, aberto |

Regra: animal, pessoa, veículo e objeto detalhado vêm de SVG (catálogo ou web CC0). Nunca desenhados à mão.

## Lugares

| Lugar | Cenário | Decoração | Cenas |
|---|---|---|---|
| `quintal` | `fazenda` | árvore ao fundo | c1 a c6 |
| `caminho` | `campo` | 3 árvores | c7, c8 |
| `lagoInverno` | `lago` | pinheiros com neve, taboas | c9 a c14 |

## Cenas

| # | id | lugar | corte | emoção | paleta / clima | câmera | ação principal | quem entra / sai | legenda(s) |
|---|---|---|---|---|---|---|---|---|---|
| 0 | `capa` | lago | | | primavera, sol | medio no protagonista | os cisnes boiam | | (título) |
| 1 | `c1` | quintal | dissolve | expectativa | dia | aberto, depois aproxima os ovos | a pata espera | pata, ovos | "Era uma vez uma pata que esperava..." |
| 2 | `c2` | quintal | | alegria | dia, partículas | idem | os ovos racham, patinhos nascem e pulam | patinho1..3 | "Um a um, os ovos começaram a se abrir..." |
| 3 | `c3` | quintal | dissolve | suspense | dia | **close no ovo4** | o ovo treme, tensão | | "Porém, o último ovo demorou mais para quebrar." |
| ... | | | | | | | | | |
| n | `c14` | lagoInverno | | paz | tarde, quente | aproxima | balanço suave; FIM | | "...quem realmente era." |

Checagens antes de escrever o `historia.js`:

- [ ] Primeira cena é `capa`, última tem `fim: true`.
- [ ] Pelo menos 2 closes com `corte: 'dissolve'`.
- [ ] Pelo menos 3 paletas de céu diferentes.
- [ ] Pelo menos 1 `tremor`/`raio`/`tensao` se há medo ou tensão na história.
- [ ] Toda troca de lugar coincide com um corte, e quem aparece no lugar novo tem `mostrar`.
- [ ] Nenhuma legenda com frase de menos de 3 palavras; no máximo 2 frases por cena.
- [ ] Cada ator citado no roteiro existe em `assets/atores/` (ou é `tipo: 'ovo'`).
