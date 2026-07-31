document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const selectors = ['.intro > div', '.sectionHeading', '.serviceCard', '.stepGrid article', '.project', '.quote > div', 'footer > *'];
  const items = [];
  selectors.forEach(selector => document.querySelectorAll(selector).forEach((element, index) => {
    if (items.includes(element)) return;
    element.classList.add('reveal');
    element.style.setProperty('--delay', `${Math.min(index % 6, 5) * 80}ms`);
    items.push(element);
  }));

  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -45px' });

  items.forEach(item => observer.observe(item));
});
