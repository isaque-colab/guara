/* ==========================================================================
   GUARÁ STUDIO — interações
   ========================================================================== */

(function () {
  'use strict';

  document.body.classList.add('js-ready');

  /* ----------------------------------------------------------------------
     Header com estado ao rolar
     ---------------------------------------------------------------------- */
  const header = document.getElementById('header');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------------------
     Menu mobile
     ---------------------------------------------------------------------- */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      header.classList.remove('menu-active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('menu-open');
    };

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      header.classList.toggle('menu-active', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', open);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) closeMenu();
    });
  }

  /* ----------------------------------------------------------------------
     Reveal ao entrar na viewport
     ---------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ----------------------------------------------------------------------
     Contadores animados
     ---------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.count');

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    const render = (value) => {
      el.textContent =
        value.toLocaleString('pt-BR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;
    };

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      render(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else render(target);
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent =
        el.dataset.target + (el.dataset.suffix || '');
    });
  }

  /* ----------------------------------------------------------------------
     FAQ — apenas um aberto por vez
     ---------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ----------------------------------------------------------------------
     Link ativo conforme a seção visível
     ---------------------------------------------------------------------- */
  const navLinks = Array.from(document.querySelectorAll('.nav > a[href^="#"]'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => activeObserver.observe(section));
  }

  /* ----------------------------------------------------------------------
     Leve inclinação do emblema com o mouse (apenas ponteiro fino)
     ---------------------------------------------------------------------- */
  const heroVisual = document.querySelector('.hero-visual');
  const emblem = heroVisual ? heroVisual.querySelector('.emblem') : null;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroVisual && emblem && finePointer && !reduceMotion) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      emblem.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      emblem.style.transform = '';
    });
  }

  /* ----------------------------------------------------------------------
     Ano no rodapé
     ---------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------------------
     Formulário → WhatsApp
     (troque o número abaixo pelo WhatsApp oficial do estúdio)
     ---------------------------------------------------------------------- */
  const WHATSAPP_NUMBER = '5592986412182';
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    const phoneInput = document.getElementById('whatsapp');

    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let digits = e.target.value.replace(/\D/g, '').slice(0, 11);

        if (digits.length > 6) {
          digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        } else if (digits.length > 2) {
          digits = digits.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (digits.length > 0) {
          digits = digits.replace(/^(\d{0,2})/, '($1');
        }

        e.target.value = digits;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const telefone = form.whatsapp.value.trim();
      const empresa = form.empresa.value.trim();
      const objetivo = form.objetivo.value;
      const mensagem = form.mensagem.value.trim();

      if (nome.length < 2) {
        status.textContent = 'Digite seu nome para continuarmos.';
        form.nome.focus();
        return;
      }

      if (telefone.replace(/\D/g, '').length < 10) {
        status.textContent = 'Informe um WhatsApp válido, com DDD.';
        form.whatsapp.focus();
        return;
      }

      if (!objetivo) {
        status.textContent = 'Escolha o que você busca para direcionar a conversa.';
        form.objetivo.focus();
        return;
      }

      const linhas = [
        'Olá, Guará Studio! Vim pelo site.',
        '',
        `*Nome:* ${nome}`,
        `*WhatsApp:* ${telefone}`,
        empresa ? `*Empresa:* ${empresa}` : null,
        `*Objetivo:* ${objetivo}`,
        mensagem ? `*Contexto:* ${mensagem}` : null,
      ].filter(Boolean);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(linhas.join('\n'))}`;

      status.textContent = 'Tudo certo! Abrindo o WhatsApp…';
      window.open(url, '_blank', 'noopener');

      form.reset();
      setTimeout(() => {
        status.textContent = 'Se o WhatsApp não abriu, chame no número do rodapé.';
      }, 4000);
    });
  }
})();
