/**
 * Qapitol Feedback Widget
 * Right-click anywhere → pin a comment to that exact spot
 * Comments → Formspree → mohan.panguluri@qapitol.com
 */
(function () {
  'use strict';

  const ENDPOINT = 'https://formspree.io/f/xnjwrzen'; // reuse existing Formspree
  const PAGE_URL = window.location.href;
  const PAGE_TITLE = document.title;
  let feedbackMode = false;
  let pinCount = 0;

  /* ── Styles ─────────────────────────────────────────────────────── */
  const CSS = `
  #qfb-tab {
    position: fixed; bottom: 80px; right: 0; z-index: 2147483000;
    background: linear-gradient(135deg,#4d31f5,#21a3b2);
    color: #fff; border: none; cursor: pointer;
    border-radius: 10px 0 0 10px;
    padding: 12px 10px; writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-family: 'Inter Tight', sans-serif;
    font-size: 11px; font-weight: 800; letter-spacing: .14em;
    text-transform: uppercase; box-shadow: -3px 0 16px rgba(77,49,245,.4);
    transition: padding .2s;
  }
  #qfb-tab:hover { padding: 14px 12px; }
  #qfb-tab.active {
    background: linear-gradient(135deg,#ef4444,#f97316);
    box-shadow: -3px 0 16px rgba(239,68,68,.4);
  }

  #qfb-overlay {
    display: none; position: fixed; inset: 0; z-index: 2147482990;
    cursor: crosshair;
  }
  #qfb-overlay.on { display: block; }

  #qfb-banner {
    display: none; position: fixed; top: 0; left: 0; right: 0;
    z-index: 2147483001; background: linear-gradient(90deg,#4d31f5,#21a3b2);
    color: #fff; text-align: center; padding: 8px 16px;
    font-family: 'Inter Tight', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: .04em;
  }
  #qfb-banner.on { display: block; }
  #qfb-banner kbd {
    background: rgba(255,255,255,.2); border-radius: 4px;
    padding: 1px 6px; font-family: monospace; font-size: 11px;
  }

  .qfb-pin {
    position: absolute; z-index: 2147482995;
    width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg); cursor: pointer;
    background: linear-gradient(135deg,#4d31f5,#21a3b2);
    border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.4);
    display: flex; align-items: center; justify-content: center;
    transition: transform .15s;
  }
  .qfb-pin:hover { transform: rotate(-45deg) scale(1.15); }
  .qfb-pin span {
    transform: rotate(45deg); font-size: 10px; font-weight: 800;
    color: #fff; font-family: 'Inter Tight', sans-serif;
  }

  .qfb-bubble {
    position: absolute; z-index: 2147483000;
    background: #0b0c1a; border: 1px solid rgba(255,255,255,.14);
    border-radius: 14px; padding: 14px; width: 280px;
    box-shadow: 0 8px 32px rgba(0,0,0,.6); font-family: 'Source Sans 3', sans-serif;
  }
  .qfb-bubble::before {
    content: ''; position: absolute; left: -1px; top: 12px;
    width: 10px; height: 10px; background: #0b0c1a;
    border-left: 1px solid rgba(255,255,255,.14);
    border-bottom: 1px solid rgba(255,255,255,.14);
    transform: rotate(45deg) translate(-50%, 0);
  }
  .qfb-bubble .qfb-meta {
    font-size: 10px; color: rgba(255,255,255,.35);
    margin-bottom: 8px; letter-spacing: .04em;
  }
  .qfb-bubble .qfb-name-row {
    display: flex; gap: 6px; margin-bottom: 8px;
  }
  .qfb-bubble input[type="text"],
  .qfb-bubble input[type="email"],
  .qfb-bubble textarea {
    width: 100%; background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.14); border-radius: 8px;
    color: #fff; padding: 7px 10px; font-size: 13px;
    font-family: inherit; outline: none; resize: none;
    transition: border-color .2s;
  }
  .qfb-bubble input[type="text"]:focus,
  .qfb-bubble input[type="email"]:focus,
  .qfb-bubble textarea:focus {
    border-color: rgba(77,49,245,.6);
  }
  .qfb-bubble textarea { min-height: 80px; margin-bottom: 8px; }
  .qfb-bubble .qfb-actions {
    display: flex; gap: 6px; justify-content: flex-end; align-items: center;
  }
  .qfb-bubble .qfb-cancel {
    background: none; border: none; color: rgba(255,255,255,.4);
    font-size: 12px; cursor: pointer; padding: 4px 6px;
  }
  .qfb-bubble .qfb-submit {
    background: linear-gradient(135deg,#4d31f5,#21a3b2);
    border: none; color: #fff; border-radius: 7px;
    padding: 6px 14px; font-size: 12px; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: opacity .2s;
  }
  .qfb-bubble .qfb-submit:hover { opacity: .85; }
  .qfb-bubble .qfb-submit:disabled { opacity: .5; cursor: default; }
  .qfb-bubble .qfb-success {
    text-align: center; padding: 8px 0;
    font-size: 13px; color: #4ade80; font-weight: 600;
  }
  .qfb-bubble .qfb-type-row {
    display: flex; gap: 5px; margin-bottom: 8px;
  }
  .qfb-type-btn {
    flex: 1; padding: 4px; border-radius: 6px; font-size: 11px;
    font-weight: 600; cursor: pointer; text-align: center;
    border: 1px solid rgba(255,255,255,.14);
    background: transparent; color: rgba(255,255,255,.5);
    transition: all .15s;
  }
  .qfb-type-btn.sel {
    background: rgba(77,49,245,.25);
    border-color: rgba(77,49,245,.5); color: #fff;
  }

  #qfb-page-btn {
    position: fixed; bottom: 140px; right: 0; z-index: 2147483000;
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
    border-radius: 10px 0 0 10px; color: rgba(255,255,255,.6);
    padding: 10px 8px; cursor: pointer; writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-family: 'Inter Tight', sans-serif; font-size: 10px;
    font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    transition: all .2s;
  }
  #qfb-page-btn:hover { background: rgba(255,255,255,.14); color: #fff; }

  #qfb-page-modal {
    display: none; position: fixed; inset: 0; z-index: 2147483002;
    background: rgba(0,0,0,.6); backdrop-filter: blur(4px);
    align-items: center; justify-content: center;
  }
  #qfb-page-modal.on { display: flex; }
  #qfb-page-box {
    background: #0b0c1a; border: 1px solid rgba(255,255,255,.14);
    border-radius: 20px; padding: 28px; width: 420px; max-width: 95vw;
    box-shadow: 0 24px 80px rgba(0,0,0,.8);
  }
  #qfb-page-box h3 {
    font-family: 'Inter Tight', sans-serif; font-size: 1.1rem;
    font-weight: 800; color: #fff; margin-bottom: 4px;
  }
  #qfb-page-box .qfb-page-sub {
    font-size: .8rem; color: rgba(255,255,255,.35);
    margin-bottom: 16px; word-break: break-all;
  }
  #qfb-page-box label {
    display: block; font-size: .78rem; font-weight: 600;
    color: rgba(255,255,255,.55); margin-bottom: 4px; margin-top: 10px;
  }
  #qfb-page-box input, #qfb-page-box textarea, #qfb-page-box select {
    width: 100%; background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.14); border-radius: 8px;
    color: #fff; padding: 9px 12px; font-size: 13px;
    font-family: inherit; outline: none; resize: none;
  }
  #qfb-page-box select option { background: #1a1f35; }
  #qfb-page-box textarea { min-height: 100px; }
  #qfb-page-box .qfb-row { display: flex; gap: 8px; margin-top: 16px; }
  #qfb-page-box .qfb-submit-page {
    flex: 1; background: linear-gradient(135deg,#4d31f5,#21a3b2);
    border: none; color: #fff; border-radius: 9px; padding: 10px;
    font-weight: 700; cursor: pointer; font-family: inherit; font-size: 13px;
  }
  #qfb-page-box .qfb-close-page {
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14);
    color: rgba(255,255,255,.5); border-radius: 9px; padding: 10px 14px;
    cursor: pointer; font-size: 13px;
  }
  `;

  /* ── Inject styles ───────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  /* ── DOM ─────────────────────────────────────────────────────────── */
  // Main toggle tab
  const tab = document.createElement('button');
  tab.id = 'qfb-tab';
  tab.innerHTML = '✦ Feedback';
  tab.title = 'Toggle feedback mode — click anywhere to pin a comment';

  // Transparent click-capture overlay
  const overlay = document.createElement('div');
  overlay.id = 'qfb-overlay';

  // Top banner hint
  const banner = document.createElement('div');
  banner.id = 'qfb-banner';
  banner.innerHTML = '✦ Feedback mode ON — click anywhere on the page to pin a comment &nbsp;|&nbsp; <kbd>Esc</kbd> to exit';

  // Page-level feedback button
  const pageBtn = document.createElement('button');
  pageBtn.id = 'qfb-page-btn';
  pageBtn.innerHTML = '📝 Page Note';
  pageBtn.title = 'Leave a general comment about this page';

  // Page-level modal
  const pageModal = document.createElement('div');
  pageModal.id = 'qfb-page-modal';
  pageModal.innerHTML = `
    <div id="qfb-page-box">
      <h3>Page-Level Feedback</h3>
      <div class="qfb-page-sub">${PAGE_TITLE}</div>
      <label>Your name</label>
      <input type="text" id="qfb-pg-name" placeholder="e.g. Mohan"/>
      <label>Type</label>
      <select id="qfb-pg-type">
        <option value="Content">Content issue</option>
        <option value="Design">Design / layout</option>
        <option value="Copy">Copy / wording</option>
        <option value="Bug">Bug / broken link</option>
        <option value="Idea">Suggestion / idea</option>
        <option value="Other">Other</option>
      </select>
      <label>Comment</label>
      <textarea id="qfb-pg-text" placeholder="What would you like to change or flag?"></textarea>
      <div id="qfb-pg-ok" style="display:none;color:#4ade80;text-align:center;font-size:13px;font-weight:600;padding:8px 0">✓ Thanks — comment received!</div>
      <div class="qfb-row">
        <button class="qfb-close-page" id="qfb-pg-cancel">Cancel</button>
        <button class="qfb-submit-page" id="qfb-pg-submit">Send Feedback →</button>
      </div>
    </div>`;

  document.body.appendChild(tab);
  document.body.appendChild(overlay);
  document.body.appendChild(banner);
  document.body.appendChild(pageBtn);
  document.body.appendChild(pageModal);

  /* ── Toggle feedback mode ────────────────────────────────────────── */
  function setMode(on) {
    feedbackMode = on;
    tab.classList.toggle('active', on);
    overlay.classList.toggle('on', on);
    banner.classList.toggle('on', on);
    document.body.style.cursor = on ? 'crosshair' : '';
  }

  tab.addEventListener('click', () => setMode(!feedbackMode));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMode(false); });

  /* ── Place a pin on click ────────────────────────────────────────── */
  overlay.addEventListener('click', function (e) {
    e.stopPropagation();
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    pinCount++;
    placePinAndBubble(x, y, pinCount);
  });

  function placePinAndBubble(x, y, num) {
    // Pin marker
    const pin = document.createElement('div');
    pin.className = 'qfb-pin';
    pin.style.cssText = `left:${x - 14}px;top:${y - 14}px;`;
    pin.innerHTML = `<span>${num}</span>`;
    document.body.appendChild(pin);

    // Bubble (appears to the right of pin, flips left if near edge)
    const bubble = document.createElement('div');
    bubble.className = 'qfb-bubble';
    const bLeft = (x + 24 + 290 > window.innerWidth) ? x - 300 : x + 24;
    bubble.style.cssText = `left:${bLeft}px;top:${y - 14}px;`;

    bubble.innerHTML = `
      <div class="qfb-meta">#${num} · ${PAGE_TITLE.substring(0,40)} · (${Math.round(x)},${Math.round(y)})</div>
      <div class="qfb-type-row">
        <button class="qfb-type-btn sel" data-t="Design">🎨 Design</button>
        <button class="qfb-type-btn" data-t="Content">📝 Content</button>
        <button class="qfb-type-btn" data-t="Copy">✍️ Copy</button>
        <button class="qfb-type-btn" data-t="Bug">🐛 Bug</button>
      </div>
      <div class="qfb-name-row">
        <input type="text" placeholder="Your name" style="flex:1" class="qfb-n"/>
      </div>
      <textarea placeholder="Describe the change you'd like…" class="qfb-t"></textarea>
      <div class="qfb-actions">
        <button class="qfb-cancel">✕ Remove</button>
        <button class="qfb-submit">Send →</button>
      </div>
      <div class="qfb-success" style="display:none">✓ Got it — thanks!</div>`;

    document.body.appendChild(bubble);

    // Type toggle
    let selectedType = 'Design';
    bubble.querySelectorAll('.qfb-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bubble.querySelectorAll('.qfb-type-btn').forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        selectedType = btn.dataset.t;
      });
    });

    // Cancel / remove
    bubble.querySelector('.qfb-cancel').addEventListener('click', () => {
      bubble.remove(); pin.remove();
    });

    // Submit
    bubble.querySelector('.qfb-submit').addEventListener('click', function () {
      const comment = bubble.querySelector('.qfb-t').value.trim();
      const name = bubble.querySelector('.qfb-n').value.trim() || 'Anonymous';
      if (!comment) { bubble.querySelector('.qfb-t').focus(); return; }
      this.disabled = true;
      this.textContent = 'Sending…';

      const fd = new FormData();
      fd.append('_subject', `[Feedback #${num}] ${selectedType} — ${PAGE_TITLE}`);
      fd.append('page', PAGE_URL);
      fd.append('pin', `#${num} at (${Math.round(x)}, ${Math.round(y)})`);
      fd.append('type', selectedType);
      fd.append('reviewer', name);
      fd.append('comment', comment);

      fetch(ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(r => r.json())
        .then(() => {
          bubble.querySelector('.qfb-actions').style.display = 'none';
          bubble.querySelector('.qfb-success').style.display = 'block';
          setTimeout(() => { bubble.remove(); }, 2500);
          // Pin stays as visual record
          pin.style.background = 'linear-gradient(135deg,#22c55e,#21a3b2)';
        })
        .catch(() => {
          this.disabled = false;
          this.textContent = 'Retry →';
        });
    });

    // Auto-focus textarea
    setTimeout(() => bubble.querySelector('.qfb-t').focus(), 50);

    // Exit mode after placing
    setMode(false);
  }

  /* ── Page-level feedback modal ───────────────────────────────────── */
  pageBtn.addEventListener('click', () => pageModal.classList.add('on'));
  document.getElementById('qfb-pg-cancel').addEventListener('click', () => pageModal.classList.remove('on'));
  pageModal.addEventListener('click', e => { if (e.target === pageModal) pageModal.classList.remove('on'); });

  document.getElementById('qfb-pg-submit').addEventListener('click', function () {
    const comment = document.getElementById('qfb-pg-text').value.trim();
    const name = document.getElementById('qfb-pg-name').value.trim() || 'Anonymous';
    const type = document.getElementById('qfb-pg-type').value;
    if (!comment) { document.getElementById('qfb-pg-text').focus(); return; }

    this.disabled = true; this.textContent = 'Sending…';
    const fd = new FormData();
    fd.append('_subject', `[Page Feedback] ${type} — ${PAGE_TITLE}`);
    fd.append('page', PAGE_URL);
    fd.append('pin', 'Page-level comment');
    fd.append('type', type);
    fd.append('reviewer', name);
    fd.append('comment', comment);

    fetch(ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(() => {
        document.getElementById('qfb-pg-ok').style.display = 'block';
        document.getElementById('qfb-pg-submit').style.display = 'none';
        setTimeout(() => {
          pageModal.classList.remove('on');
          document.getElementById('qfb-pg-ok').style.display = 'none';
          document.getElementById('qfb-pg-submit').style.display = '';
          document.getElementById('qfb-pg-submit').disabled = false;
          document.getElementById('qfb-pg-submit').textContent = 'Send Feedback →';
          document.getElementById('qfb-pg-text').value = '';
        }, 2500);
      })
      .catch(() => { this.disabled = false; this.textContent = 'Retry →'; });
  });

})();
