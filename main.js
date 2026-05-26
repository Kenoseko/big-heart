// ===========================
//   BIG HEART — GLOBAL JS
// ===========================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // ---- Mobile menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-close');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- Scroll fade-in animations ----
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    faders.forEach(el => observer.observe(el));
  }

  // ---- Testimonial carousel ----
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.dot');
  if (track && dots.length) {
    let current = 0;
    const total = dots.length;
    function goTo(idx) {
      current = idx;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    goTo(0);
    setInterval(() => goTo((current + 1) % total), 5000);
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Gallery filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        masonryItems.forEach(item => {
          item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  // ---- Animated counters ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count, 10);
          const dur = 1800;
          const step = Math.ceil(target / (dur / 16));
          let cur = 0;
          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur.toLocaleString() + (el.dataset.suffix || '');
            if (cur >= target) clearInterval(timer);
          }, 16);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => observer.observe(el));
  }

  // ---- Donate card selection ----
  document.querySelectorAll('.donate-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.donate-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

});