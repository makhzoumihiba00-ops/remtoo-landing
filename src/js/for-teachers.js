// Remtoo — testimonials carousel (for-teachers.html)
const track = document.getElementById('testi-track');
const viewport = document.getElementById('testi-viewport');
const prevBtn = document.getElementById('testi-prev');
const nextBtn = document.getElementById('testi-next');
const dots = Array.from(document.querySelectorAll('#testi-dots button'));

if (track && viewport && dots.length) {
  const count = dots.length;
  let index = 0;
  let dragging = false;
  let startX = 0;
  let delta = 0;

  const apply = (extraPx = 0) => {
    track.style.transform = `translateX(${-index * viewport.clientWidth + extraPx}px)`;
  };

  const render = () => {
    track.classList.remove('testi-no-anim');
    apply();
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('testi-dot-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  };

  const go = (i) => {
    index = ((i % count) + count) % count;
    render();
  };

  prevBtn?.addEventListener('click', () => go(index - 1));
  nextBtn?.addEventListener('click', () => go(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));

  viewport.addEventListener('pointerdown', (event) => {
    dragging = true;
    startX = event.clientX;
    delta = 0;
    track.classList.add('testi-no-anim');
    viewport.classList.add('testi-grabbing');
  });

  window.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    delta = event.clientX - startX;
    apply(delta);
  });

  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('testi-grabbing');
    const threshold = Math.min(viewport.clientWidth * 0.15, 120);
    if (delta <= -threshold) go(index + 1);
    else if (delta >= threshold) go(index - 1);
    else render();
  });

  window.addEventListener('resize', render);

  viewport.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') go(index - 1);
    if (event.key === 'ArrowRight') go(index + 1);
  });

  render();
}
