(function () {
  var MEASUREMENT_ID = 'G-LBCQ8VL0TB';

  // Idempotent GA init
  if (!window.__siteTrackingInit) {
    window.__siteTrackingInit = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', MEASUREMENT_ID);

    // Load gtag.js script once
    if (!document.querySelector('script[src*="gtag/js"]')) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
      document.head.appendChild(s);
    }
  }

  // Expose trackEvent globally so page-specific handlers can use it
  window.trackEvent = function (eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  };

  // Page view event from window.pageTracking config
  var cfg = window.pageTracking;
  if (cfg && cfg.app && cfg.page) {
    window.trackEvent(cfg.app + '_page_view', {
      app: cfg.app,
      page: cfg.page,
      page_type: cfg.pageType || '',
      path: window.location.pathname
    });
  }

  // Global link-click tracking via querySelectorAll delegation
  document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      var eventName = (cfg && cfg.app) ? cfg.app + '_link_click' : 'link_click';
      window.trackEvent(eventName, {
        link_text: link.textContent.trim().substring(0, 100),
        destination: link.href
      });
    });
  });
})();
