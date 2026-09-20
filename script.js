const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const loader = document.querySelector('.brand-loader');
const body = document.body;

if (loader) {
  const exitLoader = () => {
    if (loader.classList.contains('is-exiting')) return;

    loader.classList.add('is-exiting');
    body.classList.remove('is-loading');

    const hideLoader = () => {
      loader.classList.add('is-hidden');
      loader.removeEventListener('transitionend', hideLoader);
    };

    loader.addEventListener('transitionend', hideLoader, { once: true });
    window.setTimeout(hideLoader, 750);
  };

  const loaderDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 250 : 2900;
  window.setTimeout(exitLoader, loaderDuration);
}

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

toggle.addEventListener('click', () => {
  const opened = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!opened));
  toggle.setAttribute('aria-label', opened ? 'فتح القائمة' : 'إغلاق القائمة');
  menu.classList.toggle('open', !opened);
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'فتح القائمة');
}));

const items = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
items.forEach(item => observer.observe(item));
