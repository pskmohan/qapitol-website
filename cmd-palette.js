/* Qapitol Command Palette — Cmd+K / Ctrl+K */
(function () {
  const PAGES = [
    { t:'Home', u:'index.html', d:'Main homepage', c:'Home' },
    { t:'QAVE — AI Evaluation Platform', u:'qave.html', d:'Evaluate any LLM against your use case', c:'Platform' },
    { t:'CHEQ — AI Compliance', u:'cheq.html', d:'Policy packs for EU AI Act, IRDAI, RBI', c:'Platform' },
    { t:'SURE-Q Framework', u:'sure-q.html', d:'AI quality assurance & audit framework', c:'Platform' },
    { t:'Nexus — AI Orchestration', u:'nexus.html', d:'Multi-agent orchestration layer', c:'Platform' },
    { t:'Agent Fabric', u:'agent-fabric.html', d:'Enterprise agentic workflow builder', c:'Platform' },
    { t:'Qurator — Content AI', u:'qurator.html', d:'AI-powered content & QA engine', c:'Platform' },
    { t:'LLM Safety & Red-Teaming', u:'solution-llm-safety.html', d:'Adversarial testing for language models', c:'Solution' },
    { t:'AI Evaluation Services', u:'ai-evaluation.html', d:'Human + automated AI assessment', c:'Solution' },
    { t:'Synthetic Data Management', u:'synthetic-data-management.html', d:'Privacy-safe training data generation', c:'Solution' },
    { t:'AI Engineering', u:'ai-engineering.html', d:'Build production-grade AI systems', c:'Service' },
    { t:'AI in Quality Engineering', u:'ai-in-qe.html', d:'Transform QE with AI automation', c:'Service' },
    { t:'Workflow Automation', u:'workflow-automation.html', d:'End-to-end process automation', c:'Service' },
    { t:'GCC & Captive Setup', u:'gcc-offerings.html', d:'Build your AI Global Capability Centre', c:'Service' },
    { t:'BPO & Operations', u:'bpo.html', d:'AI-augmented business process outsourcing', c:'Service' },
    { t:'Talent Services', u:'ai-talent.html', d:'AI engineers, MLOps, QA on demand', c:'Service' },
    { t:'Hire AI Talent', u:'hire.html', d:'Quick intake for staffing request', c:'Service' },
    { t:'AI TRISM & Governance', u:'ai-trism.html', d:'Trust, risk & security management', c:'Service' },
    { t:'Sovereign AI', u:'sovereign-ai.html', d:'Data sovereignty and national AI strategy', c:'Solution' },
    { t:'Why Qapitol', u:'why-qapitol.html', d:'Our structural advantages vs Infosys / TCS', c:'Company' },
    { t:'About Us', u:'about.html', d:'Company, mission, leadership team', c:'Company' },
    { t:'Qapitol Labs', u:'labs.html', d:'Research, open-source, AI innovation', c:'Company' },
    { t:'Alumni Network', u:'alumni.html', d:'Qapitol alumni community', c:'Company' },
    { t:'The Pivot Story', u:'pivot.html', d:'From QE company to AI control layer', c:'Company' },
    { t:'Build vs Buy', u:'build-vs-buy.html', d:'Why not building AI in-house', c:'Company' },
    { t:'QEN Expert Network', u:'qen.html', d:'Join as SME contributor & get paid', c:'Company' },
    { t:'Careers', u:'careers.html', d:'Open roles at Qapitol', c:'Company' },
    { t:'Partner Programs', u:'partners.html', d:'Reseller, referral and technology partners', c:'Company' },
    { t:'Integrations', u:'integrations.html', d:'CI/CD, cloud, LLM and API integrations', c:'Platform' },
    { t:'Regulatory Calendar', u:'regulatory-calendar.html', d:'AI regulation deadlines by region', c:'Resource' },
    { t:'Security & Trust', u:'security-trust.html', d:'CISO vendor security information', c:'Resource' },
    { t:'Pricing', u:'pricing.html', d:'QAVE tiers and enterprise pricing', c:'Platform' },
    { t:'ROI Calculator', u:'roi-calculator.html', d:'Calculate your AI risk exposure & savings', c:'Tool' },
    { t:'AI Readiness Assessment', u:'ai-assessment.html', d:'Is your AI deployment audit-ready?', c:'Tool' },
    { t:'Industries — BFSI', u:'bfsi.html', d:'AI governance for banking & insurance', c:'Industry' },
    { t:'Industries — Healthcare', u:'healthcare.html', d:'Clinical AI compliance & safety', c:'Industry' },
    { t:'Industries — Retail', u:'retail.html', d:'AI-powered retail & ecommerce', c:'Industry' },
    { t:'Industries — Manufacturing', u:'manufacturing.html', d:'Industrial AI quality assurance', c:'Industry' },
    { t:'Industries — Telecom', u:'telecom.html', d:'AI ops for telco networks', c:'Industry' },
    { t:'Middle East / UAE', u:'uae.html', d:'Regional hub for MENA AI governance', c:'Region' },
    { t:'United States', u:'usa.html', d:'US operations and federal AI compliance', c:'Region' },
    { t:'Blog & Insights', u:'blog.html', d:'Latest articles and research', c:'Resource' },
    { t:'Whitepapers', u:'whitepapers.html', d:'In-depth AI governance research', c:'Resource' },
    { t:'Contact Us', u:'contact.html', d:'Get in touch with our team', c:'Contact' },
    { t:'Intel Brief', u:'intel.html', d:'The Control Layer intelligence report', c:'Resource' },
  ];

  const ACTIONS = [
    { t:'Book a Demo', icon:'📅', d:'Open calendar booking', fn: () => { const o = document.getElementById('qap-cal-overlay'); if(o) o.classList.add('open'); else window.open('https://calendly.com/qapitol/demo','_blank'); } },
    { t:'Try QAVE Free', icon:'🚀', d:'Start your free evaluation', fn: () => location.href='qave.html#free' },
    { t:'Download AI Governance Guide', icon:'📥', d:'Free PDF — 2025 edition', fn: () => { const o = document.getElementById('qap-lead-overlay'); if(o) o.classList.add('open'); } },
    { t:'Chat with us on WhatsApp', icon:'💬', d:'Quick response during business hours', fn: () => window.open('https://wa.me/919999999999','_blank') },
    { t:'View Regulatory Calendar', icon:'📆', d:'AI law deadlines by region', fn: () => location.href='regulatory-calendar.html' },
  ];

  let open = false;
  let filtered = [];
  let cursor = 0;

  function fuzzy(str, q) {
    str = str.toLowerCase(); q = q.toLowerCase();
    if (str.includes(q)) return true;
    let si = 0;
    for (let c of q) { const i = str.indexOf(c, si); if (i < 0) return false; si = i + 1; }
    return true;
  }

  function build() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'qap-cp-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Command palette');

    overlay.innerHTML = `
      <div id="qap-cp-box">
        <div id="qap-cp-search-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input id="qap-cp-input" type="text" placeholder="Search pages, tools, actions…" autocomplete="off" spellcheck="false" />
          <kbd>ESC</kbd>
        </div>
        <div id="qap-cp-results"></div>
        <div id="qap-cp-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>ESC</kbd> close</span>
        </div>
      </div>
    `;

    const css = `
      #qap-cp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:999999;display:none;align-items:flex-start;justify-content:center;padding-top:10vh;backdrop-filter:blur(4px)}
      #qap-cp-overlay.open{display:flex}
      #qap-cp-box{background:#0f1f35;border:1px solid rgba(255,255,255,.12);border-radius:14px;width:100%;max-width:580px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.6);font-family:inherit}
      #qap-cp-search-row{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08)}
      #qap-cp-input{flex:1;background:transparent;border:none;outline:none;color:#f1f5f9;font-size:15px;font-family:inherit}
      #qap-cp-input::placeholder{color:#475569}
      #qap-cp-results{max-height:380px;overflow-y:auto}
      #qap-cp-results::-webkit-scrollbar{width:4px}
      #qap-cp-results::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px}
      .qap-cp-group{font-size:10.5px;font-weight:600;letter-spacing:.07em;color:#475569;text-transform:uppercase;padding:10px 16px 4px}
      .qap-cp-item{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;transition:background .1s}
      .qap-cp-item:hover,.qap-cp-item.active{background:rgba(245,158,11,.1)}
      .qap-cp-item.active .qap-cp-title{color:#f59e0b}
      .qap-cp-icon{width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px}
      .qap-cp-title{font-size:13.5px;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .qap-cp-desc{font-size:11.5px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .qap-cp-badge{font-size:10px;background:rgba(33,163,178,.15);color:#21a3b2;border-radius:4px;padding:2px 6px;flex-shrink:0}
      #qap-cp-footer{display:flex;gap:16px;padding:8px 16px;border-top:1px solid rgba(255,255,255,.06)}
      #qap-cp-footer span{font-size:11px;color:#475569;display:flex;align-items:center;gap:4px}
      #qap-cp-footer kbd,#qap-cp-search-row kbd{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:4px;padding:1px 5px;font-size:10.5px;color:#94a3b8;font-family:inherit}
      #qap-cp-empty{padding:28px 16px;text-align:center;color:#475569;font-size:13px}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const input = overlay.querySelector('#qap-cp-input');
    const results = overlay.querySelector('#qap-cp-results');

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    input.addEventListener('input', render);

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); cursor = Math.min(cursor + 1, filtered.length - 1); highlight(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); cursor = Math.max(cursor - 1, 0); highlight(); }
      else if (e.key === 'Enter') { e.preventDefault(); activate(); }
      else if (e.key === 'Escape') close();
    });

    function render() {
      const q = input.value.trim();
      filtered = [];

      if (!q) {
        // Default: quick actions + recent pages
        filtered = [
          ...ACTIONS.map(a => ({ ...a, _type: 'action' })),
          ...PAGES.slice(0, 8).map(p => ({ ...p, _type: 'page' }))
        ];
      } else {
        const pa = PAGES.filter(p => fuzzy(p.t + ' ' + p.d + ' ' + p.c, q)).slice(0, 10).map(p => ({ ...p, _type: 'page' }));
        const ac = ACTIONS.filter(a => fuzzy(a.t + ' ' + a.d, q)).map(a => ({ ...a, _type: 'action' }));
        filtered = [...ac, ...pa];
      }

      cursor = 0;

      if (!filtered.length) {
        results.innerHTML = `<div id="qap-cp-empty">No results for "<strong style="color:#e2e8f0">${q}</strong>"</div>`;
        return;
      }

      let html = '';
      let lastCat = null;

      filtered.forEach((item, i) => {
        const cat = item._type === 'action' ? 'Quick Actions' : item.c;
        if (cat !== lastCat) {
          html += `<div class="qap-cp-group">${cat}</div>`;
          lastCat = cat;
        }
        if (item._type === 'action') {
          html += `<div class="qap-cp-item${i===cursor?' active':''}" data-idx="${i}">
            <span class="qap-cp-icon">${item.icon}</span>
            <span style="flex:1;min-width:0"><div class="qap-cp-title">${item.t}</div><div class="qap-cp-desc">${item.d}</div></span>
          </div>`;
        } else {
          html += `<div class="qap-cp-item${i===cursor?' active':''}" data-idx="${i}">
            <span class="qap-cp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
            <span style="flex:1;min-width:0"><div class="qap-cp-title">${item.t}</div><div class="qap-cp-desc">${item.d}</div></span>
            <span class="qap-cp-badge">${item.c}</span>
          </div>`;
        }
      });
      results.innerHTML = html;

      results.querySelectorAll('.qap-cp-item').forEach(el => {
        el.addEventListener('click', () => { cursor = +el.dataset.idx; activate(); });
      });
    }

    function highlight() {
      results.querySelectorAll('.qap-cp-item').forEach((el, i) => {
        el.classList.toggle('active', i === cursor);
        if (i === cursor) el.scrollIntoView({ block: 'nearest' });
      });
    }

    function activate() {
      const item = filtered[cursor];
      if (!item) return;
      if (item._type === 'action') { close(); item.fn(); }
      else { close(); location.href = item.u; }
    }

    function close() {
      overlay.classList.remove('open');
      input.value = '';
      open = false;
    }

    window.__qapCP = {
      toggle() {
        if (overlay.classList.contains('open')) { close(); }
        else {
          overlay.classList.add('open');
          input.value = ''; render();
          setTimeout(() => input.focus(), 50);
          open = true;
        }
      }
    };
  }

  function init() {
    build();

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.__qapCP && window.__qapCP.toggle();
      }
    });

    /* Add Cmd+K hint to nav search icons if any */
    document.querySelectorAll('[data-search], .nav-search, .search-trigger').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); window.__qapCP && window.__qapCP.toggle(); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
