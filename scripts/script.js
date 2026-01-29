// -------------------- Burger menu --------------------
const burgerButton = document.querySelector('[data-burger]');
const nav = document.querySelector('[data-nav]');

if (burgerButton && nav) {
  const navLinks = nav.querySelectorAll('a');

  const setMenuState = (isOpen) => {
    nav.classList.toggle('is-open', isOpen);
    burgerButton.setAttribute('aria-expanded', String(isOpen));
  };

  burgerButton.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('is-open');
    setMenuState(isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 860px)').matches) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 860px)').matches) {
      setMenuState(false);
    }
  });
}

// -------------------- Reveal --------------------
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('is-visible');
    }
  });
};

// мини-throttle: не чаще 1 раза за кадр
let revealTicking = false;
window.addEventListener('scroll', () => {
  if (revealTicking) return;
  revealTicking = true;
  requestAnimationFrame(() => {
    revealOnScroll();
    revealTicking = false;
  });
});

window.addEventListener('load', () => {
  setTimeout(revealOnScroll, 150);
});

// -------------------- Cookie consent + GA4 --------------------
const GA_ID = "G-7V72ZS6MEC";
const CONSENT_KEY = "cookieConsent"; // accepted | declined

const banner = document.getElementById("cookie-banner");
const acceptBtn = document.getElementById("cookie-accept");
const declineBtn = document.getElementById("cookie-decline");

function hideBanner() {
  if (!banner) return;
  banner.style.display = "none";
}

function showBanner() {
  if (!banner) return;
  banner.style.display = "flex";
}

function loadGA4() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

function applyConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
  if (value === "accepted") loadGA4();
  hideBanner();
}

// запускаем только если баннер и кнопки реально есть на странице
if (banner && acceptBtn && declineBtn) {
  const saved = localStorage.getItem(CONSENT_KEY);

  if (!saved) showBanner();
  else {
    hideBanner();
    if (saved === "accepted") loadGA4();
  }

  acceptBtn.addEventListener("click", () => applyConsent("accepted"));
  declineBtn.addEventListener("click", () => applyConsent("declined"));
}

// -------------------- Footer year --------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
