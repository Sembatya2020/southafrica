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

  function q(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qa(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function setText(selector, value, root) {
    if (typeof value !== 'string') return;
    const el = q(selector, root);
    if (el) el.textContent = value;
  }

  function setHtml(selector, value, root) {
    if (typeof value !== 'string') return;
    const el = q(selector, root);
    if (el) el.innerHTML = value;
  }

  function setAttr(selector, attr, value, root) {
    if (typeof value !== 'string') return;
    const el = q(selector, root);
    if (el) el.setAttribute(attr, value);
  }

  function setAllText(selector, values, root) {
    if (!Array.isArray(values)) return;
    const els = qa(selector, root);
    values.forEach((value, index) => {
      if (els[index]) {
        const text = extractText(value);
        if (typeof text === 'string') {
          els[index].textContent = text;
        }
      }
    });
  }

  function setListItems(selector, items, root, allowHtml) {
    if (!Array.isArray(items)) return;
    const list = q(selector, root);
    if (!list) return;
    list.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      if (allowHtml) {
        li.innerHTML = typeof item === 'string' ? item : (extractText(item) || '');
      } else {
        li.textContent = extractText(item) || '';
      }
      list.appendChild(li);
    });
  }

  function extractText(value) {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (!value || typeof value !== 'object') return '';

    const candidates = ['label', 'item', 'value', 'title', 'body', 'sub', 'line', 'text'];
    for (let i = 0; i < candidates.length; i++) {
      const key = candidates[i];
      if (typeof value[key] === 'string') return value[key];
    }
    return '';
  }

  function getTitleBody(item) {
    if (!item) return { title: '', body: '' };
    if (Array.isArray(item)) {
      return { title: item[0] || '', body: item[1] || '' };
    }
    return {
      title: item.title || item.label || item.item || '',
      body: item.body || item.sub || ''
    };
  }

  function setMetaDescription(value) {
    if (typeof value !== 'string') return;
    const meta = q('meta[name="description"]');
    if (meta) meta.setAttribute('content', value);
  }

  function currentPageFile() {
    const file = window.location.pathname.split('/').pop();
    return file || 'index.html';
  }

  async function loadJson(path) {
    try {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  function formatUpdatedAt(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async function fetchLastModified(path) {
    try {
      let response = await fetch(path, { method: 'HEAD', cache: 'no-store' });
      if (!response.ok) {
        response = await fetch(path, { cache: 'no-store' });
      }
      if (!response.ok) return '';
      return response.headers.get('last-modified') || response.headers.get('date') || '';
    } catch (error) {
      return '';
    }
  }

  async function applyContentUpdatedStamp(pageKey) {
    const footerBottom = q('.footer-bottom');
    if (!footerBottom || !pageKey) return;

    const lastModified = await fetchLastModified('./content/' + pageKey + '.json');
    const formatted = formatUpdatedAt(lastModified);
    if (!formatted) return;

    let stamp = q('.footer-updated', footerBottom);
    if (!stamp) {
      stamp = document.createElement('span');
      stamp.className = 'footer-updated';
      footerBottom.appendChild(stamp);
    }
    stamp.textContent = 'Last content update: ' + formatted;
  }

  function applyGlobalContent(content) {
    if (!content) return;

    setText('.cookie-banner p', content.cookieText);
    setText('.nav-logo', content.siteName);
    setAllText('.nav-links .nav-link', content.navLinks);
    setAllText('#mobileMenu a', content.navLinks);

    if (!content.footer) return;

    setText('.footer-logo', content.siteName);
    setText('.footer-brand p', content.footer.tagline);
    setAllText('.footer-col h4', [content.footer.navigationTitle, content.footer.contactTitle]);
    setText('.footer-col:nth-of-type(2) li span', content.footer.contactName);
    setText('.footer-col:nth-of-type(2) li a[href^="tel:"]', content.footer.phoneLabel);
    setText('.footer-col:nth-of-type(2) li a[href^="mailto:"]', content.footer.emailLabel);
    setAttr('.footer-col:nth-of-type(2) li a[href^="tel:"]', 'href', content.footer.phoneHref);
    setAttr('.footer-col:nth-of-type(2) li a[href^="mailto:"]', 'href', content.footer.emailHref);
    setAllText('.footer-legal a', content.footer.legalLinks);
    setAllText('.footer-links a', content.footer.bottomLinks);

    const year = new Date().getFullYear();
    if (content.footer.bottomNotePrefix && content.siteName) {
      setHtml('.footer-bottom > span', content.footer.bottomNotePrefix + ' &nbsp;·&nbsp; © <span data-year>' + year + '</span> ' + content.siteName);
    }
  }

  function applyHomeContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);

    if (content.hero) {
      setText('#hero .eyebrow', content.hero.eyebrow);
      setText('.hero-line-main', content.hero.lineMain);
      setText('.hero-line-accent', content.hero.lineAccent);
      setText('#hero .hero-content > p', content.hero.description);
      setText('#hero .hero-scroll span:first-child', content.hero.explore);
      setText('#hero .hero-buttons .btn-outline', content.hero.buttonLeft);
      setText('#hero .hero-buttons .btn-primary', content.hero.buttonRight);
    }

    if (content.welcome) {
      const welcomeRoot = q('#welcome .welcome-inner');
      if (welcomeRoot) {
        setText('.eyebrow', content.welcome.eyebrow, welcomeRoot);
        setText('h2', content.welcome.heading, welcomeRoot);
        setAllText('p', content.welcome.paragraphs, welcomeRoot);
      }

      const stats = qa('#welcome .stat-row .stat-tile');
      (content.welcome.stats || []).forEach((stat, index) => {
        if (!stats[index]) return;
        setText('.stat-num', stat.number, stats[index]);
        setText('.stat-label', stat.label, stats[index]);
      });
    }

    if (content.work) {
      const workHeader = q('#services .section-header');
      if (workHeader) {
        setText('.eyebrow', content.work.eyebrow, workHeader);
        setText('h2', content.work.heading, workHeader);
        setText('p', content.work.description, workHeader);
      }
      const cards = qa('#services .service-card');
      (content.work.cards || []).forEach((card, index) => {
        if (!cards[index]) return;
        setText('h3', card.title, cards[index]);
        setText('p', card.description, cards[index]);
        setText('.service-card-link', card.linkText, cards[index]);
      });
    }

    if (content.principle) {
      setText('#philosophy blockquote', content.principle.quote);
      setText('#philosophy cite', content.principle.cite);
    }

    if (content.proof) {
      const proofRoot = q('section[aria-label="Proof"] .welcome-inner');
      if (proofRoot) {
        setText('.eyebrow', content.proof.eyebrow, proofRoot);
        setText('h2', content.proof.heading, proofRoot);
        setText('p', content.proof.description, proofRoot);
        setText('.btn-outline-dark', content.proof.button, proofRoot);
      }
    }

    if (content.cta) {
      const ctaRoot = q('#cta .cta-inner');
      if (ctaRoot) {
        setText('h2', content.cta.heading, ctaRoot);
        setText('p', content.cta.description, ctaRoot);
        setText('.cta-buttons .btn-primary', content.cta.buttonPrimary, ctaRoot);
        setText('.cta-buttons .btn-outline-dark', content.cta.buttonSecondary, ctaRoot);
      }
    }
  }

  function applyApproachContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);
    if (content.hero) {
      setText('.legal-breadcrumb span', content.hero.breadcrumb);
      setText('.legal-hero-inner h1', content.hero.heading);
      setText('.legal-subtitle', content.hero.subtitle);
    }
    setText('.legal-back', content.backToHome);

    const eyebrows = qa('.as-wrap > .eyebrow');
    const sectionTitles = qa('.as-wrap > .as-section-title');
    const leads = qa('.as-wrap > .as-lead');
    if (content.problem) {
      if (eyebrows[0]) eyebrows[0].textContent = content.problem.eyebrow;
      if (sectionTitles[0]) sectionTitles[0].textContent = content.problem.heading;
      if (leads[0]) leads[0].textContent = content.problem.lead;

      const firstGrid = qa('.as-wrap > .as-grid.as-grid-2')[0];
      if (firstGrid) {
        const cards = qa('.as-card', firstGrid);
        if (cards[0]) {
          setText('h3', content.problem.signalsTitle, cards[0]);
          setListItems('ul', content.problem.signals, cards[0], false);
        }
        if (cards[1]) {
          setText('h3', content.problem.trapTitle, cards[1]);
          setText('p', content.problem.trapBody, cards[1]);
          setAllText('.as-pill', content.problem.trapPills, cards[1]);
        }
      }
    }

    if (content.approach) {
      if (eyebrows[1]) eyebrows[1].textContent = content.approach.eyebrow;
      if (sectionTitles[1]) sectionTitles[1].textContent = content.approach.heading;
      if (leads[1]) leads[1].textContent = content.approach.lead;

      const threeGrid = qa('.as-wrap > .as-grid.as-grid-3')[0];
      (content.approach.cards || []).forEach((card, index) => {
        const cardEl = qa('.as-card', threeGrid)[index];
        if (!cardEl) return;
        const parsed = getTitleBody(card);
        setText('h3', parsed.title, cardEl);
        setText('p', parsed.body, cardEl);
      });

      setText('.as-callout h3', content.approach.calloutTitle);
      setText('.as-callout p', content.approach.calloutBody);

      const twoGrid = qa('.as-wrap > .as-grid.as-grid-2')[1];
      (content.approach.implementationCards || []).forEach((card, index) => {
        const cardEl = qa('.as-card', twoGrid)[index];
        if (!cardEl) return;
        const parsed = getTitleBody(card);
        setText('h3', parsed.title, cardEl);
        setText('p', parsed.body, cardEl);
      });
    }

    setText('.as-wrap > div[style*="margin-top:2.8rem"] .btn-primary', content.ctaButton);
  }

  function applyValueContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);
    if (content.hero) {
      setText('.legal-breadcrumb span', content.hero.breadcrumb);
      setText('.legal-hero-inner h1', content.hero.heading);
      setText('.legal-subtitle', content.hero.subtitle);
    }
    setText('.legal-back', content.backToHome);
    setText('.as-wrap > .as-lead', content.lead);

    const cards = qa('.as-wrap .as-grid.as-grid-3 .as-card');
    (content.cards || []).forEach((card, index) => {
      if (!cards[index]) return;
      const parsed = getTitleBody(card);
      setText('h3', parsed.title, cards[index]);
      setText('p', parsed.body, cards[index]);
    });

    setText('.as-callout h3', content.calloutTitle);
    setText('.as-callout p', content.calloutBody);
    setText('.as-wrap > div[style*="margin-top:2.8rem"] .btn-primary', content.ctaButton);
  }

  function applyFounderContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);
    if (content.hero) {
      setText('.legal-breadcrumb span', content.hero.breadcrumb);
      setText('.legal-hero-inner h1', content.hero.heading);
      setText('.legal-subtitle', content.hero.subtitle);
    }
    setText('.legal-back', content.backToHome);
    setText('.founder-portrait-cap', content.portraitCaption);
    setText('.founder-portrait-note', content.portraitNote);
    setText('.founder-intro .as-lead', content.lead);

    const topCards = qa('.as-wrap > .as-grid.as-grid-2')[0];
    if (topCards) {
      const cards = qa('.as-card', topCards);
      if (cards[0]) {
        setText('h3', content.workCard.title, cards[0]);
        setListItems('ul', content.workCard.items, cards[0], false);
      }
      if (cards[1]) {
        setText('h3', content.learningCard.title, cards[1]);
        setText('p', content.learningCard.body, cards[1]);
      }
    }

    const eyebrows = qa('.as-wrap > .eyebrow');
    const titles = qa('.as-wrap > .as-section-title');
    const leads = qa('.as-wrap > .as-lead');
    if (eyebrows[0]) eyebrows[0].textContent = content.proof.eyebrow;
    if (titles[0]) titles[0].textContent = content.proof.heading;
    if (leads[0]) leads[0].textContent = content.proof.lead;

    const bottomCards = qa('.as-wrap > .as-grid.as-grid-2')[1];
    if (bottomCards) {
      const cards = qa('.as-card', bottomCards);
      if (cards[0]) {
        setText('h3', content.proof.selectedTitle, cards[0]);
        setListItems('ul', content.proof.selectedItems, cards[0], true);
      }
      if (cards[1]) {
        setText('h3', content.proof.signalsTitle, cards[1]);
        setText('p', content.proof.signalsBody, cards[1]);
        setAllText('.as-pill', content.proof.signalsPills, cards[1]);
      }
    }

    setText('.as-wrap > div[style*="margin-top:2.8rem"] .btn-primary', content.ctaButton);
  }

  function applyDiagnosticContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);
    if (content.hero) {
      setText('.legal-breadcrumb span', content.hero.breadcrumb);
      setText('.legal-hero-inner h1', content.hero.heading);
      setText('.legal-subtitle', content.hero.subtitle);
    }
    setText('.legal-back', content.backToHome);

    const eyebrows = qa('.as-wrap > .eyebrow');
    const titles = qa('.as-wrap > .as-section-title');
    const leads = qa('.as-wrap > .as-lead');
    if (eyebrows[0]) eyebrows[0].textContent = content.fit.eyebrow;
    if (titles[0]) titles[0].textContent = content.fit.heading;

    const fitCards = qa('.as-wrap > .as-grid.as-grid-3 .as-card');
    (content.fit.cards || []).forEach((card, index) => {
      if (!fitCards[index]) return;
      const parsed = getTitleBody(card);
      setText('h3', parsed.title, fitCards[index]);
      setText('p', parsed.body, fitCards[index]);
    });

    if (eyebrows[1]) eyebrows[1].textContent = content.questions.eyebrow;
    if (titles[1]) titles[1].textContent = content.questions.heading;
    if (leads[0]) leads[0].textContent = content.questions.lead;

    const qItems = qa('.q-grid .q-item');
    (content.questions.items || []).forEach((item, index) => {
      if (!qItems[index]) return;
      const parsed = getTitleBody(item);
      const main = q('.q-main', qItems[index]);
      const num = q('.q-num', qItems[index]);
      if (num) num.textContent = (index + 1).toString().padStart(2, '0');
      if (main) {
        let textNode = null;
        for (let i = 0; i < main.childNodes.length; i++) {
          if (main.childNodes[i].nodeType === Node.TEXT_NODE) {
            textNode = main.childNodes[i];
            break;
          }
        }
        if (!textNode) {
          textNode = document.createTextNode('');
          main.appendChild(textNode);
        }
        textNode.nodeValue = parsed.title;
      }
      setText('.q-sub', parsed.body, qItems[index]);
    });

    setText('.as-callout h3', content.callout.title);
    setText('.as-callout p', content.callout.body);
    setText('.as-wrap > div[style*="margin-top:2.4rem"] .btn-primary', content.callout.button);
  }

  function applyContactContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);
    if (content.hero) {
      setText('.legal-breadcrumb span', content.hero.breadcrumb);
      setText('.legal-hero-inner h1', content.hero.heading);
      setText('.legal-subtitle', content.hero.subtitle);
    }
    setText('.legal-back', content.backToHome);
    setText('.as-wrap > .as-lead', content.lead);

    const cards = qa('.as-wrap .as-grid.as-grid-2 .as-card');
    if (cards[0]) {
      setText('h3', content.requestCard.title, cards[0]);
      setAllText('.as-contact-pill .ck', content.requestCard.labels, cards[0]);
      setAllText('.as-contact-pill .cv', content.requestCard.values, cards[0]);
      setText('.btn-primary', content.requestCard.button, cards[0]);
      setAttr('.btn-primary', 'href', content.requestCard.buttonHref, cards[0]);
    }
    if (cards[1]) {
      setText('h3', content.expectCard.title, cards[1]);
      setListItems('ul', content.expectCard.items, cards[1], false);
    }
  }

  function applyLegalPageContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setMetaDescription(content.metaDescription);
    if (content.hero) {
      setText('.legal-breadcrumb span', content.hero.breadcrumb);
      setText('.legal-hero-inner h1', content.hero.heading);
    }
    setText('.legal-back', content.backToHome);

    if (Array.isArray(content.sections)) {
      const legalBody = q('.legal-content');
      if (legalBody) {
        let html = '<p>' + (content.intro || '') + '</p>';
        content.sections.forEach(section => {
          const parsed = getTitleBody(section);
          html += '<h2>' + parsed.title + '</h2><p>' + parsed.body + '</p>';
        });
        legalBody.innerHTML = html;
      }
    }

    if (Array.isArray(content.responsible)) {
      const card = q('.legal-responsible');
      if (card) {
        card.innerHTML = content.responsible.map(line => {
          const text = typeof line === 'string' ? line : (line.line || '');
          return '<p>' + text + '</p>';
        }).join('');
      }
    }
  }

  function applyNotFoundContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setText('.notfound-card .eyebrow', content.eyebrow);
    setText('.notfound-card h1', content.heading);
    setText('.notfound-card h2', content.subheading);
    setText('.notfound-card p', content.description);
    setText('.notfound-card .btn-primary', content.button);
  }

  function applySuccessContent(content) {
    if (!content) return;
    if (content.metaTitle) document.title = content.metaTitle;
    setText('.success-card .eyebrow', content.eyebrow);
    setText('.success-card h1', content.heading);
    setText('.success-card p', content.description);
    setText('.success-card .btn-primary', content.button);
  }

  async function applyManagedContent() {
    const pageToContent = {
      'index.html': 'home',
      'supervision.html': 'approach',
      'beratung.html': 'value',
      'ueber-mich.html': 'founder',
      'preise.html': 'diagnostic',
      'kontakt.html': 'contact',
      'agb.html': 'terms',
      'datenschutz.html': 'privacy',
      'nutzung.html': 'legal',
      '404.html': 'notFound',
      'success.html': 'success'
    };

    const page = currentPageFile();
    const pageKey = pageToContent[page];
    const [globalContent, pageContent] = await Promise.all([
      loadJson('./content/global.json'),
      pageKey ? loadJson('./content/' + pageKey + '.json') : Promise.resolve(null)
    ]);

    applyGlobalContent(globalContent);

    const pageAppliers = {
      home: applyHomeContent,
      approach: applyApproachContent,
      value: applyValueContent,
      founder: applyFounderContent,
      diagnostic: applyDiagnosticContent,
      contact: applyContactContent,
      terms: applyLegalPageContent,
      privacy: applyLegalPageContent,
      legal: applyLegalPageContent,
      notFound: applyNotFoundContent,
      success: applySuccessContent
    };

    if (pageKey && pageAppliers[pageKey]) {
      pageAppliers[pageKey](pageContent);
    }

    applyContentUpdatedStamp(pageKey);
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

    applyManagedContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
