/* Qapitol QIRA — AI-Powered Assistant
 * Uses OpenAI-compatible API when configured, falls back to rich rule-based KB.
 *
 * To enable GPT: add BEFORE this script:
 *   <script>
 *     window.QIRA_CONFIG = { apiKey: 'sk-...', model: 'gpt-3.5-turbo' };
 *   </script>
 */
(function () {
  'use strict';

  const SYSTEM_PROMPT = `You are QIRA — Qapitol's intelligent AI assistant on qapitol.com. Be concise, helpful, and guide visitors to the right next step.

COMPANY: Qapitol — AI Governance & Control Layer. HQ Bengaluru, offices Dubai & New York. We help enterprises evaluate, govern, and assure AI — not just test models.

PRODUCTS:
- QAVE: AI Evaluation Platform. 1,200+ eval scenarios, regulatory mappings (EU AI Act, IRDAI, RBI, MAS). Free tier available.
- CHEQ: AI Compliance layer. 1,400+ mapped AI obligations. Auto-maps AI systems to regulations.
- SURE-Q: ISO 42001-aligned AI QA framework (Assess, Qualify, Monitor modules).
- Nexus: Multi-agent AI orchestration layer.
- Agent Fabric: Visual enterprise agentic workflow builder.
- Qurator: AI content & QA engine for regulated content.
- AgentOps: AI agent monitoring, observability, reliability.

SERVICES: AI Engineering, GCC & Captive Setup (90-day), AI Talent (2-4 week placement), Platform Engineering, Workflow Automation, BPO, AI TRISM, Synthetic Data.

QEN: Expert network, 200+ specialists, ₹600-₹12,000/task, remote.

PRICING: QAVE Free (1 model, 50 scenarios), Starter ₹15K/mo, Pro ₹45K/mo, Enterprise custom. CHEQ/SURE-Q engagement-based.

VS COMPETITORS (Infosys Topaz, TCS, Accenture): Pure-play focus, QEN human validation, SURE-Q built-in, faster delivery, transparent pricing.

RULES: Keep answers 3-8 sentences. Use **bold** and bullet lists. Always suggest a next step (demo, free trial, page visit). Never fabricate features. Qualify leads by asking about company, industry, use case.`;

  const KB = [
    { k:['qave','evaluate','evaluation','benchmark','llm test','model test','eval'], r:`**QAVE** is our AI Evaluation Platform — benchmark any LLM against your use case and regulatory requirements.\n\n- 1,200+ pre-built eval scenarios (BFSI, healthcare, legal)\n- Regulatory mappings: EU AI Act, IRDAI, RBI, MAS\n- Human-in-the-loop scoring via QEN experts\n- **Free tier** — evaluate your first model in <10 minutes\n\n[Try QAVE free →](qave.html) or I can set up a demo.` },
    { k:['cheq','compliance','policy','eu ai act','irdai','rbi','regulation','regulatory','circular','obligation'], r:`**CHEQ** is our AI Compliance layer — 1,400+ mapped obligations across all major AI regulations.\n\n- EU AI Act (full Annex mapping)\n- IRDAI, RBI, SEBI, MAS, CBUAE guidelines\n- ISO 42001 & NIST AI RMF\n\nCHEQ auto-maps your AI systems and flags compliance gaps. Want to see a demo for your specific regulatory context?` },
    { k:['sure-q','sureq','audit','iso 42001','quality','certification','framework'], r:`**SURE-Q** is our AI Quality Assurance framework — ISO 42001 for AI systems.\n\n- **Assess** — systematic risk profiling\n- **Qualify** — certification-ready testing\n- **Monitor** — ongoing drift detection\n\nClients use SURE-Q to prepare for ISO 42001 audits. Want a readiness assessment?` },
    { k:['nexus','orchestration','multi-agent','agentic','agent fabric'], r:`**Nexus** is our AI orchestration layer for multi-agent enterprise workflows.\n\n**Agent Fabric** is our drag-and-drop workflow builder for agentic pipelines — visual design, full API access.\n\nInterested in a technical demo?` },
    { k:['agentops','agent ops','observability','monitoring'], r:`**AgentOps** is our agent monitoring & reliability service — APM for AI agents.\n\n- Real-time observability into agent decision chains\n- Anomaly detection for hallucination loops\n- Cost tracking per agent run\n- Compliance event logging\n\n[Learn more about AgentOps →](agentops.html)` },
    { k:['platform engineering','mlops','llmops','data platform','infrastructure'], r:`**Platform Engineering** covers your AI infrastructure layer:\n\n- Modern data platform design (Lakehouse, medallion)\n- MLOps & LLMOps pipeline automation\n- Cloud-agnostic (AWS, Azure, GCP, on-prem)\n\n[See Platform Engineering →](platform-engineering.html)` },
    { k:['qen','expert','sme','contributor','network','earn','fellowship'], r:`**QEN — Qapitol Expert Network** — 200+ domain specialists.\n\n4 archetypes: Regulatory experts, Technical practitioners, Auditors, Industry operators.\n\n**Earn:** ₹600–₹12,000/task, fully remote.\n\n[Join QEN →](qen.html)` },
    { k:['price','pricing','cost','how much','subscription','plan','tier','fee'], r:`**QAVE Pricing:**\n- **Free** — 1 model, 50 scenarios, no card needed\n- **Starter** — ₹15,000/month\n- **Professional** — ₹45,000/month (unlimited + regulatory)\n- **Enterprise** — custom, on-prem, SLA\n\nCHEQ & SURE-Q are scoped per engagement. Want a custom quote?` },
    { k:['demo','book','meeting','call','schedule','appointment'], r:`Happy to help book a demo!\n\n- 30-min product walkthrough\n- 45-min architecture review\n- Regulatory readiness workshop\n\nClick "Book a Demo" in the nav — or I'll open the calendar now.`, fn:'calendly' },
    { k:['gcc','captive','global capability','india office','centre'], r:`**GCC Setup** — stand up AI-focused Global Capability Centres in India.\n\n- Location, legal entity & talent hiring\n- AI governance layer from day one\n- **90 days** from kick-off to first team operational\n\nShall I send our GCC Readiness Assessment?` },
    { k:['talent','hire','staffing','engineer','mlops','resource','people'], r:`**Talent Services** — on-demand AI professionals:\n\n- AI Engineers & Architects\n- MLOps & LLMOps Engineers\n- AI QA & Test Engineers\n- Governance & Compliance Analysts\n\n**Placement in 2–4 weeks.** [Submit a request →](hire.html)` },
    { k:['synthetic','data','privacy','training data'], r:`**Synthetic Data Management** — privacy-safe training data for regulated industries.\n\n- BFSI: synthetic transaction records\n- Healthcare: de-identified clinical notes\n- Insurance: synthetic claims data\n\nAll QEN-validated for statistical fidelity and compliance.` },
    { k:['about','company','who','founded','team','history'], r:`**Qapitol** — built by QE practitioners who saw AI break the old QE playbook. We pivoted to an **AI Control Layer**, helping enterprises govern and assure AI outcomes.\n\nHeadquartered in **Bengaluru**, offices in **Dubai** and **New York**.\n\n[Our story →](pivot.html) | [About us →](about.html)` },
    { k:['why','different','vs','compare','infosys','tcs','accenture','competitor'], r:`**Why Qapitol vs. big SIs:**\n\n- Pure-play AI governance (not a side practice)\n- QEN human validation on every eval\n- SURE-Q audit-ready from day one\n- **2–4 week** talent placement, **90-day** GCC\n- Transparent pricing\n\n[Full comparison →](why-qapitol.html)` },
    { k:['contact','email','reach','support'], r:`Reach us at:\n\n📧 **hello@qapitol.com**\n💬 **WhatsApp** — button at bottom-left\n📅 **Book a call** — 30-min slots this week` },
    { k:['bfsi','bank','banking','insurance','fintech'], r:`We're deeply embedded in **BFSI AI governance** — IRDAI, RBI, MAS, CBUAE mappings in CHEQ; BFSI eval scenarios in QAVE; synthetic transaction data.\n\nWant a BFSI-specific demo?` },
    { k:['uae','dubai','middle east','mena'], r:`Qapitol's **Dubai office** focuses on CBUAE/ADGM compliance, government AI governance, and MENA GCC setups.\n\n[UAE page →](uae.html)` },
  ];

  function ruleBasedResponse(msg) {
    const m = msg.toLowerCase();
    for (const item of KB) {
      if (item.k.some(k => m.includes(k))) return { text: item.r, fn: item.fn };
    }
    if (/^(hi|hello|hey|hiya|good\s*(morning|afternoon|evening))/.test(m.trim())) {
      return { text: "Hi! I'm **QIRA** — Qapitol's AI assistant.\n\nI can help with:\n- Products: QAVE, CHEQ, SURE-Q, Nexus, AgentOps\n- Services: GCC setup, AI talent, Platform Engineering\n- Pricing & demo booking\n\nWhat brings you here today?" };
    }
    return { text: `Great question. Let me connect you with the right person — they'll respond today.\n\n**Quick links:**\n- [Why Qapitol?](why-qapitol.html)\n- [QAVE Free Tier](qave.html)\n- [Book a Demo](contact.html)\n\nOr try: *"QAVE"*, *"pricing"*, *"GCC setup"* for instant answers.` };
  }

  async function aiResponse(history) {
    const cfg = window.QIRA_CONFIG || {};
    if (!cfg.apiKey) return null;
    const endpoint = cfg.endpoint || 'https://api.openai.com/v1/chat/completions';
    const model = cfg.model || 'gpt-3.5-turbo';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.apiKey}` },
        body: JSON.stringify({ model, messages: [{ role:'system', content: SYSTEM_PROMPT }, ...history], max_tokens: 420, temperature: 0.55 })
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.choices?.[0]?.message?.content || null;
    } catch { return null; }
  }

  function md(t) {
    return t
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#21a3b2;text-decoration:underline">$1</a>')
      .replace(/^- (.+)$/gm, '<li style="margin:2px 0">$1</li>')
      .replace(/(<li[^>]*>[\s\S]+?<\/li>)+/g, m => `<ul style="padding-left:14px;margin:5px 0">${m}</ul>`)
      .replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }

  function esc(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function build() {
    // Remove new chatbot elements (this script) + old widgets.js chatbot + old social ticker
    ['#qap-chat-toggle','#qap-chat-window','#qap-chat-css',
     '#qap-chat-btn','#qap-chat-panel','#social-ticker','#qap-announce'].forEach(s => document.querySelectorAll(s).forEach(el => el.remove()));

    const css = document.createElement('style');
    css.id = 'qap-chat-css';
    css.textContent = `
      #qap-chat-toggle{position:fixed;bottom:22px;right:22px;width:54px;height:54px;border-radius:50%;
        background:linear-gradient(135deg,#4d31f5 0%,#21a3b2 100%);border:none;cursor:pointer;
        display:flex;align-items:center;justify-content:center;z-index:9001;
        box-shadow:0 4px 20px rgba(77,49,245,.5);transition:transform .2s,box-shadow .2s;outline:none}
      #qap-chat-toggle:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(77,49,245,.65)}
      #qap-chat-toggle.open .ci-chat{display:none!important}
      #qap-chat-toggle.open .ci-close{display:flex!important}
      #qap-chat-badge{position:absolute;top:-3px;right:-3px;background:#f59e0b;color:#0a1628;
        font-size:10px;font-weight:700;min-width:18px;height:18px;border-radius:9px;
        display:flex;align-items:center;justify-content:center;padding:0 4px}
      #qap-chat-window{position:fixed;bottom:86px;right:22px;width:370px;
        max-width:calc(100vw - 28px);background:#0f1f35;
        border:1px solid rgba(255,255,255,.11);border-radius:18px;overflow:hidden;z-index:9001;
        box-shadow:0 20px 60px rgba(0,0,0,.7);display:none;flex-direction:column;
        height:525px;max-height:calc(100vh - 110px);font-family:inherit}
      #qap-chat-window.open{display:flex;animation:qira-in .28s cubic-bezier(.34,1.56,.64,1)}
      @keyframes qira-in{from{opacity:0;transform:scale(.9) translateY(12px)}to{opacity:1;transform:none}}
      #qap-chat-header{background:linear-gradient(135deg,#4d31f5 0%,#21a3b2 100%);
        padding:13px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}
      .qira-avatar{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.25);
        display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;flex-shrink:0}
      .qira-info{flex:1}
      .qira-name{font-weight:700;color:#fff;font-size:14px}
      .qira-status{font-size:11px;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:4px;margin-top:1px}
      .qira-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;animation:qira-pulse 2s infinite}
      @keyframes qira-pulse{0%,100%{opacity:1}50%{opacity:.4}}
      .qira-badge{background:rgba(255,255,255,.15);color:#fff;font-size:9px;font-weight:700;
        letter-spacing:.07em;padding:2px 7px;border-radius:10px;white-space:nowrap;flex-shrink:0}
      .qira-close{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.6);
        padding:4px;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:color .15s}
      .qira-close:hover{color:#fff}
      #qap-chat-messages{flex:1;overflow-y:auto;padding:13px 11px;display:flex;flex-direction:column;gap:8px}
      #qap-chat-messages::-webkit-scrollbar{width:3px}
      #qap-chat-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px}
      .qm{max-width:86%;font-size:13px;line-height:1.58;padding:10px 13px;border-radius:14px;word-break:break-word;animation:qm-in .22s ease}
      @keyframes qm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
      .qm.bot{background:rgba(255,255,255,.07);color:#dde6f0;border-bottom-left-radius:3px;align-self:flex-start}
      .qm.user{background:linear-gradient(135deg,#4d31f5,#21a3b2);color:#fff;border-bottom-right-radius:3px;align-self:flex-end}
      .qm.bot strong{color:#f59e0b}.qm.bot a{color:#21a3b2!important;text-decoration:underline}
      .qira-typing{display:flex;gap:4px;padding:10px 14px;background:rgba(255,255,255,.07);
        border-radius:14px;border-bottom-left-radius:3px;align-self:flex-start;width:55px}
      .qira-typing span{width:7px;height:7px;border-radius:50%;background:#475569;animation:qira-bonce 1.2s infinite}
      .qira-typing span:nth-child(2){animation-delay:.16s}.qira-typing span:nth-child(3){animation-delay:.32s}
      @keyframes qira-bonce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}
      #qira-chips{display:flex;gap:5px;flex-wrap:wrap;padding:2px 11px 8px;flex-shrink:0}
      .qira-chip{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.11);color:#94a3b8;
        font-size:11.5px;padding:5px 10px;border-radius:20px;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:inherit}
      .qira-chip:hover{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35);color:#f59e0b}
      #qira-input-row{display:flex;gap:8px;padding:9px 11px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;align-items:flex-end}
      #qira-input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
        border-radius:12px;padding:9px 12px;color:#f1f5f9;font-size:13px;outline:none;
        font-family:inherit;resize:none;min-height:38px;max-height:88px;line-height:1.44;transition:border-color .2s}
      #qira-input::placeholder{color:#475569}
      #qira-input:focus{border-color:rgba(77,49,245,.5)}
      #qira-send{background:linear-gradient(135deg,#4d31f5,#21a3b2);border:none;border-radius:11px;
        width:38px;height:38px;cursor:pointer;display:flex;align-items:center;justify-content:center;
        flex-shrink:0;transition:opacity .2s,transform .15s;outline:none}
      #qira-send:hover{opacity:.85;transform:scale(1.05)}
      #qira-send:disabled{opacity:.35;cursor:not-allowed;transform:none}
      #qira-footer{text-align:center;padding:4px 12px 8px;font-size:10px;color:#334155;flex-shrink:0}
      #qira-footer a{color:#334155;text-decoration:none}
      @media(max-width:480px){#qap-chat-window{right:8px;left:8px;width:auto;bottom:80px}#qap-chat-toggle{bottom:16px;right:16px}}
    `;
    document.head.appendChild(css);

    const toggle = document.createElement('button');
    toggle.id = 'qap-chat-toggle';
    toggle.setAttribute('aria-label','Chat with QIRA');
    toggle.setAttribute('aria-expanded','false');
    const isAI = !!(window.QIRA_CONFIG && window.QIRA_CONFIG.apiKey);
    toggle.innerHTML = `
      <span id="qap-chat-badge">1</span>
      <span class="ci-chat" style="display:flex;align-items:center;justify-content:center">
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </span>
      <span class="ci-close" style="display:none;align-items:center;justify-content:center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </span>`;

    const win = document.createElement('div');
    win.id = 'qap-chat-window';
    win.setAttribute('role','dialog');
    win.setAttribute('aria-label','QIRA Chat');
    win.innerHTML = `
      <div id="qap-chat-header">
        <div class="qira-avatar">Q</div>
        <div class="qira-info">
          <div class="qira-name">QIRA — Qapitol AI</div>
          <div class="qira-status"><span class="qira-dot"></span> Online · Replies instantly</div>
        </div>
        <span class="qira-badge">${isAI ? '✦ GPT' : '✦ Smart'}</span>
        <button class="qira-close" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div id="qap-chat-messages" role="log" aria-live="polite"></div>
      <div id="qira-chips">
        <button class="qira-chip" data-q="What is QAVE?">What is QAVE?</button>
        <button class="qira-chip" data-q="Tell me about CHEQ compliance">CHEQ</button>
        <button class="qira-chip" data-q="What is the pricing?">Pricing</button>
        <button class="qira-chip" data-q="Book a demo">Book demo</button>
        <button class="qira-chip" data-q="How is Qapitol different from Infosys Topaz?">vs. Big SIs</button>
      </div>
      <div id="qira-input-row">
        <textarea id="qira-input" placeholder="Ask about QAVE, CHEQ, GCC, pricing…" rows="1" aria-label="Chat input"></textarea>
        <button id="qira-send" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <div id="qira-footer">QIRA by Qapitol &middot; <a href="privacy.html">Privacy</a></div>`;

    document.body.appendChild(toggle);
    document.body.appendChild(win);

    const msgs = win.querySelector('#qap-chat-messages');
    const input = win.querySelector('#qira-input');
    const sendBtn = win.querySelector('#qira-send');
    const badge = toggle.querySelector('#qap-chat-badge');
    const chips = win.querySelector('#qira-chips');
    const closeBtn = win.querySelector('.qira-close');
    const history = [];
    let sending = false;

    function addMsg(text, type) {
      const d = document.createElement('div');
      d.className = `qm ${type}`;
      d.innerHTML = type === 'user' ? esc(text) : md(text);
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function showTyping() {
      const d = document.createElement('div');
      d.className = 'qira-typing';
      d.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function autoResize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 88) + 'px'; }

    function openCalendly() {
      const cal = document.getElementById('qap-cal-overlay');
      if (cal) cal.classList.add('open');
      else setTimeout(() => window.open('https://calendly.com/qapitol/demo','_blank'), 400);
    }

    async function send(text) {
      text = text.trim();
      if (!text || sending) return;
      sending = true;
      sendBtn.disabled = true;
      input.value = ''; input.style.height = 'auto';
      chips.style.display = 'none';
      badge.style.display = 'none';
      addMsg(text, 'user');
      history.push({ role:'user', content: text });
      const typing = showTyping();
      const cfg = window.QIRA_CONFIG || {};
      let reply;
      if (cfg.apiKey) {
        const aiText = await aiResponse(history);
        typing.remove();
        if (aiText) { reply = aiText; history.push({ role:'assistant', content:aiText }); if (history.length > 20) history.splice(0,2); }
        else { const fb = ruleBasedResponse(text); reply = fb.text; if (fb.fn === 'calendly') openCalendly(); }
      } else {
        await new Promise(r => setTimeout(r, 650 + Math.random() * 500));
        typing.remove();
        const fb = ruleBasedResponse(text); reply = fb.text; if (fb.fn === 'calendly') openCalendly();
      }
      addMsg(reply, 'bot');
      sending = false; sendBtn.disabled = false; input.focus();
    }

    function openChat() {
      win.classList.add('open'); toggle.classList.add('open'); toggle.setAttribute('aria-expanded','true');
      badge.style.display = 'none';
      if (msgs.children.length === 0) setTimeout(() => addMsg("Hi! I'm **QIRA** — Qapitol's AI assistant 👋\n\nI can help with products (QAVE, CHEQ, SURE-Q), services (GCC, AI talent, AgentOps), pricing and demos.\n\nWhat's on your mind?", 'bot'), 280);
      setTimeout(() => input.focus(), 350);
    }
    function closeChat() { win.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }

    toggle.addEventListener('click', () => win.classList.contains('open') ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', () => send(input.value));
    input.addEventListener('input', autoResize);
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); } });
    chips.querySelectorAll('.qira-chip').forEach(c => c.addEventListener('click', () => send(c.dataset.q)));

    if (!sessionStorage.getItem('qira-shown')) {
      setTimeout(() => { if (!win.classList.contains('open')) { badge.textContent='1'; badge.style.display='flex'; } sessionStorage.setItem('qira-shown','1'); }, 8000);
    } else { badge.style.display = 'none'; }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
