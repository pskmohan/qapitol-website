/* Qapitol Site Enhancements — global UX layer */
(function () {
  'use strict';

  const GOLD = '#f59e0b';
  const TEAL = '#21a3b2';
  const BG   = '#0a1628';
  const CARD = '#0f1f35';

  /* ─── 1. READING PROGRESS BAR ─── */
  function initProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'qap-progress';
    Object.assign(bar.style, {
      position:'fixed', top:'0', left:'0', height:'3px', width:'0%',
      background:`linear-gradient(90deg,${GOLD},${TEAL})`,
      zIndex:'99999', transition:'width .08s linear', pointerEvents:'none'
    });
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    }, { passive: true });
  }

  /* ─── 2. BACK TO TOP ─── */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'qap-btt';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
    Object.assign(btn.style, {
      position:'fixed', bottom:'88px', right:'22px',
      width:'40px', height:'40px', borderRadius:'50%',
      background: CARD, border:`1px solid rgba(245,158,11,.4)`,
      color: GOLD, cursor:'pointer', display:'none',
      alignItems:'center', justifyContent:'center',
      zIndex:'9000', transition:'all .2s',
      boxShadow:'0 4px 14px rgba(0,0,0,.4)'
    });
    document.body.appendChild(btn);
    btn.onmouseenter = () => { btn.style.background = GOLD; btn.style.color = BG; };
    btn.onmouseleave = () => { btn.style.background = CARD; btn.style.color = GOLD; };
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }, { passive: true });
  }

  /* ─── 3. WHATSAPP BUTTON ─── */
  function initWhatsApp() {
    const a = document.createElement('a');
    a.id = 'qap-wa';
    a.href = 'https://wa.me/919999999999?text=Hi%2C+I%27m+interested+in+Qapitol%27s+AI+governance+solutions.';
    a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', 'Chat on WhatsApp');
    a.innerHTML = `<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
    Object.assign(a.style, {
      position:'fixed', bottom:'22px', left:'22px',
      width:'52px', height:'52px', borderRadius:'50%',
      background:'#25D366', display:'flex',
      alignItems:'center', justifyContent:'center',
      zIndex:'9000', boxShadow:'0 4px 16px rgba(37,211,102,.45)',
      transition:'transform .2s, box-shadow .2s'
    });
    document.body.appendChild(a);
    a.onmouseenter = () => { a.style.transform = 'scale(1.12)'; a.style.boxShadow = '0 6px 24px rgba(37,211,102,.6)'; };
    a.onmouseleave = () => { a.style.transform = 'scale(1)'; a.style.boxShadow = '0 4px 16px rgba(37,211,102,.45)'; };

    /* Pulse ring */
    const ring = document.createElement('span');
    Object.assign(ring.style, {
      position:'absolute', inset:'-6px', borderRadius:'50%',
      border:'2px solid rgba(37,211,102,.5)',
      animation:'qap-wa-pulse 2s ease-out infinite', pointerEvents:'none'
    });
    a.style.position = 'fixed';
    const wrap = document.createElement('div');
    Object.assign(wrap.style, { position:'fixed', bottom:'22px', left:'22px', zIndex:'9000' });
    wrap.appendChild(ring);
    wrap.appendChild(a);
    a.style.position = 'relative';
    a.style.bottom = 'auto'; a.style.left = 'auto';
    document.body.appendChild(wrap);
  }

  /* ─── 4. SOCIAL PROOF TICKER ─── */
  function initSocialProof() {
    const msgs = [
      ['A fintech', 'Singapore', 'booked a QAVE demo'],
      ['A BFSI enterprise', 'Dubai', 'started a CHEQ trial'],
      ['A RegTech firm', 'London', 'downloaded the AI Governance guide'],
      ['A GCC', 'Bengaluru', 'requested a SURE-Q assessment'],
      ['A healthtech', 'New York', 'booked an AI audit'],
      ['An insurtech', 'Amsterdam', 'joined the QEN expert network'],
      ['A government agency', 'Abu Dhabi', 'enquired about CHEQ'],
      ['An AI startup', 'Mumbai', 'signed up for QAVE Free'],
    ];
    const toast = document.createElement('div');
    toast.id = 'qap-sp';
    Object.assign(toast.style, {
      position:'fixed', bottom:'88px', left:'22px',
      background: CARD, border:`1px solid rgba(33,163,178,.35)`,
      borderRadius:'10px', padding:'10px 14px',
      color:'#e2e8f0', fontSize:'12.5px',
      zIndex:'8999', maxWidth:'255px',
      display:'none', alignItems:'center', gap:'10px',
      boxShadow:'0 4px 20px rgba(0,0,0,.45)'
    });
    document.body.appendChild(toast);

    let i = 0;
    function show() {
      const [co, city, act] = msgs[i++ % msgs.length];
      toast.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:#25D366;flex-shrink:0;display:inline-block"></span><span><strong style="color:${GOLD}">${co}</strong> from ${city}<br><span style="color:#94a3b8">${act}</span> &mdash; <em style="font-size:11px;color:#64748b">just now</em></span>`;
      toast.style.display = 'flex';
      setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .5s'; }, 4000);
      setTimeout(() => { toast.style.display = 'none'; toast.style.opacity = '1'; toast.style.transition = ''; }, 4600);
    }
    setTimeout(() => { show(); setInterval(show, 20000); }, 10000);
  }

  /* ─── 5. SCROLL ANIMATIONS ─── */
  function initScrollAnimations() {
    const css = `
      .qap-reveal{opacity:0;transform:translateY(22px);transition:opacity .55s ease,transform .55s ease}
      .qap-reveal.qap-visible{opacity:1;transform:none}
      .qap-reveal.d1{transition-delay:.1s}.qap-reveal.d2{transition-delay:.2s}.qap-reveal.d3{transition-delay:.3s}
    `;
    injectCSS(css);
    const sel = ['.card','.feature-card','.service-card','.stat-card','.tier-card',
      '.diff-card','.blog-card','.product-card','.testimonial-card',
      '.archetype-card','.step-card','.icon-card','.resource-card'
    ].join(',');
    const els = document.querySelectorAll(sel);
    els.forEach((el, i) => {
      el.classList.add('qap-reveal');
      const d = i % 3; if (d) el.classList.add('d' + d);
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('qap-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.qap-reveal').forEach(el => obs.observe(el));
  }

  /* ─── 6. STICKY MOBILE CTA ─── */
  function initMobileCTA() {
    const bar = document.createElement('div');
    bar.id = 'qap-mob-cta';
    bar.innerHTML = `
      <a href="contact.html" style="flex:1;text-align:center;padding:13px;background:rgba(245,158,11,.12);color:${GOLD};text-decoration:none;font-weight:600;font-size:14px;border-right:1px solid rgba(255,255,255,.08);">Book a Demo</a>
      <a href="qave.html" style="flex:1;text-align:center;padding:13px;color:#94a3b8;text-decoration:none;font-size:14px;">Try QAVE Free</a>
    `;
    Object.assign(bar.style, {
      position:'fixed', bottom:'0', left:'0', right:'0',
      background: BG, borderTop:`1px solid rgba(255,255,255,.1)`,
      display:'none', zIndex:'9001', alignItems:'stretch'
    });
    document.body.appendChild(bar);
    const mq = window.matchMedia('(max-width: 768px)');
    const toggle = q => { bar.style.display = q.matches ? 'flex' : 'none'; };
    mq.addEventListener('change', toggle); toggle(mq);
  }

  /* ─── 7. FLOATING TOC ─── */
  function initTOC() {
    if (window.innerWidth < 1280) return;
    const hs = Array.from(document.querySelectorAll('main h2, section h2, .section h2, h2'))
      .filter(h => h.textContent.trim().length > 3 && !h.closest('nav') && !h.closest('footer'))
      .slice(0, 14);
    if (hs.length < 4) return;

    hs.forEach((h, i) => { if (!h.id) h.id = `qap-h-${i}`; });

    const toc = document.createElement('div');
    toc.id = 'qap-toc';
    Object.assign(toc.style, {
      position:'fixed', right:'14px', top:'50%',
      transform:'translateY(-50%)', zIndex:'8000',
      display:'none', flexDirection:'column', gap:'8px', padding:'4px'
    });
    document.body.appendChild(toc);

    const dots = hs.map((h, i) => {
      const dot = document.createElement('a');
      dot.href = '#' + h.id;
      Object.assign(dot.style, {
        width:'7px', height:'7px', borderRadius:'50%',
        background:'rgba(255,255,255,.2)', display:'block',
        transition:'all .2s', position:'relative'
      });
      const tip = document.createElement('span');
      tip.textContent = h.textContent.trim().slice(0, 36);
      Object.assign(tip.style, {
        position:'absolute', right:'16px', top:'-4px',
        background: CARD, color:'#e2e8f0', fontSize:'11px',
        padding:'3px 8px', borderRadius:'4px', whiteSpace:'nowrap',
        opacity:'0', pointerEvents:'none', transition:'opacity .15s',
        border:`1px solid rgba(255,255,255,.1)`, fontFamily:'inherit'
      });
      dot.appendChild(tip);
      dot.addEventListener('click', e => { e.preventDefault(); h.scrollIntoView({ behavior:'smooth', block:'start' }); });
      dot.addEventListener('mouseenter', () => { tip.style.opacity = '1'; });
      dot.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
      toc.appendChild(dot);
      return { dot, h };
    });

    window.addEventListener('scroll', () => {
      toc.style.display = window.scrollY > 300 ? 'flex' : 'none';
      let active = 0;
      dots.forEach(({ h }, i) => { if (h.getBoundingClientRect().top <= 160) active = i; });
      dots.forEach(({ dot }, i) => {
        dot.style.background = i === active ? GOLD : 'rgba(255,255,255,.2)';
        dot.style.transform = i === active ? 'scale(1.6)' : 'scale(1)';
      });
    }, { passive: true });

    window.addEventListener('resize', () => { toc.style.display = window.innerWidth < 1280 ? 'none' : 'flex'; });
  }

  /* ─── 8. MICRO-INTERACTIONS ─── */
  function initMicro() {
    injectCSS(`
      .qap-ripple{position:absolute;border-radius:50%;transform:scale(0);animation:qap-rpl .55s linear;background:rgba(255,255,255,.18);pointer-events:none}
      @keyframes qap-rpl{to{transform:scale(4);opacity:0}}
      @keyframes qap-wa-pulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.7);opacity:0}}
      .btn-primary,.cta-primary,.cta-btn,.hero-cta{position:relative;overflow:hidden;transition:transform .18s,box-shadow .18s}
      .btn-primary:hover,.cta-primary:hover,.cta-btn:hover,.hero-cta:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(245,158,11,.3)!important}
      a{transition:color .15s}
    `);
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-primary,.cta-primary,.cta-btn,.hero-cta,.btn');
      if (!btn || getComputedStyle(btn).position === 'static') return;
      const r = document.createElement('span');
      r.className = 'qap-ripple';
      const rect = btn.getBoundingClientRect(), sz = Math.max(rect.width, rect.height);
      Object.assign(r.style, { width: sz+'px', height: sz+'px', left: (e.clientX-rect.left-sz/2)+'px', top: (e.clientY-rect.top-sz/2)+'px' });
      btn.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    });
  }

  /* ─── 9. CALENDLY MODAL ─── */
  function initCalendly() {
    injectCSS(`
      #qap-cal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99000;display:none;align-items:center;justify-content:center;padding:16px}
      #qap-cal-overlay.open{display:flex}
      #qap-cal-box{background:#fff;border-radius:16px;width:100%;max-width:780px;height:600px;position:relative;overflow:hidden}
      #qap-cal-close{position:absolute;top:12px;right:12px;z-index:2;background:#0a1628;border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center}
      #qap-cal-box iframe{width:100%;height:100%;border:none}
    `);
    const overlay = document.createElement('div');
    overlay.id = 'qap-cal-overlay';
    overlay.innerHTML = `<div id="qap-cal-box"><button id="qap-cal-close" aria-label="Close">×</button><iframe src="https://calendly.com/qapitol/demo?hide_gdpr_banner=1" title="Book a demo with Qapitol"></iframe></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#qap-cal-close').onclick = () => overlay.classList.remove('open');
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

    /* Wire up all "Book a Demo" links */
    document.querySelectorAll('a').forEach(a => {
      const txt = (a.textContent || '').trim().toLowerCase();
      if ((txt.includes('book') && txt.includes('demo')) || txt === 'let\'s talk' || txt === "let's talk") {
        a.addEventListener('click', e => {
          e.preventDefault();
          document.getElementById('qap-cal-overlay').classList.add('open');
        });
      }
    });
  }

  /* ─── UTIL ─── */
  function injectCSS(css) {
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ─── INIT ─── */
  function init() {
    initProgressBar();
    initBackToTop();
    initWhatsApp();
    initSocialProof();
    initScrollAnimations();
    initMobileCTA();
    initTOC();
    initMicro();
    initCalendly();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
