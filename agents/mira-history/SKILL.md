---
name: mira-history
description: >-
  Transforma o TEXTO de uma história (normalmente infantil) num deck do Mira que é a
  animação completa dela: cenas contínuas com câmera, closes por dissolve, clima e paleta
  que mudam com a emoção, atores em SVG de fonte aberta, legendas de conto com narração
  em voz (edge-tts), música de fundo, capa com QR code e servidor na rede local para rodar
  no celular ou tablet em tela cheia. O modelo só escreve DADOS (mira/historia.js) num
  vocabulário fechado; o runtime versionado mira-history.js anima. Use SEMPRE que o
  usuário disser /mira-history, "anima essa história", "história animada", "conto
  infantil animado", "transforma essa história em animação", "historinha para o celular",
  "contar essa história com narração", ou colar um conto e pedir animação. NÃO é para
  explicar conceito (isso é /mira-animator e /mira-sequence-director) nem para deck de
  slides comum.
---

# Skill: /mira-history, do texto da história à animação completa

O autor cola uma história. Você entrega uma pasta em `decks/` que abre com duplo clique no `index.html` e conta a história sozinha: cenas animadas, narração, música, botão verde para avançar, tela cheia, QR na capa para o celular.

Você **não escreve código de animação**. Você escreve um roteiro e um arquivo de dados (`mira/historia.js`) num vocabulário fechado. Tudo que é difícil (continuidade, câmera, parallax, chuva, neve, névoa, partículas, raio, tremor, reflexo na água, legendas sincronizadas com a voz, música com ducking, trava de avanço, dissolve, rewind, tela cheia, deslizar, QR, modo leve para celular, pausa, modo automático) já está no runtime `mira/mira-history.js`, que é copiado pronto.

## REGRA DE IDIOMA

Siga `agents/_shared/idioma.md`. Todo texto visível em português brasileiro com acentuação correta. Proibido travessão: use vírgula ou dois-pontos.

## Leia antes de qualquer coisa

1. `references/vocabulario.md` inteiro. É a lista fechada do que o runtime entende. Campo fora dela é erro.
2. `references/exemplo-historia.js`: O Patinho Feio completo, 15 cenas. **Copie a estrutura dele e adapte.** Não invente estrutura.
3. `references/roteiro-gabarito.md`: o formato do roteiro que você escreve antes do `historia.js`.

## Onde estão os scripts

Nesta pasta, em `scripts/`. Chame por `node <pasta-desta-skill>/scripts/<script>.mjs`. Instalado num projeto, a pasta é `.claude/skills/mira-history/` (ou `.agents/skills/mira-history/`). No repositório do Mira, `agents/mira-history/`. Todos são Node puro; `conferir.mjs` e a medição de caixa do `ator.mjs` usam o Chrome da máquina com o puppeteer do projeto (opcional, mas sem eles você entrega às cegas).

## Entradas

- **A história**, em texto. Obrigatória.
- **Título**: o da história, ou pergunte. Mínimo 3 palavras para ser narrado (senão `capaSemVoz: true`).
- **Música**: liste o catálogo `templates/history/musicas/` (ou `mira-templates/history/musicas/`) e pergunte qual; o autor também pode apontar um mp3. Sem resposta, use a primeira do catálogo. A skill não gera música.
- **Voz**: padrão `pt-BR-ThalitaMultilingualNeural`, 12% mais lenta e tom -4Hz (suave, de conto). Outras vozes pt-BR do edge-tts: `pt-BR-AntonioNeural` (masculina), `pt-BR-FranciscaNeural`.

## Passo 1, criar o deck

```
node <skill>/scripts/novo.mjs <slug> --titulo "<Título>" --musica <nome-do-mp3-do-catálogo>
```

Cria `decks/AAAA-MM-DD <slug>/` com toda a árvore (`references/`, `assets/atores`, `assets/narracao`, `assets/vendor`, `mira/`), o runtime, os módulos E e P, fonte, QR, launchers `abrir-no-celular.bat` e `.command`, a música e uma cópia do catálogo de atores em `references/assets/catalogo/`. Imprime a lista de músicas e de atores do catálogo. **Nada é criado à mão.**

## Passo 2, o roteiro

Escreva `references/history-roteiro.md` no formato do gabarito. Quebre a história em **8 a 14 cenas** (teto 16), cada uma com: id, lugar, corte ou não, emoção, paleta e clima, câmera, ação principal, quem entra e sai, 1 ou 2 frases de legenda.

