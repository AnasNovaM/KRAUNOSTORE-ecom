/* ============================================================
   KRAUNO — Theme JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* --- Sticky Header Scroll Behavior --- */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var scrollThreshold = 80;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile Menu Toggle --- */
  function initMobileMenu() {
    var toggle = document.querySelector('.mobile-menu-toggle');
    var nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      if (isOpen) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.classList.add('open');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Cart Count Update --- */
  function updateCartCount() {
    var badges = document.querySelectorAll('.cart-count');
    if (!badges.length) return;

    fetch('/cart.js')
      .then(function (res) { return res.json(); })
      .then(function (cart) {
        var count = cart.item_count || 0;
        badges.forEach(function (badge) {
          badge.textContent = count > 0 ? count : '';
          badge.setAttribute('data-count', count);
          badge.style.display = count > 0 ? '' : 'none';
        });
      })
      .catch(function () {});
  }

  /* --- Quantity Selector (PDP + Cart) --- */
  function initQuantitySelectors() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.quantity-btn');
      if (!btn) return;

      var selector = btn.closest('.quantity-selector, .cart-item-qty');
      if (!selector) return;

      var input = selector.querySelector('.quantity-input');
      if (!input) return;

      var current = parseInt(input.value, 10) || 1;
      var min = parseInt(input.getAttribute('min'), 10) || 1;
      var max = parseInt(input.getAttribute('max'), 10) || 999;

      if (btn.classList.contains('quantity-minus')) {
        input.value = Math.max(min, current - 1);
      } else if (btn.classList.contains('quantity-plus')) {
        input.value = Math.min(max, current + 1);
      }

      // Dispatch change for cart line updates
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /* --- Cart Line Item Quantity Change --- */
  function initCartQuantityChange() {
    var cartForm = document.querySelector('[data-cart-form]');
    if (!cartForm) return;

    cartForm.addEventListener('change', function (e) {
      var input = e.target.closest('.quantity-input[data-line]');
      if (!input) return;

      var line = input.getAttribute('data-line');
      var qty = parseInt(input.value, 10) || 0;

      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: line, quantity: qty })
      })
        .then(function (res) { return res.json(); })
        .then(function (cart) {
          updateCartCount();
          updateCartTotals(cart);
        })
        .catch(function () {});
    });
  }

  function updateCartTotals(cart) {
    var subtotalEl = document.querySelector('[data-cart-subtotal]');
    if (subtotalEl && cart.total_price !== undefined) {
      var price = (cart.total_price / 100).toFixed(2);
      subtotalEl.textContent = '$' + price;
    }
  }

  /* --- Product Gallery Thumbnails --- */
  function initProductGallery() {
    var thumbs = document.querySelectorAll('.product-gallery-thumb');
    var mainImg = document.querySelector('.product-gallery-main img');
    if (!thumbs.length || !mainImg) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var src = thumb.getAttribute('data-src');
        if (src) {
          mainImg.src = src;
        }
        thumbs.forEach(function (t) { t.classList.remove('active'); });
        thumb.classList.add('active');
      });
    });
  }

  /* --- Accordion --- */
  function initAccordion() {
    var triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion-item');
        if (!item) return;

        var isOpen = item.classList.contains('open');

        // Optionally close others:
        var accordion = item.closest('.accordion');
        if (accordion) {
          accordion.querySelectorAll('.accordion-item').forEach(function (el) {
            el.classList.remove('open');
            el.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          });
        }

        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* --- Add to Cart Form (AJAX optional) --- */
  function initAddToCart() {
    var atcForms = document.querySelectorAll('[data-atc-form]');
    atcForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        // Allow normal Shopify form submission; we just refresh cart count
        setTimeout(updateCartCount, 1000);
      });
    });
  }

  /* --- Announcement Bar Dismiss (optional, no localStorage needed) --- */

  /* --- Init All --- */
  function init() {
    initStickyHeader();
    initMobileMenu();
    updateCartCount();
    initQuantitySelectors();
    initCartQuantityChange();
    initProductGallery();
    initAccordion();
    initAddToCart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
