/* ============================================================
   Qapitol AI Assistant — v3.0
   Context-aware | Full knowledge base | Lead capture
   Voice-ready architecture (future: Web Speech API)
   ============================================================ */

(function () {
  "use strict";

  /* ── KNOWLEDGE BASE ──────────────────────────────────────── */
  const KB = {
    company: "Qapitol is the AI Governance & Control Layer for the enterprise — the authoritative system for quality, compliance, and reliability across your AI portfolio. Founded 2016, headquartered in Hyderabad. 350+ practitioners, 25+ unicorns served.",
    positioning: "We are NOT a testing company. We are the governance and control layer between AI ambition and AI accountability. Platforms, services, and talent — all aligned to the same mission.",
    pillars: {
      "Digital Reliability": "End-to-end quality engineering — functional, performance, security, DevOps, crowd testing, consulting. For teams that need always-on digital reliability.",
      "AI Engineering": "Agentic QE, AI Evaluation (Evals), SLM fine-tuning, RLHF pipelines, Synthetic Data Management, AI Compliance Testing (IRDAI, EU AI Act, RBI). Sovereign AI deployment.",
      "Intelligent Automation": "AI-driven test generation, self-healing suites, autonomous agent execution via Agent Fabric. No human babysitting your test suite.",
      "Talent Services": "AI Engineers, Forward Deployment Engineers, MLOps, AIOps, QE practitioners, Cloud AI Architects, AI PMs. India, UAE, US, UK delivery. 2-week placement SLA."
    },
    platforms: {
      "QAVE": "AI Simulation & Evaluation Engine. Free tier available — 500 eval runs/month, IRDAI, EU AI Act, RBI frameworks. Enterprise: Sovereign AI, unlimited runs, SLM fine-tuning, RLHF. Try free at qave-platform.html",
      "Nexus": "QE Intelligence Platform. AI-powered requirement analysis, test generation, self-healing automation, coverage tracking.",
      "CHEQ": "AI Compliance Platform. 1,400+ obligations mapped. IRDAI, RBI, EU AI Act, DORA, Solvency II. SLM-powered obligation detection. Policy Reasoning Traces.",
      "Agent Fabric": "Autonomous QE execution. Multi-agent orchestration across your SDLC — test, heal, report without human intervention.",
      "Qurator": "Evaluation orchestration. Multi-model eval pipelines, eval dataset management, portfolio-level AI quality tracking."
    },
    differentiators: [
      "Only AI governance platform with Sovereign AI deployment (fully on-prem/VPC)",
      "IRDAI-specialist — India's most experienced AI compliance team",
      "SLMs achieving 94.2% F1 on insurance documents vs 81.3% for GPT-4o — at 1% the cost",
      "Platform-backed talent — every practitioner is QAVE/Nexus trained",
      "Full stack: not QE-only — AI Engineers, MLOps, AIOps, Forward Deployment Engineers"
    ],
    pricing: "QAVE Free: ₹0/mo, 500 eval runs. QAVE Growth: ₹24,999/mo. Enterprise: custom. CHEQ from ₹49,999/mo. See pricing.html for full details.",
    international: "India (350+ team), UAE (ADGM/DFSA compliance, Vision 2030), USA (EU AI Act for US companies, LLM eval, 60-70% cost vs local), UK/Europe (EU AI Act, DORA).",
    regulations: "IRDAI AI Guidelines 2024, RBI AI Framework, EU AI Act (all risk tiers), DORA, Solvency II, IDD, NIST AI RMF, ISO 42001, MAS AI Ethics, SEBI AI Guidelines.",
    usecases: {
      "BFSI": "Credit model fairness, fraud AI explainability, DORA resilience, RBI compliance.",
      "Insurance": "IRDAI AI compliance, underwriting model validation, claims automation testing, Solvency II.",
      "Healthcare": "Diagnostic AI safety, clinical NLP evaluation, PHI leakage detection, EU AI Act High-Risk.",
      "Logistics": "Route optimization AI validation, demand forecasting, warehouse automation QE.",
      "Tech/SaaS": "LLM product evaluation, pre-launch safety check, investor-ready AI governance."
    },
    contact: "Email: info@qapitol.com | Phone: +91-9916097099 | Book a demo: contact.html",
    freeQAVE: "QAVE Free Tier is live. 500 eval runs/month. IRDAI, EU AI Act, RBI frameworks. No credit card. Sign up at qave-platform.html",
    careers: "13 open roles: ML Scientist, Senior AI Platform Engineer, DevOps/MLOps, AI QE Engineers (×2), Solutions Engineer, Regulatory SME, Product Manager, Delivery Manager (BFSI), Senior SDET, Performance Lead, AI QE Consultant. See careers.html",
    partnerships: "6 partnership types: Delivery, Resale, Distribution, Implementation, Talent, Co-Innovation. Apply at partnerships.html. Current partners: GenRocket, Composo, Anthropic, Cursor."
  };

  /* ── PAGE CONTEXT DETECTION ──────────────────────────────── */
  function detectPageContext() {
    const url = location.pathname.toLowerCase();
    const title = document.title.toLowerCase();
    if (url.includes("qave") || url.includes("platform")) return "qave";
    if (url.includes("cheq")) return "cheq";
    if (url.includes("pricing")) return "pricing";
    if (url.includes("careers")) return "careers";
    if (url.includes("partner")) return "partner";
    if (url.includes("talent")) return "talent";
    if (url.includes("ai-engineering") || url.includes("ai-evaluation")) return "ai";
    if (url.includes("industries")) return "industry";
    if (url.includes("insights") || url.includes("blog")) return "insights";
    if (url.includes("about")) return "about";
    if (url.includes("contact")) return "contact";
    return "home";
  }

  /* ── CONFIG ──────────────────────────────────────────────── */
  const CONFIG = {
    chatTitle: "Qapitol AI",
    exitDelay: 9000,
    exitCooldown: 86400000,
    chatCooldown: 604800000,
    webhookUrl: "",
  };

  /* ── CONTEXT-AWARE WELCOME MESSAGES ─────────────────────── */
  const CONTEXT_WELCOME = {
    qave: "👋 Exploring QAVE? I can tell you about eval runs, regulatory frameworks, free tier limits, or help you get started. What would you like to know?",
    cheq: "👋 Looking at CHEQ? I can walk you through IRDAI, EU AI Act, or RBI compliance coverage, or book you a demo with our compliance team.",
    pricing: "👋 Questions about pricing? I can compare plans, explain what's included in each tier, or connect you with our sales team for a custom quote.",
    careers: "👋 Interested in joining Qapitol? I can tell you about open roles, our culture, benefits, or help you apply directly.",
    partner: "👋 Exploring a partnership? We have 6 partnership models — I can help you find the right fit and connect you with our partnerships team.",
    talent: "👋 Looking for AI talent? I can help you find the right skill track, explain engagement models, or discuss international deployment.",
    ai: "👋 Exploring AI Engineering at Qapitol? I can tell you about our SLMs, RLHF pipelines, QAVE evaluations, or Sovereign AI deployments.",
    industry: "👋 Looking for industry-specific AI governance solutions? Tell me your sector and I'll walk you through what Qapitol does there.",
    insights: "👋 Want to dive deeper? I can point you to the most relevant blog post, whitepaper, or research paper for your use case.",
    about: "👋 Want to know more about Qapitol? Ask me anything — our history, positioning, leadership, or what makes us different.",
    contact: "👋 Ready to talk? I can help you book a demo, connect to the right team, or answer quick questions before you reach out.",
    home: "👋 Hi! I'm Qapitol's AI assistant. I know everything about our platforms, services, talent, and partnerships. What can I help you with?",
  };

  /* ── FLOWS ───────────────────────────────────────────────── */
  const FLOWS = {
    welcome: {
      bot: () => CONTEXT_WELCOME[detectPageContext()],
      options: [
        { label: "🧪 Explore platforms & QAVE free tier", flow: "platforms" },
        { label: "🛡️ AI Compliance (IRDAI/EU AI Act/RBI)", flow: "compliance" },
        { label: "👥 Deploy AI talent", flow: "talent" },
        { label: "🤝 Partner with us", flow: "partner" },
        { label: "💼 Job opportunities", flow: "jobs" },
        { label: "💬 Talk to a human", flow: "human" },
      ],
    },
    platforms: {
      bot: "We have 5 proprietary platforms. QAVE (free tier available!), Nexus, CHEQ, Agent Fabric, and Qurator. What interests you?",
      options: [
        { label: "🆓 QAVE Free Tier — try now", url: "qave-platform.html" },
        { label: "⚖️ CHEQ — AI compliance", url: "cheq.html" },
        { label: "🔗 Nexus — QE intelligence", url: "nexus.html" },
        { label: "⚡ Agent Fabric — autonomous QE", url: "agent-fabric.html" },
        { label: "💰 See all pricing", url: "pricing.html" },
        { label: "← Back", flow: "welcome" },
      ],
    },
    compliance: {
      bot: "AI compliance is core to what we do. We cover IRDAI, RBI, EU AI Act, DORA, Solvency II, ISO 42001, and more — 1,400+ obligations mapped. Which framework do you need?",
      options: [
        { label: "🇮🇳 IRDAI AI Guidelines", flow: "compliance_irdai" },
        { label: "🇪🇺 EU AI Act", flow: "compliance_eu" },
        { label: "🏦 RBI AI Framework", flow: "compliance_rbi" },
        { label: "🔄 DORA / Solvency II", flow: "compliance_dora" },
        { label: "📊 Book a compliance demo", flow: "lead_capture" },
        { label: "← Back", flow: "welcome" },
      ],
    },
    compliance_irdai: {
      bot: "IRDAI's 2024 AI Guidelines cover fairness, explainability, accountability, data governance, and operational resilience. Our CHEQ platform maps every obligation and generates audit-ready Policy Reasoning Traces. Examination findings: zero for clients who've used it. Want a demo?",
      options: [
        { label: "📅 Book IRDAI compliance demo", flow: "lead_capture" },
        { label: "📄 Download IRDAI guide (free)", url: "contact.html?download=irdai-guide" },
        { label: "🔍 Explore CHEQ platform", url: "cheq.html" },
        { label: "← Back", flow: "compliance" },
      ],
    },
    compliance_eu: {
      bot: "EU AI Act applies to all AI systems used in the EU — including US and Indian companies with EU-facing products. We cover all risk tiers (Minimal, Limited, High, Unacceptable), obligation mapping, and evidence generation. Free checklist available.",
      options: [
        { label: "📅 Book EU AI Act assessment", flow: "lead_capture" },
        { label: "📄 Free EU AI Act checklist", url: "contact.html?download=eu-ai-act-checklist" },
        { label: "🔍 Explore CHEQ platform", url: "cheq.html" },
        { label: "← Back", flow: "compliance" },
      ],
    },
    compliance_rbi: {
      bot: "RBI's AI governance framework requires explainability and accountability for AI in banking and financial services. Our CHEQ platform and on-premise QAVE deployment are purpose-built to satisfy RBI's data residency and model transparency requirements.",
      options: [
        { label: "📅 Talk to our RBI expert", flow: "lead_capture" },
        { label: "🔒 Sovereign AI deployment", url: "cheq.html" },
        { label: "← Back", flow: "compliance" },
      ],
    },
    compliance_dora: {
      bot: "DORA (Digital Operational Resilience Act) requires ICT risk management for financial entities in the EU. We cover AI system incident reporting, operational resilience testing, and third-party AI risk management under DORA. Solvency II AI model risk is also covered.",
      options: [
        { label: "📅 Book DORA assessment", flow: "lead_capture" },
        { label: "← Back", flow: "compliance" },
      ],
    },
    talent: {
      bot: "We're not a staffing firm — we're the execution layer of your AI stack. We deploy AI Engineers, Forward Deployment Engineers, MLOps, AIOps, QE practitioners, and more. Where do you need talent?",
      options: [
        { label: "🤖 AI / ML Engineers", flow: "talent_ai" },
        { label: "🚀 Forward Deployment Engineers", flow: "talent_fde" },
        { label: "⚙️ MLOps / AIOps", flow: "talent_mlops" },
        { label: "🛡️ QE / SDET / Performance", flow: "talent_qe" },
        { label: "🌍 International deployment", flow: "talent_intl" },
        { label: "← Back", flow: "welcome" },
      ],
    },
    talent_ai: {
      bot: "Our AI/ML Engineers specialize in LLM fine-tuning (LoRA, QLoRA), RAG architecture, RLHF pipelines, and domain-specific SLM development for BFSI and healthcare. Platform-trained on QAVE and Agent Fabric. 2-week placement SLA.",
      options: [
        { label: "📋 Request AI/ML talent", flow: "lead_capture" },
        { label: "💼 See all skill tracks", url: "talent-services.html#skills" },
        { label: "← Back", flow: "talent" },
      ],
    },
    talent_fde: {
      bot: "Forward Deployment Engineers (FDEs) are our highest-value talent. They live in your client environment, translate platform capability into client-specific solutions, and own the bridge between product and business outcome. Think Palantir's model, applied to AI governance.",
      options: [
        { label: "📋 Request FDE talent", flow: "lead_capture" },
        { label: "← Back", flow: "talent" },
      ],
    },
    talent_mlops: {
      bot: "Our MLOps engineers handle ML pipeline automation, model registry, experiment tracking, CI/CD for model deployment, and GPU infrastructure optimization. AIOps specialists bring AI-driven observability and self-healing infrastructure.",
      options: [
        { label: "📋 Request MLOps/AIOps talent", flow: "lead_capture" },
        { label: "← Back", flow: "talent" },
      ],
    },
    talent_qe: {
      bot: "Our QE practitioners aren't your grandfather's SDETs. Every engineer is QAVE-certified, Nexus-proficient, and trained in agentic testing. Skill tracks: Playwright/Selenium automation, performance (k6/Gatling), security, API, mobile, and AI evaluation.",
      options: [
        { label: "📋 Request QE talent", flow: "lead_capture" },
        { label: "💼 See QE roles", url: "talent-services.html#skills" },
        { label: "← Back", flow: "talent" },
      ],
    },
    talent_intl: {
      bot: "We deploy internationally across India, UAE, USA, and UK. For the UAE — ADGM/DFSA compliance and Vision 2030 AI. For the USA — EU AI Act compliance and LLM eval at 60-70% of local cost. For UK/Europe — EU AI Act full implementation.",
      options: [
        { label: "🇦🇪 Middle East engagement", url: "contact.html?geo=me" },
        { label: "🇺🇸 USA engagement", url: "contact.html?geo=us" },
        { label: "🇬🇧 UK/Europe engagement", url: "contact.html?geo=uk" },
        { label: "← Back", flow: "talent" },
      ],
    },
    partner: {
      bot: "We have 6 partnership models — each with real commercial upside. We're building the AI governance ecosystem together. What type of partnership fits?",
      options: [
        { label: "🚚 Delivery Partner", flow: "partner_capture" },
        { label: "🔁 Resale / Distribution", flow: "partner_capture" },
        { label: "🔧 Implementation Partner", flow: "partner_capture" },
        { label: "💡 Co-Innovation Partner", flow: "partner_capture" },
        { label: "👥 Talent Partner", flow: "partner_capture" },
        { label: "← Back", flow: "welcome" },
      ],
    },
    partner_capture: {
      bot: "Excellent! Our Partnerships team reviews all applications within 2 business days. Leave your company name, email, and what you're hoping to build together.",
      options: [],
      inputMode: "partner",
      inputPlaceholder: "Company, email, and partnership goal…",
    },
    jobs: {
      bot: "We're hiring! 13 open roles across AI Engineering, Platform, GTM, and QE Delivery. 4.6★ Glassdoor. ₹4L learning budget. Full AI tool stack provided. What's your background?",
      options: [
        { label: "🧠 AI / ML Engineering", flow: "jobs_apply" },
        { label: "⚙️ Platform / MLOps / DevOps", flow: "jobs_apply" },
        { label: "🛡️ Quality Engineering / SDET", flow: "jobs_apply" },
        { label: "📈 GTM / Sales / Pre-Sales", flow: "jobs_apply" },
        { label: "📋 All open roles", url: "careers.html#open-roles" },
        { label: "← Back", flow: "welcome" },
      ],
    },
    jobs_apply: {
      bot: "We'd love to hear from you! Drop your name, email, and 1–2 sentences on your background. Our talent team responds within 3 business days.",
      options: [],
      inputMode: "job",
      inputPlaceholder: "Your name, email, and brief background…",
    },
    lead_capture: {
      bot: "Happy to connect you with the right team. What's the best email to reach you?",
      options: [],
      inputMode: "lead",
      inputPlaceholder: "your@company.com",
    },
    human: {
      bot: "Of course. Leave your name and email and the most relevant Qapitol team member will be in touch within one business day. Or call us directly: +91-9916097099.",
      options: [],
      inputMode: "lead",
      inputPlaceholder: "Name and email…",
    },
    thanks: {
      bot: "✅ Got it! We'll be in touch shortly. Anything else I can help with in the meantime?",
      options: [
        { label: "🆓 Try QAVE free", url: "qave-platform.html" },
        { label: "📚 Browse insights", url: "insights.html" },
        { label: "🏠 Back to home", url: "index.html" },
      ],
    },
  };

  /* ── NLP-LITE: KEYWORD INTENT ROUTING ───────────────────── */
  function detectIntent(text) {
    const t = text.toLowerCase();
    if (/irdai|insurance|insur/i.test(t)) return "compliance_irdai";
    if (/eu ai act|europe|dora|gdpr/i.test(t)) return "compliance_eu";
    if (/rbi|bank|neft|nbfc/i.test(t)) return "compliance_rbi";
    if (/pric|cost|how much|plan|subscri/i.test(t)) return null; // send to pricing URL
    if (/qave|eval|evaluat/i.test(t)) return "platforms";
    if (/cheq|complian/i.test(t)) return "compliance";
    if (/talent|hire|staff|enginer|deploy/i.test(t)) return "talent";
    if (/job|career|apply|work|hiring/i.test(t)) return "jobs";
    if (/partner|collab|resell/i.test(t)) return "partner";
    if (/usa|us |united states|america/i.test(t)) return "talent_intl";
    if (/uae|dubai|middle east|saudi|gulf/i.test(t)) return "talent_intl";
    if (/forward deploy|fde|palantir/i.test(t)) return "talent_fde";
    if (/mlops|aiops|devops|devsecops/i.test(t)) return "talent_mlops";
    if (/sovereign|on.?prem|air.?gap|vpc/i.test(t)) return "compliance_rbi";
    return null;
  }

  /* ── STATE ───────────────────────────────────────────────── */
  let state = { open: false, currentFlow: "welcome", inputMode: null, exitArmed: false, exitShown: false };

  /* ── UTILS ───────────────────────────────────────────────── */
  function ls(key, val) {
    try { if (val !== undefined) localStorage.setItem("qap_" + key, val); return localStorage.getItem("qap_" + key); }
    catch (e) { return null; }
  }
  function timeAgo(key) { return Date.now() - parseInt(ls(key) || "0", 10); }
  function submitLead(type, content) {
    const payload = { type, content, page: location.pathname, ts: new Date().toISOString(), pageContext: detectPageContext() };
    if (CONFIG.webhookUrl) fetch(CONFIG.webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
    console.log("[Qapitol Lead]", payload);
  }

  /* ── CHAT WIDGET ─────────────────────────────────────────── */
  function buildChatWidget() {
    const btn = document.createElement("button");
    btn.id = "qap-chat-btn";
    btn.setAttribute("aria-label", "Open Qapitol AI Assistant");
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="chat-badge">1</span>`;

    const panel = document.createElement("div");
    panel.id = "qap-chat-panel";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <div class="chat-header">
        <div class="chat-avatar">Q</div>
        <div class="chat-header-info">
          <strong>${CONFIG.chatTitle}</strong>
          <span>AI Governance &amp; Control Layer</span>
        </div>
        <button class="chat-close" aria-label="Close">✕</button>
      </div>
      <div class="chat-messages" id="qap-msgs"></div>
      <div class="chat-options" id="qap-opts"></div>
      <div class="chat-input-row" id="qap-input-row" style="display:none">
        <input type="text" id="qap-input" autocomplete="off" placeholder="Ask anything about Qapitol…" />
        <button id="qap-send" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>`;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    btn.addEventListener("click", toggleChat);
    panel.querySelector(".chat-close").addEventListener("click", closeChat);
    panel.querySelector("#qap-send").addEventListener("click", handleSend);
    panel.querySelector("#qap-input").addEventListener("keydown", e => { if (e.key === "Enter") handleSend(); });
    // Free-text on any input — detect intent
    panel.querySelector("#qap-input").addEventListener("input", function () {
      const val = this.value.trim();
      if (val.length > 3) {
        const intent = detectIntent(val);
        // Subtle hint — not auto-routing, just showing relevant option
        if (intent && document.getElementById("qap-opts").children.length === 0) {
          const hint = document.createElement("button");
          hint.className = "chat-option";
          hint.textContent = "🔍 Jump to: " + (FLOWS[intent] ? intent.replace(/_/g, " ") : "relevant section");
          hint.addEventListener("click", () => { document.getElementById("qap-opts").innerHTML = ""; renderFlow(intent); });
          const opts = document.getElementById("qap-opts");
          opts.innerHTML = "";
          opts.appendChild(hint);
        }
      }
    });

    if (timeAgo("chat_seen") > CONFIG.chatCooldown) {
      setTimeout(() => {
        if (!state.open) {
          const badge = document.querySelector(".chat-badge");
          if (badge) { badge.style.display = "flex"; badge.textContent = "1"; }
        }
      }, 3500);
    }
  }

  function toggleChat() { state.open ? closeChat() : openChat(); }

  function openChat() {
    const panel = document.getElementById("qap-chat-panel");
    state.open = true;
    panel.setAttribute("aria-hidden", "false");
    panel.classList.add("open");
    const badge = document.querySelector(".chat-badge");
    if (badge) badge.style.display = "none";
    ls("chat_seen", Date.now());
    if (document.getElementById("qap-msgs").children.length === 0) renderFlow("welcome");
  }

  function closeChat() {
    const panel = document.getElementById("qap-chat-panel");
    state.open = false;
    panel.setAttribute("aria-hidden", "true");
    panel.classList.remove("open");
  }

  function appendMessage(text, role) {
    const msgs = document.getElementById("qap-msgs");
    const el = document.createElement("div");
    el.className = "chat-bubble " + role;
    el.innerHTML = "<span>" + text + "</span>";
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function renderOptions(options) {
    const container = document.getElementById("qap-opts");
    const inputRow = document.getElementById("qap-input-row");
    container.innerHTML = "";
    if (!options || options.length === 0) return;
    options.forEach(opt => {
      const b = document.createElement("button");
      b.className = "chat-option";
      b.textContent = opt.label;
      b.addEventListener("click", () => {
        appendMessage(opt.label, "user");
        container.innerHTML = "";
        if (opt.url) setTimeout(() => location.href = opt.url, 500);
        else if (opt.flow) setTimeout(() => renderFlow(opt.flow), 400);
      });
      container.appendChild(b);
    });
  }

  function renderFlow(flowKey) {
    const flow = FLOWS[flowKey];
    if (!flow) return;
    state.currentFlow = flowKey;
    state.inputMode = flow.inputMode || null;

    const msgs = document.getElementById("qap-msgs");
    const typing = document.createElement("div");
    typing.className = "chat-bubble bot typing-indicator";
    typing.innerHTML = "<span><span></span><span></span><span></span></span>";
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const botText = typeof flow.bot === "function" ? flow.bot() : flow.bot;
      appendMessage(botText, "bot");
      renderOptions(flow.options);
      const inputRow = document.getElementById("qap-input-row");
      const input = document.getElementById("qap-input");
      if (flow.inputMode) {
        inputRow.style.display = "flex";
        input.placeholder = flow.inputPlaceholder || "Type here…";
        input.focus();
        document.getElementById("qap-opts").innerHTML = "";
      } else {
        // Always show free-text input as secondary
        inputRow.style.display = "flex";
        input.placeholder = "Or ask me anything…";
      }
    }, 650);
  }

  function handleSend() {
    const input = document.getElementById("qap-input");
    const val = (input.value || "").trim();
    if (!val) return;
    appendMessage(val, "user");
    input.value = "";

    // Check if in form-submission mode
    if (state.inputMode) {
      submitLead(state.inputMode, val);
      setTimeout(() => renderFlow("thanks"), 400);
      document.getElementById("qap-input-row").style.display = "none";
      return;
    }

    // Free-text intent routing
    const intent = detectIntent(val);
    if (intent && FLOWS[intent]) {
      setTimeout(() => renderFlow(intent), 400);
    } else {
      // Fallback KB response
      setTimeout(() => {
        appendMessage("Good question! " + getKBAnswer(val), "bot");
        renderOptions([
          { label: "🤝 Talk to our team", flow: "lead_capture" },
          { label: "🔙 Main menu", flow: "welcome" },
        ]);
      }, 600);
    }
  }

  function getKBAnswer(text) {
    const t = text.toLowerCase();
    if (/position|what (do|are) you|about qapitol/i.test(t)) return KB.company;
    if (/differen|unique|why qapitol/i.test(t)) return KB.differentiators.slice(0, 3).join(" • ");
    if (/pric|cost|free|plan/i.test(t)) return KB.pricing;
    if (/regulat|compli|irdai|eu ai|rbi/i.test(t)) return KB.regulations;
    if (/talent|staff|hire|skill/i.test(t)) return "We deploy AI Engineers, Forward Deployment Engineers, MLOps, AIOps, QE, and Cloud AI Architects. 2-week placement SLA. See talent-services.html";
    if (/international|usa|uae|middle east|global/i.test(t)) return KB.international;
    if (/partner/i.test(t)) return KB.partnerships;
    if (/career|job|work/i.test(t)) return KB.careers;
    if (/platform|qave|nexus|cheq|agent|qurator/i.test(t)) return Object.values(KB.platforms).join(" | ");
    if (/intel|newsletter|brief|subscribe|news|update|trend/i.test(t)) return "The Control Layer Intel Brief is our fortnightly role-personalised AI governance intelligence — different content for CISOs, CIOs, Engineering Leads, and AI Practitioners. Free. Subscribe at intel.html";
    return "We're the AI Governance & Control Layer for the enterprise — platforms, services, and talent for AI quality and compliance. How can I help? " + KB.contact;
  }

  /* ── EXIT INTENT ─────────────────────────────────────────── */
  function buildExitIntent() {
    if (timeAgo("exit_seen") < CONFIG.exitCooldown) return;
    const overlay = document.createElement("div");
    overlay.id = "exit-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div id="exit-modal" role="dialog" aria-modal="true" aria-labelledby="exit-title">
        <button class="exit-close" aria-label="Close">✕</button>
        <div class="exit-geo-decor"></div>
        <p class="exit-eyebrow">Before you go…</p>
        <h2 id="exit-title">Get the Control Layer Intel Brief</h2>
        <p class="exit-sub">Fortnightly AI governance intel tailored to your role — CISO, CIO, Engineering Lead, or AI Practitioner. 15 days of what actually moved, and what it means for you specifically.</p>
        <form class="exit-email-row" id="exit-form" novalidate>
          <input type="email" id="exit-email" placeholder="your@company.com" required autocomplete="email" />
          <button type="submit">See the latest issue →</button>
        </form>
        <p class="exit-skip"><a href="#" id="exit-skip-link">No thanks, I'll figure it out myself</a></p>
        <p class="exit-trust">✓ No spam &nbsp;&nbsp; ✓ Unsubscribe anytime &nbsp;&nbsp; ✓ Read by teams at HDFC, Juspay, L&amp;T</p>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector(".exit-close").addEventListener("click", closeExit);
    document.getElementById("exit-skip-link").addEventListener("click", e => { e.preventDefault(); closeExit(); });
    overlay.addEventListener("click", e => { if (e.target === overlay) closeExit(); });
    document.getElementById("exit-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("exit-email").value.trim();
      if (!email || !email.includes("@")) { document.getElementById("exit-email").focus(); return; }
      submitLead("exit_intent", email);
      overlay.querySelector("#exit-modal").innerHTML = `
        <div style="text-align:center;padding:2rem 1rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">🎉</div>
          <h2 style="margin-bottom:.75rem;">You're in!</h2>
          <p style="color:var(--text-muted);margin-bottom:1.5rem;">You're subscribed! Your first role-personalised issue arrives within 14 days.</p>
          <button onclick="document.getElementById('exit-overlay').setAttribute('aria-hidden','true');document.getElementById('exit-overlay').style.display='none';" style="background:var(--accent);color:#fff;border:none;padding:.75rem 2rem;border-radius:8px;cursor:pointer;font-weight:600;">Close</button>
        </div>`;
      ls("exit_seen", Date.now());
    });

    setTimeout(() => { state.exitArmed = true; }, CONFIG.exitDelay);
    document.addEventListener("mouseleave", e => { if (e.clientY < 10 && state.exitArmed && !state.exitShown) showExit(); });
    let lastScrollY = window.scrollY, scrollTimer;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const delta = lastScrollY - window.scrollY;
        if (delta > 80 && window.scrollY < 200 && state.exitArmed && !state.exitShown) showExit();
        lastScrollY = window.scrollY;
      }, 50);
    });
  }

  function showExit() { state.exitShown = true; const o = document.getElementById("exit-overlay"); if (o) { o.setAttribute("aria-hidden", "false"); o.style.display = "flex"; } }
  function closeExit() { ls("exit_seen", Date.now()); state.exitShown = false; const o = document.getElementById("exit-overlay"); if (o) { o.setAttribute("aria-hidden", "true"); o.style.display = "none"; } }


  /* ── INTEL SIDE PANEL ───────────────────────────────────── */
  function buildIntelPanel() {
    // Data
    var INTEL = {
      ciso:[
        {date:"May 9",cat:"Incident",col:"#fca5a5",title:"CERT-In advisory: LLM prompt injection hits 19 enterprise apps",why:"CERT-In now expects documented adversarial test evidence. Without a test log you're exposed in any audit triggered by a peer firm's incident.",link:"cheq.html"},
        {date:"May 6",cat:"Regulatory",col:"#fde68a",title:"EU AI Act: first €2.4M fine for opaque hiring AI",why:"Explainability is now enforceable, not a guideline. Any AI system touching employees or customers in the EU needs a decision trail.",link:"sure-q.html"}
      ],
      cio:[
        {date:"May 10",cat:"Research",col:"#67e8f9",title:"McKinsey: governance retrofitted after deployment costs 2.6× more",why:"Every AI project in flight without a governance layer is a compounding liability. The cost of inaction is now quantified.",link:"solution-ai-compliance.html"},
        {date:"May 7",cat:"Regulatory",col:"#fde68a",title:"RBI: AI credit-scoring must produce per-loan explainability in 24 hours",why:"If you use AI in credit decisioning, your ops team needs an automated reporting pipeline by Q3 to hit the October deadline.",link:"solution-bfsi-ai.html"}
      ],
      eng:[
        {date:"May 12",cat:"Research",col:"#67e8f9",title:"71% of enterprise RAG deployments fail multi-hop reasoning",why:"If your RAG hasn't been tested for multi-hop, you're shipping confidence risk to users who will trust wrong answers.",link:"qave.html"},
        {date:"May 8",cat:"Incident",col:"#fca5a5",title:"Three banks report incidents from AI-generated code merged without review",why:"Your CI/CD pipeline needs an AI-code scan as a distinct gate, separate from standard code review.",link:"integrations.html"}
      ],
      talent:[
        {date:"May 11",cat:"Market",col:"#c4b5fd",title:"'AI Governance Lead' searches up 340% YoY — 60% unfilled at 90+ days",why:"You can't hire this person from a job board. The profile combines regulatory knowledge, AI engineering, and risk management.",link:"hire.html"},
        {date:"May 7",cat:"Regulatory",col:"#fde68a",title:"MeitY draft: firms with 10+ AI systems must designate an AI Risk Officer",why:"This is a compliance hire, not just a capability hire. The enforcement clock is already running for Q1 2027.",link:"talent-services.html"}
      ],
      practitioner:[
        {date:"May 12",cat:"Research",col:"#67e8f9",title:"Semantic chunking reduces RAG retrieval failure by 38% vs fixed-token",why:"Run the chunking benchmark against your corpus this week. Two hours of work, likely your single highest-leverage change.",link:"qave.html"},
        {date:"Apr 29",cat:"Research",col:"#67e8f9",title:"Gemini 2.5 Pro: 34% gain on TruthfulQA but 12% degradation on Hindi financial tasks",why:"English benchmark scores don't transfer to Indian language deployments. Eval on your actual language distribution before upgrading.",link:"qave.html"}
      ]
    };
    var ROLES = [{key:"ciso",label:"CISO"},{key:"cio",label:"CIO"},{key:"eng",label:"Eng Lead"},{key:"talent",label:"Talent"},{key:"practitioner",label:"AI Dev"}];
    var activeRole = "ciso";

    // Don't show on intel page itself
    if (window.location.href.indexOf('intel.html') !== -1) return;

    // Inject styles
    var s = document.createElement('style');
    s.id = 'intel-panel-styles';
    s.textContent = [
      '#qip-tab{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:9100;cursor:pointer;background:linear-gradient(180deg,#21a3b2,#4d31f5);border-radius:10px 0 0 10px;width:28px;padding:14px 0;border:none;outline:none;box-shadow:-3px 0 16px rgba(33,163,178,.35);transition:width .18s;}',
      '#qip-tab:hover{width:32px;}',
      '#qip-tab .qip-label{display:block;writing-mode:vertical-rl;transform:rotate(180deg);font-family:"Inter Tight",sans-serif;font-size:9px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#fff;pointer-events:none;white-space:nowrap;}',
      '#qip-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9098;backdrop-filter:blur(2px);}',
      '#qip-overlay.qip-open{display:block;}',
      '#qip-panel{position:fixed;top:0;right:-420px;width:390px;max-width:95vw;height:100%;background:#0b0c1a;border-left:1px solid rgba(255,255,255,.1);z-index:9099;overflow-y:auto;transition:right .32s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:-6px 0 40px rgba(0,0,0,.6);}',
      '#qip-panel.qip-open{right:0;}',
      '.qip-rtab{padding:4px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.14);background:transparent;color:rgba(255,255,255,.5);font-size:11px;font-weight:700;cursor:pointer;font-family:"Inter Tight",sans-serif;transition:all .15s;}',
      '.qip-rtab.qip-active{background:rgba(33,163,178,.2);border-color:rgba(33,163,178,.5);color:#fff;}',
      '.qip-rtab:hover{border-color:rgba(255,255,255,.3);color:#fff;}',
      '#qip-panel::-webkit-scrollbar{width:3px;}',
      '#qip-panel::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);}'
    ].join('');
    document.head.appendChild(s);

    // Tab button
    var tab = document.createElement('button');
    tab.id = 'qip-tab';
    tab.setAttribute('aria-label','Open Intel panel');
    tab.innerHTML = '<span class="qip-label">Intel ✶</span>';
    document.body.appendChild(tab);

    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'qip-overlay';
    document.body.appendChild(overlay);

    // Panel
    var panel = document.createElement('div');
    panel.id = 'qip-panel';
    panel.setAttribute('role','dialog');
    document.body.appendChild(panel);

    function makeCards(role) {
      return INTEL[role].map(function(item) {
        return '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px;margin-bottom:12px;">'
          + '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">'
          + '<span style="font-size:10px;color:rgba(255,255,255,.35);">'+item.date+'</span>'
          + '<span style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:'+item.col+';background:rgba(255,255,255,.05);padding:2px 7px;border-radius:99px;">'+item.cat+'</span>'
          + '</div>'
          + '<p style="font-family:\'Inter Tight\',sans-serif;font-size:13px;font-weight:700;line-height:1.35;color:#fff;margin:0 0 8px;">'+item.title+'</p>'
          + '<p style="font-size:12px;color:rgba(255,255,255,.58);line-height:1.6;margin:0 0 8px;border-left:2px solid #21a3b2;padding-left:8px;">'+item.why+'</p>'
          + '<a href="'+item.link+'" style="font-size:11px;font-weight:600;color:#21a3b2;text-decoration:none;">What Qapitol does →</a>'
          + '</div>';
      }).join('');
    }

    function renderPanel() {
      var roleTabs = ROLES.map(function(r) {
        return '<button class="qip-rtab'+(r.key===activeRole?' qip-active':'')+'" data-role="'+r.key+'">'+r.label+'</button>';
      }).join('');

      panel.innerHTML = ''
        + '<div style="padding:18px 18px 12px;border-bottom:1px solid rgba(255,255,255,.07);position:sticky;top:0;background:#0b0c1a;z-index:1;">'
        +   '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">'
        +     '<div>'
        +       '<div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:#21a3b2;margin-bottom:2px;">Control Layer Intel · Issue #48</div>'
        +       '<div style="font-size:10px;color:rgba(255,255,255,.28);">May 2026 · Last 15 days</div>'
        +     '</div>'
        +     '<button id="qip-close" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6);width:26px;height:26px;border-radius:6px;cursor:pointer;font-size:13px;line-height:1;flex-shrink:0;">×</button>'
        +   '</div>'
        +   '<p style="font-size:11px;color:rgba(255,255,255,.38);margin:0 0 10px;line-height:1.5;">Pick your role for personalised intel.</p>'
        +   '<div style="display:flex;flex-wrap:wrap;gap:5px;" id="qip-role-tabs">'+roleTabs+'</div>'
        + '</div>'
        + '<div id="qip-cards" style="padding:14px 18px;flex:1;">'+makeCards(activeRole)+'</div>'
        + '<div style="padding:12px 18px;border-top:1px solid rgba(255,255,255,.07);background:#0b0c1a;position:sticky;bottom:0;">'
        +   '<a href="intel.html?role='+activeRole+'" id="qip-full-link" style="display:block;text-align:center;font-size:12px;font-weight:700;color:#21a3b2;text-decoration:none;margin-bottom:10px;padding:8px;border:1px solid rgba(33,163,178,.25);border-radius:8px;">See all 4 items + full issue →</a>'
        +   '<div style="background:rgba(77,49,245,.1);border:1px solid rgba(77,49,245,.22);border-radius:10px;padding:12px;">'
        +     '<p style="font-size:11px;font-weight:700;color:#fff;margin:0 0 8px;font-family:\'Inter Tight\',sans-serif;">Get this fortnightly for your role</p>'
        +     '<div style="display:flex;gap:5px;" id="qip-sub-row">'
        +       '<input type="email" id="qip-email" placeholder="you@company.com" style="flex:1;min-width:0;padding:7px 10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:7px;color:#fff;font-size:12px;font-family:\'Source Sans 3\',sans-serif;outline:none;"/>'
        +       '<button id="qip-sub-btn" style="background:linear-gradient(135deg,#21a3b2,#4d31f5);border:none;color:#fff;padding:7px 12px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;font-family:\'Inter Tight\',sans-serif;">Subscribe</button>'
        +     '</div>'
        +     '<div id="qip-sub-ok" style="display:none;font-size:11px;color:#4ade80;padding-top:6px;text-align:center;">✓ You\'re in — first issue within 14 days.</div>'
        +   '</div>'
        + '</div>';

      // Close button
      panel.querySelector('#qip-close').onclick = closePanel;

      // Role tabs
      panel.querySelector('#qip-role-tabs').addEventListener('click', function(e) {
        var btn = e.target.closest('.qip-rtab');
        if (!btn) return;
        activeRole = btn.dataset.role;
        panel.querySelectorAll('.qip-rtab').forEach(function(b){ b.classList.remove('qip-active'); });
        btn.classList.add('qip-active');
        panel.querySelector('#qip-cards').innerHTML = makeCards(activeRole);
        panel.querySelector('#qip-full-link').href = 'intel.html?role=' + activeRole;
      });

      // Subscribe
      panel.querySelector('#qip-sub-btn').onclick = function() {
        var email = panel.querySelector('#qip-email').value.trim();
        if (!email || email.indexOf('@') === -1) { panel.querySelector('#qip-email').focus(); return; }
        var fd = new FormData();
        fd.append('email', email); fd.append('role', activeRole);
        fd.append('source', 'intel-side-panel'); fd.append('_subject', 'Intel panel subscriber');
        fetch('https://formspree.io/f/xnjwrzen', {method:'POST',body:fd,headers:{Accept:'application/json'}})
          .then(function(){ panel.querySelector('#qip-sub-row').style.display='none'; panel.querySelector('#qip-sub-ok').style.display='block'; });
      };
    }

    function openPanel() {
      renderPanel();
      panel.classList.add('qip-open');
      overlay.classList.add('qip-open');
      tab.style.display = 'none';
      document.body.style.overflow = 'hidden';
    }
    function closePanel() {
      panel.classList.remove('qip-open');
      overlay.classList.remove('qip-open');
      tab.style.display = '';
      document.body.style.overflow = '';
    }

    tab.addEventListener('click', openPanel);
    overlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closePanel(); });
  }

  /* ── ANNOUNCE BAR ────────────────────────────────────────── */
  function buildAnnounceBar() {
    if (ls("announce_closed") === "1") return;
    const bar = document.createElement("div");
    bar.className = "announce-bar";
    bar.id = "qap-announce";
    bar.innerHTML = `<span>🚀 <strong>QAVE Free Tier is live</strong> — Evaluate AI against IRDAI &amp; EU AI Act for free. <a href="qave-platform.html">Start now →</a></span><button class="announce-close" aria-label="Dismiss">✕</button>`;
    document.body.insertBefore(bar, document.body.firstChild);
    bar.querySelector(".announce-close").addEventListener("click", () => { bar.style.display = "none"; ls("announce_closed", "1"); document.documentElement.style.setProperty("--announce-h", "0px"); });
    document.documentElement.style.setProperty("--announce-h", bar.offsetHeight + "px");
  }

  /* ── SOCIAL PROOF TICKER ─────────────────────────────────── */
  function buildSocialTicker() {
    const events = [
      "⚡ A fintech team just started a QAVE free trial",
      "🏦 An insurer booked a CHEQ IRDAI compliance demo",
      "👥 An AI squad of 6 was deployed via Talent Services",
      "🤖 A bank connected Agent Fabric to their CI/CD pipeline",
      "⚖️ A US SaaS team started EU AI Act compliance testing",
      "🇦🇪 A UAE bank requested a Sovereign AI deployment",
      "📊 A logistics firm ran 5,000 synthetic test scenarios",
    ];
    let idx = 0;
    const ticker = document.createElement("div");
    ticker.id = "social-ticker";
    ticker.style.cssText = "position:fixed;bottom:100px;left:24px;z-index:8000;background:var(--surface-2,#16103a);border:1px solid var(--border-glow,rgba(77,49,245,.35));border-radius:12px;padding:.65rem 1rem;font-size:.78rem;color:var(--text-muted,#a0a0b8);max-width:280px;box-shadow:0 4px 24px rgba(0,0,0,.4);opacity:0;transition:opacity .4s;pointer-events:none;";
    document.body.appendChild(ticker);
    function showNext() {
      ticker.textContent = events[idx % events.length]; ticker.style.opacity = "1"; idx++;
      setTimeout(() => { ticker.style.opacity = "0"; setTimeout(showNext, 4000); }, 3500);
    }
    setTimeout(showNext, 7000);
  }

  /* ── INIT ────────────────────────────────────────────────── */
  function init() { buildAnnounceBar(); buildChatWidget(); buildExitIntent(); buildSocialTicker(); buildIntelPanel(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
