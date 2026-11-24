# Bloco Presidiário · Cachoeiras de Macacu

Site do **Bloco Carnavalesco Presidiário**, de Cachoeiras de Macacu (RJ), desde 1975.
Sede: Clube Recreativo Piratas. Instagram: [@blocopresidiario](https://www.instagram.com/blocopresidiario/).

## O que tem no site

- **Abertura animada:** as listras do uniforme sobem e descem como grades se abrindo e soltam confete.
- **Contagem regressiva** para o Carnaval 2027 (sábado, 6 de fevereiro de 2027).
- **Ficha corrida:** a linha do tempo do bloco em placas de fichado (1975, 2023, 2025, 2026, 2027).
- **O Arrastão:** o trajeto do Clube Piratas ao Centro, com uma serpentina que se desenha.
- **Vista a listra:** o uniforme preto e branco e o abadá de 2026.
- **Carnaval 2027 em modo blackout:** agenda com datas "a confirmar" e botão para soltar confete.

Funciona no celular, tablet e computador, pelo teclado, e respeita quem desativa animações no sistema.

## Como abrir

É um site estático, sem build. Abra o `index.html` no navegador ou rode um servidor local:

```bash
npx http-server . -p 5173
```

## Como atualizar

- **Datas de 2027:** edite a lista `agenda__lista` em `index.html` quando o bloco anunciar.
- **Fotos:** ficam em `assets/fotos/`. Troque o arquivo mantendo o nome, ou adicione e aponte no `index.html`.
- **Cores e fontes:** estão no topo de `styles.css` e explicadas em [DESIGN.md](DESIGN.md).

## Colocar no ar (GitHub Pages)

Em *Settings → Pages*, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
O site fica em `https://<seu-usuario>.github.io/bloco-presidiario/`.

## Créditos

Fotos: acervo do bloco ([@blocopresidiario](https://www.instagram.com/blocopresidiario/)).
Fotos do Baile e da folia de 2026 por @uranosalvaya.
Informações do Arrastão: [Prefeitura de Cachoeiras de Macacu](https://www.prefeituracachoeiras.com/post/neste-s%C3%A1bado-11-tem-o-tradicional-arrast%C3%A3o-do-bloco-carnavalesco-presidi%C3%A1rio).
