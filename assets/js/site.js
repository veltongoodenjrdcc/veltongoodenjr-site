/* ============================================================
   SITE JS - veltongoodenjr.com
   Vanilla JS, no framework. Progressively enhanced.
   ============================================================ */

(function () {
  'use strict';

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
     8. COMING SOON TOASTS
     ---------------------------------------------------------- */
  const comingSoonItems = document.querySelectorAll('[data-coming-soon]');
  if (comingSoonItems.length > 0) {
    const phrases = [
      'It is on the way.',
      'Packing that up for you.',
      'Still putting the finishing touches on that.',
      'Not live yet, but it is coming.'
    ];
    let phraseIndex = 0;
    let toastStack = document.querySelector('.toast-stack');

    if (!toastStack) {
      toastStack = document.createElement('div');
      toastStack.className = 'toast-stack';
      toastStack.setAttribute('aria-live', 'polite');
      toastStack.setAttribute('aria-atomic', 'false');
      document.body.appendChild(toastStack);
    }

    const showToast = (resourceLabel) => {
      const phrase = phrases[phraseIndex % phrases.length];
      phraseIndex += 1;
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.innerHTML = `
        <div class="toast__icon" aria-hidden="true">
          <i class="fa-regular fa-clock"></i>
        </div>
        <div>
          <div class="toast__title">${resourceLabel || 'That resource'}</div>
          <div class="toast__body">${phrase}</div>
        </div>
      `;

      toastStack.appendChild(toast);
      window.requestAnimationFrame(() => toast.classList.add('is-visible'));

      window.setTimeout(() => {
        toast.classList.remove('is-visible');
        window.setTimeout(() => toast.remove(), 260);
      }, 2600);
    };

    comingSoonItems.forEach((item) => {
      const handleActivate = (event) => {
        event.preventDefault();
        const resourceLabel = item.getAttribute('data-resource-label');
        showToast(resourceLabel);
      };

      item.addEventListener('click', handleActivate);
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleActivate(event);
        }
      });
    });
  }

})();
