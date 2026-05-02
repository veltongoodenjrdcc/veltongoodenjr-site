/* ============================================================
   SITE JS - veltongoodenjr.com
   Vanilla JS, no framework. Progressively enhanced.
   ============================================================ */

(function () {
  'use strict';

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
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

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
     8. PENDING RESOURCE NOTICE
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
     9. GENTLE SOCIAL EXIT ASIDE
     One friendly pause for profile links only. Newsletter,
     WhatsApp, calendar, email, forms, and essential contact links
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
      if (host === 'wa.me' || host === 'calendar.app.google' || host.includes('web3forms.com')) return false;
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
