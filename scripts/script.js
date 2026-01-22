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

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('is-visible');
    }
  });
};

window.addEventListener('load', () => {
  setTimeout(revealOnScroll, 150);
});

window.addEventListener('scroll', revealOnScroll);


  const GA_ID = "G-7V72ZS6MEC";
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");
  const CONSENT_KEY = "cookieConsent"; // accepted | declined

 function hideBanner(){
  if (!banner) return;
  banner.style.display = "none";
}

function showBanner(){
  if (!banner) return;
  banner.style.display = "flex";
}


  function loadGA4(){
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function applyConsent(value){
    localStorage.setItem(CONSENT_KEY, value);
    if (value === "accepted") loadGA4();
    hideBanner();
  }

  const saved = localStorage.getItem(CONSENT_KEY);
  if (!saved) showBanner();
  else { hideBanner(); if (saved === "accepted") loadGA4(); }

  acceptBtn.addEventListener("click", () => applyConsent("accepted"));
  declineBtn.addEventListener("click", () => applyConsent("declined"));
 
   

document.getElementById("year").textContent = new Date().getFullYear();









