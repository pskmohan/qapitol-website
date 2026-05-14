/* Qapitol Mega-Menu Enhancement — progressive JS layer */
(function () {
  'use strict';

  /* ─── CSS injected once ─────────────────────────────────────────────── */
  const CSS = `
    /* ── Mega-menu animated entrance ── */
    .megamenu {
      opacity: 0;
      transform: translateY(-8px);
      transition: opacity .22s ease, transform .22s ease;
      pointer-events: none;
      visibility: hidden;
    }
    .megamenu.mm-open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      visibility: visible;
    }

    /* ── Nav trigger active state ── */
    .nav-trigger.mm-active {
      color: var(--gold, #e88721) !important;
    }
    .nav-trigger.mm-active::after {
      transform: rotate(180deg) !important;
    }

    /* ── Spotlight card inside mega ── */
    .mm-spotlight {
      background: linear-gradient(135deg, rgba(77,49,245,.18) 0%, rgba(33,163,178,.12) 100%);
      border: 1px solid rgba(77,49,245,.3);
      border-radius: 12px;
      padding: 1.1rem 1.25rem;
      margin-top: .75rem;
      display: flex;
      flex-direction: column;
      gap: .45rem;
      text-decoration: none;
      transition: border-color .18s, background .18s;
    }
    .mm-spotlight:hover {
      border-color: rgba(77,49,245,.55);
      background: linear-gradient(135deg, rgba(77,49,245,.26) 0%, rgba(33,163,178,.18) 100%);
    }
    .mm-spotlight-badge {
      font-size: .6rem;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #21a3b2;
    }
    .mm-spotlight-title {
      font-family: 'Inter Tight', sans-serif;
      font-size: .88rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
    }
    .mm-spotlight-desc {
      font-size: .75rem;
      color: rgba(255,255,255,.52);
      line-height: 1.5;
    }
    .mm-spotlight-cta {
      font-size: .72rem;
      font-weight: 700;
      color: #e88721;
      margin-top: .1rem;
    }

    /* ── Search bar inside mega ── */
    .mm-search {
      display: flex;
      align-items: center;
      gap: 7px;
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 8px;
      padding: 7px 12px;
      margin-bottom: .85rem;
      cursor: text;
    }
    .mm-search input {
      background: transparent;
      border: none;
      outline: none;
      color: #f1f5f9;
      font-size: .8rem;
      width: 100%;
      font-family: inherit;
    }
    .mm-search input::placeholder { color: #475569; }

    /* ── Quick-action strip ── */
    .mm-actions {
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
      padding: .7rem 1rem;
      border-top: 1px solid rgba(255,255,255,.06);
      margin-top: .5rem;
    }
    .mm-action-btn {
      font-size: .7rem;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 6px;
      text-decoration: none;
      color: #fff;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: opacity .15s;
    }
    .mm-action-btn:hover { opacity: .8; }
    .mm-action-btn.primary { background: linear-gradient(135deg, #4d31f5, #21a3b2); }
    .mm-action-btn.outline { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); }

    /* ── Mobile hamburger drawer ── */
    @media (max-width: 900px) {
      .mm-drawer-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.55);
        z-index: 9998;
        backdrop-filter: blur(3px);
      }
      .mm-drawer-overlay.open { display: block; }

      .nav-links.mm-drawer-open {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 0; right: 0;
        width: min(340px, 92vw);
        height: 100%;
        background: #0b0c1a;
        border-left: 1px solid rgba(255,255,255,.1);
        z-index: 9999;
        overflow-y: auto;
        padding: 4.5rem 0 2rem;
        gap: 0;
        animation: drawerSlideIn .28s ease;
      }
      @keyframes drawerSlideIn {
        from { transform: translateX(100%); }
        to   { transform: translateX(0); }
      }

      .nav-links.mm-drawer-open li {
        border-bottom: 1px solid rgba(255,255,255,.06);
      }
      .nav-links.mm-drawer-open .nav-trigger {
        width: 100%;
        text-align: left;
        padding: .9rem 1.4rem;
        background: none;
        border: none;
        color: #e2e8f0;
        font-size: .92rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .nav-links.mm-drawer-open .nav-trigger::after {
        content: '›';
        font-size: 1.2rem;
        color: rgba(255,255,255,.35);
        transition: transform .2s;
      }
      .nav-links.mm-drawer-open .nav-trigger.mm-mobile-open::after {
        transform: rotate(90deg);
        color: #e88721;
      }
      .nav-links.mm-drawer-open .megamenu {
        display: none;
        padding: 0 1.4rem .8rem 1.7rem;
        opacity: 1;
        transform: none;
        pointer-events: auto;
        visibility: visible;
        background: none;
        position: static;
        box-shadow: none;
        border: none;
        width: auto;
      }
      .nav-links.mm-drawer-open .megamenu.mm-mobile-show {
        display: block;
      }
      .nav-links.mm-drawer-open .megamenu .mega-col h4 {
        font-size: .65rem;
        letter-spacing: .1em;
        color: #475569;
        text-transform: uppercase;
        padding: .6rem 0 .25rem;
      }
      .nav-links.mm-drawer-open .megamenu .mega-col ul {
        list-style: none;
        padding: 0; margin: 0;
      }
      .nav-links.mm-drawer-open .megamenu .mega-col ul li a {
        display: block;
        padding: .42rem 0;
        font-size: .85rem;
        color: #94a3b8;
        text-decoration: none;
      }
      .nav-links.mm-drawer-open .mm-spotlight,
      .nav-links.mm-drawer-open .mm-actions,
      .nav-links.mm-drawer-open .mm-search { display: none; }

      .mm-close-btn {
        position: absolute;
        top: 1rem; right: 1rem;
        width: 34px; height: 34px;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.13);
        border-radius: 8px;
        color: #fff;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        line-height: 1;
      }
    }

    /* ── Hide mobile-only elements on desktop ── */
    .mm-close-btn { display: none !important; }

    /* ── Platforms wide layout: override .megamenu.simple constraints ── */
    .megamenu.simple.mm-two-col {
      min-width: 720px !important;
      display: grid !important;
      grid-template-columns: 1fr 230px !important;
      grid-template-rows: auto auto auto !important;
      padding: 1.2rem 1.4rem !important;
      gap: .6rem 1.2rem !important;
    }
    .megamenu.simple.mm-two-col .mega-col {
      grid-column: 1;
      grid-row: 1;
    }
    .megamenu.simple.mm-two-col .mm-spotlight {
      grid-column: 2;
      grid-row: 1 / span 2;
      margin-top: 0 !important;
      align-self: start;
    }
    .megamenu.simple.mm-two-col .mm-pills {
      grid-column: 1 / -1;
      grid-row: 2;
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      border-top: 1px solid rgba(255,255,255,.07);
      padding: .55rem .8rem .45rem;
      gap: .4rem;
      margin-top: 0;
    }
    .megamenu.simple.mm-two-col .mm-pills::-webkit-scrollbar { display: none; }
    .megamenu.simple.mm-two-col .mm-pill { white-space: nowrap; flex-shrink: 0; }
    .megamenu.simple.mm-two-col .mm-actions {
      grid-column: 1 / -1;
      grid-row: 3;
    }

    /* ── Platforms 2-column list layout ── */
    .mm-two-col .mega-col ul {
      columns: 2;
      column-gap: 1.4rem;
      break-inside: avoid;
    }
    .mm-two-col .mega-col ul li {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /* ── Extra pill-links row (used for quick nav) ── */
    .mm-pills {
      display: flex;
      flex-wrap: wrap;
      gap: .35rem;
      padding: .65rem 1rem .45rem;
      border-top: 1px solid rgba(255,255,255,.06);
      margin-top: .4rem;
    }
    .mm-pill {
      font-size: .68rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.1);
      color: #94a3b8;
      text-decoration: none;
      transition: all .15s;
      white-space: nowrap;
    }
    .mm-pill:hover {
      background: rgba(33,163,178,.12);
      border-color: rgba(33,163,178,.35);
      color: #21a3b2;
    }
    .mm-pill.hot {
      background: rgba(245,158,11,.1);
      border-color: rgba(245,158,11,.3);
      color: #e88721;
    }

    /* ── Keyboard focus highlight ── */
    .megamenu a:focus-visible {
      outline: 2px solid #e88721;
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* ── On mobile: restore close button ── */
    @media (max-width: 900px) {
      .mm-close-btn { display: flex !important; }
      .mm-two-col .mega-col ul { columns: 1; }
    }
  `;

  /* ─── Spotlight configs per nav item ────────────────────────────────── */
  const SPOTLIGHTS = {
    'Platforms': {
      badge: '🚀 Free Tier Available',
      title: 'Start evaluating your AI in minutes',
      desc: 'QAVE Free — no credit card, no lock-in. Benchmark your LLM against IRDAI, EU AI Act, and RBI frameworks instantly.',
      href: 'qave-platform.html',
      cta: 'Try QAVE Free →',
    },
    'Solutions': {
      badge: '⚡ Most Popular',
      title: 'LLM Safety & Red-Teaming for Enterprise',
      desc: 'Adversarial testing, jailbreak simulation, and OWASP LLM Top-10 coverage — automated and human-in-the-loop.',
      href: 'solution-llm-safety.html',
      cta: 'Explore Red-Teaming →',
    },
    'Services': {
      badge: '✦ GCC Build Programme',
      title: 'Launch your AI Global Capability Centre',
      desc: 'From entity setup to 50-person AI team, operational in 90 days. India, UAE, or Singapore.',
      href: 'gcc.html',
      cta: 'View GCC Blueprint →',
    },
    'Industries': {
      badge: '🏦 Highest Demand',
      title: 'AI Governance for BFSI & Payments',
      desc: 'RBI DPDP-compliant AI quality assurance, automated audit trails, and real-time credit-model drift alerts.',
      href: 'solution-bfsi-ai.html',
      cta: 'See BFSI Solutions →',
    },
    'Insights': {
      badge: '📥 Free Download',
      title: 'The AI Governance Playbook 2025',
      desc: '42-page guide: SURE-Q framework, EU AI Act readiness checklist, and ROI benchmarks from 80+ enterprise deployments.',
      href: '#',
      cta: 'Download Playbook →',
    },
    'About': {
      badge: '💼 We\'re Hiring',
      title: 'Join the AI Control Layer team',
      desc: 'AI engineers, ML evaluators, and governance specialists. Remote-first, equity-backed, mission-driven.',
      href: 'careers.html',
      cta: 'View Open Roles →',
    },
  };

  /* ─── Quick-action strips per nav item ──────────────────────────────── */
  const ACTIONS = {
    'Platforms': [
      { label: '📅 Book Demo', href: '#', cls: 'primary' },
      { label: '📊 ROI Calculator', href: 'roi-calculator.html', cls: 'outline' },
      { label: '✓ AI Readiness', href: 'ai-assessment.html', cls: 'outline' },
    ],
    'Solutions': [
      { label: '📅 Book Demo', href: '#', cls: 'primary' },
      { label: '📆 Reg Calendar', href: 'regulatory-calendar.html', cls: 'outline' },
    ],
    'Services': [
      { label: '📅 Book Demo', href: '#', cls: 'primary' },
      { label: '🤝 Hire Talent', href: 'hire.html', cls: 'outline' },
    ],
  };

  /* ─── Extra pill-links per nav item ─────────────────────────────────── */
  const PILLS = {
    'Platforms': [
      { label: '🆓 QAVE Free Tier', href: 'qave-platform.html', hot: true },
      { label: 'SURE-Q Framework', href: 'sure-q.html' },
      { label: 'AgentOps', href: 'agentops.html' },
      { label: 'Platform Engineering', href: 'platform-engineering.html' },
      { label: '📊 ROI Calculator', href: 'roi-calculator.html', hot: true },
      { label: 'Integrations', href: 'integrations.html' },
      { label: 'API Docs', href: 'integrations.html#api' },
    ],
    'Industries': [
      { label: 'BFSI & Payments', href: 'industries.html#bfsi' },
      { label: 'Healthcare AI', href: 'solution-healthcare-ai.html' },
      { label: 'Insurance', href: 'industries.html#insurance' },
      { label: 'Retail & E-commerce', href: 'industries.html#retail' },
      { label: 'Logistics', href: 'industries.html#logistics' },
      { label: 'Tech & SaaS', href: 'industries.html#tech-saas' },
      { label: '🇦🇪 UAE & MENA', href: 'uae.html', hot: true },
      { label: '🇺🇸 USA', href: 'usa.html' },
      { label: 'Government AI', href: 'industries.html#government' },
    ],
    'Insights': [
      { label: 'Case Studies', href: 'case-studies.html' },
      { label: 'AI Governance Blog', href: 'insights.html#blogs' },
      { label: 'Research Papers', href: 'insights.html#research' },
      { label: '📅 Reg Calendar', href: 'regulatory-calendar.html', hot: true },
      { label: 'AI Readiness Quiz', href: 'ai-assessment.html' },
      { label: 'Build vs Buy', href: 'build-vs-buy.html' },
      { label: 'The Pivot Story', href: 'pivot.html' },
      { label: 'Qapitol Labs', href: 'labs.html' },
    ],
    'About': [
      { label: 'Our Team', href: 'about.html#leadership' },
      { label: 'Careers — 13 Roles', href: 'careers.html', hot: true },
      { label: 'Partnerships', href: 'partnerships.html' },
      { label: 'QEN Network', href: 'qen.html' },
      { label: 'Events & Webinars', href: 'events.html' },
      { label: 'Community', href: 'community.html' },
      { label: 'Alumni Network', href: 'alumni.html' },
      { label: 'Security & Trust', href: 'security-trust.html' },
    ],
  };

  function makePills(label) {
    const items = PILLS[label];
    if (!items || !items.length) return null;
    const div = document.createElement('div');
    div.className = 'mm-pills';
    items.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'mm-pill' + (item.hot ? ' hot' : '');
      a.textContent = item.label;
      div.appendChild(a);
    });
    return div;
  }

  /* ─── Helpers ────────────────────────────────────────────────────────── */
  function injectCSS(css) {
    const s = document.createElement('style');
    s.id = 'qap-mm-css';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function makeSpotlight(label) {
    const data = SPOTLIGHTS[label];
    if (!data) return null;
    const a = document.createElement('a');
    a.href = data.href;
    a.className = 'mm-spotlight';
    a.innerHTML = `
      <span class="mm-spotlight-badge">${data.badge}</span>
      <span class="mm-spotlight-title">${data.title}</span>
      <span class="mm-spotlight-desc">${data.desc}</span>
      <span class="mm-spotlight-cta">${data.cta}</span>
    `;
    return a;
  }

  function makeActions(label) {
    const items = ACTIONS[label];
    if (!items || !items.length) return null;
    const div = document.createElement('div');
    div.className = 'mm-actions';
    items.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.className = `mm-action-btn ${item.cls}`;
      a.textContent = item.label;
      if (item.href === '#') {
        a.addEventListener('click', e => {
          e.preventDefault();
          const cal = document.getElementById('qap-cal-overlay');
          if (cal) cal.classList.add('open');
        });
      }
      div.appendChild(a);
    });
    return div;
  }

  /* ─── Desktop mega-menu logic ────────────────────────────────────────── */
  function initDesktop() {
    const items = document.querySelectorAll('.has-mega');
    if (!items.length) return;

    items.forEach(li => {
      const trigger = li.querySelector('.nav-trigger');
      const menu = li.querySelector('.megamenu');
      if (!trigger || !menu) return;

      const label = trigger.textContent.trim();

      // Platforms: 2-column layout + single-row quick-links
      if (label === 'Platforms') {
        menu.classList.add('mm-two-col');
        const pills = makePills(label);
        if (pills) menu.appendChild(pills);
      }

      // Inject spotlight card — for Platforms (wide grid) append to menu directly;
      // for others append inside first mega-col so it sits below the list
      const spotlight = makeSpotlight(label);
      if (spotlight) {
        if (label === 'Platforms') {
          menu.appendChild(spotlight); // placed by CSS grid into col 2
        } else {
          const firstCol = menu.querySelector('.mega-col');
          if (firstCol) firstCol.appendChild(spotlight);
        }
      }

      // Inject actions strip
      const actionsEl = makeActions(label);
      if (actionsEl) menu.appendChild(actionsEl);

      let closeTimer;

      function openMenu() {
        clearTimeout(closeTimer);
        // Close all others first
        items.forEach(other => {
          if (other !== li) {
            other.querySelector('.megamenu')?.classList.remove('mm-open');
            other.querySelector('.nav-trigger')?.classList.remove('mm-active');
          }
        });
        menu.classList.add('mm-open');
        trigger.classList.add('mm-active');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function closeMenu() {
        menu.classList.remove('mm-open');
        trigger.classList.remove('mm-active');
        trigger.setAttribute('aria-expanded', 'false');
      }

      li.addEventListener('mouseenter', openMenu);
      li.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(closeMenu, 400);
      });
      menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      menu.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(closeMenu, 400);
      });

      // Click toggle for keyboard / touch users
      trigger.addEventListener('click', e => {
        e.stopPropagation();
        if (menu.classList.contains('mm-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Keyboard: Escape closes
      li.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeMenu(); trigger.focus(); }
      });
    });

    // Click outside closes all
    document.addEventListener('click', () => {
      items.forEach(li => {
        li.querySelector('.megamenu')?.classList.remove('mm-open');
        li.querySelector('.nav-trigger')?.classList.remove('mm-active');
      });
    });
  }

  /* ─── Mobile hamburger drawer ────────────────────────────────────────── */
  function initMobile() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    // Overlay behind drawer
    const overlay = document.createElement('div');
    overlay.className = 'mm-drawer-overlay';
    document.body.appendChild(overlay);

    // Close button inside drawer
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mm-close-btn';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '×';
    navLinks.style.position = 'relative';
    navLinks.appendChild(closeBtn);

    let drawerOpen = false;

    function openDrawer() {
      navLinks.classList.add('mm-drawer-open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      drawerOpen = true;
      toggle.setAttribute('aria-expanded', 'true');
      toggle.textContent = '✕';
    }

    function closeDrawer() {
      navLinks.classList.remove('mm-drawer-open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      drawerOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
      // Also close any open mobile sub-menus
      navLinks.querySelectorAll('.megamenu.mm-mobile-show').forEach(m => m.classList.remove('mm-mobile-show'));
      navLinks.querySelectorAll('.nav-trigger.mm-mobile-open').forEach(t => t.classList.remove('mm-mobile-open'));
    }

    toggle.addEventListener('click', () => drawerOpen ? closeDrawer() : openDrawer());
    overlay.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawerOpen) closeDrawer(); });

    // Mobile sub-menus: tap trigger to expand inline
    document.querySelectorAll('.has-mega .nav-trigger').forEach(trigger => {
      trigger.addEventListener('click', e => {
        if (window.innerWidth > 900) return;
        e.stopPropagation();
        const menu = trigger.nextElementSibling;
        if (!menu || !menu.classList.contains('megamenu')) return;

        const isOpen = menu.classList.contains('mm-mobile-show');
        // Close sibling menus
        navLinks.querySelectorAll('.megamenu.mm-mobile-show').forEach(m => {
          m.classList.remove('mm-mobile-show');
          m.previousElementSibling?.classList.remove('mm-mobile-open');
        });
        if (!isOpen) {
          menu.classList.add('mm-mobile-show');
          trigger.classList.add('mm-mobile-open');
        }
      });
    });

    // Resize: close drawer when going desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && drawerOpen) closeDrawer();
    });
  }

  /* ─── Keyboard tab-through mega links ───────────────────────────────── */
  function initKeyboardNav() {
    document.querySelectorAll('.has-mega').forEach(li => {
      const trigger = li.querySelector('.nav-trigger');
      const menu = li.querySelector('.megamenu');
      if (!trigger || !menu) return;

      // Open menu on focus into trigger, keep open while focus stays inside li
      trigger.addEventListener('focus', () => {
        if (window.innerWidth <= 900) return;
        menu.classList.add('mm-open');
        trigger.classList.add('mm-active');
      });

      li.addEventListener('focusout', e => {
        if (!li.contains(e.relatedTarget)) {
          menu.classList.remove('mm-open');
          trigger.classList.remove('mm-active');
        }
      });
    });
  }

  /* ─── Cmd+K hint on search icon in nav ──────────────────────────────── */
  function addCmdKHint() {
    // If there's a search icon in the header, annotate it
    document.querySelectorAll('.nav-search, [data-search], .search-icon').forEach(el => {
      const kbd = document.createElement('kbd');
      kbd.style.cssText = 'font-size:.6rem;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.15);border-radius:4px;padding:1px 5px;color:#94a3b8;font-family:inherit;margin-left:5px;';
      kbd.textContent = '⌘K';
      el.appendChild(kbd);
    });
  }

  /* ─── Init ───────────────────────────────────────────────────────────── */
  function init() {
    if (document.getElementById('qap-mm-css')) return; // already loaded
    injectCSS(CSS);
    initDesktop();
    initMobile();
    initKeyboardNav();
    addCmdKHint();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
