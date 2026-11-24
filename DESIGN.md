# DESIGN.md — Bloco Carnavalesco Presidiário

Site do bloco de Cachoeiras de Macacu (RJ), desde 1975. A direção nasce da
própria identidade que o bloco usa no Instagram: papel creme, vermelho forte,
xadrez azul, listras preto e branco do uniforme de presidiário e letras
altas e condensadas. Não foi comparada com sites da UXKIN (não conectada).

**Ideia central:** a cela abre e o bloco sai. As listras/grades do uniforme
viram o motivo visual principal: no topo elas se abrem e revelam o carnaval.

## Cor

| Token | Valor | Papel |
|---|---|---|
| `--papel` | `#FFF4DE` | fundo das seções claras |
| `--tinta` | `#1D1A17` | texto principal sobre papel (contraste 15:1) |
| `--listra` | `#000000` | listras, grades, placas de "ficha" |
| `--vermelho` | `#D91E2A` | cor do bloco: botões, links, fundo do topo |
| `--vermelho-escuro` | `#A3121C` | hover de botões, texto vermelho pequeno (7:1 no papel) |
| `--azul` | `#1D47B8` | xadrez, detalhes, foco do teclado (7.6:1 no papel) |
| `--sol` | `#FFC21A` | acento único: confete, destaques no escuro |

Texto sobre `--vermelho` sempre em `--papel` (4.9:1). Amarelo nunca é texto
sobre papel. Seção "blackout" usa `--listra` de fundo com `--papel` e `--sol`.
Sem gradientes decorativos.

## Tipografia

- **Display: Big Shoulders Display** (800/900). Letras altas e estreitas
  que lembram grades. Usada grande, em caixa alta, só em títulos e números.
- **Texto: Figtree** (400/600/800). Redonda e alegre, boa leitura.

Escala (rem): 0.875 · 1 · 1.25 · 1.6 · 2.4 · 3.6 · 6 · clamp(5rem, 19vw, 17rem)
para a marca. Texto corrido 1.0625rem, altura de linha 1.6, linhas até 62ch.
Títulos com altura de linha 0.9 e espaçamento -0.01em.

## Espaço

Escala de 8px: 4, 8, 16, 24, 32, 48, 64, 96, 128. Seções com 96–128px
no desktop e 64px no celular. Largura do conteúdo 1180px; texto 62ch.

## Forma e profundidade

- Raio: 0 nas placas e faixas (são impressas), 999px nos botões (como
  fita de abadá), 6px em campos pequenos.
- Sombra: uma só, dura e deslocada, `6px 6px 0 var(--listra)`, para
  botões e placas. Nada de sombra borrada.

## Componentes

- **Botão principal:** pílula vermelha, texto papel, sombra dura; hover
  desloca 2px e encurta a sombra; foco com anel azul de 3px.
- **Botão secundário:** pílula com borda preta de 2px sobre papel.
- **Placa de ficha:** retângulo preto com texto branco em Big Shoulders,
  como a placa de foto de ficha policial; usada na linha do tempo.
- **Faixa letreiro:** tira listrada com texto correndo (pausa com
  movimento reduzido).
- **Navegação:** barra fina sobre o topo, links em Figtree 600.
- **Rodapé:** fundo preto, listras finas na borda superior.

## Imagens e ícones

- Ilustrações em SVG feitas para o site: grades, confete, serpentina,
  bandeira vermelha, xadrez. Sem emoji como ícone.
- Fotos reais do bloco entram em `assets/fotos/` quando houver; o layout
  funciona sem elas.

## Movimento

Um momento orquestrado: ao abrir a página as grades sobem e descem e
soltam confete. O resto só responde ao visitante (botão de confete,
serpentina que se desenha ao chegar no trajeto). Com
`prefers-reduced-motion` tudo aparece parado.
