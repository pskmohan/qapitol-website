/* Qapitol AI Assistant — GPT-style conversational chatbot */
(function () {
  const KB = [
    { k:['qave','evaluate','evaluation','benchmark','llm test','model test','eval'], r:`**QAVE** is our AI Evaluation Platform — it lets you benchmark any LLM against your specific use case, regulatory regime, and risk tolerance.\n\n**Key capabilities:**\n- 1,200+ pre-built eval scenarios across BFSI, healthcare, legal\n- Regulatory mappings: EU AI Act, IRDAI, RBI, SEBI, MAS\n- Human-in-the-loop scoring via QEN expert network\n- Free tier available — evaluate your first model in minutes\n\nWant me to set up a demo or point you to the free tier?` },
    { k:['cheq','compliance','policy','obligation','eu ai act','irdai','rbi','regulation','regulatory'], r:`**CHEQ** is our AI Compliance layer — it maintains a living library of 1,400+ mapped AI obligations across every major regulation.\n\n**What it covers:**\n- EU AI Act (full Annex mapping)\n- IRDAI, RBI, SEBI circulars for Indian BFSI\n- MAS TRM, HKMA, UAE CBUAE guidelines\n- ISO 42001 and NIST AI RMF\n\nCHEQ auto-maps your AI system to applicable requirements and flags gaps. Would you like to see a demo for your specific regulatory context?` },
    { k:['sure-q','sureq','audit','framework','certification','iso 42001','quality'], r:`**SURE-Q** is our AI Quality Assurance framework — think of it as the ISO 9001 for AI systems.\n\nIt covers:\n- Systematic risk assessment (SURE-Q Assess)\n- Qualification testing (SURE-Q Qualify)\n- Ongoing monitoring (SURE-Q Monitor)\n\nSURE-Q is used by our clients to prepare for ISO 42001 certification and regulatory audits. Shall I connect you with someone who can walk you through a readiness assessment?` },
    { k:['qen','expert','sme','contributor','join','network','earn'], r:`**QEN — the Qapitol Expert Network** is our curated community of 200+ domain specialists.\n\n**4 expert archetypes:**\n1. Regulatory & Legal Experts — policy packs, CHEQ validation\n2. Technical Practitioners — QAVE benchmark design, RLHF\n3. Auditors & Assessors — SURE-Q, ISO 42001 readiness\n4. Industry Operators — client engagements, training\n\n**Earnings:** ₹600–₹12,000 per task, 100% remote.\n\nInterested in joining? Head to [qen.html] or I can explain the tiers in more detail.` },
    { k:['price','pricing','cost','how much','subscription','plan','tier'], r:`**QAVE Pricing:**\n- **Free tier** — evaluate 1 model, 50 scenarios, no credit card\n- **Starter** — ₹15,000/month, 5 models, 500 scenarios\n- **Professional** — ₹45,000/month, unlimited models + regulatory mappings\n- **Enterprise** — custom pricing, on-prem option, SLA\n\nFor CHEQ and SURE-Q, pricing is engagement-based — typically scoped to your regulatory footprint and number of AI systems.\n\nWant me to connect you with our team for a custom quote?` },
    { k:['demo','book','meeting','call','talk','schedule'], r:`Absolutely — I can help you book a demo.\n\n**We offer:**\n- 30-min product walkthrough (QAVE, CHEQ, or SURE-Q)\n- 45-min architecture review for enterprise deployments\n- Custom workshops for GCC or regulatory teams\n\nClick **Book a Demo** in the nav or I'll open our calendar right now — which would you prefer?`, fn: 'calendly' },
    { k:['gcc','captive','centre','setup','india'], r:`**GCC (Global Capability Centre) Setup** is one of our flagship services.\n\nWe help enterprises:\n1. Design and stand up AI-focused GCCs in India (Bengaluru, Hyderabad, Pune)\n2. Staff with qualified AI engineers, QA leads, MLOps, and governance roles\n3. Build the AI governance layer from day one — not as an afterthought\n\nTypical timeline: 90 days from kick-off to first team operational.\n\nShall I send you our GCC readiness assessment, or would you prefer a call?` },
    { k:['talent','hire','staffing','engineer','mlops','aiops','resource','people'], r:`**Qapitol Talent Services** provides on-demand AI professionals:\n\n- AI Engineers & Architects\n- MLOps & LLMOps Engineers  \n- AI Quality & Test Engineers\n- Forward Deployment Engineers\n- Governance & Compliance Analysts\n\nWe place talent in 2–4 weeks. Both contract and permanent.\n\nYou can submit a talent request at [hire.html] or tell me what profile you're looking for and I'll pass it to our team.` },
    { k:['labs','research','open source','innovation'], r:`**Qapitol Labs** is our research and open-source arm.\n\nCurrent focus areas:\n- Eval frameworks for agentic AI systems\n- Synthetic data generation for regulated industries\n- LLM red-teaming methodologies\n- AI governance toolkits (open-source)\n\nFellows from the QEN network contribute to Labs research on a flexible basis. Want to know more about Labs projects or the Fellow programme?` },
    { k:['about','company','who','founded','team','history'], r:`**Qapitol** was built by practitioners who spent years in quality engineering — and saw AI break the old QE playbook.\n\nWe pivoted from a QE services company to an **AI Control Layer** — helping enterprises evaluate, govern, and assure AI outcomes, not just test models.\n\nHeadquartered in Bengaluru with teams in Dubai and New York.\n\nWant to know more about our leadership team, or shall I point you to our story?` },
    { k:['contact','email','phone','reach','support'], r:`You can reach us at:\n\n📧 **hello@qapitol.com**\n💬 **WhatsApp** — use the button at the bottom-left of this page\n📅 **Book a call** — 30 min slots available this week\n\nOr just tell me what you need here and I'll make sure the right person gets back to you today.` },
    { k:['synthetic','data','privacy','training data'], r:`**Synthetic Data Management** is one of our core capabilities — we generate statistically faithful, privacy-safe training datasets for regulated industries.\n\nUse cases:\n- BFSI: synthetic transaction records for fraud model training\n- Healthcare: de-identified clinical notes for clinical NLP\n- Insurance: synthetic claims data for underwriting models\n\nAll generated data is validated by QEN domain specialists for realism and regulatory compliance.` },
  ];

  const GREETINGS = [
    "Hi there! I'm QIRA — Qapitol's AI assistant. I can help you understand our products, pricing, or set up a demo. What are you working on?",
    "Hello! I'm QIRA, your Qapitol guide. Ask me anything about QAVE, CHEQ, SURE-Q, or how we help enterprises govern AI. How can I help?",
  ];

  function getResponse(msg) {
    const m = msg.toLowerCase();
    for (const item of KB) {
      if (item.k.some(k => m.includes(k))) return { text: item.r, fn: item.fn };
    }
    if (m.includes('hi') || m.includes('hello') || m.includes('hey')) {
      return { text: "Hi! Great to meet you. I'm QIRA — I can help with questions about QAVE (AI evaluation), CHEQ (compliance), SURE-Q (audit framework), QEN (expert network), pricing, demos, or talent. What's on your mind?" };
    }
    return { text: `Thanks for asking about "${msg.slice(0,60)}". That's a great question — let me connect you with the right person on our team.\n\n**In the meantime**, you might find these helpful:\n- [Why Qapitol](why-qapitol.html) — our positioning vs. Infosys Topaz / TCS\n- [QAVE Free](qave.html) — start evaluating your AI today\n- [Book a Demo](contact.html) — 30 min with a product specialist\n\nOr type something like *"tell me about QAVE"* and I'll answer directly.` };
  }

  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#21a3b2">$1</a>')
      .replace(/\[(.+?)\]/g, '<a href="$1" style="color:#21a3b2">$1</a>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul style="padding-left:16px;margin:6px 0">$1</ul>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  function build() {
    const css = `
      #qap-chat-toggle{position:fixed;bottom:22px;right:22px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#4d31f5,#21a3b2);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:9001;box-shadow:0 4px 20px rgba(77,49,245,.5);transition:transform .2s,box-shadow .2s}
      #qap-chat-toggle:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(77,49,245,.65)}
      #qap-chat-toggle svg{transition:transform .3s}
      #qap-chat-toggle.open svg.chat-icon{display:none}
      #qap-chat-toggle.open svg.close-icon{display:block!important}
      #qap-chat-badge{position:absolute;top:-2px;right:-2px;background:#f59e0b;color:#0a1628;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center}
      #qap-chat-window{position:fixed;bottom:82px;right:22px;width:360px;max-width:calc(100vw - 32px);background:#0f1f35;border:1px solid rgba(255,255,255,.12);border-radius:16px;overflow:hidden;z-index:9001;box-shadow:0 16px 48px rgba(0,0,0,.6);display:none;flex-direction:column;height:500px;max-height:calc(100vh - 110px)}
      #qap-chat-window.open{display:flex}
      #qap-chat-header{background:linear-gradient(135deg,#4d31f5 0%,#21a3b2 100%);padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0}
      #qap-chat-header .avatar{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#fff;flex-shrink:0}
      #qap-chat-header .info{flex:1}
      #qap-chat-header .name{font-weight:600;color:#fff;font-size:14px}
      #qap-chat-header .status{font-size:11px;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:4px}
      #qap-chat-header .dot{width:7px;height:7px;border-radius:50%;background:#4ade80}
      #qap-chat-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
      #qap-chat-messages::-webkit-scrollbar{width:3px}
      #qap-chat-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px}
      .qap-msg{max-width:85%;font-size:13px;line-height:1.55;padding:10px 13px;border-radius:12px;word-break:break-word;animation:qap-msg-in .25s ease}
      @keyframes qap-msg-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
      .qap-msg.bot{background:rgba(255,255,255,.07);color:#e2e8f0;border-bottom-left-radius:4px;align-self:flex-start}
      .qap-msg.user{background:linear-gradient(135deg,#4d31f5,#21a3b2);color:#fff;border-bottom-right-radius:4px;align-self:flex-end}
      .qap-msg.bot strong{color:#f59e0b}
      .qap-typing{display:flex;gap:4px;padding:10px 13px;background:rgba(255,255,255,.07);border-radius:12px;border-bottom-left-radius:4px;align-self:flex-start;width:52px}
      .qap-typing span{width:7px;height:7px;border-radius:50%;background:#64748b;animation:qap-bounce 1.2s ease-in-out infinite}
      .qap-typing span:nth-child(2){animation-delay:.15s}
      .qap-typing span:nth-child(3){animation-delay:.3s}
      @keyframes qap-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
      #qap-chat-suggestions{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 10px;flex-shrink:0}
      .qap-chip{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#94a3b8;font-size:11.5px;padding:5px 10px;border-radius:20px;cursor:pointer;transition:all .15s;white-space:nowrap}
      .qap-chip:hover{background:rgba(245,158,11,.15);border-color:rgba(245,158,11,.4);color:#f59e0b}
      #qap-chat-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.08);flex-shrink:0}
      #qap-chat-input{flex:1;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px 12px;color:#f1f5f9;font-size:13px;outline:none;font-family:inherit;resize:none;min-height:38px;max-height:80px}
      #qap-chat-input::placeholder{color:#475569}
      #qap-chat-input:focus{border-color:rgba(77,49,245,.5)}
      #qap-chat-send{background:linear-gradient(135deg,#4d31f5,#21a3b2);border:none;border-radius:10px;width:38px;height:38px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s}
      #qap-chat-send:hover{opacity:.85}
      #qap-chat-footer{text-align:center;padding:4px 12px 8px;font-size:10px;color:#334155;flex-shrink:0}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const toggle = document.createElement('button');
    toggle.id = 'qap-chat-toggle';
    toggle.setAttribute('aria-label', 'Open chat');
    toggle.innerHTML = `
      <span id="qap-chat-badge">1</span>
      <svg class="chat-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg class="close-icon" style="display:none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    `;

    const win = document.createElement('div');
    win.id = 'qap-chat-window';
    win.innerHTML = `
      <div id="qap-chat-header">
        <div class="avatar">Q</div>
        <div class="info">
          <div class="name">QIRA — Qapitol AI</div>
          <div class="status"><span class="dot"></span> Online · Typically replies instantly</div>
        </div>
      </div>
      <div id="qap-chat-messages"></div>
      <div id="qap-chat-suggestions">
        <button class="qap-chip" data-q="Tell me about QAVE">What is QAVE?</button>
        <button class="qap-chip" data-q="How does CHEQ work?">CHEQ compliance</button>
        <button class="qap-chip" data-q="Show me pricing">Pricing</button>
        <button class="qap-chip" data-q="Book a demo">Book demo</button>
      </div>
      <div id="qap-chat-input-row">
        <textarea id="qap-chat-input" placeholder="Ask about QAVE, CHEQ, pricing…" rows="1"></textarea>
        <button id="qap-chat-send" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <div id="qap-chat-footer">Powered by Qapitol AI · <a href="privacy.html" style="color:#475569">Privacy</a></div>
    `;

    document.body.appendChild(toggle);
    document.body.appendChild(win);

    const msgs = win.querySelector('#qap-chat-messages');
    const input = win.querySelector('#qap-chat-input');
    const sendBtn = win.querySelector('#qap-chat-send');
    const badge = toggle.querySelector('#qap-chat-badge');
    const suggestions = win.querySelector('#qap-chat-suggestions');

    function addMsg(text, type) {
      const d = document.createElement('div');
      d.className = `qap-msg ${type}`;
      d.innerHTML = type === 'bot' ? renderMarkdown(text) : escapeHtml(text);
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function escapeHtml(t) { return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function showTyping() {
      const d = document.createElement('div');
      d.className = 'qap-typing';
      d.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function send(text) {
      if (!text.trim()) return;
      addMsg(text, 'user');
      input.value = '';
      suggestions.style.display = 'none';
      badge.style.display = 'none';

      const typing = showTyping();
      const delay = 800 + Math.random() * 700;
      setTimeout(() => {
        typing.remove();
        const { text: reply, fn } = getResponse(text);
        addMsg(reply, 'bot');
        if (fn === 'calendly') {
          const cal = document.getElementById('qap-cal-overlay');
          if (cal) cal.classList.add('open');
        }
      }, delay);
    }

    sendBtn.onclick = () => send(input.value);
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); } });
    win.querySelectorAll('.qap-chip').forEach(c => { c.onclick = () => send(c.dataset.q); });

    toggle.onclick = () => {
      const isOpen = win.classList.contains('open');
      win.classList.toggle('open');
      toggle.classList.toggle('open');
      badge.style.display = 'none';
      if (!isOpen && msgs.children.length === 0) {
        const g = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
        setTimeout(() => addMsg(g, 'bot'), 300);
      }
    };

    /* Remove existing chatbot if any */
    ['#chatbot','#chat-widget','.chatbot-widget','.chat-widget'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();

  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" style="color:#21a3b2">$1</a>')
      .replace(/\[(.+?)\]/g,'<a href="$1" style="color:#21a3b2">$1</a>')
      .replace(/^- (.+)$/gm,'<li style="margin:3px 0">$1</li>')
      .replace(/(<li[^>]*>.*<\/li>)/s,'<ul style="padding-left:16px;margin:6px 0">$1</ul>')
      .replace(/^(\d+)\. (.+)$/gm,'<li style="margin:3px 0">$2</li>')
      .replace(/\n\n/g,'<br><br>')
      .replace(/\n/g,'<br>');
  }
})();
