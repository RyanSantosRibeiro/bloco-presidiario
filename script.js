/* Bloco Presidiário · abertura da cela, confete, contagem e serpentina */
(() => {
  'use strict';

  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Confete ---------------- */
  const canvas = document.querySelector('.confete');
  const ctx = canvas.getContext('2d');
  const cores = ['#D91E2A', '#1D47B8', '#FFC21A', '#FFF4DE', '#000000', '#FFFFFF'];
  let pedacos = [];
  let rodando = false;

  function ajustarCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function novoPedaco(x, y, vx, vy) {
    return {
      x, y, vx, vy,
      g: 0.12 + Math.random() * 0.08,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      giro: Math.random() * Math.PI,
      vg: 0.08 + Math.random() * 0.12,
      cor: cores[(Math.random() * cores.length) | 0],
      redondo: Math.random() < 0.25,
      vida: 0,
    };
  }

  function iniciar() {
    if (!rodando) { rodando = true; requestAnimationFrame(quadro); }
  }

  // chuva por toda a largura: usada quando a cela abre
  function chuvaDeConfete(quantidade = 220) {
    if (semMovimento) return;
    ajustarCanvas();
    for (let n = 0; n < quantidade; n++) {
      pedacos.push(novoPedaco(
        Math.random() * innerWidth,
        -20 - Math.random() * innerHeight * 0.5,
        (Math.random() - 0.5) * 3,
        2 + Math.random() * 3
      ));
    }
    iniciar();
  }

  // estouro em leque a partir de um ponto: usado pelo botão
  function estouroDeConfete(x, y, quantidade = 150) {
    if (semMovimento) return;
    ajustarCanvas();
    for (let n = 0; n < quantidade; n++) {
      const angulo = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      const forca = 6 + Math.random() * 10;
      pedacos.push(novoPedaco(x, y, Math.cos(angulo) * forca, Math.sin(angulo) * forca));
    }
    iniciar();
  }

  function quadro() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    pedacos = pedacos.filter(p => p.y < innerHeight + 40 && p.vida < 700);
    for (const p of pedacos) {
      p.vida++;
      p.vx *= 0.985;
      p.vy = Math.min(p.vy + p.g, 5.5);
      p.x += p.vx + Math.sin(p.giro) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;
      p.giro += p.vg;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.giro)); // vira como papel no ar
      ctx.fillStyle = p.cor;
      if (p.redondo) {
        ctx.beginPath(); ctx.arc(0, 0, p.w / 2.4, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        if (p.cor === '#FFFFFF' || p.cor === '#FFF4DE') {
          ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1;
          ctx.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
      }
      ctx.restore();
    }
    if (pedacos.length) requestAnimationFrame(quadro);
    else { rodando = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }

  addEventListener('resize', () => { if (rodando) ajustarCanvas(); });

  document.querySelectorAll('[data-soltar-confete]').forEach(botao => {
    botao.addEventListener('click', () => {
      const r = botao.getBoundingClientRect();
      estouroDeConfete(r.left + r.width / 2, r.top);
    });
  });

  /* ---------------- A cela abre ---------------- */
  const cela = document.querySelector('.cela');
  const celaJaAbriu = document.documentElement.classList.contains('cela-ja-abriu');

  if (cela && !celaJaAbriu && !semMovimento) {
    let aberta = false;
    const abrir = () => {
      if (aberta) return;
      aberta = true;
      cela.classList.add('acabou');
      try { sessionStorage.setItem('cela-aberta', '1'); } catch (e) {}
    };
    // as barras do meio são as últimas a sair
    cela.querySelectorAll('span')[6].addEventListener('animationend', abrir, { once: true });
    // garantia: se a animação não rodar, a cela some mesmo assim
    setTimeout(abrir, 2600);
    // o confete começa a cair enquanto as grades ainda estão saindo
    setTimeout(() => chuvaDeConfete(), 900);
  }

  /* ---------------- Contagem regressiva ---------------- */
  // Sábado de Carnaval 2027, meia-noite no horário de Brasília
  const alvo = new Date('2027-02-06T00:00:00-03:00').getTime();
  const fimDoCarnaval = new Date('2027-02-10T00:00:00-03:00').getTime();
  const contagens = [...document.querySelectorAll('[data-contagem]')];
  const doisDigitos = n => String(n).padStart(2, '0');

  function atualizar() {
    const agora = Date.now();
    let falta = Math.max(0, alvo - agora);
    const dias = Math.floor(falta / 864e5); falta -= dias * 864e5;
    const horas = Math.floor(falta / 36e5); falta -= horas * 36e5;
    const minutos = Math.floor(falta / 6e4); falta -= minutos * 6e4;
    const segundos = Math.floor(falta / 1e3);

    for (const c of contagens) {
      c.querySelector('[data-dias]').textContent = dias;
      c.querySelector('[data-horas]').textContent = doisDigitos(horas);
      c.querySelector('[data-minutos]').textContent = doisDigitos(minutos);
      c.querySelector('[data-segundos]').textContent = doisDigitos(segundos);
      if (agora >= alvo) {
        c.querySelector('.contagem__rotulo').textContent =
          agora < fimDoCarnaval ? 'É carnaval! O bloco tá na rua.' : 'O Carnaval 2027 passou. Até o próximo!';
        c.querySelector('.contagem__placas').hidden = true;
      }
    }
    if (agora < alvo) setTimeout(atualizar, 1000 - (agora % 1000));
  }
  if (contagens.length) atualizar();

  /* ---------------- Serpentina do trajeto ---------------- */
  const trajeto = document.querySelector('.trajeto');
  if (trajeto) {
    if (semMovimento || !('IntersectionObserver' in window)) {
      trajeto.classList.add('desenhado');
    } else {
      const obs = new IntersectionObserver(entradas => {
        if (entradas.some(e => e.isIntersecting)) { trajeto.classList.add('desenhado'); obs.disconnect(); }
      }, { threshold: 0.35 });
      obs.observe(trajeto);
    }
  }
})();
