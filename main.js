/* ═══════════════════════════════════════════════════════════════
   KOMM SPRICH MIT MIR — main.js
   - i18n (DE / EN)
   - navbar scroll state
   - mobile menu (with hamburger ↔ X animation)
   - fade-up reveal on scroll
   - gallery arrow navigation
   - scroll-progress indicator
   - contact form (visual feedback)
   - cookie banner
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── TRANSLATIONS ───────────────────────────────────────────── */
  const t = {
    de: {
      /* Nav */
      'nav.home':        'Home',
      'nav.supervision': 'Supervision',
      'nav.beratung':    'Beratung',
      'nav.about':       'Über mich',
      'nav.preise':      'Preise',
      'nav.contact':     'Kontakt',
      'nav.services':    'Angebote',
      'nav.gallery':     'Galerie',
      'nav.approach':    'Mein Ansatz',

      /* Hero */
      'hero.eyebrow': 'Psychosoziale Beratung · Supervision · Coaching · Bern',
      'hero.h1':      '<em>Komm, sprich mit mir…</em>',
      'hero.p':       'Psychosoziale Beratung, Supervision und Coaching in Bern. Ein prozessorientierter Raum, in dem das, was dich beschäftigt, sichtbar und verstehbar werden darf.',
      'hero.btn1':    'Termin anfragen',
      'hero.btn2':    'Mehr über mich',
      'hero.scroll':  'Entdecken',

      /* Welcome */
      'welcome.eyebrow': 'Willkommen',
      'welcome.h2':      'Ein Raum, in dem das, was dich beschäftigt, sichtbar werden darf.',
      'welcome.p1':      'Du befindest dich in einer Phase der Unklarheit, bist vielleicht unsicher, wie es bei dir weitergehen könnte? Belastet dich eine Krise, fühlst du Ängste oder Trauer oder möchtest dich weiterentwickeln und neue Wege entdecken?',
      'welcome.p2':      'Dann sei willkommen in einem Raum, in dem das, was dich beschäftigt, sichtbar und verstehbar werden darf.',
      'welcome.p3':      'Ich begleite dich als aufmerksame Gesprächspartnerin, Mitforschende und Impulsgeberin. Meine Arbeitsweise ist prozessorientiert.',
      'welcome.p4':      'Körperempfindungen, innere Bilder, Bewegung und Stillstand, Töne und Worte – alles darf da sein.',
      'welcome.p5':      'Du musst nichts mitbringen. Es reicht, wenn du spürst, dass du hinschauen möchtest.',
      'welcome.p6':      'Wenn du selbst mit Klienten arbeitest, stehe ich dir als BSO anerkannte Supervisorin zur Verfügung, um deine fachliche Arbeit gemeinsam zu reflektieren und weiterzuentwickeln.',

      /* Services */
      'services.eyebrow':  'Mein Angebot',
      'services.h2':       'Drei Wege, miteinander zu arbeiten',
      'services.p':        'Ob für deinen persönlichen Weg, deine fachliche Reflexion oder deine berufliche Entwicklung – ich begleite dich prozessorientiert und auf Augenhöhe.',
      'services.card1.h3': 'Beratung & Coaching',
      'services.card1.p':  'Prozessorientierte psychosoziale Beratung SGFB für Menschen in Phasen der Unklarheit, Krise oder Entwicklung.',
      'services.card2.h3': 'Supervision',
      'services.card2.p':  'Als BSO anerkannte Supervisorin begleite ich Fachpersonen beim Reflektieren ihrer Arbeit – auf Augenhöhe.',
      'services.card3.h3': 'Erstgespräch',
      'services.card3.p':  'Du bist unsicher, ob mein Angebot zu dir passt? Melde dich gerne unverbindlich – ich freue mich, von dir zu hören.',
      'services.more':     'Mehr erfahren →',
      'services.contact':  'Kontakt aufnehmen →',

      /* Philosophy */
      'phil.quote': '„Ewig forschend, weit reisend, immer wieder Neues entdeckend…"',
      'phil.cite':  'Pascale Kohli',

      /* About teaser (home) */
      'aboutT.eyebrow': 'Über mich',
      'aboutT.h2':      'Pascale Kohli',
      'aboutT.p1':      'Prozessorientierte Psychosoziale Beraterin SGFB, Supervisorin & Coach BSO. Ich arbeite zwischen der Schweiz und Südafrika und bringe Erfahrung aus mehreren Jahren im psychiatrischen und psychotherapeutischen Umfeld mit.',
      'aboutT.p2':      'Mich interessiert das Unausgesprochene – das, was da ist, aber oft keinen Raum bekommt. Mit feinem Gespür und Klarheit darf ich Menschen unterstützen, innere Prozesse zu verstehen und neue Schritte zu gehen.',
      'aboutT.btn':     'Mehr über mich',

      'about.tag1': 'Prozessorientiert',
      'about.tag2': 'SGFB · BSO',
      'about.tag3': 'Wertfrei',
      'about.tag4': 'Mehrjährige Erfahrung',
      'about.tag5': 'Mehrsprachig',

      /* Gallery */
      'gallery.eyebrow': 'Inspiration',
      'gallery.h2':      'Jeder Weg hat seinen Rhythmus',
      'gallery.p':       'Natur ist für mich ein täglicher Spiegel des Lebens – voller Weisheit, Schönheit und Wandel.',
      'gallery.cap1':    'Alpengipfel · Schweiz',
      'gallery.cap2':    'Weite Wege · Südafrika',
      'gallery.cap3':    'Offene Weite · Karoo',
      'gallery.cap4':    'Wilde Küste · Garden Route',
      'gallery.cap5':    'Kraft des Meeres',
      'gallery.cap6':    'Der Weg ist das Ziel',
      'gallery.cap7':    'Neue Horizonte',
      'gallery.cap8':    'Ruhig fliessen',
      'gallery.cap9':    'Schritt für Schritt',
      'gallery.cap10':   'Weitsicht',


      /* Testimonials Home */
      'testi.eb': 'KUNDENSTIMMEN',
      'testi.h2': 'Was Klient:innen sagen',
      'testi.q1': 'Die Zusammenarbeit mit Pascale gab mir die Klarheit, nach der ich jahrelang gesucht hatte. Sie hört tief zu und hält den Raum auf wunderbare Weise.',
      'testi.c1': 'S.M., Klientin für Psychosoziale Beratung',
      'testi.q2': 'Die Supervisionssitzungen haben mir geholfen, sowohl beruflich als auch persönlich zu wachsen. Ich ging jedes Mal geerdeter nach Hause.',
      'testi.c2': 'T.B., Supervisions-Klient, Bern',
      'testi.placeholder': 'Deine Rückmeldung erscheint hier, sobald sie eintrifft.',

      /* CTA */
      'cta.h2':   'Bereit für ein erstes Gespräch?',
      'cta.p':    'Wenn du unsicher bist, ob mein Angebot zu dir passt – melde dich gerne unverbindlich.',
      'cta.btn1': 'Kontakt aufnehmen',
      'cta.btn2': 'Preise ansehen',

      /* Footer */
      'footer.brand':           'Prozessorientierte Psychosoziale Beratung, Supervision und Coaching – online oder in Bern.',
      'footer.nav.header':      'Navigation',
      'footer.contact.header':  'Kontakt',
      'footer.note':            'Anfragen bitte nur per E-Mail.',
      'footer.copyright':       '© 2026 Komm sprich mit mir · Pascale Kohli',
      'footer.link.agb':         'AGB',
      'footer.link.nutzung':     'Nutzung & Impressum',
      'footer.link.datenschutz': 'Datenschutzrichtlinie',
      'footer.link.privacy':     'Datenschutz',
      'footer.link.imprint':     'Impressum',
      'footer.link.cookie':      'Cookie-Einstellungen',

      /* Cookie banner */
      'cookie.text':     'Diese Website verwendet Cookies, um Ihnen die bestmögliche Nutzungserfahrung zu bieten. Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.',
      'cookie.accept':   'Akzeptieren',
      'cookie.decline':  'Ablehnen',
      'cookie.settings': 'Einstellungen',

      /* Legal shared */
      'legal.back': '← Zurück zur Startseite',

      /* Form */
      'contact.submit': 'Nachricht senden',
    },

    en: {
      /* Nav */
      'nav.home':        'Home',
      'nav.supervision': 'Supervision',
      'nav.beratung':    'Counselling',
      'nav.about':       'About me',
      'nav.preise':      'Pricing',
      'nav.contact':     'Contact',
      'nav.services':    'Services',
      'nav.gallery':     'Gallery',
      'nav.approach':    'My Approach',

      /* Hero */
      'hero.eyebrow': 'Psychosocial Counselling · Supervision · Coaching · Bern',
      'hero.h1':      '<em>Come, talk to me…</em>',
      'hero.p':       'Psychosocial counselling, supervision and coaching in Bern. A process-oriented space where what occupies you can become visible and understood.',
      'hero.btn1':    'Request appointment',
      'hero.btn2':    'More about me',
      'hero.scroll':  'Discover',

      /* Welcome */
      'welcome.eyebrow': 'Welcome',
      'welcome.h2':      'A space where what occupies you can become visible.',
      'welcome.p1':      'Are you in a phase of uncertainty, perhaps unsure how to move forward? Are you burdened by a crisis, feeling fear or grief — or would you like to grow and discover new paths?',
      'welcome.p2':      'Then welcome to a space where what occupies you can become visible and understood.',
      'welcome.p3':      'I accompany you as an attentive conversation partner, fellow researcher and source of inspiration. My approach is process-oriented.',
      'welcome.p4':      'Body sensations, inner images, movement and stillness, sounds and words — everything is welcome.',
      'welcome.p5':      'You don\'t need to bring anything. It is enough to sense that you want to take a closer look.',
      'welcome.p6':      'If you work with clients yourself, I am available as a BSO-certified supervisor to reflect on and develop your professional practice together.',

      /* Services */
      'services.eyebrow':  'What I offer',
      'services.h2':       'Three ways to work together',
      'services.p':        'Whether for your personal path, your professional reflection or your career development — I accompany you process-oriented and at eye level.',
      'services.card1.h3': 'Counselling & Coaching',
      'services.card1.p':  'Process-oriented psychosocial counselling SGFB for people in phases of uncertainty, crisis or development.',
      'services.card2.h3': 'Supervision',
      'services.card2.p':  'As a BSO-certified supervisor I support professionals in reflecting on their work — at eye level.',
      'services.card3.h3': 'First conversation',
      'services.card3.p':  'Unsure whether my offering suits you? Get in touch without obligation — I look forward to hearing from you.',
      'services.more':     'Learn more →',
      'services.contact':  'Get in touch →',

      /* Philosophy */
      'phil.quote': '"Forever curious, widely travelled, always discovering something new…"',
      'phil.cite':  'Pascale Kohli',

      /* About teaser (home) */
      'aboutT.eyebrow': 'About me',
      'aboutT.h2':      'Pascale Kohli',
      'aboutT.p1':      'Process-oriented psychosocial counsellor SGFB, supervisor & coach BSO. I work between Switzerland and South Africa and bring several years of experience in psychiatric and psychotherapeutic environments.',
      'aboutT.p2':      'I am interested in the unspoken — what is there but rarely gets a space. With sensitivity and clarity, I support people in understanding inner processes and taking new steps.',
      'aboutT.btn':     'More about me',

      'about.tag1': 'Process-oriented',
      'about.tag2': 'SGFB · BSO',
      'about.tag3': 'Non-judgmental',
      'about.tag4': 'Years of experience',
      'about.tag5': 'Multilingual',

      /* Gallery */
      'gallery.eyebrow': 'Inspiration',
      'gallery.h2':      'Every path has its own rhythm',
      'gallery.p':       'Nature is a daily mirror of life for me — full of wisdom, beauty and change.',
      'gallery.cap1':    'Alpine peaks · Switzerland',
      'gallery.cap2':    'Open roads · South Africa',
      'gallery.cap3':    'Wide open spaces · Karoo',
      'gallery.cap4':    'Wild coast · Garden Route',
      'gallery.cap5':    'Power of the ocean',
      'gallery.cap6':    'The journey is the destination',
      'gallery.cap7':    'New horizons',
      'gallery.cap8':    'Flowing gently',
      'gallery.cap9':    'Step by step',
      'gallery.cap10':   'Far-sighted',


      /* Testimonials Home */
      'testi.eb': 'KIND WORDS',
      'testi.h2': 'What clients say',
      'testi.q1': 'Working with Pascale gave me the clarity I had been searching for years. She listens deeply and holds space beautifully.',
      'testi.c1': 'S.M., Psychosocial Counselling client',
      'testi.q2': 'The supervision sessions helped me grow both professionally and personally. I always left feeling more grounded.',
      'testi.c2': 'T.B., Supervision client, Bern',
      'testi.placeholder': 'Your testimonial will appear here once received from a client',

      /* CTA */
      'cta.h2':   'Ready for a first conversation?',
      'cta.p':    'If you\'re unsure whether my offering fits you — get in touch without obligation.',
      'cta.btn1': 'Get in touch',
      'cta.btn2': 'View pricing',

      /* Footer */
      'footer.brand':           'Process-oriented psychosocial counselling, supervision and coaching — online or in Bern.',
      'footer.nav.header':      'Navigation',
      'footer.contact.header':  'Contact',
      'footer.note':            'Enquiries by email only, please.',
      'footer.copyright':       '© 2026 Komm sprich mit mir · Pascale Kohli',
      'footer.link.agb':         'T & C',
      'footer.link.nutzung':     'Usage & Imprint',
      'footer.link.datenschutz': 'Privacy Policy',
      'footer.link.privacy':     'Privacy',
      'footer.link.imprint':     'Imprint',
      'footer.link.cookie':      'Cookie Settings',

      /* Cookie banner */
      'cookie.text':     'This website uses cookies to provide you with the best possible experience. By continuing to use the site, you agree to the use of cookies.',
      'cookie.accept':   'Accept',
      'cookie.decline':  'Decline',
      'cookie.settings': 'Settings',

      /* Legal shared */
      'legal.back': '← Back to home',

      /* Form */
      'contact.submit': 'Send message',
    }
  };

  /* ─── i18n ───────────────────────────────────────────────────── */
  const STORAGE_LANG = 'kspmm.lang';
  let currentLang = localStorage.getItem(STORAGE_LANG) || 'de';
  const langCallbacks = [];

  function applyLang(lang) {
    if (!t[lang]) lang = 'de';
    currentLang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
    document.documentElement.lang = lang;

    const dict = t[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = dict[el.dataset.i18nHtml];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = dict[el.dataset.i18nPlaceholder];
      if (v !== undefined) el.placeholder = v;
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    langCallbacks.forEach(cb => { try { cb(lang); } catch (e) { /* noop */ } });
  }

  // expose for external scripts (legacy)
  window.applyLang = applyLang;
  window._langCallbacks = langCallbacks;
  Object.defineProperty(window, 'currentLang', { get: () => currentLang });

  /* ─── THEME (light / dark) ───────────────────────────────────── */
  const THEME_KEY = 'kspmm.theme';
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
      const isDe = (typeof currentLang !== 'undefined' ? currentLang : 'de') === 'de';
      btn.setAttribute('aria-label', theme === 'dark'
        ? (isDe ? 'Auf hellen Modus wechseln' : 'Switch to light mode')
        : (isDe ? 'Auf dunklen Modus wechseln' : 'Switch to dark mode'));
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
    /* Theme: re-apply (in case localStorage has a different value than the
       inline pre-render script saw) and wire up all toggle buttons. */
    let savedTheme = 'light';
    try { savedTheme = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { /* noop */ }
    applyTheme(savedTheme, false);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    /* Language buttons */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
    applyLang(currentLang);
    // Refresh theme aria-label whenever language changes
    langCallbacks.push(() => applyTheme(getTheme(), false));

    /* Navbar scroll state */
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Legal/inner pages without hero: nav always solid
      if (document.body.classList.contains('legal-page')) {
        navbar.classList.add('scrolled');
      }
    }

    /* Hero zoom-in */
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      // Use rAF so first paint isn't delayed
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
        c.style.transitionDelay = (i * 0.12) + 's';
      });
      document.querySelectorAll('.steps .step').forEach((s, i) => {
        s.style.transitionDelay = (i * 0.1) + 's';
      });
    }

    /* Gallery arrow navigation (auto-inject controls) */
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack && !document.querySelector('.gallery-controls')) {
      const controls = document.createElement('div');
      controls.className = 'gallery-controls';
      controls.innerHTML =
        '<button type="button" class="gallery-arrow prev" aria-label="Vorheriges Bild">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
            '<polyline points="15 18 9 12 15 6"/>' +
          '</svg>' +
        '</button>' +
        '<button type="button" class="gallery-arrow next" aria-label="Nächstes Bild">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
            '<polyline points="9 18 15 12 9 6"/>' +
          '</svg>' +
        '</button>';
      galleryTrack.parentNode.insertBefore(controls, galleryTrack);

      const step = () => {
        const item = galleryTrack.querySelector('.gallery-item');
        if (!item) return 320;
        return item.getBoundingClientRect().width + 16;
      };
      const goBy = (dir) => galleryTrack.scrollBy({ left: dir * step(), behavior: 'smooth' });
      controls.querySelector('.prev').addEventListener('click', () => goBy(-1));
      controls.querySelector('.next').addEventListener('click', () => goBy(1));
    }

    /* Scroll-progress indicator (auto-inject) */
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
      progress.style.transform = 'scaleX(' + (pct / 100) + ')';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* Contact form (visual feedback only — no real backend) */
    const form    = document.getElementById('contactForm');
    const formBtn = document.getElementById('formBtn');
    if (form && formBtn) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        const labelSending = currentLang === 'de' ? 'Wird gesendet…' : 'Sending…';
        const labelSent    = currentLang === 'de' ? 'Gesendet ✓'     : 'Sent ✓';

        formBtn.textContent = labelSending;
        formBtn.disabled = true;
        formBtn.setAttribute('aria-busy', 'true');

        setTimeout(() => {
          formBtn.textContent = labelSent;
          formBtn.style.background = 'var(--sage-dark)';
          setTimeout(() => {
            form.reset();
            formBtn.textContent = (t[currentLang] && t[currentLang]['contact.submit']) || 'Senden';
            formBtn.style.background = '';
            formBtn.disabled = false;
            formBtn.removeAttribute('aria-busy');
          }, 3200);
        }, 1100);
      });
    }

    /* Cookie banner */
    const cookieBanner      = document.getElementById('cookieBanner');
    const cookieAccept      = document.getElementById('cookieAccept');
    const cookieDecline     = document.getElementById('cookieDecline');
    const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
    const footerCookieBtn   = document.getElementById('footerCookieBtn');
    const COOKIE_KEY = 'cookieConsent';

    function showBanner() { if (cookieBanner) cookieBanner.classList.add('show'); }
    function hideBanner(choice) {
      if (cookieBanner) cookieBanner.classList.remove('show');
      if (choice) localStorage.setItem(COOKIE_KEY, choice);
    }

    if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
      setTimeout(showBanner, 900);
    }
    if (cookieAccept)      cookieAccept.addEventListener('click',      () => hideBanner('accepted'));
    if (cookieDecline)     cookieDecline.addEventListener('click',     () => hideBanner('declined'));
    if (cookieSettingsBtn) cookieSettingsBtn.addEventListener('click', () => hideBanner('settings'));
    if (footerCookieBtn)   footerCookieBtn.addEventListener('click',   showBanner);
    /* Scroll Progress */
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
      });
    }

    /* Inject Floating Contact Button globally */
    const floatingBtn = document.createElement('a');
    floatingBtn.href = "https://wa.me/41798555827";
    floatingBtn.className = "floating-contact";
    floatingBtn.target = "_blank";
    floatingBtn.rel = "noopener";
    floatingBtn.setAttribute('aria-label', 'Kontakt via WhatsApp');
    floatingBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      <span class="floating-text">Kontakt</span>
    `;
    document.body.appendChild(floatingBtn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
