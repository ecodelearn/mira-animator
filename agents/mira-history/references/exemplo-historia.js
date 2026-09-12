/* ==========================================================================
   O Patinho Feio · história animada do /mira-history
   Só dados. Quem anima é mira/mira-history.js. Vocabulário em
   agents/mira-history/references/vocabulario.md.

   Mundo: viewBox 960x540. Pontos nomeados: linha.coluna
     linhas   chao | agua | ar | alto | fundo
     colunas  foraEsquerda | esquerda | meioEsquerda | centro | meioDireita | direita | foraDireita
   Tempos em SEGUNDOS a partir do início da cena. A duração da cena é
   calculada: fim das ações ou fim da narração, o que vier depois.
   ========================================================================== */
window.MiraHistoria = {
    titulo: 'O Patinho Feio',
    voz: { nome: 'pt-BR-ThalitaMultilingualNeural', rate: '-12%', pitch: '-4Hz' },
    musica: 'assets/musica/quiet-storybook-night.mp3',

    /* ---- atores: sprites de assets/atores/<arquivo>.svg (altura em unidades do mundo) ---- */
    atores: {
        pata:     { arquivo: 'pata.svg', altura: 150, olha: 'direita' },
        patinho1: { arquivo: 'patinho.svg', altura: 72, olha: 'direita' },
        patinho2: { arquivo: 'patinho.svg', altura: 72, olha: 'direita' },
        patinho3: { arquivo: 'patinho.svg', altura: 72, olha: 'direita' },
        feio:     { arquivo: 'patinho-cinza.svg', altura: 90, olha: 'direita', variantes: { cisne: 'cisne.svg' } },
        ovo1: { tipo: 'ovo', tamanho: 46 },
        ovo2: { tipo: 'ovo', tamanho: 46 },
        ovo3: { tipo: 'ovo', tamanho: 46 },
        ovo4: { tipo: 'ovo', tamanho: 54, cor: '#EDE3D1' },
        galinha:  { arquivo: 'galinha.svg', altura: 130, olha: 'direita' },
        gato:     { arquivo: 'gato.svg', altura: 110, olha: 'esquerda' },
        ganso:    { arquivo: 'ganso.svg', altura: 150, olha: 'direita' },
        cisne1:   { arquivo: 'cisne.svg', altura: 120, olha: 'esquerda' },
        cisne2:   { arquivo: 'cisne.svg', altura: 110, olha: 'esquerda' },
        arvore:   { arquivo: 'arvore.svg', altura: 300 },
        pinheiro: { arquivo: 'pinheiro-neve.svg', altura: 330 },
        taboa:    { arquivo: 'taboa.svg', altura: 120 }
    },

    /* ---- lugares: cenário de preset + decoração fixa ---- */
    lugares: {
        quintal: { cenario: 'fazenda', decoracao: [
            { ator: 'arvore', em: 'fundo.esquerda', escala: 1.1, plano: 'fundo', dx: -60 }
        ] },
        caminho: { cenario: 'campo', decoracao: [
            { ator: 'arvore', em: 'fundo.foraEsquerda', escala: 1.2, plano: 'fundo', dx: 60 },
            { ator: 'arvore', em: 'fundo.meioDireita', escala: 0.9, plano: 'fundo', dx: 40 },
            { ator: 'arvore', em: 'fundo.foraDireita', escala: 1.3, plano: 'fundo' }
        ] },
        bosque: { cenario: 'bosque', decoracao: [
            { ator: 'arvore', em: 'chao.foraEsquerda', escala: 1.5, plano: 'frente', dx: 40 }
        ] },
        lagoInverno: { cenario: 'lago', decoracao: [
            { ator: 'pinheiro', em: 'fundo.esquerda', escala: 1, plano: 'fundo', dx: -40 },
            { ator: 'pinheiro', em: 'fundo.meioEsquerda', escala: 0.75, plano: 'fundo', dx: -20 },
            { ator: 'pinheiro', em: 'fundo.direita', escala: 0.9, plano: 'fundo', dx: 80 },
            { ator: 'taboa', em: 'chao.foraDireita', escala: 1, dx: -80, dy: 6 }
        ] },
        lago: { cenario: 'lago', decoracao: [
            { ator: 'arvore', em: 'fundo.esquerda', escala: 0.9, plano: 'fundo', dx: -60 },
            { ator: 'arvore', em: 'fundo.direita', escala: 1.0, plano: 'fundo', dx: 90 },
            { ator: 'taboa', em: 'chao.foraDireita', escala: 1, dx: -80, dy: 6 },
            { ator: 'taboa', em: 'chao.foraEsquerda', escala: 0.8, dx: 60, dy: 6, virado: 'esquerda' }
        ] }
    },

    /* ---- cenas, em ordem. A cena N nasce do fim da cena N-1. ---- */
    cenas: [
        {
            id: 'capa', capa: true, lugar: 'lago',
            ambiente: { ceu: 'primavera', sol: 0.8, particulas: 0.6, nuvens: 0.15, ondas: 0.6 },
            camera: { plano: 'medio', alvo: 'feio', movimento: 'aproximar', dy: -10, de: 0, ate: 7 },
            acoes: [
                { acao: 'mostrar', ator: 'feio', em: 'agua.centro', variante: 'cisne', escala: 1.5, modo: 'boiar', virado: 'esquerda' },
                { acao: 'mostrar', ator: 'cisne1', em: 'agua.esquerda', modo: 'boiar', dx: -30, dy: 10 },
                { acao: 'mostrar', ator: 'cisne2', em: 'agua.direita', modo: 'boiar', dx: 60, dy: 12 }
            ]
        },
        {
            id: 'c1', lugar: 'quintal',
            ambiente: { ceu: 'dia', sol: 0.7, nuvens: 0.3, particulas: 0.2 },
            camera: { plano: 'aberto', movimento: 'fixo', de: 0 },
            acoes: [
                { acao: 'mostrar', ator: 'pata', em: 'chao.meioEsquerda', dx: -40, de: 0.2 },
                { acao: 'mostrar', ator: 'ovo1', em: 'chao.centro', dx: -20, de: 0.4 },
                { acao: 'mostrar', ator: 'ovo2', em: 'chao.centro', dx: 40, dy: 8, de: 0.5 },
                { acao: 'mostrar', ator: 'ovo3', em: 'chao.centro', dx: 100, dy: 4, de: 0.6 },
                { acao: 'mostrar', ator: 'ovo4', em: 'chao.meioDireita', dx: 60, dy: 10, de: 0.7 },
                { acao: 'camera', plano: 'medio', alvo: 'ovo2', movimento: 'aproximar', dy: -30, de: 2.5, ate: 7 },
                { acao: 'balancar', ator: 'pata', forca: 0.3, de: 1, ate: 6 }
            ],
            legendas: ['Era uma vez uma pata que esperava ansiosamente pelo nascimento de seus filhotes.']
        },
        {
            id: 'c2', lugar: 'quintal',
            acoes: [
                { acao: 'tremer', ator: 'ovo1', forca: 0.8, de: 0.5, ate: 2.0 },
                { acao: 'estado', ator: 'ovo1', valor: 'rachado', de: 1.4 },
                { acao: 'estado', ator: 'ovo1', valor: 'aberto', de: 2.2 },
                { acao: 'mostrar', ator: 'patinho1', em: 'ovo1', escala: 0.4, de: 2.2 },
                { acao: 'escala', ator: 'patinho1', valor: 1, de: 2.3, ate: 3.2 },
                { acao: 'pular', ator: 'patinho1', vezes: 2, de: 3.2, ate: 4.4 },

                { acao: 'tremer', ator: 'ovo2', forca: 0.8, de: 2.6, ate: 4.0 },
                { acao: 'estado', ator: 'ovo2', valor: 'rachado', de: 3.4 },
                { acao: 'estado', ator: 'ovo2', valor: 'aberto', de: 4.2 },
                { acao: 'mostrar', ator: 'patinho2', em: 'ovo2', escala: 0.4, de: 4.2 },
                { acao: 'escala', ator: 'patinho2', valor: 1, de: 4.3, ate: 5.2 },
                { acao: 'pular', ator: 'patinho2', vezes: 2, de: 5.2, ate: 6.4 },

                { acao: 'tremer', ator: 'ovo3', forca: 0.8, de: 4.6, ate: 6.0 },
                { acao: 'estado', ator: 'ovo3', valor: 'rachado', de: 5.4 },
                { acao: 'estado', ator: 'ovo3', valor: 'aberto', de: 6.2 },
                { acao: 'mostrar', ator: 'patinho3', em: 'ovo3', escala: 0.4, de: 6.2 },
                { acao: 'escala', ator: 'patinho3', valor: 1, de: 6.3, ate: 7.2 },
                { acao: 'pular', ator: 'patinho3', vezes: 2, de: 7.2, ate: 8.4 },
                { acao: 'pular', ator: 'pata', vezes: 1, altura: 14, de: 7.4, ate: 8.2 },
                { acao: 'ambiente', particulas: 0.7, de: 2, ate: 5 }
            ],
            legendas: ['Um a um, os ovos começaram a se abrir, revelando lindos patinhos amarelos.']
        },
        {
            id: 'c3', lugar: 'quintal', corte: 'dissolve',
            camera: { plano: 'close', alvo: 'ovo4', dy: 10, movimento: 'fixo', de: 0 },
            acoes: [
                { acao: 'tremer', ator: 'ovo4', forca: 0.5, de: 1.0, ate: 2.4 },
                { acao: 'tremer', ator: 'ovo4', forca: 1.2, de: 3.6, ate: 5.2 },
                { acao: 'estado', ator: 'ovo4', valor: 'rachado', de: 4.8 },
                { acao: 'tensao', forca: 0.5, de: 3.4, ate: 5.4 }
            ],
            legendas: ['Porém, o último ovo demorou mais para quebrar.']
        },
        {
            id: 'c4', lugar: 'quintal',
            camera: { plano: 'medio', alvo: 'ovo4', dy: -20, movimento: 'afastar', de: 0.5, ate: 4 },
            acoes: [
                { acao: 'tremer', ator: 'ovo4', forca: 1.5, de: 0.2, ate: 1.4 },
                { acao: 'estado', ator: 'ovo4', valor: 'aberto', de: 1.4 },
                { acao: 'tremor', forca: 0.4, de: 1.4 },
                { acao: 'mostrar', ator: 'feio', em: 'ovo4', escala: 0.4, de: 1.4 },
                { acao: 'escala', ator: 'feio', valor: 1.15, de: 1.5, ate: 3.0 },
                { acao: 'balancar', ator: 'feio', forca: 1, de: 3.0, ate: 5.5 },
                { acao: 'pular', ator: 'feio', vezes: 1, altura: 18, de: 5.6, ate: 6.6 }
            ],
            legendas: ['Quando finalmente se abriu, dele saiu um filhote diferente dos demais.', 'Era maior, desajeitado e tinha penas acinzentadas.']
        },
        {
            id: 'c5', lugar: 'quintal',
            camera: { plano: 'aberto', movimento: 'afastar', de: 0, ate: 3 },
            ambiente: { ceu: 'tarde', sol: 0.5, particulas: 0, de: 0, ate: 6 },
            acoes: [
                { acao: 'mostrar', ator: 'galinha', em: 'chao.foraEsquerda', de: 0.5 },
                { acao: 'mover', ator: 'galinha', para: 'chao.esquerda', modo: 'andar', de: 0.5, ate: 3.5, dx: -40, dy: 14 },
                { acao: 'balancar', ator: 'galinha', forca: 1, de: 4, ate: 7 },
                { acao: 'mover', ator: 'patinho1', para: 'chao.direita', modo: 'andar', de: 5, ate: 8, dx: 20, dy: 16 },
                { acao: 'mover', ator: 'patinho2', para: 'chao.direita', modo: 'andar', de: 5.4, ate: 8.4, dx: 80, dy: 10 },
                { acao: 'mover', ator: 'patinho3', para: 'chao.foraDireita', modo: 'andar', de: 5.8, ate: 9, dx: -80, dy: 18 },
                { acao: 'pular', ator: 'patinho1', vezes: 2, de: 8.2, ate: 9.6 },
                { acao: 'pular', ator: 'patinho2', vezes: 2, de: 8.6, ate: 10 },
                { acao: 'tremer', ator: 'feio', forca: 0.6, de: 6, ate: 11 },
                { acao: 'virar', ator: 'feio', para: 'esquerda', de: 8.5 }
            ],
            legendas: ['Os outros animais começaram a chamá-lo de Patinho Feio.', 'Seus irmãos não queriam brincar com ele e zombavam de sua aparência.']
        },
        {
            id: 'c6', lugar: 'quintal', corte: 'dissolve',
            camera: { plano: 'close', alvo: 'feio', movimento: 'fixo', de: 0 },
            ambiente: { ceu: 'porDoSol', sol: 0.35, frio: 0.15, de: 0, ate: 5 },
            acoes: [
                { acao: 'tremer', ator: 'feio', forca: 0.3, de: 0, ate: 4 },
                { acao: 'virar', ator: 'feio', para: 'direita', de: 4.5 },
                { acao: 'camera', plano: 'medio', alvo: 'feio', movimento: 'acompanhar', dy: -20, de: 4.5, ate: 6 },
                { acao: 'mover', ator: 'feio', para: 'chao.foraDireita', modo: 'andar', de: 5.5, ate: 10, dx: 80 }
            ],
            legendas: ['Muito triste, o patinho decidiu deixar o lugar onde vivia e procurar um novo lar.']
        },
        {
            id: 'c7', lugar: 'caminho', corte: 'dissolve',
            ambiente: { ceu: 'anoitecer', chuva: 0.55, vento: 0.5, nuvens: 0.7, frio: 0.35, sol: 0, de: 0, ate: 4 },
            camera: { plano: 'medio', alvo: 'feio', movimento: 'acompanhar', dy: -30, de: 0, ate: 2 },
            acoes: [
                { acao: 'mostrar', ator: 'feio', em: 'chao.foraEsquerda', de: 0, dur: 0.01 },
                { acao: 'mover', ator: 'feio', para: 'chao.meioEsquerda', modo: 'andar', de: 0.3, ate: 5 },
                { acao: 'mostrar', ator: 'gato', em: 'chao.meioDireita', dx: 40, de: 3 },
                { acao: 'balancar', ator: 'gato', forca: 0.8, de: 5, ate: 8 },
                { acao: 'tremer', ator: 'feio', forca: 0.7, de: 5, ate: 9 },
                { acao: 'mover', ator: 'gato', para: 'chao.foraDireita', modo: 'correr', de: 8.5, ate: 11 }
            ],
            legendas: ['Durante sua viagem, enfrentou muitos desafios.', 'Passou frio, sentiu fome e encontrou animais que também o rejeitaram.']
        },
        {
            id: 'c8', lugar: 'caminho',
            ambiente: { ceu: 'tempestade', chuva: 0.9, vento: 0.8, nuvens: 1, frio: 0.5, de: 0, ate: 3 },
            acoes: [
                { acao: 'raio', forca: 1, de: 1.2 },
                { acao: 'tensao', forca: 0.7, de: 1.2, ate: 5 },
                { acao: 'tremer', ator: 'feio', forca: 1, de: 1.2, ate: 3.5 },
                { acao: 'raio', forca: 0.7, de: 4.0 },
                { acao: 'camera', plano: 'aberto', movimento: 'fixo', de: 5, ate: 8 },
                { acao: 'mover', ator: 'feio', para: 'chao.foraDireita', modo: 'andar', de: 5.5, ate: 12, dx: 100 },
                { acao: 'ambiente', chuva: 0.5, vento: 0.4, de: 8, ate: 12 }
            ],
            legendas: ['Mesmo assim, continuou caminhando, acreditando que um dia encontraria um lugar onde fosse aceito.']
        },
        {
            id: 'c9', lugar: 'lagoInverno', corte: 'dissolve',
            ambiente: { ceu: 'inverno', chuva: 0, neve: 0.85, gelo: 1, vento: 0.45, nuvens: 0.6, frio: 0.55, estrelas: 0, de: 0, dur: 0.01 },
            camera: { plano: 'aberto', movimento: 'fixo', de: 0 },
            acoes: [
                { acao: 'mostrar', ator: 'feio', em: 'chao.foraEsquerda', de: 0, dur: 0.01 },
                { acao: 'mover', ator: 'feio', para: 'chao.meioEsquerda', modo: 'andar', de: 0.5, ate: 5, dx: -30 },
                { acao: 'tremer', ator: 'feio', forca: 0.9, de: 5, ate: 10 },
                { acao: 'camera', plano: 'medio', alvo: 'feio', movimento: 'aproximar', dy: -30, de: 5, ate: 9 }
            ],
            legendas: ['O inverno chegou, e o pequeno animal precisou ser muito corajoso para sobreviver.']
        },
        {
            id: 'c10', lugar: 'lagoInverno',
            ambiente: { ceu: 'primavera', neve: 0, gelo: 0, vento: 0.15, nuvens: 0.2, frio: 0, sol: 0.75, particulas: 0.5, de: 0.5, ate: 6 },
            camera: { plano: 'aberto', movimento: 'afastar', de: 0.5, ate: 5 },
            acoes: [
                { acao: 'escala', ator: 'feio', valor: 1.35, de: 0.5, ate: 6 },
                { acao: 'mostrar', ator: 'cisne1', em: 'agua.foraDireita', modo: 'nadar', dy: 6, de: 3 },
                { acao: 'mostrar', ator: 'cisne2', em: 'agua.foraDireita', modo: 'nadar', dx: 90, dy: 14, de: 3.5 },
                { acao: 'mover', ator: 'cisne1', para: 'agua.meioDireita', modo: 'nadar', de: 3, ate: 9, dy: 6 },
                { acao: 'mover', ator: 'cisne2', para: 'agua.direita', modo: 'nadar', de: 3.5, ate: 9.5, dx: 60, dy: 14 },
                { acao: 'virar', ator: 'feio', para: 'direita', de: 6 }
            ],
            legendas: ['Quando a primavera finalmente apareceu, ele viu um grupo de belos cisnes nadando em um lago.']
        },
        {
            id: 'c11', lugar: 'lagoInverno',
            camera: { plano: 'medio', alvo: 'feio', movimento: 'acompanhar', dy: -20, de: 0, ate: 3 },
            acoes: [
                { acao: 'mover', ator: 'feio', para: 'agua.centro', modo: 'nadar', de: 1, ate: 7, dx: -40, dy: 6 },
                { acao: 'tremer', ator: 'feio', forca: 0.35, de: 1, ate: 7 }
            ],
            legendas: ['Encantado, aproximou-se deles, embora tivesse medo de ser rejeitado novamente.']
        },
        {
            id: 'c12', lugar: 'lagoInverno', corte: 'dissolve',
            camera: { plano: 'close', alvo: 'feio', dy: 40, movimento: 'fixo', de: 0 },
            ambiente: { particulas: 1, ondas: 0.2, de: 0, ate: 4 },
            acoes: [
                { acao: 'balancar', ator: 'feio', forca: 0.4, de: 0.5, ate: 3 },
                { acao: 'clarao', forca: 0.5, de: 4.5 },
                { acao: 'trocar', ator: 'feio', variante: 'cisne', escala: 1.5, de: 4.5, ate: 7.5 },
                { acao: 'camera', plano: 'medio', alvo: 'feio', movimento: 'afastar', dy: -10, de: 6, ate: 10 },
                { acao: 'ambiente', quente: 0.2, de: 6, ate: 10 }
            ],
            legendas: ['Ao olhar para a água, viu seu próprio reflexo e ficou surpreso.', 'Já não era mais um patinho cinzento e desajeitado. Havia se transformado em um magnífico cisne branco.']
        },
        {
            id: 'c13', lugar: 'lagoInverno',
            camera: { plano: 'aberto', movimento: 'afastar', de: 0, ate: 4 },
            acoes: [
                { acao: 'mover', ator: 'cisne1', para: 'feio', modo: 'nadar', de: 1, ate: 6, dx: 150, dy: 8 },
                { acao: 'mover', ator: 'cisne2', para: 'feio', modo: 'nadar', de: 1.5, ate: 7, dx: 260, dy: 16 },
                { acao: 'pular', ator: 'feio', vezes: 2, altura: 16, de: 6.5, ate: 8 },
                { acao: 'ambiente', particulas: 0.9, quente: 0.25, de: 5, ate: 9 }
            ],
            legendas: ['Os outros cisnes o receberam com carinho.', 'Pela primeira vez, ele sentiu que pertencia a algum lugar.']
        },
        {
            id: 'c14', lugar: 'lagoInverno', fim: true,
            camera: { plano: 'medio', alvo: 'feio', movimento: 'aproximar', dy: -10, de: 0, ate: 6 },
            ambiente: { ceu: 'tarde', sol: 0.6, quente: 0.3, particulas: 0.7, de: 0, ate: 8 },
            acoes: [
                { acao: 'balancar', ator: 'feio', forca: 0.3, de: 1, ate: 8 }
            ],
            legendas: ['O Patinho Feio compreendeu, então, que nunca havia sido feio.', 'Ele apenas era diferente e ainda não tinha descoberto quem realmente era.']
        }
    ]
};
