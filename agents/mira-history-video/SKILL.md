---
name: mira-history-video
description: >-
  Grava a história animada de um deck do /mira-history num único .mp4 com narração e
  música, sem nenhum controle na tela e na cadência da própria história (cada cena dura
  o que a ação e a fala pedem, com um respiro entre elas e o mesmo dissolve dos closes).
  Determinístico: dirige o relógio do runtime quadro a quadro em Chrome headless e monta
  o áudio no ffmpeg a partir dos instantes exatos de cada frase. Use SEMPRE que o usuário
  disser /mira-history-video, "vídeo da história", "exporta a história em mp4", "manda a
  animação para vídeo", "gera o vídeo do conto", "história em vídeo para o YouTube", ou
  pedir um arquivo de vídeo de um deck feito pelo /mira-history. NÃO é para slide avulso
  ou deck comum, que é do /mira-slide-to-video.
---

# Skill: /mira-history-video, a história em um .mp4

Recebe a pasta de um deck do `/mira-history` e entrega um `.mp4` da história inteira: cenas na ordem, cada uma com a duração calculada pelo runtime (ações + narração), respiro curto entre cenas, dissolve nos cortes, legendas de conto na tela, narração de cada frase no instante em que a legenda entra, música em loop baixando enquanto a voz fala. Nada de botão, barra, QR ou "Começar" no quadro.

## REGRA DE IDIOMA

Siga `agents/_shared/idioma.md`. Sem travessão.

## Como funciona (para explicar ao autor, se perguntar)

Não grava em tempo real. Abre o `index.html?video=1` (o runtime esconde todo controle e cala o áudio), leva cada cena para a tela e **dirige o relógio quadro a quadro**: para cada quadro chama `__miraVideo.quadro(cena, ms)` e tira um screenshot. Codifica cada cena, emenda com corte seco (plano-sequência) ou `xfade` (corte por dissolve), e monta o áudio no ffmpeg: cada mp3 de `assets/narracao/` entra com `adelay` no instante absoluto da legenda, e a música entra em loop com volume reduzido a 28% nos intervalos de fala, fade-in e fade-out. A continuidade entre cenas é a mesma da apresentação, porque a cena seguinte nasce da pose viva da anterior.

## Pré-requisitos

- Deck gerado pelo `/mira-history` com `mira/mira-history.js` atualizado (o runtime precisa expor `window.__miraVideo`; decks antigos: copie o `mira-history.js` novo de `templates/authoring/` ou `mira-templates/authoring/`).
- Narração já gerada (`narrar.mjs` rodado; `assets/narracao/*.mp3` e `mira/narracao.js`). Sem ela o vídeo sai mudo nas falas e as durações são estimadas.
- Chrome instalado, puppeteer no projeto ou no pacote do Mira, `ffmpeg` no PATH (ou `MIRA_FFMPEG`).

## Passos

1. **Confirmar o deck** (caminho existe, é do `/mira-history`). Se o autor não disse qual, pergunte.
2. **Rodar:**
   ```
   node <skill>/scripts/video.mjs "<deck>" [--saida arquivo.mp4] [--fps 30] [--largura 1920] [--respiro 0.6] [--sem-musica] [--cenas c1,c2]
   ```
   Padrão: 1920x1080, 30 fps, `<deck>/<slug>.mp4`. Uma história de 2,5 minutos leva uns 8 a 12 minutos para renderizar (cerca de 4.500 screenshots). Para testar rápido: `--cenas capa,c1 --fps 12 --largura 960`.
3. **Conferir:** duração impressa, `ffprobe` (vídeo e áudio presentes), e olhe 2 ou 3 quadros com `ffmpeg -ss <s> -i video.mp4 -frames:v 1 q.png`: nenhum controle na tela, legenda legível, cena certa no instante certo.
4. **Reportar:** caminho do `.mp4`, duração, resolução, quantas frases narradas, música usada, e que o deck ficou intacto.

## Opções que o autor costuma pedir

- **Sem música:** `--sem-musica`.
- **Mais respiro entre cenas** (para leitura): `--respiro 1.2`.
- **Vertical ou quadrado:** não; a história é 16:9. Para Reels, recorte na edição ou peça um deck vertical.
- **Só um trecho:** `--cenas c3,c4,c5` (os cortes entre elas continuam com dissolve).
- **Arquivo menor:** `--qualidade 23` (CRF maior, menor arquivo) ou `--largura 1280`.

## Portões de entrega

- [ ] `.mp4` com vídeo e áudio (`ffprobe` mostra os dois).
- [ ] Nenhum controle, QR ou botão em quadro nenhum.
- [ ] Duração igual à soma das cenas + respiros, descontados os dissolves; nenhuma frase cortada no fim de cena.
- [ ] Deck original intacto (o script só lê).
- [ ] Caminho, duração e resolução reportados.

## Limites conhecidos

- O tempo de render é proporcional à duração: quadro a quadro, não tempo real.
- O dissolve é feito no ffmpeg (`xfade`), igual em duração ao do deck, mas não usa View Transitions.
- Legendas em tela são as do deck; não há legenda embutida como faixa (SRT). Se o autor quiser SRT, os instantes estão no `manifest.json` da narração e no plano impresso pelo script.
