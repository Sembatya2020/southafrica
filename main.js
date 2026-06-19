/* ═══════════════════════════════════════════════════════════════
   ALIGNING STRATEGY — main.js
   - theme toggle (light / dark)
   - navbar scroll state
   - mobile menu (hamburger ↔ X)
   - fade-up reveal on scroll
   - scroll-progress indicator
   - auto-updating copyright year
   - cookie banner
   English-only static site — no i18n, no CMS, no gallery.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── THEME (light / dark) ───────────────────────────────────── */
  const THEME_KEY = 'as.theme';
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
  function applyTheme(theme, animate) {
    if (theme !== 'dark') theme = 'light';
    const html = document.documentElement;
    if (!animate) html.classList.add('theme-no-anim');
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* noop */ }
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    if (!animate) {
      requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove('theme-no-anim')));
    }
  }
  function toggleTheme() {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
  }

  /* ─── INIT ───────────────────────────────────────────────────── */
  function init() {
    /* Theme */
    let savedTheme = 'light';
    try { savedTheme = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { /* noop */ }
    applyTheme(savedTheme, false);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    /* Auto-updating copyright year */
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    /* Navbar scroll state */
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      // Inner pages without a full hero keep the nav solid
      if (document.body.classList.contains('legal-page')) {
        navbar.classList.add('scrolled');
      }
    }

    /* Hero zoom-in */
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      requestAnimationFrame(() => heroBg.classList.add('loaded'));
    }

    /* Mobile menu */
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    function openMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (hamburger) {
        hamburger.classList.add('is-active');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    }
    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      if (hamburger) {
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }

    if (hamburger)   hamburger.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) closeMenu();
    });

    /* Fade-up reveal */
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length) {
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        fadeEls.forEach(el => obs.observe(el));
      } else {
        fadeEls.forEach(el => el.classList.add('visible'));
      }

      document.querySelectorAll('.services-grid .service-card').forEach((c, i) => {
        c.style.transitionDelay = (i * 0.1) + 's';
      });
    }

    /* Scroll-progress indicator */
    let progress = document.getElementById('scrollProgress');
    if (!progress) {
      progress = document.createElement('div');
      progress.id = 'scrollProgress';
      progress.className = 'scroll-progress';
      progress.setAttribute('aria-hidden', 'true');
      document.body.appendChild(progress);
    }
    const updateProgress = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* Cookie banner */
    const cookieBanner      = document.getElementById('cookieBanner');
    const cookieAccept      = document.getElementById('cookieAccept');
    const cookieDecline     = document.getElementById('cookieDecline');
    const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
    const COOKIE_KEY = 'as.cookieConsent';

    function showBanner() { if (cookieBanner) cookieBanner.classList.add('show'); }
    function hideBanner(choice) {
      if (cookieBanner) cookieBanner.classList.remove('show');
      if (choice) { try { localStorage.setItem(COOKIE_KEY, choice); } catch (e) { /* noop */ } }
    }
    if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
      setTimeout(showBanner, 900);
    }
    if (cookieAccept)      cookieAccept.addEventListener('click',      () => hideBanner('accepted'));
    if (cookieDecline)     cookieDecline.addEventListener('click',     () => hideBanner('declined'));
    if (cookieSettingsBtn) cookieSettingsBtn.addEventListener('click', () => hideBanner('settings'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
