// Qapitol main.js — Navigation + Forms
(function () {

  // ─────────────────────────────────────────────────────────────────────────
  // MEGAMENU — hover intent with 120ms close delay so mouse can cross the gap
  // ─────────────────────────────────────────────────────────────────────────
  var megaItems = document.querySelectorAll('.has-mega');
  megaItems.forEach(function (li) {
    var closeTimer = null;

    function openMenu() {
      clearTimeout(closeTimer);
      // Close any other open menus first
      megaItems.forEach(function (other) {
        if (other !== li) other.classList.remove('menu-open');
      });
      li.classList.add('menu-open');
    }

    function scheduleClose() {
      closeTimer = setTimeout(function () {
        li.classList.remove('menu-open');
      }, 120);
    }

    li.addEventListener('mouseenter', openMenu);
    li.addEventListener('mouseleave', scheduleClose);

    // If mouse re-enters the megamenu itself, cancel the pending close
    var menu = li.querySelector('.megamenu');
    if (menu) {
      menu.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
      menu.addEventListener('mouseleave', scheduleClose);
    }

    // Keyboard: toggle on Enter/Space on the trigger button
    var trigger = li.querySelector('.nav-trigger');
    if (trigger) {
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          li.classList.toggle('menu-open');
        }
        if (e.key === 'Escape') li.classList.remove('menu-open');
      });
    }
  });

  // Close all menus when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-mega')) {
      megaItems.forEach(function (li) { li.classList.remove('menu-open'); });
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE MENU TOGGLE
  // ─────────────────────────────────────────────────────────────────────────
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navLinks.style.display      = open ? 'flex'     : '';
      navLinks.style.flexDirection = open ? 'column'  : '';
      navLinks.style.position     = open ? 'absolute' : '';
      navLinks.style.background   = open ? 'var(--surface)' : '';
      navLinks.style.padding      = open ? '20px'     : '';
      navLinks.style.right        = open ? '12px'     : '';
      navLinks.style.top          = open ? 'calc(var(--header-h) - 4px)' : '';
      navLinks.style.borderRadius = open ? '16px'     : '';
      navLinks.style.border       = open ? '1px solid var(--border-strong)' : '';
      navLinks.style.zIndex       = open ? '100'      : '';
      navLinks.style.boxShadow    = open ? '0 12px 40px rgba(0,0,0,0.5)' : '';
      navLinks.style.width        = open ? '280px'    : '';
    });
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navLinks.style.display = '';
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIVE LINK HIGHLIGHT
  // ─────────────────────────────────────────────────────────────────────────
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href && href === here) {
      a.style.color = 'var(--accent-light)';
      a.style.fontWeight = '600';
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SMOOTH SCROLL (anchors on same page)
  // ─────────────────────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FORMSPREE AJAX — any form with data-ajax attribute
  // No page reload; shows inline success / error; fires GTM event
  // ─────────────────────────────────────────────────────────────────────────
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjwrzen';

  document.querySelectorAll('form[data-ajax]').forEach(function (form) {
    var submitBtn       = form.querySelector('[type="submit"]');
    var successEl       = form.querySelector('[data-fs-success]') ||
                          (form.parentElement && form.parentElement.querySelector('[data-fs-success]'));
    var errorEl         = form.querySelector('[data-fs-error-global]') ||
                          (form.parentElement && form.parentElement.querySelector('[data-fs-error-global]'));
    var originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        return res.json().then(function (json) { return { ok: res.ok, json: json }; });
      })
      .then(function (result) {
        if (result.ok) {
          form.style.display = 'none';
          if (successEl) {
            successEl.style.display = 'block';
          } else {
            var msg = document.createElement('div');
            msg.style.cssText = 'padding:40px 24px;text-align:center;';
            msg.innerHTML =
              '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#21a3b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:0 auto 16px"><polyline points="20 6 9 17 4 12"/></svg>' +
              '<p style="font-size:18px;font-weight:700;color:#f0f0ff;margin:0 0 8px">Thank you — we\'ll be in touch soon.</p>' +
              '<p style="font-size:14px;color:rgba(240,240,255,.5);margin:0">A member of our team will respond within one business day.</p>';
            form.parentNode.insertBefore(msg, form.nextSibling);
          }
          if (window.dataLayer) {
            window.dataLayer.push({ event: 'form_submit_success' });
          }
        } else {
          var errMsg = (result.json.errors || [])
            .map(function (err) { return err.message; })
            .join(', ') || 'Something went wrong. Please try again.';
          if (errorEl) {
            errorEl.textContent = errMsg;
            errorEl.style.display = 'block';
          } else {
            alert(errMsg);
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        }
      })
      .catch(function () {
        var msg = 'Network error — please check your connection and try again.';
        if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; }
        else alert(msg);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
      });
    });
  });

})();
