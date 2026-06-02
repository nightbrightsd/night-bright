/* =============================================================
   NIGHT BRIGHT — main.js  (vanilla JS, no dependencies)
   Handles four things:
     1. The draggable before/after slider (mouse + touch + keyboard)
     2. Scroll-reveal animations
     3. The mobile nav menu toggle
     4. Header background fade on scroll
   Everything is wrapped so it runs after the page loads.
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1) BEFORE / AFTER SLIDER
     We move a value 0..100 stored as the CSS variable --pos.
     The CSS clips the "before" image and positions the handle.
     --------------------------------------------------------- */
  const slider = document.getElementById('ba-slider');
  const handle = document.getElementById('ba-handle');

  if (slider && handle) {
    let dragging = false;

    // Clamp a number between 0 and 100
    const clamp = (n) => Math.max(0, Math.min(100, n));

    // Set the slider position (0..100) and update accessibility value
    function setPos(value) {
      const v = clamp(value);
      slider.style.setProperty('--pos', v);
      handle.setAttribute('aria-valuenow', Math.round(v));
    }

    // Convert a pointer's X position into a 0..100 percentage
    function posFromX(clientX) {
      const rect = slider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    // Pointer events cover mouse, touch, and pen in one API
    function startDrag(e) {
      dragging = true;
      handle.focus();
      setPos(posFromX(e.clientX));
    }
    function onMove(e) {
      if (!dragging) return;
      setPos(posFromX(e.clientX));
    }
    function endDrag() { dragging = false; }

    // Start dragging from anywhere on the slider OR the handle
    slider.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    // Keyboard support (handle is focusable, role="slider")
    handle.addEventListener('keydown', function (e) {
      const current = parseFloat(slider.style.getPropertyValue('--pos')) || 50;
      const step = e.shiftKey ? 10 : 2;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown': setPos(current - step); e.preventDefault(); break;
        case 'ArrowRight':
        case 'ArrowUp':   setPos(current + step); e.preventDefault(); break;
        case 'Home':      setPos(0);   e.preventDefault(); break;
        case 'End':       setPos(100); e.preventDefault(); break;
      }
    });
  }

  /* ---------------------------------------------------------
     2) SCROLL-REVEAL
     Add the class "reveal" to any element you want to animate
     in. We add "is-visible" when it scrolls into view.
     Respects the user's reduced-motion preference.
     --------------------------------------------------------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Just show everything immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // small stagger for a premium feel
          setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------
     3) MOBILE NAV MENU
     --------------------------------------------------------- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
    // Close the menu when a link inside it is tapped
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------
     4) HEADER BACKGROUND ON SCROLL
     Adds .scrolled once the page is scrolled a little.
     --------------------------------------------------------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     5) FOOTER YEAR (auto-updating copyright)
     --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