Regras de ritmo, que o `validar.mjs` cobra como aviso:

- Primeira cena `capa` (um cartaz da história: o protagonista no lugar mais bonito, título, e os botões "Começar a história" e "Tocar tudo sozinho"). Última com `fim: true`.
- **A cada 2 ou 3 cenas, um corte por dissolve para um close.** Plano aberto o tempo todo é o defeito número 1 (foi o que fez a primeira versão do deck de referência ser rejeitada).
- Pelo menos **3 paletas de céu** ao longo da história. A cor conta a emoção.
- Momento de medo, trovão ou susto tem `raio`, `tremor` ou `tensao`.
- Troca de lugar (quintal, caminho, lago) coincide com corte.
- **Legendas:** frases curtas, fiéis ao texto original (é a fala do narrador), nenhuma com menos de 3 palavras, no máximo 2 por cena. O texto da história é a narração; não invente diálogo.

## Passo 3, os atores

Regra herdada do `/mira-asset-scout`: **animal, pessoa, veículo e objeto detalhado nunca são desenhados à mão.** Vêm de SVG.

1. **Catálogo primeiro.** `novo.mjs` listou os atores do catálogo (patinho, patinho-cinza, pata, cisne, galinha, gato, ganso, arvore, pinheiro-neve, taboa, e o que for acrescentado). Para cada um que a história usa:
   ```
   node <skill>/scripts/ator.mjs "<deck>" catalogo <nome>
   ```
2. **Não está no catálogo: busque na web, licença aberta.** Fontes, nesta ordem: Openclipart (tudo CC0; a busca é `https://openclipart.org/search/?query=<termo>` e o download é `https://openclipart.org/download/<id>/x.svg`), unDraw, Open Peeps, Wikimedia Commons (confira a licença item a item). Prefira desenho de lado (perfil), estilo cartoon limpo, poucos caminhos (arquivo até ~60 KB). Baixe para uma pasta temporária e instale:
   ```
   node <skill>/scripts/ator.mjs "<deck>" add <nome> <arquivo.svg> --de <url> --autor "<autor>" --licenca CC0
   ```
   O script normaliza (remove metadados, prefixa ids, mede a caixa visível), guarda o original em `references/assets/`, o normalizado em `assets/atores/`, anota `references/CREDITS.md` e regrava `mira/atores.js`.
3. **Variantes por recoloração.** Um patinho cinza é o patinho amarelo recolorido: `--cor "#ddc177=#9aa2ab"` (repita `--cor` por cor). Liste as cores do SVG com `grep -o 'fill:#[0-9a-f]*' arquivo.svg | sort | uniq -c`. Silhueta sem cor declarada ganha cor com `--fill "#4E7A3A"`.
4. **Sem web nesta sessão ou não achou:** diga isso em uma linha e ofereça: (a) o autor manda o SVG; (b) troca por um ator do catálogo parecido (um ganso no lugar de um pato); (c) a cena passa a ser contada sem esse personagem em tela. Sem resposta, siga pela (b). Nunca desenhe o animal.
5. Ovos são procedurais: `{ tipo: 'ovo' }`. Sol, lua, nuvens, chuva, neve, névoa, colinas, água, celeiro, cerca, juncos: o runtime desenha.

## Passo 4, escrever `mira/historia.js`

Copie o `references/exemplo-historia.js` e adapte: atores, lugares, cenas. Só o vocabulário do `vocabulario.md`. Tempos em segundos. O que mais dá errado, e como evitar:

- **Reposicionar um ator no começo de uma cena sem corte.** O mundo é contínuo: quem já está em cena continua onde parou. Use `mover`, não `mostrar` de novo.
- **Esquecer de mostrar quem entra num lugar novo.** Mudar de `lugar` esconde todo mundo; quem aparece precisa de `mostrar` (com `dur: 0.01` se já deve estar lá no primeiro quadro).
- **Legenda de 1 ou 2 palavras.** A voz troca de idioma. Mínimo 3.
- **Duas ações disputando o mesmo ator ao mesmo tempo** (dois `mover` sobrepostos). Encadeie: `ate` de uma é o `de` da próxima.
- **Câmera `close` sem alvo.** Close mira um ator: `alvo: 'feio'`.
- **Ator que aparece de pé na água.** Na água use a linha `agua.*` e `modo: 'nadar'` ou `'boiar'`; o runtime desenha o reflexo.
- **Cena muito longa sem nada acontecendo.** Se a fala dura 8 s, dê 8 s de ação (andar, olhar, tremer, câmera aproximando).
- **Clima que não vai embora.** `ambiente` só mexe nos canais citados: ao sair da tempestade escreva `chuva: 0, nuvens: 0.2, frio: 0`; ao sair do inverno, `neve: 0, gelo: 0`.

