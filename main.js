(function () {
  'use strict';

  const WHATSAPP_NUMBER = '919815322260';
  const enquiryItems = new Set();

  const byId = (id) => document.getElementById(id);
  const menuToggle = byId('menu-toggle');
  const primaryNav = byId('primary-nav');
  const bagToggle = byId('bag-toggle');
  const drawer = byId('enquiry-drawer');
  const drawerBackdrop = byId('drawer-backdrop');
  const drawerClose = byId('drawer-close');
  const drawerItems = byId('drawer-items');
  const drawerSend = byId('drawer-send');
  const clearList = byId('clear-list');
  const toast = byId('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  function setMenu(open) {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    primaryNav.classList.toggle('is-open', open);
  }

  function setDrawer(open) {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    drawerBackdrop.hidden = !open;
    document.body.classList.toggle('drawer-open', open);
    if (open) {
      requestAnimationFrame(() => drawerBackdrop.classList.add('is-visible'));
      if (drawerClose) drawerClose.focus();
    } else {
      drawerBackdrop.classList.remove('is-visible');
      if (bagToggle) bagToggle.focus();
    }
  }

  function renderEnquiryList() {
    const count = enquiryItems.size;
    const bagCount = byId('bag-count');
    const drawerCount = byId('drawer-count');
    if (bagCount) bagCount.textContent = String(count);
    if (drawerCount) drawerCount.textContent = `(${count})`;
    if (!drawerItems || !drawerSend || !clearList) return;

    drawerItems.replaceChildren();
    if (count === 0) {
      const empty = document.createElement('li');
      empty.className = 'drawer-empty';
      empty.textContent = 'Your list is empty. Add a collection to get started.';
      drawerItems.appendChild(empty);
    } else {
      enquiryItems.forEach((name) => {
        const item = document.createElement('li');
        const label = document.createElement('span');
        label.textContent = name;
        const remove = document.createElement('button');
        remove.className = 'remove-item';
        remove.type = 'button';
        remove.textContent = 'Remove';
        remove.setAttribute('aria-label', `Remove ${name} from enquiry list`);
        remove.addEventListener('click', () => {
          enquiryItems.delete(name);
          renderEnquiryList();
        });
        item.append(label, remove);
        drawerItems.appendChild(item);
      });
    }
    drawerSend.disabled = count === 0;
    clearList.disabled = count === 0;
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function openWhatsApp(message) {
    const url = buildWhatsAppUrl(message);
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenu(!expanded);
    });
  }
  if (primaryNav) {
    primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  }
  if (bagToggle) bagToggle.addEventListener('click', () => setDrawer(true));
  if (drawerClose) drawerClose.addEventListener('click', () => setDrawer(false));
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => setDrawer(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (drawer && drawer.classList.contains('is-open')) setDrawer(false);
      setMenu(false);
    }
  });

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-add');
      if (!name) return;
      const alreadyAdded = enquiryItems.has(name);
      enquiryItems.add(name);
      renderEnquiryList();
      showToast(alreadyAdded ? 'This collection is already in your list.' : `${name} added to your enquiry list.`);
    });
  });

  if (drawerSend) {
    drawerSend.addEventListener('click', () => {
      if (enquiryItems.size === 0) return;
      const list = Array.from(enquiryItems).map((item) => `• ${item}`).join('\n');
      const message = `Hello Kaytex Fabrics, I would like to enquire about these collections:\n${list}\n\nPlease share designs, prices and order details.`;
      openWhatsApp(message);
    });
  }
  if (clearList) {
    clearList.addEventListener('click', () => {
      enquiryItems.clear();
      renderEnquiryList();
      showToast('Enquiry list cleared.');
    });
  }

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.product-card[data-category]');
  const resultsNote = byId('results-note');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter') || 'all';
      let visible = 0;
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      cards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(/\s+/);
        const shouldShow = filter === 'all' || categories.includes(filter);
        card.hidden = !shouldShow;
        if (shouldShow) visible += 1;
      });
      if (resultsNote) resultsNote.textContent = `Showing ${visible} ${visible === 1 ? 'collection' : 'collections'}`;
    });
  });

  const enquiryForm = byId('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!enquiryForm.reportValidity()) return;
      const data = new FormData(enquiryForm);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const customerType = String(data.get('customerType') || 'Retail customer');
      const interest = String(data.get('interest') || 'General collection enquiry');
      const messageDetails = String(data.get('message') || '').trim();
      const shortlist = enquiryItems.size ? `\nShortlisted collections:\n${Array.from(enquiryItems).map((item) => `• ${item}`).join('\n')}` : '';
      const message = [
        'Hello Kaytex Fabrics, I would like to make an enquiry.',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Enquiring as: ${customerType}`,
        `Interested in: ${interest}`,
        messageDetails ? `Requirement: ${messageDetails}` : '',
        shortlist,
        'Please contact me with the relevant designs and details.'
      ].filter(Boolean).join('\n');
      openWhatsApp(message);
    });
  }

  document.querySelectorAll('img[data-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      const fallback = image.getAttribute('data-fallback');
      if (fallback && image.getAttribute('src') !== fallback) {
        image.src = fallback;
      }
    }, { once: true });
  });

  const year = byId('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  renderEnquiryList();
})();
