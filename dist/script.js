/* ── WEBSITE BUILDER NISH — SCRIPT ── */

// ── Mobile Menu ──────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mainNav    = document.getElementById('mainNav');
const mainContent = document.getElementById('mainContent');
const siteFooter = document.querySelector('.site-footer');
let menuScrollY = 0;

const setPageInteractivity = (isMenuOpen) => {
  [mainContent, siteFooter].forEach((element) => {
    if (!element) return;

    if ('inert' in element) {
      element.inert = isMenuOpen;
    }
  });
};

const lockBodyScroll = () => {
  menuScrollY = window.scrollY;
  document.body.classList.add('menu-open');
  document.body.style.top = `-${menuScrollY}px`;
};

const unlockBodyScroll = () => {
  document.body.classList.remove('menu-open');
  document.body.style.top = '';
  window.scrollTo(0, menuScrollY);
};

const syncMenuAccessibility = () => {
  const isDesktop = window.innerWidth > 768;
  const isOpen = mainNav.classList.contains('open');

  mainNav.setAttribute('aria-hidden', String(!isDesktop && !isOpen));
};

const setMenuState = (isOpen) => {
  mainNav.classList.toggle('open', isOpen);
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuToggle.setAttribute('aria-expanded', String(isOpen));

  if (window.innerWidth <= 768) {
    if (isOpen) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
  } else {
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
  }

  setPageInteractivity(isOpen && window.innerWidth <= 768);
  syncMenuAccessibility();
};

setMenuState(false);

menuToggle.addEventListener('click', () => {
  setMenuState(!mainNav.classList.contains('open'));
});

// Close menu on nav link click
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMenuState(false);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mainNav.classList.contains('open')) {
    setMenuState(false);
  }
});

document.addEventListener('click', (event) => {
  if (
    window.innerWidth <= 768 &&
    mainNav.classList.contains('open') &&
    !mainNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMenuState(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
    setMenuState(false);
    return;
  }

  syncMenuAccessibility();
});

window.addEventListener('hashchange', () => {
  if (mainNav.classList.contains('open')) {
    setMenuState(false);
  }
});

// ── FAQ Accordion ────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer  = btn.nextElementSibling;
    const isOpen  = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Toggle current
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ── Sticky header shadow on scroll ──────────────────
const header = document.getElementById('top')?.closest
  ? document.querySelector('.site-header')
  : document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (header) {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,0.08)'
      : '';
  }
}, { passive: true });

// ── Smooth scroll polyfill for anchor links ──────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Lead attribution fields ──────────────────────────
const attributionFields = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
];

const urlParams = new URLSearchParams(window.location.search);

attributionFields.forEach((field) => {
  const value = urlParams.get(field);

  if (value) {
    try {
      window.localStorage.setItem(`lead_${field}`, value);
    } catch (error) {
      // Ignore storage failures and fall back to the current URL value.
    }
  }
});

// ── Contact form — Web3Forms fetch submission ────────
const form        = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

if (form) {
  const setFieldValue = (id, value) => {
    const field = document.getElementById(id);

    if (field) {
      field.value = value || '';
    }
  };

  setFieldValue('page_url', window.location.href);
  setFieldValue('referrer', document.referrer);

  attributionFields.forEach((field) => {
    let value = urlParams.get(field) || '';

    if (!value) {
      try {
        value = window.localStorage.getItem(`lead_${field}`) || '';
      } catch (error) {
        value = '';
      }
    }

    setFieldValue(field, value);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.setAttribute('aria-busy', 'true');

    // Hide any previous state messages
    formSuccess.hidden = true;
    formError.hidden   = true;

    // Button loading state
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      const data = await response.json();

      if (data.success) {
        // Success — hide form fields, show confirmation
        form.querySelectorAll('.form-row, .form-group').forEach(el => el.style.display = 'none');
        submitBtn.hidden   = true;
        formSuccess.hidden = false;
        form.setAttribute('aria-busy', 'false');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      formError.hidden      = false;
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled    = false;
      form.setAttribute('aria-busy', 'false');
    }
  });
}
