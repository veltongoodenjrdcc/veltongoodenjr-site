/* ============================================================
   SITE JS - veltongoodenjr.com
   Vanilla JS, no framework. Progressively enhanced.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     COOKIE CONSENT + OPTIONAL THIRD-PARTY SERVICES
     ---------------------------------------------------------- */
  const CONSENT_KEY = 'vgj-cookie-consent-v1';
  const COOKIE_FLOAT_DISMISSED_KEY = 'vgj-cookie-float-dismissed-v1';
  const ANALYTICS_ID = 'G-X5EHZYMGHC';
  const CONSENT_DEFAULTS = Object.freeze({
    analytics: false,
    embeddedMedia: false
  });
  let analyticsConfigured = false;

  const storageAvailable = () => {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch {
      return false;
    }
  };

  const canUseStorage = storageAvailable();
  let memoryConsent = null;
  let memoryCookieFloatDismissed = false;

  const normaliseConsent = (value) => {
    return {
      analytics: Boolean(value && value.analytics),
      embeddedMedia: Boolean(value && value.embeddedMedia)
    };
  };

  const getStoredConsent = () => {
    if (!canUseStorage) return memoryConsent;
    try {
      const raw = window.localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      return normaliseConsent(JSON.parse(raw));
    } catch {
      return null;
    }
  };

  const saveStoredConsent = (choices) => {
    const consent = {
      version: 1,
      updatedAt: new Date().toISOString(),
      ...normaliseConsent(choices)
    };

    memoryConsent = consent;
    if (canUseStorage) {
      try {
        window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      } catch {
        memoryConsent = consent;
      }
    }
    return consent;
  };

  const getCookieFloatDismissed = () => {
    if (!canUseStorage) return memoryCookieFloatDismissed;
    try {
      return window.localStorage.getItem(COOKIE_FLOAT_DISMISSED_KEY) === '1';
    } catch {
      return memoryCookieFloatDismissed;
    }
  };

  const saveCookieFloatDismissed = () => {
    memoryCookieFloatDismissed = true;
    if (!canUseStorage) return;
    try {
      window.localStorage.setItem(COOKIE_FLOAT_DISMISSED_KEY, '1');
    } catch {
      memoryCookieFloatDismissed = true;
    }
  };

  const getPrivacyHref = () => {
    const footerPrivacyLink = document.querySelector('.footer-legal a[href*="privacy"]');
    return footerPrivacyLink ? footerPrivacyLink.getAttribute('href') : '/privacy/';
  };

  const expireCookie = (name, domain) => {
    const domainPart = domain ? `; domain=${domain}` : '';
    document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
  };

  const clearAnalyticsCookies = () => {
    const names = document.cookie
      .split(';')
      .map(cookie => cookie.split('=')[0].trim())
      .filter(name => /^_ga($|_)|^_gid$|^_gat/.test(name));

    if (!names.length) return;

    const host = window.location.hostname;
    const hostParts = host.split('.').filter(Boolean);
    const baseDomain = hostParts.length > 1 ? `.${hostParts.slice(-2).join('.')}` : '';
    const domains = ['', host, `.${host}`, baseDomain].filter(Boolean);

    names.forEach(name => {
      expireCookie(name);
      domains.forEach(domain => expireCookie(name, domain));
    });
  };

  const consentStateFor = (granted) => ({
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  const getGtag = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    return window.gtag;
  };

  const loadAnalytics = () => {
    window[`ga-disable-${ANALYTICS_ID}`] = false;
    const gtag = getGtag();
    if (!analyticsConfigured) {
      gtag('consent', 'default', consentStateFor(false));
      gtag('consent', 'update', consentStateFor(true));
      gtag('js', new Date());
      gtag('config', ANALYTICS_ID, {
        allow_ad_personalization_signals: false,
        allow_google_signals: false
      });
      analyticsConfigured = true;
    } else {
      gtag('consent', 'update', consentStateFor(true));
    }

    if (document.querySelector(`script[data-consent-analytics="${ANALYTICS_ID}"]`)) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS_ID)}`;
    script.setAttribute('data-consent-analytics', ANALYTICS_ID);
    document.head.appendChild(script);
  };

  const disableAnalytics = () => {
    window[`ga-disable-${ANALYTICS_ID}`] = true;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', consentStateFor(false));
    }
    clearAnalyticsCookies();
  };

  const buildMediaPlaceholder = (container) => {
    let placeholder = container.querySelector('[data-consent-media-placeholder]');
    if (placeholder) return placeholder;

    placeholder = document.createElement('div');
    placeholder.className = 'consent-media-placeholder';
    placeholder.setAttribute('data-consent-media-placeholder', '');
    placeholder.innerHTML = `
      <div class="consent-media-placeholder__inner">
        <p class="consent-media-placeholder__title">Video paused for privacy</p>
        <p class="consent-media-placeholder__copy">YouTube embeds stay off until you allow embedded media.</p>
        <button type="button" class="btn btn--secondary btn--sm" data-consent-enable-media>Load this video</button>
      </div>
    `;
    container.appendChild(placeholder);
    return placeholder;
  };

  const applyEmbeddedMediaConsent = (granted) => {
    document.querySelectorAll('[data-consent-media]').forEach(container => {
      const iframe = container.querySelector('iframe[data-consent-src]');
      if (!iframe) return;

      const placeholder = buildMediaPlaceholder(container);
      if (granted) {
        if (!iframe.getAttribute('src')) {
          iframe.setAttribute('src', iframe.getAttribute('data-consent-src'));
        }
        placeholder.hidden = true;
        iframe.hidden = false;
      } else {
        iframe.removeAttribute('src');
        iframe.hidden = true;
        placeholder.hidden = false;
      }
    });
  };

  const applyConsent = (choices) => {
    const consent = normaliseConsent(choices || CONSENT_DEFAULTS);
    if (consent.analytics) {
      loadAnalytics();
    } else {
      disableAnalytics();
    }
    applyEmbeddedMediaConsent(true); // embedded media always allowed
    document.documentElement.classList.toggle('has-cookie-consent', true);
    return consent;
  };

  const addFooterPreferencesLink = () => {
    const privacyLink = document.querySelector('.footer-legal a[href*="privacy"]');
    if (!privacyLink) return;
    if (privacyLink.parentElement && privacyLink.parentElement.querySelector('[data-cookie-preferences]')) return;

    const preferencesLink = document.createElement('a');
    preferencesLink.href = '#cookie-preferences';
    preferencesLink.textContent = 'Cookie preferences';
    preferencesLink.setAttribute('data-cookie-preferences', '');
    privacyLink.insertAdjacentElement('afterend', preferencesLink);
  };

  const getCookieFloat = () => document.querySelector('.cookie-float');

  const dismissCookieFloat = () => {
    saveCookieFloatDismissed();
    const float = getCookieFloat();
    if (!float) return;

    float.classList.remove('is-nudging');
    float.classList.add('is-dismissing');
    const removeFloat = () => float.remove();
    float.addEventListener('transitionend', removeFloat, { once: true });
    window.setTimeout(removeFloat, 360);
  };

  const initCookieFloat = () => {
    const float = getCookieFloat();
    if (!float) return;

    if (getCookieFloatDismissed()) {
      float.remove();
      return;
    }

    window.requestAnimationFrame(() => {
      if (!float.isConnected) return;
      float.classList.add('is-ready', 'is-nudging');
      window.setTimeout(() => {
        if (float.isConnected) float.classList.remove('is-nudging');
      }, 1800);
    });
  };

  const hideConsentBanner = () => {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    banner.classList.add('is-leaving');
    const remove = () => banner.remove();
    banner.addEventListener('animationend', remove, { once: true });
    window.setTimeout(remove, 500); // fallback
  };

  let cookieModal;
  let restoreFocusTo;

  const closeCookieModal = () => {
    if (!cookieModal) return;
    cookieModal.remove();
    cookieModal = null;
    if (restoreFocusTo && typeof restoreFocusTo.focus === 'function') {
      restoreFocusTo.focus();
    }
  };

  const saveConsentAndRefresh = (choices) => {
    const consent = saveStoredConsent(choices);
    applyConsent(consent);
    hideConsentBanner();
    dismissCookieFloat();
    closeCookieModal();
  };

  const openCookieModal = () => {
    if (cookieModal) {
      cookieModal.querySelector('.cookie-modal__close').focus();
      return;
    }

    restoreFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const current = normaliseConsent(getStoredConsent() || CONSENT_DEFAULTS);

    cookieModal = document.createElement('div');
    cookieModal.className = 'cookie-modal';
    cookieModal.setAttribute('role', 'dialog');
    cookieModal.setAttribute('aria-modal', 'true');
    cookieModal.setAttribute('aria-labelledby', 'cookieModalTitle');
    cookieModal.innerHTML = `
      <div class="cookie-modal__backdrop" data-cookie-modal-close></div>
      <div class="cookie-modal__panel" id="cookie-preferences">
        <button type="button" class="cookie-modal__close" aria-label="Close cookie preferences" data-cookie-modal-close><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        <p class="cookie-consent__eyebrow">Privacy choices</p>
        <h2 class="cookie-modal__title" id="cookieModalTitle">Cookie preferences</h2>
        <p class="cookie-modal__copy">Essential storage remembers this choice. Optional services stay off unless you allow them here.</p>
        <div class="cookie-options">
          <label class="cookie-option">
            <span><strong>Essential preference storage</strong><small>Required to remember your cookie choice and keep the site usable.</small></span>
            <input type="checkbox" checked disabled>
          </label>
          <label class="cookie-option">
            <span><strong>Analytics</strong><small>Allows Google Analytics to measure visits and page performance. Advertising signals are disabled.</small></span>
            <input type="checkbox" data-consent-choice="analytics"${current.analytics ? ' checked' : ''}>
          </label>
        </div>
        <div class="cookie-modal__actions">
          <button type="button" class="btn btn--secondary btn--sm" data-consent-reject>Reject optional</button>
          <button type="button" class="btn btn--outline btn--sm" data-consent-save>Save choices</button>
          <button type="button" class="btn btn--primary btn--sm" data-consent-accept>Accept optional</button>
        </div>
        <p class="cookie-modal__fineprint"><a href="${getPrivacyHref()}">Privacy Notice</a></p>
      </div>
    `;
    document.body.appendChild(cookieModal);
    cookieModal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(cookieModal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])'))
        .filter(element => element instanceof HTMLElement && element.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    const closeButtons = cookieModal.querySelectorAll('[data-cookie-modal-close]');
    closeButtons.forEach(button => button.addEventListener('click', closeCookieModal));
    cookieModal.querySelector('[data-consent-reject]').addEventListener('click', () => saveConsentAndRefresh(CONSENT_DEFAULTS));
    cookieModal.querySelector('[data-consent-accept]').addEventListener('click', () => saveConsentAndRefresh({ analytics: true, embeddedMedia: true }));
    cookieModal.querySelector('[data-consent-save]').addEventListener('click', () => {
      const analyticsChoice = cookieModal.querySelector('[data-consent-choice="analytics"]');
      saveConsentAndRefresh({
        analytics: analyticsChoice ? analyticsChoice.checked : false,
        embeddedMedia: true
      });
    });
    cookieModal.querySelector('.cookie-modal__close').focus();
  };

  const showConsentBanner = () => {
    if (document.querySelector('[data-cookie-banner]')) return;

    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.setAttribute('data-cookie-banner', '');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookieConsentTitle');
    banner.setAttribute('aria-describedby', 'cookieConsentCopy');
    banner.innerHTML = `
      <div class="cookie-consent__content">
        <span class="cookie-consent__icon" aria-hidden="true"><i class="fa-solid fa-cookie-bite"></i></span>
        <div class="cookie-consent__copy" id="cookieConsentCopy">
          <div class="cookie-consent__headerline">
            <p class="cookie-consent__title" id="cookieConsentTitle">Cookies, perchance?</p>
            <a href="${getPrivacyHref()}" class="cookie-consent__policy-link">Privacy Notice</a>
          </div>
          <small class="cookie-consent__quip">(I wonder why they didn&rsquo;t call them brownies&hellip; or donuts)</small>
        </div>
      </div>
      <div class="cookie-consent__actions" role="group" aria-label="Cookie consent options">
        <button type="button" class="btn btn--outline btn--sm" data-consent-reject>Essentials only</button>
        <button type="button" class="btn btn--outline btn--sm" data-consent-manage>Let me choose</button>
        <button type="button" class="btn btn--primary btn--sm" data-consent-accept>Gimmie cookie!</button>
      </div>
    `;
    document.body.appendChild(banner);

    banner.querySelector('[data-consent-reject]').addEventListener('click', () => saveConsentAndRefresh(CONSENT_DEFAULTS));
    banner.querySelector('[data-consent-accept]').addEventListener('click', () => saveConsentAndRefresh({ analytics: true, embeddedMedia: true }));
    banner.querySelector('[data-consent-manage]').addEventListener('click', openCookieModal);
  };

  const initCookieConsent = () => {
    addFooterPreferencesLink();
    initCookieFloat();
    const storedConsent = getStoredConsent();
    applyConsent(storedConsent || CONSENT_DEFAULTS);

    document.addEventListener('click', (event) => {
      const preferencesLink = event.target.closest('[data-cookie-preferences]');
      if (preferencesLink) {
        event.preventDefault();
        if (preferencesLink.closest('.cookie-float')) dismissCookieFloat();
        openCookieModal();
        return;
      }

      const mediaButton = event.target.closest('[data-consent-enable-media]');
      if (mediaButton) {
        event.preventDefault();
        const current = getStoredConsent() || CONSENT_DEFAULTS;
        saveConsentAndRefresh({ ...current, embeddedMedia: true });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && cookieModal) closeCookieModal();
    });
  };

  initCookieConsent();

  /* ----------------------------------------------------------
     MEDIA STENCILS
     Adds lightweight skeleton surfaces to content media while
     images, videos, and embeds finish loading.
     ---------------------------------------------------------- */
  const initMediaStencils = () => {
    const contentHostSelector = [
      '.home-hero__portrait-wrap',
      '.home-whats-new__media',
      '.float-photo',
      '.photo-caption-card',
      '.work-card__thumb',
      '.cred-strip__item',
      '.article-figure',
      '.speaking-video-card',
      '.cc-article-card',
      '.lff-proof-photo'
    ].join(', ');

    const excludedSelector = [
      '.nav-brand',
      '.mobile-nav__header',
      '.footer-brand',
      '.cookie-consent',
      '.cookie-modal',
      '.consent-media-placeholder',
      '.site-toast',
      '.vgj-portal-overlay'
    ].join(', ');

    const shouldSkipMediaStencil = (media) => {
      if (!(media instanceof HTMLElement)) return true;
      if (media.closest(excludedSelector)) return true;

      if (media instanceof HTMLImageElement) {
        const src = media.currentSrc || media.getAttribute('src') || '';
        if (/\.svg(?:$|\?)/i.test(src)) return true;
      }

      return false;
    };

    const getMediaStencilHost = (media) => {
      const host = media.closest(contentHostSelector);
      if (host && media.parentElement === host) return host;
      return null;
    };

    const isMediaLoaded = (media) => {
      if (media instanceof HTMLImageElement) {
        return media.complete;
      }
      if (media instanceof HTMLVideoElement) {
        return media.readyState >= 1;
      }
      if (media instanceof HTMLIFrameElement) {
        return !media.getAttribute('src');
      }
      return true;
    };

    const markMediaLoaded = (media, host) => {
      media.classList.add('is-media-loaded');
      if (host) host.classList.add('is-media-loaded');
    };

    document.querySelectorAll('img, video, iframe').forEach(media => {
      if (shouldSkipMediaStencil(media)) return;

      const host = getMediaStencilHost(media);
      if (host) {
        host.classList.add('media-stencil-host');
        media.classList.add('media-stencil-target');
      } else {
        media.classList.add('media-stencil-standalone');
      }

      if (isMediaLoaded(media)) {
        markMediaLoaded(media, host);
        return;
      }

      const loadedEvents = media instanceof HTMLVideoElement
        ? ['loadedmetadata', 'loadeddata', 'canplay', 'error']
        : ['load', 'error'];

      loadedEvents.forEach(eventName => {
        media.addEventListener(eventName, () => markMediaLoaded(media, host), { once: true });
      });

      window.setTimeout(() => markMediaLoaded(media, host), 12000);
    });
  };

  initMediaStencils();

  /* ----------------------------------------------------------
     MEDIA DOWNLOAD / COPY DETERRENTS
     ---------------------------------------------------------- */
  const protectedMediaSelector = 'img, picture, svg, video, canvas';

  const hasProtectedBackground = (element) => {
    if (!(element instanceof Element)) return false;

    const backgroundImage = window.getComputedStyle(element).backgroundImage;
    return backgroundImage && backgroundImage !== 'none' && backgroundImage.includes('url(');
  };

  const getProtectedMediaTarget = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return null;

    const directMedia = target.closest(protectedMediaSelector);
    if (directMedia) return directMedia;

    return hasProtectedBackground(target) ? target : null;
  };

  document.querySelectorAll(protectedMediaSelector).forEach(media => {
    media.setAttribute('draggable', 'false');
  });

  ['contextmenu', 'dragstart', 'copy', 'cut', 'paste'].forEach(eventName => {
    document.addEventListener(eventName, (event) => {
      if (getProtectedMediaTarget(event)) {
        event.preventDefault();
      }
    }, true);
  });

  /* ----------------------------------------------------------
     1. HEADER SCROLL SHADOW
     ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     2. MOBILE NAV - OPEN / CLOSE
     ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const navClose  = document.getElementById('navClose');

  if (navToggle && mobileNav) {
    const openNav = () => {
      mobileNav.classList.add('is-open');
      mobileNav.removeAttribute('aria-hidden');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      navClose && navClose.focus();
    };

    const closeNav = () => {
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      navToggle.focus();
    };

    navToggle.addEventListener('click', openNav);
    navClose && navClose.addEventListener('click', closeNav);

    // Close when a link inside nav is tapped
    mobileNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeNav();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeNav();
    });
  }

  /* ----------------------------------------------------------
     3. ARIA-CURRENT ON NAV LINKS
     Set aria-current="page" on the nav link that matches the
     current path. Works for both .nav-links and .mobile-nav__links.
     ---------------------------------------------------------- */
  const currentPath = location.pathname.replace(/\/?$/, '/');
  document.querySelectorAll('.nav-links a, .mobile-nav__links a').forEach(link => {
    const linkPath = link.pathname.replace(/\/?$/, '/');
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  /* ----------------------------------------------------------
     4. REVEAL ON SCROLL (Intersection Observer)
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     5. SMOOTH SCROLL FOR SAME-PAGE ANCHORS
     ---------------------------------------------------------- */
  const VGJ_FEATURE_HASH = '#vgjFeatureSection';
  const scrollToAnchorTarget = (target, behavior = 'smooth') => {
    const block = target.id === 'vgjFeatureSection' ? 'center' : 'start';
    target.scrollIntoView({ behavior, block });
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          if (id === VGJ_FEATURE_HASH && window.history && typeof window.history.pushState === 'function') {
            window.history.pushState(null, '', id);
          }
          scrollToAnchorTarget(target);
        }
      }
    });
  });

  if (window.location.hash === VGJ_FEATURE_HASH) {
    const centerVgjFeature = () => {
      const target = document.getElementById('vgjFeatureSection');
      if (target) scrollToAnchorTarget(target, 'auto');
    };

    window.requestAnimationFrame(() => {
      centerVgjFeature();
      window.requestAnimationFrame(centerVgjFeature);
    });
    window.addEventListener('load', centerVgjFeature, { once: true });
  }

  /* ----------------------------------------------------------
     6. FOOTER YEAR
     ---------------------------------------------------------- */
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ----------------------------------------------------------
     7. BACK TO TOP
     ---------------------------------------------------------- */
  document.querySelectorAll('[data-back-top]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     8. WHAT'S NEW CAROUSEL
     ---------------------------------------------------------- */
  document.querySelectorAll('[data-whats-new-carousel]').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const viewport = carousel.querySelector('.home-whats-new__viewport');
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const autoDelay = 8000;
    let activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let autoTimer;
    let manuallyPaused = false;

    if (slides.length < 2) return;

    const syncViewportHeight = () => {
      if (!viewport) return;
      const maxHeight = Math.max(...slides.map(slide => Math.ceil(slide.getBoundingClientRect().height)));
      if (maxHeight > 0) viewport.style.setProperty('--whats-new-height', `${maxHeight}px`);
    };

    const normaliseIndex = (index) => {
      return (index + slides.length) % slides.length;
    };

    const setSlide = (index) => {
      activeIndex = normaliseIndex(index);
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
      dots.forEach((dot, dotIndex) => {
        if (dotIndex === activeIndex) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
      window.requestAnimationFrame(syncViewportHeight);
    };

    const stopAuto = () => {
      if (!autoTimer) return;
      window.clearInterval(autoTimer);
      autoTimer = null;
    };

    const startAuto = () => {
      stopAuto();
      if (manuallyPaused || reduceMotion.matches) return;
      autoTimer = window.setInterval(() => setSlide(activeIndex + 1), autoDelay);
    };

    const manualGoTo = (index) => {
      manuallyPaused = true;
      stopAuto();
      setSlide(index);
    };

    prevButton && prevButton.addEventListener('click', () => manualGoTo(activeIndex - 1));
    nextButton && nextButton.addEventListener('click', () => manualGoTo(activeIndex + 1));
    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => manualGoTo(dotIndex));
    });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin', stopAuto);
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) startAuto();
    });
    carousel.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      manualGoTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    });

    const onMotionPreferenceChange = () => {
      if (reduceMotion.matches) {
        stopAuto();
      } else {
        startAuto();
      }
    };
    if (typeof reduceMotion.addEventListener === 'function') {
      reduceMotion.addEventListener('change', onMotionPreferenceChange);
    } else if (typeof reduceMotion.addListener === 'function') {
      reduceMotion.addListener(onMotionPreferenceChange);
    }

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(syncViewportHeight);
      slides.forEach(slide => resizeObserver.observe(slide));
    }
    window.addEventListener('resize', syncViewportHeight);
    slides.forEach(slide => {
      slide.querySelectorAll('img, iframe').forEach(media => {
        media.addEventListener('load', syncViewportHeight, { once: true });
      });
    });
    if (document.fonts && typeof document.fonts.ready === 'object') {
      document.fonts.ready.then(syncViewportHeight).catch(() => {});
    }

    setSlide(activeIndex);
    syncViewportHeight();
    startAuto();
  });

  /* ----------------------------------------------------------
     9. PENDING RESOURCE NOTICE
     ---------------------------------------------------------- */
  const pendingResourceButtons = document.querySelectorAll('[data-pending-resource]');
  if (pendingResourceButtons.length > 0) {
    let noticeTimer;
    let notice;

    const getNotice = () => {
      if (notice) return notice;
      notice = document.createElement('div');
      notice.className = 'site-toast';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      notice.innerHTML = '<span class="site-toast__icon" aria-hidden="true"><i class="fa-regular fa-clock"></i></span><span class="site-toast__text"></span>';
      document.body.appendChild(notice);
      return notice;
    };

    const showPendingNotice = (resourceName) => {
      const activeNotice = getNotice();
      const text = activeNotice.querySelector('.site-toast__text');
      const resource = resourceName ? resourceName.trim() : '';
      text.textContent = resource
        ? `${resource} is still getting its shoes on. Email me if you need the grown-up version now.`
        : 'Still getting this ready for you. Email me if you need it now.';

      activeNotice.classList.add('is-visible');
      clearTimeout(noticeTimer);
      noticeTimer = window.setTimeout(() => {
        activeNotice.classList.remove('is-visible');
      }, 3600);
    };

    pendingResourceButtons.forEach(button => {
      button.addEventListener('click', () => {
        showPendingNotice(button.getAttribute('data-pending-resource'));
      });
    });
  }

  /* ----------------------------------------------------------
     10. GENTLE SOCIAL EXIT ASIDE
     One friendly pause for profile links only. Newsletter,
     calendar, email, forms, and essential contact links
     continue normally.
     ---------------------------------------------------------- */
  const SOCIAL_EXIT_KEY = 'vgj-social-exit-aside-seen';
  const NEWSLETTER_URL = 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7326273219773030402';
  const socialExitSeen = () => {
    try { return sessionStorage.getItem(SOCIAL_EXIT_KEY) === '1'; } catch { return true; }
  };
  const markSocialExitSeen = () => {
    try { sessionStorage.setItem(SOCIAL_EXIT_KEY, '1'); } catch { /* Storage unavailable; skip the aside. */ }
  };
  const canShowSocialAside = () => {
    return window.matchMedia('(min-width: 48rem)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !socialExitSeen();
  };

  const isSocialProfileExit = (link) => {
    try {
      const url = new URL(link.href, window.location.href);
      const host = url.hostname.replace(/^www\./, '');
      const href = url.href;
      if (href === NEWSLETTER_URL) return false;
      if (url.protocol === 'mailto:' || url.protocol === 'tel:') return false;
      if (host === 'calendar.app.google' || host.includes('web3forms.com')) return false;
      return (host === 'linkedin.com' && url.pathname.includes('/in/veltongoodenjr')) ||
        (host === 'instagram.com' && url.pathname.replace(/\/$/, '') === '/veltongoodenjr');
    } catch {
      return false;
    }
  };

  let socialAside;
  let socialAsideContinue;
  let socialAsideClose;
  let pendingSocialHref = '';
  let pendingSocialTarget = '_blank';

  const closeSocialAside = () => {
    if (!socialAside) return;
    socialAside.classList.remove('is-visible');
    pendingSocialHref = '';
  };

  const continueSocialExit = () => {
    if (!pendingSocialHref) {
      closeSocialAside();
      return;
    }
    const href = pendingSocialHref;
    const target = pendingSocialTarget || '_blank';
    closeSocialAside();
    if (target === '_blank') {
      window.open(href, '_blank', 'noopener');
    } else {
      window.location.href = href;
    }
  };

  const getSocialAside = () => {
    if (socialAside) return socialAside;
    socialAside = document.createElement('aside');
    socialAside.className = 'external-aside';
    socialAside.setAttribute('role', 'dialog');
    socialAside.setAttribute('aria-modal', 'false');
    socialAside.setAttribute('aria-labelledby', 'externalAsideTitle');
    socialAside.innerHTML = `
      <button type="button" class="external-aside__close" aria-label="Close this note"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      <p class="external-aside__eyebrow">Before you head out</p>
      <h2 class="external-aside__title" id="externalAsideTitle">Thanks for stopping by.</h2>
      <p class="external-aside__copy">If LinkedIn is your next stop, Creator's Current lives there too: the nerdy deep-dives, useful mess, and occasional "wait, that actually makes sense" moment.</p>
      <div class="external-aside__actions">
        <a class="btn btn--primary btn--sm" href="${NEWSLETTER_URL}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin" aria-hidden="true"></i> Subscribe on LinkedIn</a>
        <button type="button" class="btn btn--secondary btn--sm" data-social-continue>Continue</button>
      </div>
    `;
    document.body.appendChild(socialAside);
    socialAsideClose = socialAside.querySelector('.external-aside__close');
    socialAsideContinue = socialAside.querySelector('[data-social-continue]');
    socialAsideClose.addEventListener('click', closeSocialAside);
    socialAsideContinue.addEventListener('click', continueSocialExit);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && socialAside.classList.contains('is-visible')) {
        closeSocialAside();
      }
    });
    return socialAside;
  };

  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      if (!canShowSocialAside() || !isSocialProfileExit(link)) return;
      event.preventDefault();
      pendingSocialHref = link.href;
      pendingSocialTarget = link.target || '_blank';
      markSocialExitSeen();
      const aside = getSocialAside();
      aside.classList.add('is-visible');
      window.setTimeout(() => socialAsideContinue && socialAsideContinue.focus(), 30);
    });
  });

})();


/* ----------------------------------------------------------
   DIGITAL BRAND STRATEGY SESSION MODAL
   Intercepts all calendar.app.google links + [data-strategy-session]
   triggers. Two-currency toggle, Fygaro payment links.
   ---------------------------------------------------------- */
(function () {
  // Replace with real Fygaro payment links before launch
  const LINKS = {
    jmd: 'https://www.fygaro.com/en/pb/84a51305-b4b6-4a1e-9e4e-c7cbe45dfdef/',
    usd: 'https://www.fygaro.com/en/pb/c6846e24-3b22-444f-88b8-03ec4b0b6528/'
  };
  const PRICES    = { jmd: 'JMD $7,500', usd: 'USD $50' };
  const SUBTITLES = {
    jmd: 'Paid securely through Fygaro. After payment you will be directed to select your time slot.',
    usd: 'International rate. Paid securely through Fygaro. After payment you will be directed to select your time slot.'
  };

  const modal = document.createElement('div');
  modal.id = 'strategyModal';
  modal.className = 'strategy-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'strategyModalTitle');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="strategy-modal__card">
      <div class="strategy-modal__header">
        <div class="strategy-modal__meta">
          <p class="strategy-modal__eyebrow">30 minutes &middot; Paid session</p>
          <h2 class="strategy-modal__title" id="strategyModalTitle">Digital Brand<br>Strategy Session</h2>
        </div>
        <button type="button" class="strategy-modal__close" id="strategyModalClose" aria-label="Close">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
      <div class="strategy-modal__body">
        <p class="strategy-modal__copy">Bring a specific problem. Positioning that feels off, a message that is not landing, a website that is not converting, a brand direction you need a clear read on. Thirty minutes, one focus, a practical direction you can act on.</p>
        <p class="strategy-modal__copy">You leave with a clear direction and practical next steps, not just perspective with nowhere to go. Where it makes sense, I will also flag paths for implementation, whether that is through my own work or someone in my network who is the right fit.</p>
        <div class="strategy-modal__pricing">
          <p class="strategy-modal__price-label">Choose your currency</p>
          <div class="strategy-modal__currency-toggle">
            <button type="button" class="strategy-modal__currency-btn is-active" data-currency="jmd">Pay in JMD</button>
            <button type="button" class="strategy-modal__currency-btn" data-currency="usd">Pay in USD</button>
          </div>
          <p class="strategy-modal__price-amount" id="strategyPrice">JMD $7,500</p>
          <p class="strategy-modal__price-sub" id="strategyPriceSub">Paid securely through Fygaro. After payment you will be directed to select your time slot.</p>
        </div>
        <div class="strategy-modal__actions">
          <button type="button" class="btn btn--primary btn--lg" id="strategyPayBtn" data-pending-resource="Digital Brand Strategy Session — payment link">
            Book the session <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
        <p class="strategy-modal__note">Card details are not collected on this site. Payment is handled by Fygaro.</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn    = modal.querySelector('#strategyModalClose');
  const payBtn      = modal.querySelector('#strategyPayBtn');
  const priceEl     = modal.querySelector('#strategyPrice');
  const subEl       = modal.querySelector('#strategyPriceSub');
  const currencyBtns = modal.querySelectorAll('[data-currency]');
  let activeCurrency = 'jmd';
  let focusReturn    = null;

  function openModal (returnEl) {
    focusReturn = returnEl || null;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => closeBtn.focus(), 40);
  }

  function closeModal () {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (focusReturn && typeof focusReturn.focus === 'function') focusReturn.focus();
  }

  function setCurrency (currency) {
    activeCurrency = currency;
    priceEl.textContent = PRICES[currency];
    subEl.textContent   = SUBTITLES[currency];
    currencyBtns.forEach(btn => btn.classList.toggle('is-active', btn.dataset.currency === currency));
    const toggle = modal.querySelector('.strategy-modal__currency-toggle');
    if (toggle) toggle.dataset.active = currency;

    const link = LINKS[currency];
    const isPlaceholder = link.startsWith('FYGARO_');
    if (isPlaceholder) {
      payBtn.removeAttribute('data-href');
      payBtn.setAttribute('data-pending-resource', 'Digital Brand Strategy Session — payment link');
    } else {
      payBtn.setAttribute('data-href', link);
      payBtn.removeAttribute('data-pending-resource');
    }
  }

  currencyBtns.forEach(btn => btn.addEventListener('click', () => setCurrency(btn.dataset.currency)));

  payBtn.addEventListener('click', () => {
    const link = payBtn.getAttribute('data-href');
    if (link) window.open(link, '_blank', 'noopener noreferrer');
    // else: data-pending-resource handler in main IIFE shows the toast
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // Intercept calendar.app.google links AND [data-strategy-session] triggers site-wide
  document.addEventListener('click', (e) => {
    const calLink = e.target.closest('a[href*="calendar.app.google"]');
    const trigger = e.target.closest('[data-strategy-session]');
    if (!calLink && !trigger) return;
    e.preventDefault();
    openModal(e.target.closest('a, button'));
  });

  setCurrency('jmd');
})();


/* ----------------------------------------------------------
   VGJ DIGITAL PORTAL — cursor glow on the homepage feature
   section, full-screen circle expand on any [data-vgj-portal]
   link or #vgjPortalBtn click.
   ---------------------------------------------------------- */
(function () {
  const section      = document.getElementById('vgjFeatureSection');
  const featureBtn   = document.getElementById('vgjPortalBtn');
  const portalLinks  = Array.from(document.querySelectorAll('[data-vgj-portal]'));

  if (!section && !featureBtn && !portalLinks.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'vgj-portal-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="vgj-portal-overlay__inner">
      <img src="/assets/images/brand/vgj-digital-logo-h.png" alt="VGJ Digital" class="vgj-portal-overlay__logo">
      <p class="vgj-portal-overlay__tagline">Make your brand click.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMo = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animating  = false;
  let portalTimer = 0;
  let pendingPortalHref = '';
  let portalTransitionHandler = null;

  function setOriginFromEl (el) {
    const r = el.getBoundingClientRect();
    overlay.style.setProperty('--cx', (((r.left + r.width  / 2) / window.innerWidth)  * 100).toFixed(1) + '%');
    overlay.style.setProperty('--cy', (((r.top  + r.height / 2) / window.innerHeight) * 100).toFixed(1) + '%');
  }

  function clearPortalNavigation () {
    if (portalTimer) {
      window.clearTimeout(portalTimer);
      portalTimer = 0;
    }
    if (portalTransitionHandler) {
      overlay.removeEventListener('transitionend', portalTransitionHandler);
      portalTransitionHandler = null;
    }
    pendingPortalHref = '';
  }

  function resetPortal () {
    clearPortalNavigation();
    animating = false;
    if (section) section.classList.remove('has-cursor');
    overlay.classList.remove('is-active');
    overlay.style.removeProperty('--cx');
    overlay.style.removeProperty('--cy');
    if (typeof overlay.getAnimations === 'function') {
      try {
        overlay.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      } catch {
        overlay.getAnimations().forEach(animation => animation.cancel());
      }
    }
  }

  function completePortalNavigation () {
    if (!pendingPortalHref) return;
    const href = pendingPortalHref;
    clearPortalNavigation();
    window.location.href = href;
  }

  function triggerPortal (e, href) {
    e.preventDefault();
    if (animating) return;
    animating = true;
    if (reduceMo.matches) { window.location.href = href; return; }
    pendingPortalHref = href;
    setOriginFromEl(e.currentTarget);
    overlay.classList.add('is-active');
    portalTransitionHandler = (event) => {
      if (event.target !== overlay) return;
      completePortalNavigation();
    };
    overlay.addEventListener('transitionend', portalTransitionHandler);
    portalTimer = window.setTimeout(completePortalNavigation, 950);
  }

  window.addEventListener('pagehide', resetPortal);
  window.addEventListener('pageshow', resetPortal);

  // Homepage feature section — cursor glow + button click
  if (section && featureBtn) {
    if (canHover.matches) {
      section.addEventListener('mouseenter', (e) => {
        if (animating) return;
        const r = section.getBoundingClientRect();
        section.style.setProperty('--glow-x', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
        section.style.setProperty('--glow-y', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
        section.classList.add('has-cursor');
      });
      section.addEventListener('mousemove', (e) => {
        if (animating) return;
        const r = section.getBoundingClientRect();
        section.style.setProperty('--glow-x', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
        section.style.setProperty('--glow-y', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
      });
      section.addEventListener('mouseleave', () => section.classList.remove('has-cursor'));
    }
    featureBtn.addEventListener('click', (e) => {
      section.classList.remove('has-cursor');
      triggerPortal(e, featureBtn.href);
    });
  }

  // Generic portal links on any page (e.g. contact aside card)
  portalLinks.forEach(link => {
    link.addEventListener('click', (e) => triggerPortal(e, link.href));
  });
})();
