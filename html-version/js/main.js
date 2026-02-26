(function () {
  'use strict';

  // ----- Header scroll -----
  var header = document.getElementById('site-header');
  if (header) {
    function updateHeaderScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();
  }

  // ----- Mobile menu -----
  var menuToggle = document.querySelector('.menu-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
      navMobile.hidden = isOpen;
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        navMobile.hidden = true;
      });
    });
  }

  // ----- Hero parallax -----
  var heroParallax = document.getElementById('hero-parallax');
  if (heroParallax) {
    function heroParallaxScroll() {
      var scrollY = window.scrollY;
      heroParallax.style.transform = 'translateY(' + scrollY * 0.4 + 'px)';
    }
    window.addEventListener('scroll', heroParallaxScroll, { passive: true });
  }

  // ----- Parallax dividers -----
  function initParallaxDivider(containerId, bgId) {
    var container = document.getElementById(containerId);
    var bg = document.getElementById(bgId);
    if (!container || !bg) return;

    function updateParallax() {
      var rect = container.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      var visible = rect.top < windowHeight && rect.bottom > 0;
      if (visible) {
        var progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        var translateY = (progress - 0.5) * 100;
        bg.style.transform = 'translateY(' + translateY + 'px)';
      }
    }
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }
  initParallaxDivider('parallax-1', 'parallax-1-bg');
  initParallaxDivider('parallax-2', 'parallax-2-bg');

  // ----- Intersection Observer (inview animations) -----
  var sections = document.querySelectorAll('[data-inview]');
  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '');
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ----- Stagger delay for cards (philosophy, products) -----
  document.querySelectorAll('[data-delay]').forEach(function (el) {
    var delay = parseInt(el.getAttribute('data-delay'), 10);
    if (!isNaN(delay)) {
      el.style.transitionDelay = delay + 'ms';
    }
  });
})();
