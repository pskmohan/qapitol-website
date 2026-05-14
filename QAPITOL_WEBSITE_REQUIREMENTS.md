# Qapitol AI — Website Requirements Specification
**Version:** 2.0 | **Date:** May 2026 | **Status:** Current Build + Phase 2 Roadmap  
**Owner:** Mohan Panguluri, Qapitol AI Technologies Pvt. Ltd.  
**Contact:** mohan.panguluri@qapitol.com

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Brand & Design System](#2-brand--design-system)
3. [Site Architecture](#3-site-architecture)
4. [Global Components](#4-global-components)
5. [Page-by-Page Specifications](#5-page-by-page-specifications)
6. [Interactive & Conversion Features](#6-interactive--conversion-features)
7. [Content Strategy & Positioning](#7-content-strategy--positioning)
8. [Technical Requirements](#8-technical-requirements)
9. [SEO & Metadata](#9-seo--metadata)
10. [Phase 2 Roadmap — Intent-Driven Dynamic Experience](#10-phase-2-roadmap--intent-driven-dynamic-experience)

---

## 1. Executive Summary

### 1.1 Company Overview
**Qapitol AI Technologies Pvt. Ltd.** is an AI quality engineering and compliance firm providing Business Outcome Assurance for enterprise AI systems. Headquartered in India with presences in UAE and USA, Qapitol serves 25+ unicorns and large enterprises across BFSI, Healthcare, Technology, and Retail sectors.

**Core proposition:** "We don't just test AI. We guarantee its outcomes."

### 1.2 Website Purpose
The website serves as:
- **Primary lead generation engine** — capturing inbound intent across CXO, engineering, compliance, and QA personas
- **Brand credibility layer** — positioning Qapitol as the category leader in AI quality assurance
- **Product marketing surface** — explaining QAVE, QUASAR, CHEQ, Agent Fabric, and GCC offerings
- **Employer brand** — attracting AI specialists across India, UAE, and USA
- **Lead magnet hub** — free evaluations, gap scans, cost models, and board decks

### 1.3 Core Positioning
**Primary:** Business Outcome Assurance (BOA) — every engagement backed by measurable SLAs  
**Secondary:** AI-era quality engineering — not adapted from legacy QA, built from the ground up for AI  
**Differentiator:** The only firm in the Indian QE market offering combined eval + compliance + talent + GCC as a unified AI assurance layer

### 1.4 Target Personas

| Persona | Title | Primary Pain | Key CTA |
|---|---|---|---|
| Strategic Buyer | CIO / CDO | Cost, governance, board risk | GCC cost model, board deck |
| Technical Buyer | CTO / VP Eng | Eval bottleneck, release velocity | QUASAR framework, QAVE demo |
| AI Practitioner | ML / LLM Engineer | Hallucinations, no structured eval | Free QAVE evaluation |
| Compliance | CCO / Risk Officer | Regulatory exposure (EU AI Act, IRDAI) | Free gap scan |
| QA Professional | QA Lead / SDET | AI-native testing gaps | Free trial, synthetic data |
| Product | AI Product Manager | Pre-release confidence | Eval pipeline integration |

---

## 2. Brand & Design System

### 2.1 Design Philosophy
**Aesthetic:** Futuristic geometric — deep space background, glowing indigo accents, geometric grid overlays. Not corporate-flat; not consumer-playful. Premium technical authority.

**Visual references:** Linear.app, Vercel.com, Anthropic.com — dark-mode enterprise SaaS aesthetics.

### 2.2 Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0c071a` | Page background |
| `--bg-soft` | `#100b22` | Subtle section differentiation |
| `--surface` | `#18103a` | Card backgrounds |
| `--surface-2` | `#1f1449` | Elevated cards |
| `--surface-3` | `#251858` | Highest elevation |
| `--text` | `#f0ecff` | Primary body text |
| `--text-muted` | `#9d8fd4` | Secondary / supporting text |
| `--text-dim` | `#6b5fa0` | Tertiary / meta text |
| `--accent` | `#4d31f5` | Primary interactive colour |
| `--accent-2` | `#6b4fff` | Gradient end / hover states |
| `--accent-light` | `#b5a6ff` | Highlights, labels, tags |
| `--accent-soft` | `rgba(77,49,245,0.14)` | Tinted backgrounds |
| `--teal` | `#21a3b2` | Success / positive outcomes |
| `--orange` | `#e88721` | Warning / attention |
| `--green` | `#2dd4a0` | Positive metrics |
| `--border` | `rgba(181,166,255,0.10)` | Default card borders |
| `--border-strong` | `rgba(181,166,255,0.18)` | Prominent card borders |
| `--border-glow` | `rgba(77,49,245,0.4)` | Focus / hover glow |
| UAE accent | `#c9a227` | Gold — UAE/MENA pages only |
| USA accent | `#3b82f6` | Blue — USA pages only |

**Glow effects:**
- `--glow-sm`: `0 0 20px rgba(77,49,245,0.25)` — subtle card hover
- `--glow-md`: `0 0 40px rgba(77,49,245,0.30)` — featured elements
- `--glow-lg`: `0 0 80px rgba(77,49,245,0.20)` — hero accents

### 2.3 Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Hero H1 | Inter Tight | 900 (Black) | clamp(2.5rem, 5vw, 4rem) |
| H2 Section | Inter Tight | 800 | clamp(1.8rem, 3.5vw, 2.8rem) |
| H3 Card title | Inter Tight | 700 | 1.1–1.25rem |
| Body | Source Sans 3 | 400 | 1rem (16px base) |
| Body large | Source Sans 3 | 400 | 1.1rem |
| Label / badge | Inter / Source Sans 3 | 600–700 | 0.68–0.78rem |
| Numbers / stats | Inter Tight | 800 | 2–4rem |

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
```

### 2.4 Spacing & Layout

- **Max container width:** 1200px (`--container`)
- **Header height:** 72px (`--header-h`)
- **Section padding:** `5rem 1.5rem` (desktop), `3rem 1rem` (mobile)
- **Card padding:** `1.5rem` (standard), `2rem` (featured)
- **Border radius tokens:** `--radius: 14px`, `--radius-lg: 20px`, `--radius-xl: 28px`

### 2.5 Button System

| Variant | Style | Usage |
|---|---|---|
| `btn-primary` | Gradient `#4d31f5 → #7c5ff8`, white text, `border-radius: var(--radius)` | Primary CTA |
| `btn-outline` | Transparent bg, `1px solid var(--border)`, muted text → `var(--accent-light)` on hover | Secondary CTA |
| `btn-teal` | `var(--teal)` background | Positive / success actions |
| Nav CTA | Same as `btn-primary`, smaller padding | Header CTA |

**Standard CTA padding:** `0.85rem 1.75rem` (desktop), `0.7rem 1.25rem` (mobile)

### 2.6 Reusable Component Patterns

#### Persona Strip
```html
<div class="persona-strip">
  <span class="persona-label">Built for</span>
  <span class="persona-chip">[SVG icon] Role Title</span>
  ...
</div>
```
CSS: flex row, `background: rgba(255,255,255,0.06)`, `border-radius: 2rem`, accent-light chip backgrounds.  
**Rule:** Every service/offering hero section must have a persona strip.

#### Business Outcome Assurance Tag
```html
<p class="boa-tag">✓ Business Outcome Assurance — [tagline specific to the service]</p>
```
CSS: `font-size: 0.78rem`, `color: var(--accent-light)`, `font-weight: 600`, checkmark icon.  
**Rule:** Every offering/service page must have a BOA tag before its primary CTA.

#### What Happens Next Panel
```html
<div class="what-next">
  <div class="what-next-label">What happens next</div>
  <ol>
    <li data-n="1">Step one description</li>
    <li data-n="2">Step two description</li>
    <li data-n="3">Step three description</li>
  </ol>
</div>
```
CSS: `background: rgba(77,49,245,0.12)`, `border-left: 3px solid var(--accent)`, numbered circles via `::before { content: attr(data-n) }`.  
**Rule:** All free-offer pages must have a What Happens Next panel immediately before the CTA button.

#### Proof Strip
```html
<div class="proof-strip">
  <span class="proof"><span class="num">25+</span> Unicorns served</span>
  ...
</div>
```
Horizontal row of 4 social proof metrics. Required on all main service pages.

---

## 3. Site Architecture

### 3.1 Navigation Structure

```
Primary Nav (sticky, blur backdrop)
├── Services (dropdown)
│   ├── AI Engineering
│   ├── Digital Reliability
│   ├── Intelligent Automation
│   ├── Workflow Automation
│   ├── Talent Services
│   └── GCC Setup
├── Platforms (dropdown)
│   ├── QAVE (AI Evaluation)
│   ├── CHEQ (Compliance)
│   ├── Agent Fabric
│   ├── Qurator
│   ├── TestMu (Partnership)
│   └── Synthetic Data
├── Industries
├── Insights
├── About (dropdown)
│   ├── About Us
│   ├── Labs
│   ├── Careers
│   ├── Alumni
│   ├── Partners
│   ├── UAE / Middle East    ← international
│   └── USA                 ← international
└── Contact [CTA button]
```

### 3.2 Full Page Inventory

| File | Title | Type | Priority |
|---|---|---|---|
| `index.html` | Homepage | Core | P0 |
| `about.html` | About Us | Core | P0 |
| `services.html` | Services overview | Core | P0 |
| `contact.html` | Contact | Core | P0 |
| `careers.html` | Careers | Core | P0 |
| `ai-engineering.html` | AI Engineering | Service | P0 |
| `digital-reliability.html` | Digital Reliability | Service | P0 |
| `intelligent-automation.html` | Intelligent Automation | Service | P0 |
| `workflow-automation.html` | Workflow Automation | Service | P0 |
| `talent-services.html` | Talent Services | Service | P0 |
| `gcc.html` | GCC Setup | Service | P0 |
| `ai-evaluation.html` | AI Evaluation / QAVE | Platform | P0 |
| `cheq.html` | CHEQ Compliance | Platform | P0 |
| `qsure.html` | QUASAR Framework | Platform | P0 |
| `agent-fabric.html` | Agent Fabric | Platform | P1 |
| `qave-platform.html` | QAVE Platform (detailed) | Platform | P1 |
| `qurator.html` | Qurator | Platform | P1 |
| `testmu.html` | TestMu Partnership | Platform | P1 |
| `synthetic-data-management.html` | Synthetic Data | Platform | P1 |
| `ai-in-qe.html` | AI in QE | Platform | P1 |
| `labs.html` | Qapitol Labs | Brand | P1 |
| `industries.html` | Industries | Marketing | P1 |
| `insights.html` | Blog / Insights | Content | P1 |
| `case-studies.html` | Case Studies | Social proof | P1 |
| `pricing.html` | Pricing | Commercial | P1 |
| `roi-calculator.html` | ROI Calculator | Tool | P1 |
| `partnerships.html` | Partner Programs | Business dev | P2 |
| `alumni.html` | Alumni Network | Brand | P2 |
| `events.html` | Events & Webinars | Community | P2 |
| `community.html` | Community | Community | P2 |
| `nexus.html` | Nexus | Platform | P2 |
| `platforms.html` | Platforms overview | Marketing | P2 |
| `uae.html` | UAE / MENA | Geo | P1 |
| `usa.html` | USA | Geo | P1 |
| `board-deck-generator.html` | Board Deck Generator | Tool / Lead magnet | P1 |
| `privacy.html` | Privacy Policy | Legal | P2 |
| `terms.html` | Terms of Service | Legal | P2 |

---

## 4. Global Components

### 4.1 Site Header (`<header class="site-header">`)

**Behaviour:**
- Sticky, `position: fixed`, `top: 0`, `z-index: 1000`
- Transparent on load → `backdrop-filter: blur(18px)` + `background: rgba(12,7,26,0.85)` on scroll
- Height: 72px
- Logo: `assets/img/logo-qapitol.svg` — width 148px, height 36px
- Right-aligned CTA: "Let's Talk →" — `btn-primary` style → `contact.html`

**Dropdowns:**
- Appear on hover, `position: absolute`, `background: var(--surface-2)`, `border-radius: var(--radius)`, `border: 1px solid var(--border-strong)`
- Animate in with `opacity 0→1 + translateY(8px→0)` in 200ms

**Mobile (< 768px):**
- Hamburger toggle → full-screen slide-in drawer
- All nav links visible in single-column list
- CTA button at bottom of drawer

### 4.2 Site Footer

**Structure:**
- 4-column grid: Logo + tagline | Services | Platforms | Company
- Bottom row: Copyright | Privacy | Terms | Social icons (LinkedIn, Twitter/X)
- `background: var(--bg-soft)`, `border-top: 1px solid var(--border)`

**Required footer links:**
- Services: AI Engineering, Digital Reliability, Intelligent Automation, Workflow Automation, Talent Services, GCC Setup
- Platforms: QAVE, CHEQ, QUASAR, Agent Fabric, Synthetic Data
- Company: About, Labs, Careers, Alumni, Partners, UAE, USA, Contact

**Social proof strip above footer:**
- Logo ticker marquee (clients/partners) — `animation: ticker-scroll 40s linear infinite`
- Logos: grayscale (`filter: brightness(0) invert(1); opacity: 0.45`), height 32px
- Fade edges via `mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)`

### 4.3 Contextual Chatbot (`widgets.js`)

**Trigger:** Floating button, bottom-right corner  
**Behaviour:**
- Opens as chat panel (400px wide, full height on mobile)
- Context-aware: detects current page, surfaces relevant quick-reply prompts
- Connects to lead capture (name, email, company before escalating)
- Escalation path → Calendly / contact form integration

**Required page-specific opening messages:**
| Page | Opening message |
|---|---|
| index.html | General qualification → "What's your biggest AI challenge right now?" |
| ai-evaluation.html | "Want to run a free eval? Takes 90 seconds — I'll walk you through it." |
| cheq.html | "Compliance deadline pressure? I can walk you through a quick gap scan." |
| gcc.html | "Want a cost model for a GCC in India? Takes 5 minutes." |
| careers.html | "Interested in a role? Tell me your area of expertise and I'll show you relevant openings." |

### 4.4 Exit Intent Popup

**Trigger:** Mouse leaves viewport towards browser chrome  
**Condition:** Not shown on same session within 24 hours  
**Content:** 
- Headline: "Before you go — get your free AI evaluation"
- Sub: "60 seconds. No credit card. Know where your AI stands."
- CTA: "Start Free Eval" → `ai-evaluation.html`
- Dismiss: ✕ button

### 4.5 JavaScript Files

| File | Purpose |
|---|---|
| `assets/js/main.js` | Navigation scroll behaviour, dropdown logic, mobile menu, smooth scroll |
| `assets/js/widgets.js` | Chatbot widget, exit intent popup, lead capture modal |

**Both files required on every page.**

---

## 5. Page-by-Page Specifications

### 5.1 Homepage (`index.html`)

**Hero section:**
- Kicker badge: "Business Outcome Assurance — powered by AI"
- H1: "We don't just test AI. We guarantee its outcomes."
- Sub: 2-line value proposition — AI quality, compliance, reliability as managed service
- Primary CTA: "Start Your Free Evaluation →" → `ai-evaluation.html`
- Secondary CTA: "See How It Works" → `#how-it-works` anchor
- Background: animated geometric mesh / particle grid

**Business Outcome Assurance band** (below hero):
- 4 BOA pills explaining the guarantee: Accuracy SLAs · Compliance Coverage · Reliability Guarantees · Business Metrics
- Each pill: `background: rgba(77,49,245,0.15)`, `border: 1px solid rgba(77,49,245,0.3)`

**Proof strip:** 350+ experts | 25+ unicorns | $50M+ outcomes | India · UAE · USA

**How It Works section (3 steps):**
1. Connect — link your AI model / share deployment context
2. Evaluate — QUASAR framework runs evaluation across 12 dimensions
3. Assure — receive SLA-backed outcome guarantee with remediation support

**Services overview (6 cards):**
AI Engineering · Digital Reliability · Intelligent Automation · Workflow Automation · Talent Services · GCC Setup  
Each card: icon, title, 1-line description, "Learn more →" link

**Platforms overview (4 featured):**
QAVE · CHEQ · Agent Fabric · QUASAR  
Each: logo/icon, short description, free-tier badge where applicable

**Client logo marquee:** Animated ticker, 8–12 client/partner logos

**BOA section:** Dedicated explanatory band — what BOA means, why it matters, how it differs from standard QA

**Testimonials:** 3 customer quotes with company type, outcome metric

**Final CTA band:** "Ready to guarantee your AI outcomes?" + dual CTAs

---

### 5.2 About Us (`about.html`)

**H2:** "Business Outcome Assurance for the AI era."

**3-paragraph narrative:**
1. Who we are — AI quality specialists, not legacy QA adapted
2. What we do — the full assurance stack: eval + compliance + talent + GCC
3. How we help — outcome SLAs, measurable guarantees, board-level reporting

**Stats pills:** 350+ experts | 25+ unicorns | $50M+ saved | India · UAE · USA | 9+ years

**Leadership section:** Founder/leadership profiles with headshots

**Values section:** 4–5 company values with short explanations

**Global footprint:** India (HQ) | UAE (GITEX, Dubai office) | USA (forward deployment)

---

### 5.3 Services Pages (all follow this template)

**Required sections (in order):**
1. **Hero** — Persona strip + H1 + sub + Primary CTA + Secondary CTA + Proof strip
2. **Problem statement** — what's broken, why it matters to this persona
3. **Solution / How it works** — 3-step or feature cards
4. **BOA tag** — ✓ Business Outcome Assurance — [service-specific guarantee]
5. **What Happens Next panel** (free-offer pages only) — 3 steps before the CTA
6. **Primary CTA** — service-specific action
7. **Case study / social proof** — relevant customer story
8. **Related services / platforms** — cross-link cards

#### 5.3.1 AI Engineering (`ai-engineering.html`)
- **Personas:** CTO / VP Engineering · AI Product Manager · Engineering Manager
- **CTA:** "Book an AI Engineering Assessment"
- **BOA tag:** "Business Outcome Assurance — delivery milestones and model performance SLAs included"
- **Key sections:** Architecture design · Model development · Production deployment · MLOps · RLHF / fine-tuning

#### 5.3.2 Digital Reliability (`digital-reliability.html`)
- **Personas:** VP Engineering · QA Director · Release Manager
- **Free offer:** Free QE Maturity Assessment
- **What Happens Next:**
  1. Fill a 5-min survey on your testing stack and release cadence
  2. Our QE architects review and benchmark against industry norms
  3. Receive a scored QE Maturity Report with prioritised roadmap
- **CTA:** "Book Free Assessment →"
- **BOA tag:** "Business Outcome Assurance — scored baseline delivered within 48 hours, guaranteed"

#### 5.3.3 Intelligent Automation (`intelligent-automation.html`)
- **Personas:** VP Operations · COO · Process Owner
- **CTA:** "Book Automation Discovery →"
- **BOA tag:** "Business Outcome Assurance — measurable automation ROI or we extend at no cost"

#### 5.3.4 Workflow Automation (`workflow-automation.html`)
- **Personas:** VP Operations · COO · Process Owner
- **Free offer:** Free automation blueprint + business case document
- **What Happens Next:**
  1. Book a 45-min discovery session with an automation architect
  2. We identify 3 high-impact automation candidates inside your workflows
  3. You leave with a business case document and automation blueprint
- **CTA:** "Book Discovery Session →"

#### 5.3.5 Talent Services (`talent-services.html`)
- **Personas:** CTO · Head of Talent · Engineering Director
- **Key offerings:** AI Engineers · MLOps · AIOps · Forward Deployment · GCC staffing
- **Geographies:** India · UAE · USA
- **CTA:** "Talk to a Talent Specialist →"
- **BOA tag:** "Business Outcome Assurance — candidate quality SLAs and 90-day replacement guarantee"

#### 5.3.6 GCC Setup (`gcc.html`)
- **Personas:** CIO / COO · CFO · Engineering Director
- **Free offer:** Board-ready GCC cost model in 24 hours
- **What Happens Next:**
  1. Share your target headcount, function mix, and timeline (5 min)
  2. Our GCC team models India cost structure vs your current opex baseline
  3. Download a board-ready cost comparison with break-even analysis within 24 hours
- **CTA:** "Download Cost Model →"
- **Key content:** Cost comparison table (India vs US/UK/SG), engagement models, governance framework

---

### 5.4 Platform Pages

#### 5.4.1 AI Evaluation / QAVE (`ai-evaluation.html`)
- **Personas:** AI Product Manager · ML/LLM Engineer · Head of AI
- **Free tier:** Prominent — "No credit card · No setup call · First report in 60 seconds"
- **Eval dimensions:** Accuracy · Hallucination rate · Safety · Bias · Factual grounding · Instruction following · Refusal appropriateness · Compliance (IRDAI/EU AI Act/NIST) · Toxicity · Context retention · Tool use correctness · Latency
- **What Happens Next:**
  1. Create QAVE account in 90 seconds
  2. Connect your AI model or upload a test prompt set
  3. First evaluation report lands in under 60 seconds
- **CTA:** "Start Free Evals →" → `qave-platform.html`
- **BOA tag:** "Business Outcome Assurance — every evaluation backed by measurable accuracy SLAs"

#### 5.4.2 CHEQ Compliance (`cheq.html`)
- **Personas:** CCO / Risk Officer · Legal Counsel · CTO (regulated industry)
- **Regulations covered:** EU AI Act · IRDAI AI Guidelines · DPDP Act · NIST AI RMF · ISO 42001 · HIPAA · SOC 2
- **Free offer:** Written compliance gap report within 3 business days
- **What Happens Next:**
  1. Submit a 10-min intake form describing your AI systems and deployment context
  2. Our compliance team maps your stack against applicable regulations
  3. Receive a written gap report with ranked remediation actions within 3 business days
- **CTA:** "Get Your Gap Scan →"
- **BOA tag:** "Business Outcome Assurance — all identified gaps resolved within agreed sprint or extended free"

#### 5.4.3 QUASAR Framework (`qsure.html`)
- **Full name:** QUASAR — Quality Unified Assurance, Security & Adaptability Roadmap
- **6 pillars:**
  1. **QUASAR Qualify** — Requirements analysis and AI use-case validation
  2. **QUASAR Utilise** — Model selection, fine-tuning, and tool use evaluation
  3. **QUASAR Assure** — Continuous eval, red-teaming, and accuracy validation
  4. **QUASAR Secure** — Safety, adversarial robustness, and compliance hardening
  5. **QUASAR Adapt** — Drift monitoring, model versioning, and continuous improvement
  6. **QUASAR Recognise** — Business outcome measurement and ROI validation
- **Visual:** Pentagon/hexagon diagram showing 6 pillars (existing SVG asset)
- **Persona strip:** Head of AI · CTO · Quality Lead · Compliance Officer
- **CTA:** "Apply QUASAR to Your AI Stack →"

#### 5.4.4 Agent Fabric (`agent-fabric.html`)
- **Personas:** AI/Platform Engineer · VP Engineering · Head of AI
- **Key features:** Multi-agent testing harness · Tool call validation · Decision path coverage · Adversarial/jailbreak testing · Production guardrails
- **CTA:** "Book Agent Fabric Demo →"

#### 5.4.5 Synthetic Data Management (`synthetic-data-management.html`)
- **Partnership:** GenRocket
- **Personas:** ML Engineer · Data Engineer · QA Lead
- **Free offer:** 10,000 production-faithful synthetic records within 48 hours
- **What Happens Next:**
  1. Book a 30-min discovery call with a data engineer
  2. We scope your schema, volume, and privacy/compliance constraints
  3. Receive 10,000 synthetic records within 48 hours
- **CTA:** "Request Free Dataset →"

#### 5.4.6 Qurator (`qurator.html`)
- **Personas:** AI Product Manager · Head of AI · Data Scientist
- **CTA:** "See Qurator in Action →"

#### 5.4.7 TestMu Partnership (`testmu.html`)
- **Personas:** QA Lead · SDET · Test Architect · DevEx / Platform Owner
- **Partnership context:** Agentic test infrastructure collaboration
- **CTA:** "Talk to our Partnership Lead →"

---

### 5.5 Careers (`careers.html`)

**Hero:** Employer brand headline + active role count

**"Why Qapitol" section:**
- 6 cards: Frontier AI work · Remote-first · Learning budget · Career growth · Inclusive culture · Competitive pay

**"Day in the Life" section:**
- 6 time-stamped cards showing a realistic day for a Qapitol AI specialist
- AI Eval standup → CHEQ obligation review → Agent Fabric sprint demo → UAE client onboarding → Labs experiment debrief → Apply CTA card

**Open roles section:**
- Role cards: Role title · Function · Location · Type (remote/hybrid/onsite)
- "Apply" button → triggers 3-step application modal

**3-Step Application Modal:**
- **Step 1 — Fit Check:** 3 screening questions
  1. Which area best describes your expertise? (multiple choice: AI Eval / Engineering / Compliance / QA / Operations)
  2. How familiar are you with AI evaluation frameworks? (radio: Never used / Heard of them / Use regularly / Expert)
  3. Notice period / availability? (radio: Immediately / < 30 days / 30–60 days / 60+ days)
- **Step 2 — Contact Details:** Name · Email · Phone · Current company · Years of experience
- **Step 3 — Application:** CV upload + cover note + "What happens next" disclosure (review in 5 days, screening call, technical assessment)
- Progress dots: `●●○` pattern; modal steps animate left-to-right

---

### 5.6 International Pages

#### 5.6.1 UAE / Middle East (`uae.html`)
- **Accent colour:** `#c9a227` (gold) — applied to all accents, borders, highlights
- **Positioning:** "AI Quality & Compliance for the MENA AI Surge"
- **Key content:**
  - GITEX exhibitor badge and presence
  - UAE AI Strategy 2031 alignment
  - MENA regulatory landscape: DIFC · ADGM · Saudi PDPL · EU AI Act (cross-border)
  - 6 service cards adapted for MENA context
  - Events section (GITEX, LEAP, ADIPEC)
  - 4-step engagement model for MENA clients
- **CTA:** "Talk to our UAE Team →"

#### 5.6.2 USA (`usa.html`)
- **Accent colour:** `#3b82f6` (blue) — applied to all accents, borders, highlights
- **Positioning:** "Enterprise AI Quality, Governance & GCC — US-based delivery"
- **Key content:**
  - US regulatory map: NIST AI RMF · EO 14110 · HIPAA · SOC 2 · State AI laws (CA, TX, NY)
  - Cost comparison table: US team vs Qapitol India-backed model (60–70% savings)
  - Forward deployment model: US-based lead + India-backed scale team
  - GCC value proposition for US enterprise
- **CTA:** "Talk to our US Team →"

---

### 5.7 Labs (`labs.html`)

**Positioning:** "Where Qapitol experiments with the future of AI quality"

**Current experiments (publicly stated):**
1. Real-time compliance validation while writing requirements — flag non-compliant requirements inline as they're authored
2. Fast-track requirement writing with reusable compliance components
3. Compliance-specific eval datasets — pre-built test sets per regulation/policy
4. In-production guardrails — stop bad AI responses reaching users before they do harm

**Note on tooling:** Qapitol uses Composo for evaluations in some workflows while also developing its own evaluation platform. Labs is where the proprietary platform evolves.

**Tone:** Research lab feel — exploratory, forward-looking, not commercial

---

### 5.8 Insights (`insights.html`)

**Content types:**
- Blog posts (AI quality, compliance, engineering)
- Whitepapers (downloadable, gated with email)
- Research papers
- Industry reports

**Categories:** AI Evaluation · Compliance · QE Engineering · Industry Use Cases · Labs Research

---

### 5.9 Tools (standalone pages)

#### 5.9.1 Board Deck Generator (`board-deck-generator.html`)
**Purpose:** Lead magnet — captures company + challenge data, generates board-ready AI quality pitch deck  
**Inputs (5 fields):**
1. Company / Organisation Name
2. Industry (9 options: BFSI, Healthcare, Retail, Technology, Manufacturing, Telecom, Government, Energy, Logistics)
3. Primary AI/Quality Challenge (7 options: hallucinations, compliance gaps, slow releases, no eval, agent reliability, data quality, cost optimisation)
4. Team/Headcount (4 bands: 1–10, 11–50, 51–200, 200+)
5. QE Maturity Level (1–5 radio selector with emoji labels)

**Output:** 8-slide animated deck
1. Cover slide (company name, industry, maturity, date)
2. The Challenge (industry-specific risk + statistic)
3. Market Context (regulatory landscape, competitive pressure)
4. Qapitol Solution (3 platform cards relevant to challenge)
5. ROI Projections (table: 5 metrics with Qapitol expected outcomes)
6. Engagement Model (3-phase timeline: Assess → Deploy → Operate)
7. Why Qapitol (6 proof cards: team size, enterprise count, outcomes, geographies)
8. Next Steps (3 action cards: free eval, gap scan, board briefing call)

**Keyboard navigation:** Arrow keys prev/next  
**Print:** "Save as PDF" → `window.print()` with print-optimised CSS

#### 5.9.2 ROI Calculator (`roi-calculator.html`)
**Inputs:** Current team size · Monthly test cycles · Average defect escape rate · Current QE cost  
**Outputs:** Projected savings · Payback period · 3-year ROI  
**Lead capture:** Email required to unlock full report

---

## 6. Interactive & Conversion Features

### 6.1 Free Offer Pages (lead magnet pages)

The following pages offer a free deliverable as primary CTA. Each must have:
- Free-tier badge visible in hero ("Free · No credit card · [time to value]")
- What Happens Next panel (3 steps)
- BOA tag

| Page | Free Offer | Time to Value |
|---|---|---|
| `ai-evaluation.html` | First eval report | 60 seconds |
| `cheq.html` | Compliance gap report | 3 business days |
| `digital-reliability.html` | QE Maturity Assessment | 48 hours |
| `synthetic-data-management.html` | 10K synthetic records | 48 hours |
| `workflow-automation.html` | Automation blueprint + business case | Post 45-min call |
| `gcc.html` | Board-ready cost model | 24 hours |

### 6.2 Lead Capture Flow

**Tier 1 (Instant / zero friction):**
- QAVE account creation → email only → first eval in 90 seconds

**Tier 2 (Low friction):**
- Gap scan / assessment intake → 10-min form → deliverable in days

**Tier 3 (Qualified conversation):**
- GCC cost model / board briefing call → form + calendar booking

### 6.3 Chatbot (Phase 1 — Rule-based)
See §4.3. Page-aware quick replies. Lead capture before escalation.

### 6.4 Exit Intent (§4.4)
Universal across all pages. Primary offer: free QAVE evaluation.

---

## 7. Content Strategy & Positioning

### 7.1 Core Message Hierarchy

**Level 1 (Primary):** Business Outcome Assurance — the overarching brand promise  
**Level 2 (Category):** AI-era quality engineering — built for AI, not adapted from legacy QA  
**Level 3 (Proof):** 350+ specialists · 25+ unicorns · $50M+ outcomes · India · UAE · USA  
**Level 4 (Entry):** Free tier — evaluate, scan, assess before you buy

### 7.2 BOA Application Rules

Every page type must express BOA appropriately:

| Page type | BOA expression |
|---|---|
| Homepage | Hero H1 + dedicated BOA band |
| About | H2 + 3-paragraph narrative |
| Service pages | BOA tag before primary CTA |
| Platform pages | BOA tag before primary CTA + free tier language |
| International pages | BOA localised to regional regulatory context |
| Careers | BOA as employer brand — "work on the team that guarantees AI outcomes" |

### 7.3 Tone of Voice

| Dimension | Guidance |
|---|---|
| Authority | Confident, precise — we know this space deeply |
| Warmth | Human, not corporate — "we" not "Qapitol" |
| Clarity | Plain English — technical accuracy without jargon overload |
| Urgency | Regulatory deadlines, competitive pressure — real, not manufactured |
| Proof | Always back claims with numbers or case study references |

**Avoid:** Vague superlatives ("world-class", "best-in-class"), passive voice, long-winded sentences, marketing speak without substance.

### 7.4 Proof Points to Maintain (update quarterly)

- Team size: 350+ AI specialists
- Enterprise clients: 25+ unicorns and large enterprises
- Outcomes: $50M+ in business outcomes assured
- Geographies: India · UAE · USA
- Years of experience: 9+
- GCCs supported: 15+
- Workflows automated: 50+

---

## 8. Technical Requirements

### 8.1 File Structure

```
/ (root)
├── index.html
├── [page-name].html          (all pages at root level)
├── assets/
│   ├── css/
│   │   └── styles.css        (single global stylesheet — no per-page CSS files)
│   ├── js/
│   │   ├── main.js           (nav, scroll, UI interactions)
│   │   └── widgets.js        (chatbot, exit intent, lead forms)
│   └── img/
│       ├── logo-qapitol.svg
│       ├── og-default.png    (1200×630px OG image)
│       └── [other assets]
```

### 8.2 CSS Architecture

- **Single stylesheet:** `assets/css/styles.css` — all styles global. No per-page CSS files.
- **CSS variables:** All design tokens defined in `:root {}` — never hardcode hex values in components.
- **No frameworks:** No Bootstrap, Tailwind, or other CSS frameworks. All custom.
- **Mobile-first:** All layouts built desktop-first with `@media (max-width: 768px)` breakpoints.

### 8.3 JavaScript

- **Vanilla JS only** — no React, Vue, or frameworks. No jQuery.
- **Two files only:** `main.js` and `widgets.js`
- **Both must be included on every page**, before `</body>`
- Pattern:
  ```html
  <script src="assets/js/main.js"></script>
  <script src="assets/js/widgets.js" defer></script>
  ```

### 8.4 HTML Standards

- `lang="en"` on all `<html>` tags
- `charset="UTF-8"` meta
- `viewport` meta required (responsive)
- Valid semantic HTML5 — `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`
- All images require `alt` attributes
- All CTAs must be `<a>` tags (not `<button>`) when navigating to another page

### 8.5 Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 85 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Page Weight | < 500KB (excluding fonts) |

**Performance rules:**
- All images: WebP format, lazy-loaded (`loading="lazy"`) below the fold
- Fonts: Google Fonts with `display=swap`
- No render-blocking scripts (all JS deferred)
- SVG icons inline (not external files) to avoid extra HTTP requests

### 8.6 Accessibility

- Minimum WCAG 2.1 AA compliance
- All interactive elements keyboard-focusable
- Focus rings visible (not removed via CSS)
- Colour contrast ratio ≥ 4.5:1 for body text
- Form labels associated with inputs
- ARIA labels on icon-only buttons

### 8.7 Browser Support

| Browser | Minimum version |
|---|---|
| Chrome | 100+ |
| Firefox | 100+ |
| Safari | 15+ |
| Edge | 100+ |
| Mobile Safari (iOS) | 15+ |
| Chrome Android | 100+ |

---

## 9. SEO & Metadata

### 9.1 Required Meta Tags (every page)

```html
<!-- Core -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[Page Title] | Qapitol AI</title>
<meta name="description" content="[150–160 char description]">

<!-- Open Graph (social sharing) -->
<meta property="og:type" content="website">
<meta property="og:title" content="[Page Title] | Qapitol AI">
<meta property="og:description" content="[description]">
<meta property="og:image" content="https://qapitol.com/assets/img/og-default.png">
<meta property="og:url" content="https://qapitol.com/[page].html">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Page Title] | Qapitol AI">
<meta name="twitter:description" content="[description]">
```

### 9.2 Page Titles & Descriptions

| Page | Title | Meta Description |
|---|---|---|
| index.html | Qapitol AI \| Business Outcome Assurance | We don't just test AI. We guarantee its outcomes. AI quality, compliance and reliability — delivered as a managed service. |
| about.html | About Qapitol AI \| Business Outcome Assurance | 350+ AI specialists. 25+ unicorns served. $50M+ in outcomes assured. The AI quality layer that enterprises trust. |
| ai-evaluation.html | AI Evaluation & Red-Teaming \| Qapitol AI | Free AI evaluation — connect your model, get an accuracy, safety and compliance report in 60 seconds. |
| cheq.html | CHEQ Compliance \| Qapitol AI | Compliance-hardened AI for IRDAI, EU AI Act and DPDP. Get a free compliance gap scan within 3 business days. |
| gcc.html | GCC Setup in India \| Qapitol AI | Set up your Global Capability Centre in India with Qapitol. Board-ready cost model delivered in 24 hours. |
| qsure.html | QUASAR Framework \| Qapitol AI | The QUASAR quality framework — 6 pillars of AI reliability: Qualify, Utilise, Assure, Secure, Adapt, Recognise. |
| uae.html | Qapitol AI UAE \| Middle East & MENA | AI quality and compliance services in the UAE — GITEX exhibitor, DIFC, ADGM and UAE AI Strategy 2031 aligned. |
| usa.html | Qapitol AI USA \| Forward Deployment | US-based AI quality engineering — NIST AI RMF, EO 14110, HIPAA and SOC 2 aligned. India-backed cost advantage. |
| careers.html | Careers at Qapitol AI | Join 350+ AI specialists shaping the future of AI quality. Remote-first roles across AI evaluation, engineering and compliance. |

### 9.3 Structured Data (Recommended)

Add `application/ld+json` schema on key pages:
- `index.html` → `Organization` schema with logo, address, social links
- Service pages → `Service` schema
- `careers.html` → `JobPosting` schema for each open role
- `insights.html` → `BlogPosting` schema on article pages

### 9.4 Internal Linking Rules

- Every service page links to its most relevant platform page (and vice versa)
- Homepage links to all P0 pages
- All pages link to `contact.html` via header CTA and footer
- Sibling service pages cross-link in "Related Services" section
- International pages (uae.html, usa.html) linked from footer and About dropdown

---

## 10. Phase 2 Roadmap — Intent-Driven Dynamic Experience

### 10.1 Vision

Convert the website from a static brochure into a **personalised, intent-driven sales motion** that adapts every surface to the visitor — their role, company, industry, buying stage, and real-time signals — enabling a 24/7 personalised sales motion without a human rep.

Reference mockup: `dynamic-experience-mockup.html` (included in this project)  
Reference tools: Mutiny (surface adaptation) · Clearbit/Warmly (visitor identification) · 6sense/Bombora (intent signals)

### 10.2 Capability Stack

| Layer | Tool / Approach | Data provided |
|---|---|---|
| Visitor identification | Clearbit Reveal / Warmly.ai | Company name, industry, size, location, tech stack |
| Intent signals | 6sense / Bombora | Buying stage, topics researched, competitor interest |
| CRM enrichment | HubSpot / Salesforce | Previous interactions, deal stage, account owner |
| Hiring signals | LinkedIn API / Revelio Labs | Active AI/ML headcount growth, open roles |
| News signals | Tavily / Diffbot | Recent funding, M&A, AI announcements |
| Surface adaptation | Mutiny / custom code | Hero copy, CTAs, logos, case studies, pricing angle |
| Conversational AI | Qapitol LLM (custom) | Context-aware chat with full signal access |

### 10.3 Role-Adaptive Content Matrix

When a visitor's role is detected or self-selected, the following elements adapt simultaneously:

| Element | CIO/CDO | CTO/VP Eng | ML Engineer | Compliance | QA Lead | PM |
|---|---|---|---|---|---|---|
| Hero H1 | Board governance angle | Release velocity angle | Eval accuracy angle | Regulatory risk angle | Testing gap angle | Pre-release confidence |
| Primary CTA | GCC cost model | QAVE demo | Free eval | Gap scan | Free trial | Confidence score |
| Proof stats | Cost savings, governance | Cycle time, velocity | Eval speed, coverage | Fine avoidance, audit | Coverage, speed | Release confidence, NPS |
| Highlighted services | GCC, Governance | QAVE, Agent Fabric | QAVE, Synthetic Data | CHEQ, Guardrails | QAVE, Synthetic Data | QAVE, Audit trail |
| Case study shown | CFO/CIO customer | CTO/Eng customer | ML team customer | CCO customer | QA team customer | PM/Product customer |
| Chatbot greeting | Board/governance opener | Eval bottleneck opener | Model eval opener | Compliance deadline opener | Testing gap opener | Pre-release confidence opener |

### 10.4 Signal-Driven Chatbot (Phase 2 Agent)

**The Phase 2 AI consultant** should have access to:
- Visitor firmographic data (from Clearbit/Warmly)
- Intent signals (from 6sense — topics, buying stage)
- CRM history (via HubSpot MCP — previous calls, emails, deals)
- Call transcripts (via Fireflies MCP — previous meeting context)
- LinkedIn company profile (headcount, growth rate, recent hires)
- Industry news (recent AI announcements at their company)
- Job postings (active AI/ML roles indicating investment level)

**Opening message logic:**
```
IF visitor.company is in CRM AND has_prior_contact:
  → "Welcome back! Last time we spoke about [X]. Has that situation evolved?"
ELSE IF visitor.intent_score > 7 AND topic includes "compliance":
  → "I can see you've been researching AI compliance options. With your [industry] context..."
ELSE IF visitor.hiring_ai_roles > 3:
  → "I noticed [Company] is building out your AI team fast. When teams scale AI this quickly..."
ELSE:
  → Default role-based opener (see §10.3)
```

### 10.5 "Generate My Board Deck" Integration

The `board-deck-generator.html` tool should be promoted across the site as a tier-1 lead magnet. It should also be pre-filled with firmographic data when a visitor is identified:

- **Identified visitor:** Company name, industry pre-filled from Clearbit data
- **CRM-known visitor:** Challenge pre-filled based on previous conversation context
- **Result:** Lead captures full intent signal (industry + challenge + team size + maturity) in 90 seconds

### 10.6 Implementation Phases

**Phase 2a — Role self-selection (3 months)**
- Add role selector bar to homepage (like `dynamic-experience-mockup.html`)
- Adapt homepage hero, proof stats, featured services, and case study based on selection
- Persist role to `localStorage` for session continuity

**Phase 2b — Passive identification (6 months)**
- Integrate Clearbit Reveal or Warmly.ai
- Auto-detect company + industry without user input
- Adapt key elements silently on page load
- Fire signal to CRM when identified high-intent account visits

**Phase 2c — Intent layer (9 months)**
- Integrate 6sense or Bombora
- Know buying stage before first interaction
- Prioritise accounts for sales team follow-up via Slack/CRM alert
- Adapt chatbot opening line to buying stage

**Phase 2d — Full agentic consultant (12 months)**
- LLM-powered chat with full signal context (CRM + Fireflies + LinkedIn + news)
- Voice/video AI consultant option (virtual Qapitol advisor)
- Session handoff to human rep with full context transcript

---

## Appendix A — Content Gaps (known, to be addressed)

- [ ] Real client logos for marquee (currently placeholders)
- [ ] Actual case study content with named clients (where permitted) or anonymised
- [ ] Leadership team headshots and bios for About page
- [ ] Real testimonial quotes from client contacts
- [ ] Blog content pipeline — minimum 12 posts before Insights launch
- [ ] Whitepaper PDFs for download (at least 2: AI Compliance Guide, QUASAR Framework)

## Appendix B — Assets Required

| Asset | Spec | Status |
|---|---|---|
| `logo-qapitol.svg` | SVG, white version for dark bg | ✅ Exists |
| `og-default.png` | 1200×630px, branded | ⬜ Needed |
| QUASAR pentagon SVG | 6-pillar diagram | ✅ Exists |
| Headshots (leadership) | 400×400px, WebP | ⬜ Needed |
| Client logos | SVG preferred, all versions | ⬜ Needed |
| Whitepaper cover images | 800×1000px, WebP | ⬜ Needed |

## Appendix C — Tooling & Integrations (Current)

| Tool | Purpose | Status |
|---|---|---|
| Google Fonts | Inter Tight + Source Sans 3 | ✅ Live |
| Fireflies | Meeting transcripts / call intelligence | ✅ Connected (MCP) |
| Keka | HR / attendance / payroll | ✅ Connected (MCP) |
| HubSpot | CRM (recommended) | ⬜ Pending |
| Clearbit / Warmly | Visitor identification | ⬜ Phase 2 |
| 6sense | Intent signals | ⬜ Phase 2 |
| Mutiny | Surface adaptation | ⬜ Phase 2 |
| Calendly | Meeting booking from CTAs | ⬜ Recommended |
| Google Analytics 4 | Web analytics | ⬜ Pending |
| LinkedIn Insight Tag | B2B visitor attribution | ⬜ Recommended |

---

*This document reflects the website as built in May 2026. It should be reviewed and updated quarterly as new pages, features, or positioning changes are made.*

*For questions about this specification, contact mohan.panguluri@qapitol.com*
