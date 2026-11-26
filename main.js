(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  const mobile = matchMedia('(max-width: 64rem)');

  function closeMenu(restoreFocus = false) {
    if (!menu.classList.contains('open')) return;
    if (restoreFocus && mobile.matches) toggle.focus();
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      closeMenu(true);
      return;
    }
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu(true);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu(true);
  });
  document.addEventListener('focusin', (event) => {
    if (![toggle, menu].some((element) => element.contains(event.target))) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu(menu.contains(document.activeElement)));

  document.getElementById('year').textContent = new Date().getFullYear();
  toggle.hidden = false;
  root.classList.add('js');

  const filters = document.querySelector('.filters');
  if (filters) {
    const buttons = [...filters.querySelectorAll('[data-filter]')];
    const items = [...document.querySelectorAll('[data-cat]')];
    const groups = document.querySelectorAll('[data-group]');
    const status = document.querySelector('.filter-status');
    const categories = new Map(items.map((item) => [item, item.dataset.cat.split(/\s+/)]));
    const matches = (item, filter) => filter === 'all' || categories.get(item).includes(filter);

    function applyFilter(selected) {
      const filter = selected.dataset.filter;
      buttons.forEach((button) => button.setAttribute('aria-pressed', String(button === selected)));
      items.forEach((item) => { item.hidden = !matches(item, filter); });
      groups.forEach((group) => { group.hidden = !group.querySelector('[data-cat]:not([hidden])'); });
      const count = items.filter((item) => !item.hidden).length;
      const noun = document.querySelector('.cert-grid') ? 'credential' : 'project';
      status.textContent = count ? `${count} ${noun}${count === 1 ? '' : 's'} shown.` : `No ${noun}s match this filter.`;
    }

    buttons.forEach((button) => {
      const count = items.filter((item) => matches(item, button.dataset.filter)).length;
      button.textContent = button.textContent.replace(/\s+\(\d+\)$/, '') + ` (${count})`;
      button.addEventListener('click', () => applyFilter(button));
    });
    filters.hidden = false;
    status.hidden = false;
    applyFilter(buttons[0]);
    window.addEventListener('hashchange', () => {
      const target = document.getElementById(location.hash.slice(1));
      if (target?.hidden && target.hasAttribute('data-group')) applyFilter(buttons[0]);
    });
  }

  const copyStatus = document.querySelector('.copy-status');
  let copyTimer;
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      clearTimeout(copyTimer);
      copyStatus.textContent = '';
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        copyStatus.textContent = 'Copied to clipboard.';
      } catch {
        copyStatus.textContent = 'Could not copy to clipboard.';
      }
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 4000);
    });
  });

  const dialog = document.getElementById('lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = document.getElementById('lb-img');
    const title = document.getElementById('lb-title');
    const close = document.getElementById('lb-close');
    const original = document.getElementById('lb-original');
    let opener;

    document.querySelectorAll('.cert-thumb').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = link;
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        title.textContent = link.dataset.title;
        original.href = link.href;
        dialog.showModal();
        close.focus();
      });
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => opener?.focus());
  }
})();
