(function () {
  if (!window.CMS || !window.React) return;

  var h = window.React.createElement;

  function toData(entry) {
    var data = entry && entry.get && entry.get('data');
    return data && data.toJS ? data.toJS() : {};
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function htmlTag(tag, className, html) {
    return h(tag, {
      className: className,
      dangerouslySetInnerHTML: { __html: html || '' }
    });
  }

  function renderCards(cards, isPricing) {
    return asArray(cards).map(function (card, index) {
      var className = isPricing
        ? 'cms-preview-price-card' + (card && card.featured ? ' cms-preview-price-card--featured' : '')
        : 'cms-preview-service-card';

      if (isPricing) {
        return h('article', { className: className, key: 'price-' + index }, [
          h('div', { className: 'cms-preview-price-eyebrow', key: 'eyebrow' }, card && card.eyebrow ? card.eyebrow : ''),
          h('div', { className: 'cms-preview-price-amount', key: 'amount' }, [
            h('span', { className: 'cms-preview-price-currency', key: 'currency' }, card && card.currency ? card.currency : 'CHF'),
            h('span', { className: 'cms-preview-price-number', key: 'price' }, card && card.price ? card.price : ''),
            h('span', { className: 'cms-preview-price-unit', key: 'unit' }, card && card.unit ? card.unit : '')
          ]),
          htmlTag('p', 'cms-preview-price-desc', card && card.desc),
          h('div', { className: 'cms-preview-price-link', key: 'link' }, card && card.link_text ? card.link_text : '')
        ]);
      }

      return h('article', { className: className, key: 'service-' + index }, [
        h('h3', { className: 'cms-preview-card-title', key: 'title' }, card && card.title ? card.title : ''),
        htmlTag('p', 'cms-preview-card-desc', card && card.desc),
        h('div', { className: 'cms-preview-card-link', key: 'link' }, card && card.link_text ? card.link_text : '')
      ]);
    });
  }

  function renderTextBlocks(blocks) {
    return asArray(blocks)
      .filter(function (block) {
        return block && (block.type === 'text' || block.type === 'heading' || block.type === 'subheading' || block.type === 'quote');
      })
      .slice(0, 5)
      .map(function (block, index) {
        if (block.type === 'heading') return h('h3', { className: 'cms-preview-subheading', key: 'block-' + index }, block.text || '');
        if (block.type === 'subheading') return h('h4', { className: 'cms-preview-miniheading', key: 'block-' + index }, block.text || '');
        if (block.type === 'quote') return htmlTag('blockquote', 'cms-preview-quote', block.text);
        return htmlTag('p', 'cms-preview-paragraph', block.text);
      });
  }

  function ContentPreview(props) {
    var data = toData(props.entry);
    var services = renderCards(data.services_cards, false);
    var prices = renderCards(data.preise_cards, true);
    var lang = props.collection && props.collection.get && props.collection.get('name') === 'content' && props.entry && props.entry.get('slug') === 'english' ? 'EN' : 'DE';

    return h('div', { className: 'cms-preview-page' }, [
      h('header', { className: 'cms-preview-header', key: 'header' }, [
        h('div', { className: 'cms-preview-brand', key: 'brand' }, 'Komm, sprich mit mir'),
        h('div', { className: 'cms-preview-lang', key: 'lang' }, lang)
      ]),

      h('section', { className: 'cms-preview-hero', key: 'hero' }, [
        h('div', { className: 'cms-preview-eyebrow', key: 'eyebrow' }, data.hero_eyebrow || ''),
        htmlTag('h1', 'cms-preview-title', data.hero_h1),
        htmlTag('p', 'cms-preview-lead', data.hero_p),
        h('div', { className: 'cms-preview-actions', key: 'actions' }, [
          h('span', { className: 'cms-preview-btn cms-preview-btn--primary', key: 'btn1' }, data.hero_btn1 || ''),
          h('span', { className: 'cms-preview-btn cms-preview-btn--ghost', key: 'btn2' }, data.hero_btn2 || '')
        ])
      ]),

      h('section', { className: 'cms-preview-section', key: 'welcome' }, [
        h('div', { className: 'cms-preview-eyebrow', key: 'welcome-eyebrow' }, data.welcome_eyebrow || ''),
        h('h2', { className: 'cms-preview-section-title', key: 'welcome-title' }, data.welcome_h2 || ''),
        h('div', { className: 'cms-preview-copy', key: 'welcome-copy' }, renderTextBlocks(data.welcome_blocks))
      ]),

      h('section', { className: 'cms-preview-section', key: 'services' }, [
        h('div', { className: 'cms-preview-eyebrow', key: 'services-eyebrow' }, data.services_eyebrow || ''),
        h('h2', { className: 'cms-preview-section-title', key: 'services-title' }, data.services_h2 || ''),
        htmlTag('p', 'cms-preview-section-intro', data.services_p),
        h('div', { className: 'cms-preview-grid cms-preview-grid--services', key: 'services-grid' }, services)
      ]),

      h('section', { className: 'cms-preview-section', key: 'pricing' }, [
        h('div', { className: 'cms-preview-eyebrow', key: 'pricing-eyebrow' }, data.preise_subtitle || ''),
        h('h2', { className: 'cms-preview-section-title', key: 'pricing-title' }, data.preise_h1 || data.preise_page_title || ''),
        htmlTag('p', 'cms-preview-section-intro', data.preise_intro),
        h('div', { className: 'cms-preview-grid cms-preview-grid--pricing', key: 'pricing-grid' }, prices)
      ])
    ]);
  }

  window.CMS.registerPreviewStyle('preview.css');
  window.CMS.registerPreviewTemplate('deutsch', ContentPreview);
  window.CMS.registerPreviewTemplate('english', ContentPreview);
})();