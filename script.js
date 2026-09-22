const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const loader = document.querySelector(".brand-loader");
const body = document.body;

if (loader) {
  const exitLoader = () => {
    if (loader.classList.contains("is-exiting")) return;

    loader.classList.add("is-exiting");
    body.classList.remove("is-loading");

    const hideLoader = (event) => {
      if (event && event.target !== loader) return;

      loader.classList.add("is-hidden");
      loader.removeEventListener("transitionend", hideLoader);
    };

    loader.addEventListener("transitionend", hideLoader);
    window.setTimeout(hideLoader, 700);
  };

  const loaderDuration = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches
    ? 150
    : 2300;
  window.setTimeout(exitLoader, loaderDuration);
}

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 8);
};

const closeMenu = () => {
  if (!toggle || !menu) return;

  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "فتح القائمة");
  body.classList.remove("menu-is-open");
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const opened = toggle.getAttribute("aria-expanded") === "true";
    const willOpen = !opened;

    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute(
      "aria-label",
      willOpen ? "إغلاق القائمة" : "فتح القائمة",
    );
    menu.classList.toggle("open", willOpen);
    body.classList.toggle("menu-is-open", willOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window
    .matchMedia("(min-width: 801px)")
    .addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
}

const items = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add("visible"));
}
