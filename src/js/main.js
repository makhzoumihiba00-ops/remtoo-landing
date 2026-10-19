// RemToo — shared page behavior

const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const iconOpen = navToggle?.querySelector('.icon-open');
const iconClose = navToggle?.querySelector('.icon-close');

function setNav(open) {
  siteNav.classList.toggle('hidden', !open);
  siteNav.classList.toggle('flex', open);
  iconOpen.classList.toggle('hidden', open);
  iconClose.classList.toggle('hidden', !open);
  navToggle.setAttribute('aria-expanded', String(open));
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    setNav(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNav(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNav(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) setNav(false);
  });
}
