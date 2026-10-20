// Free Samples — level filter behavior

const tabs = document.querySelectorAll('[data-level-tab]');
const grid = document.getElementById('lessons-grid');
const empty = document.getElementById('lessons-empty');
const emptyName = empty?.querySelector('[data-level-name]');

const ACTIVE_CLASSES = [
  'border-[#0F1B4C]',
  'bg-[#0F1B4C]',
  'text-white',
  'shadow-lg',
  'shadow-[#0F1B4C]/20',
];
const INACTIVE_CLASSES = [
  'border-slate-200',
  'bg-white',
  'text-slate-600',
  'hover:border-blue-400',
  'hover:text-blue-700',
];

if (tabs.length && grid && empty) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((other) => {
        other.classList.remove(...ACTIVE_CLASSES);
        other.classList.add(...INACTIVE_CLASSES);
        other.setAttribute('aria-selected', 'false');
      });
      tab.classList.remove(...INACTIVE_CLASSES);
      tab.classList.add(...ACTIVE_CLASSES);
      tab.setAttribute('aria-selected', 'true');

      const hasSamples = tab.dataset.level === 'a1';
      grid.classList.toggle('hidden', !hasSamples);
      empty.classList.toggle('hidden', hasSamples);
      if (emptyName) emptyName.textContent = tab.dataset.name || '';
    });
  });
}