## Passo 5, validar, narrar, conferir (obrigatório, nesta ordem)

```
node <skill>/scripts/validar.mjs "<deck>"      # erros bloqueiam; avisos são revisão
node <skill>/scripts/narrar.mjs "<deck>"       # gera 1 mp3 por frase e mede a duração
node <skill>/scripts/conferir.mjs "<deck>"     # screenshots de cada cena em 3 instantes + folha.png
```

- `validar.mjs` rejeita campo desconhecido, ator inexistente, variante inexistente, ponto inválido, frase curta. Corrija até `OK`.
- `narrar.mjs` só regera o que mudou (cache por texto e voz). Sem ele, o runtime estima a duração pela contagem de palavras.
- `conferir.mjs` grava em `references/conferencia/` e monta `folha.png`. **Abra a folha e olhe** cada quadro: ator faltando, ator flutuando, texto em cima de rosto, câmera cortando o personagem, paleta parada. Corrija o `historia.js` e rode de novo. Com `--leve` simula celular. Com `--cena c3 --instantes 1s,4s` mira um problema.
- Toda mudança em legenda pede `narrar.mjs` de novo (os tempos dependem da voz).

Não entregue sem ter olhado a folha da versão final. O deck de referência levou 25 rodadas de ajuste com o autor; o mínimo que você faz é olhar o que gerou.

## Passo 6, entrega

Diga ao autor, em poucas linhas:

- O caminho do deck e que o `index.html` abre com duplo clique.
- Que `abrir-no-celular.bat` (ou `.command`) sobe o servidor na rede, abre o navegador e mostra o QR na capa; celular e tablet na mesma rede Wi-Fi leem o QR; tela cheia pelo botão (no iPhone o Safari não permite tela cheia).
- Na capa, "Começar a história" avança cena a cena (botão verde) e "Tocar tudo sozinho" conta a história inteira sem toque. As teclas: seta ou clique avança quando o botão fica verde; espaço pausa; A liga ou desliga o modo automático; M som; F tela cheia; R reinicia a cena; E edita; P pinta.
- Número de cenas, duração total (o `conferir.mjs` imprime), voz e música usadas.
- O que ficou de fora e por quê (ator não encontrado, cena simplificada).

## Portões de entrega

- [ ] Pasta criada por `novo.mjs`, com `references/`, `assets/atores`, `assets/narracao`, `mira/` e os launchers.
- [ ] `references/history-roteiro.md` escrito antes do `historia.js`.
- [ ] Todo ator concreto vem de SVG do catálogo ou da web com licença anotada em `references/CREDITS.md`; nenhum desenhado à mão.
- [ ] `historia.js` só com o vocabulário; `validar.mjs` em `OK`.
- [ ] Capa com título e QR; última cena com `fim: true`.
- [ ] Pelo menos 2 closes por dissolve, 3 paletas, 1 tremor ou raio onde há tensão.
- [ ] Narração gerada por `narrar.mjs`, nenhuma frase com menos de 3 palavras.
- [ ] `conferir.mjs` rodado na versão final, folha olhada, sem erro no console.
- [ ] Módulos E e P presentes em `mira/` e referenciados no `index.html` (o template já traz).
- [ ] Entrega com caminho, launcher do celular, teclas e duração.

## Limites conhecidos, diga na entrega

- **Sprites rígidos.** Os atores não têm braço, asa ou boca articulados: a expressão vem de variantes (outro SVG) e do movimento de corpo inteiro (tremer, balançar, pular). Um close mostra o desenho maior, não um rosto que muda.
- **Sem web, sem ator novo.** O catálogo cobre bicho de fazenda e lago; fora disso depende de busca ou do autor.
- **Áudio no celular** começa no botão Começar (política de autoplay). O iPhone ignora controle de volume da música, então o ducking na fala não acontece lá.
- **View Transitions** (dissolve) existe no Chrome, Edge e Safari 18+; nos outros o corte é um véu preto rápido.
- **A roda do mouse é ignorada**: a navegação é pelos botões, setas e deslizar.
