/* Qapitol — Dark/Light Mode + Security Badges + Urgency Signals + CSS Animations */
(function () {
  'use strict';

  const GOLD = '#f59e0b';
  const TEAL = '#21a3b2';
  const BG_DARK  = '#0a1628';
  const BG_LIGHT = '#f8fafc';

  /* ─── PERSIST THEME ─────────────────────────────────────────────── */
  const STORAGE_KEY = 'qap-theme';
  function getTheme() { return localStorage.getItem(STORAGE_KEY) || 'dark'; }
  function setTheme(t) { localStorage.setItem(STORAGE_KEY, t); applyTheme(t); }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggle = document.getElementById('qap-theme-toggle');
    if (toggle) {
      toggle.innerHTML = theme === 'dark'
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }

  /* ─── INJECT LIGHT-MODE CSS VARS ────────────────────────────────── */
  function injectThemeCSS() {
    const style = document.createElement('style');
    style.id = 'qap-theme-css';
    style.textContent = `
      [data-theme="light"] {
        --qap-bg: #f0f4f8;
        --qap-card: #ffffff;
        --qap-text: #1e293b;
        --qap-subtext: #475569;
        --qap-border: rgba(0,0,0,.1);
        --qap-nav-bg: rgba(255,255,255,.95);
        --qap-gold: #d97706;
        --qap-teal: #0e7490;
        color-scheme: light;
      }
      [data-theme="light"] body,
      [data-theme="light"] .site-header,
      [data-theme="light"] nav,
      [data-theme="light"] .navbar { background-color: #f0f4f8 !important; color: #1e293b !important; }
      [data-theme="light"] .card,
      [data-theme="light"] .feature-card,
      [data-theme="light"] .service-card,
      [data-theme="light"] .tier-card,
      [data-theme="light"] .product-card,
      [data-theme="light"] .blog-card,
      [data-theme="light"] .stat-card { background: #fff !important; border-color: rgba(0,0,0,.1) !important; color: #1e293b !important; }
      [data-theme="light"] h1,[data-theme="light"] h2,[data-theme="light"] h3,
      [data-theme="light"] h4,[data-theme="light"] h5,[data-theme="light"] h6 { color: #0f172a !important; }
      [data-theme="light"] p,[data-theme="light"] li { color: #334155 !important; }
      [data-theme="light"] .site-footer { background: #1e293b !important; }
      [data-theme="light"] .site-footer * { color: #94a3b8 !important; }

      /* Toggle button */
      #qap-theme-toggle {
        background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
        border-radius: 50%; width: 36px; height: 36px; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        color: #94a3b8; transition: all .2s; flex-shrink: 0;
      }
      [data-theme="light"] #qap-theme-toggle {
        background: rgba(0,0,0,.06); border-color: rgba(0,0,0,.12); color: #475569;
      }
      #qap-theme-toggle:hover { transform: rotate(20deg); color: ${GOLD}; border-color: rgba(245,158,11,.4); }

      /* ── Lottie-style CSS illustrations ── */
      .qap-lottie { width: 100%; height: 180px; position: relative; overflow: hidden; border-radius: 12px; margin: 16px 0; }

      /* Animated gradient orb */
      @keyframes qap-orb-float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.06)} }
      @keyframes qap-orb-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes qap-orb-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
      .qap-orb { border-radius: 50%; position: absolute; animation: qap-orb-float 4s ease-in-out infinite, qap-orb-pulse 3s ease-in-out infinite; }

      /* Data flow lines */
      @keyframes qap-flow { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
      .qap-flow-line { stroke-dasharray:8 4; animation: qap-flow 2s linear infinite; }

      /* Shield pulse for security badges */
      @keyframes qap-shield-pulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(245,158,11,.4)} 50%{transform:scale(1.03);box-shadow:0 0 0 8px rgba(245,158,11,0)} }

      /* Urgency countdown */
      #qap-urgency { position: fixed; top: 64px; right: 16px; z-index: 8500;
        background: linear-gradient(135deg, #1e1b4b, #312e81); border: 1px solid rgba(245,158,11,.3);
        border-radius: 12px; padding: 10px 14px; max-width: 200px; display: none;
        box-shadow: 0 8px 24px rgba(0,0,0,.5); animation: qap-urgency-in .4s cubic-bezier(.34,1.56,.64,1); }
      @keyframes qap-urgency-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:none} }
      #qap-urgency .u-label { font-size: 10px; color: #f59e0b; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
      #qap-urgency .u-msg   { font-size: 12px; color: #e2e8f0; margin: 4px 0; line-height: 1.4; }
      #qap-urgency .u-timer { font-size: 20px; font-weight: 800; color: #f59e0b; font-variant-numeric: tabular-nums; letter-spacing: -.5px; }
      #qap-urgency .u-sub   { font-size: 10px; color: #64748b; margin-top: 2px; }
      #qap-urgency .u-close { position: absolute; top: 6px; right: 8px; background: none; border: none; color: #64748b; cursor: pointer; font-size: 14px; padding: 2px; }
      #qap-urgency .u-close:hover { color: #94a3b8; }

      /* Security badges strip */
      #qap-trust-badges { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; justify-content: center; padding: 16px 0; }
      .qap-badge { display: flex; align-items: center; gap: 7px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 8px 12px; font-size: 11.5px; color: #94a3b8; transition: all .2s; animation: qap-shield-pulse 4s ease-in-out infinite; }
      .qap-badge:nth-child(2) { animation-delay: .8s; }
      .qap-badge:nth-child(3) { animation-delay: 1.6s; }
      .qap-badge:nth-child(4) { animation-delay: 2.4s; }
      .qap-badge:hover { border-color: rgba(245,158,11,.4); color: #f59e0b; transform: translateY(-2px); }
      .qap-badge svg { flex-shrink: 0; }
      [data-theme="light"] .qap-badge { background: rgba(0,0,0,.04); border-color: rgba(0,0,0,.1); color: #475569; }

      /* Scroll-triggered number counter */
      .qap-counter { transition: color .3s; }

      /* Hero particle canvas */
      #qap-particles { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: .45; }
    `;
    document.head.appendChild(style);
  }

  /* ─── DARK/LIGHT TOGGLE BUTTON ──────────────────────────────────── */
  function initToggle() {
    const btn = document.createElement('button');
    btn.id = 'qap-theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark/light mode');

    /* Insert into nav */
    const nav = document.querySelector('nav, .navbar, header nav, .site-nav, .nav-links');
    if (nav) {
      /* Find last link / CTA and insert before it */
      const links = nav.querySelectorAll('a, button:not(#qap-theme-toggle)');
      const last = links[links.length - 1];
      if (last) nav.insertBefore(btn, last);
      else nav.appendChild(btn);
    } else {
      /* Fallback: fixed position */
      Object.assign(btn.style, { position:'fixed', top:'12px', right:'12px', zIndex:'99999' });
      document.body.appendChild(btn);
    }

    btn.addEventListener('click', () => {
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });

    applyTheme(getTheme());
  }

  /* ─── URGENCY / SCARCITY SIGNAL ─────────────────────────────────── */
  function initUrgency() {
    /* Show after 30s, once per session, only on high-intent pages */
    const highIntent = ['index.html','qave.html','pricing.html','contact.html','ai-assessment.html','roi-calculator.html'];
    const page = location.pathname.split('/').pop() || 'index.html';
    if (!highIntent.some(p => page.includes(p.replace('.html','')))) return;
    if (sessionStorage.getItem('qap-urgency-shown')) return;

    const msgs = [
      { msg: '3 enterprises booked demos this week', sub: 'Next available slot: Tomorrow 10 AM IST' },
      { msg: 'QAVE Free tier — 50 evaluation slots remaining', sub: 'Resets on the 1st of each month' },
      { msg: 'SURE-Q Assessment cohort closes Friday', sub: 'Only 2 seats left this month' },
    ];
    const pick = msgs[Math.floor(Math.random() * msgs.length)];

    const box = document.createElement('div');
    box.id = 'qap-urgency';
    box.innerHTML = `
      <button class="u-close" aria-label="Close">✕</button>
      <div class="u-label">⚡ Limited Availability</div>
      <div class="u-msg">${pick.msg}</div>
      <div class="u-timer" id="qap-u-timer">14:59</div>
      <div class="u-sub">${pick.sub}</div>
    `;
    document.body.appendChild(box);

    box.querySelector('.u-close').addEventListener('click', () => { box.style.display = 'none'; });

    /* Countdown from 15 minutes */
    let total = 899;
    function tick() {
      const m = String(Math.floor(total/60)).padStart(2,'0');
      const s = String(total%60).padStart(2,'0');
      const el = document.getElementById('qap-u-timer');
      if (el) el.textContent = `${m}:${s}`;
      if (total > 0) total--;
    }

    setTimeout(() => {
      box.style.display = 'block';
      sessionStorage.setItem('qap-urgency-shown', '1');
      tick();
      setInterval(tick, 1000);
    }, 30000);
  }

  /* ─── SECURITY TRUST BADGES ─────────────────────────────────────── */
  function initTrustBadges() {
    /* Inject below footer or in a specific trust zone if it exists */
    const target = document.querySelector('.trust-zone, .security-badges, .footer-trust, footer .trust');
    if (!target) return; /* Only inject if a designated zone exists */

    const badges = [
      { icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, label: 'ISO 27001 Aligned' },
      { icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`, label: 'SOC 2 Type II (In Progress)' },
      { icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`, label: 'GDPR Compliant' },
      { icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`, label: '99.9% Uptime SLA' },
    ];

    const strip = document.createElement('div');
    strip.id = 'qap-trust-badges';
    strip.innerHTML = badges.map(b => `<div class="qap-badge">${b.icon}<span>${b.label}</span></div>`).join('');
    target.appendChild(strip);
  }

  /* ─── ANIMATED NUMBER COUNTERS ──────────────────────────────────── */
  function initCounters() {
    const targets = document.querySelectorAll('[data-count], .stat-number, .hero-stat');
    if (!targets.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const el = entry.target;
        const raw = el.textContent.replace(/[^0-9.]/g,'');
        const target = parseFloat(raw);
        if (isNaN(target)) return;
        const suffix = el.textContent.replace(/[0-9.]/g,'').trim();
        const duration = 1800;
        const start = performance.now();
        function frame(now) {
          const prog = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          const val = target * ease;
          el.textContent = (val >= 1000 ? Math.round(val).toLocaleString() : val.toFixed(val < 10 ? 1 : 0)) + suffix;
          if (prog < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.4 });

    targets.forEach(el => { el.classList.add('qap-counter'); obs.observe(el); });
  }

  /* ─── HERO PARTICLE CANVAS ─────────────────────────────────────── */
  function initParticles() {
    const hero = document.querySelector('.hero, .hero-section, #hero, .page-hero');
    if (!hero || hero.querySelector('#qap-particles')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'qap-particles';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, pts = [];

    function resize() {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive:true });

    const N = Math.min(40, Math.floor(W / 30));
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
        r: Math.random() * 2 + 1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,158,11,.5)';
        ctx.fill();
      });
      /* Draw connecting lines */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(33,163,178,${.25 * (1 - dist/100)})`;
            ctx.lineWidth = .8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─── LOTTIE-STYLE CSS ANIMATIONS ──────────────────────────────── */
  function initCSSAnimations() {
    /* Find any .qap-lottie containers and inject animated SVGs */
    document.querySelectorAll('.qap-lottie[data-anim]').forEach(el => {
      const type = el.dataset.anim;
      let svg = '';
      if (type === 'shield') {
        svg = `<svg viewBox="0 0 120 120" width="120" height="120" style="margin:auto;display:block">
          <path d="M60 10 L95 25 V55 C95 80 60 110 60 110 C60 110 25 80 25 55 V25 Z"
            fill="none" stroke="#f59e0b" stroke-width="3" opacity=".8">
            <animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="2s" repeatCount="indefinite" additive="sum"/>
          </path>
          <text x="60" y="65" text-anchor="middle" font-size="28" fill="#21a3b2" font-weight="700">AI</text>
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,158,11,.15)" stroke-width="1">
            <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="12s" repeatCount="indefinite"/>
          </circle>
        </svg>`;
      } else if (type === 'network') {
        svg = `<svg viewBox="0 0 160 100" width="160" height="100" style="margin:auto;display:block">
          <line x1="30" y1="50" x2="80" y2="30" stroke="#21a3b2" stroke-width="1.5" stroke-dasharray="6 3" class="qap-flow-line"/>
          <line x1="80" y1="30" x2="130" y2="50" stroke="#21a3b2" stroke-width="1.5" stroke-dasharray="6 3" class="qap-flow-line" style="animation-delay:.5s"/>
          <line x1="80" y1="30" x2="80" y2="70" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 3" class="qap-flow-line" style="animation-delay:1s"/>
          <circle cx="30" cy="50" r="10" fill="#0f1f35" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="80" cy="30" r="14" fill="#0f1f35" stroke="#21a3b2" stroke-width="2.5"/>
          <circle cx="130" cy="50" r="10" fill="#0f1f35" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="80" cy="70" r="10" fill="#0f1f35" stroke="#a78bfa" stroke-width="2"/>
          <text x="80" y="34" text-anchor="middle" font-size="9" fill="#21a3b2" font-weight="700">AI</text>
        </svg>`;
      }
      if (svg) el.innerHTML = svg;
    });
  }

  /* ─── INIT ALL ───────────────────────────────────────────────────── */
  function init() {
    injectThemeCSS();
    initToggle();
    initUrgency();
    initTrustBadges();
    initCounters();
    initParticles();
    initCSSAnimations();

    /* Apply saved theme immediately */
    applyTheme(getTheme());
  }

  /* Apply theme as early as possible to avoid flash */
  (function earlyTheme() {
    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  })();

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
