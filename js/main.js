// ---------------------------------------------------------------------------
// MAIN.JS — renders data-driven sections and wires up interactivity.
// No backend, no build step. Everything here is plain DOM + fetch-free.
// ---------------------------------------------------------------------------
import { SITE, PROCESS, WHY } from "./data/site.js";
import { INTRO_CARDS, SERVICES, QUIZ } from "./data/services.js";
import { PROJECTS } from "./data/portfolio.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const ICONS = {
  social: '<circle cx="12" cy="12" r="3.4"/><path d="M12 3.4v3M12 17.6v3M3.4 12h3M17.6 12h3"/>',
  ideas: '<path d="M12 3.5a5.7 5.7 0 0 0-3.2 10.4c.5.4.8 1 .8 1.6v.5h4.8v-.5c0-.6.3-1.2.8-1.6A5.7 5.7 0 0 0 12 3.5Z"/><path d="M9.6 19h4.8M10.3 21h3.4"/>',
  photography: '<path d="M4.5 8.5h3l1.3-2h6.4l1.3 2h3v10h-15z"/><circle cx="12" cy="13.3" r="3"/>',
  digital: '<rect x="4.5" y="5" width="15" height="10.5" rx="1.5"/><path d="M9 19.5h6M12 15.5v4"/>',
  kompro: '<path d="M6 3.5h9l3 3v14h-12z"/><path d="M15 3.5v3h3M9 12h6M9 15.5h6M9 8.5h3"/>',
};

function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.content}</svg>`;
}

/* ---------------------------------------------------------------------- */
/* NAV                                                                     */
/* ---------------------------------------------------------------------- */
function renderNav() {
  const desktop = $("#nav-links");
  const mobile = $("#mobile-nav-links");
  const html = SITE.nav
    .map(
      (item) =>
        `<a href="${item.href}" class="${item.cta ? "btn btn-primary btn-sm" : "nav-link"}">${item.label}</a>`
    )
    .join("");
  desktop.innerHTML = html;
  mobile.innerHTML = html;

  $$("#nav-links a, #mobile-nav-links a").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        closeMobileNav();
        smoothScrollTo(href);
      }
    });
  });

  $("#logo-name").textContent = SITE.shortName;
}

function smoothScrollTo(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const headerHeight = document.querySelector(".site-header").offsetHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function closeMobileNav() {
  document.body.classList.remove("nav-open");
  $("#nav-toggle").setAttribute("aria-expanded", "false");
}

function initMobileNav() {
  const toggle = $("#nav-toggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $("#mobile-nav-backdrop").addEventListener("click", closeMobileNav);
}

/* ---------------------------------------------------------------------- */
/* FOOTER + SOCIAL                                                        */
/* ---------------------------------------------------------------------- */
function renderFooterAndSocial() {
  const links = [
    { label: "Instagram", href: SITE.social.instagram },
    { label: "TikTok", href: SITE.social.tiktok },
    { label: "WhatsApp", href: SITE.social.whatsapp },
    { label: "Email", href: `mailto:${SITE.social.email}` },
  ];
  $("#footer-links").innerHTML = links
    .map((l) => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
    .join("");
  $("#footer-logo").textContent = SITE.name;
  $("#footer-tagline").textContent = SITE.tagline;
  $("#footer-note").textContent = SITE.footerNote;
  $("#footer-year").textContent = String(SITE.year);
  $("#dm-instagram").href = SITE.social.instagram;
  $("#chat-whatsapp").href = SITE.social.whatsapp;
}

/* ---------------------------------------------------------------------- */
/* HERO STICKERS + MARQUEE                                                */
/* ---------------------------------------------------------------------- */
const STICKER_WORDS = ["Konten", "Ide", "Sosial", "Visual", "Digital", "Brand"];

function renderStickers() {
  const wrap = $("#hero-stickers");
  wrap.innerHTML = STICKER_WORDS.map(
    (w, i) => `<span class="sticker sticker-${i}" data-depth="${0.15 + (i % 3) * 0.1}">${w}</span>`
  ).join("");
}

function initParallax() {
  if (prefersReducedMotion) return;
  const hero = $("#home");
  const stickers = $$(".sticker");
  if (!stickers.length) return;
  hero.addEventListener("pointermove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stickers.forEach((s) => {
      const depth = parseFloat(s.dataset.depth) * 40;
      s.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(var(--r))`;
    });
  });
  hero.addEventListener("pointerleave", () => {
    stickers.forEach((s) => (s.style.transform = "translate(0,0) rotate(var(--r))"));
  });
}

function renderMarquee() {
  const track = $("#marquee-track");
  const text = "Sosial &nbsp;\u2022&nbsp; Konten &nbsp;\u2022&nbsp; Visual &nbsp;\u2022&nbsp; Digital &nbsp;\u2022&nbsp; Ide &nbsp;\u2022&nbsp; Brand &nbsp;\u2022&nbsp; ";
  track.innerHTML = text.repeat(4);
}

/* ---------------------------------------------------------------------- */
/* INTRO CARDS ("SO, WHAT DO WE ACTUALLY DO?")                            */
/* ---------------------------------------------------------------------- */
function renderIntroCards() {
  const grid = $("#intro-grid");
  grid.innerHTML = INTRO_CARDS.map(
    (c) => `
    <article class="intro-card" tabindex="0">
      <span class="intro-card-icon">${iconSvg(c.icon)}</span>
      <h3>${c.title}</h3>
      <p>${c.text}</p>
      <a class="intro-card-link" href="#services">Lihat detailnya \u2192</a>
    </article>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* QUIZ ("WHAT DOES YOUR BRAND NEED RIGHT NOW?")                          */
/* ---------------------------------------------------------------------- */
function renderQuiz() {
  const optionsWrap = $("#quiz-options");
  optionsWrap.innerHTML = QUIZ.map(
    (q) => `<button type="button" class="quiz-option" data-id="${q.id}">${q.prompt}</button>`
  ).join("");

  const result = $("#quiz-result");

  optionsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".quiz-option");
    if (!btn) return;
    $$(".quiz-option", optionsWrap).forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const q = QUIZ.find((x) => x.id === btn.dataset.id);
    result.innerHTML = `
      <p class="quiz-result-eyebrow">Rekomendasi</p>
      <h3>${q.resultTitle}</h3>
      <p>${q.resultText}</p>
      <button type="button" class="btn btn-primary" data-open-modal data-service="${q.serviceId}">Yuk ngobrol \u2192</button>
    `;
    result.classList.add("is-visible");
  });
}

/* ---------------------------------------------------------------------- */
/* PORTOFOLIO — PROYEK MILIK SENDIRI (CORVAAPPAREL & DOMPET GEN Z)        */
/* ---------------------------------------------------------------------- */
function renderPortfolio() {
  const grid = $("#portfolio-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(
    (p) => `
    <article class="portfolio-card">
      <span class="playground-label">${p.label}</span>
      <h3 class="playground-name">${p.name}</h3>
      <p class="playground-description">${p.description}</p>
      <ul class="portfolio-highlights">
        ${p.highlights.map((h) => `<li>${h}</li>`).join("")}
      </ul>
      <a href="${p.exploreUrl}" class="btn btn-secondary" target="_blank" rel="noopener">${p.exploreLabel} \u2192</a>
    </article>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* MANIFESTO ("WE DON'T JUST MAKE CONTENT.")                              */
/* ---------------------------------------------------------------------- */
const MANIFESTO_LINES = [
  "Kami temukan idenya.",
  "Kami temukan sudut pandangnya.",
  "Kami jadikan visual.",
  "Kami jadikan relevan.",
  "Kami jadikan milikmu.",
];

function renderManifesto() {
  const wrap = $("#manifesto-lines");
  wrap.innerHTML = MANIFESTO_LINES.map((l, i) => `<span class="manifesto-line" style="--i:${i}">${l}</span>`).join("");

  if (prefersReducedMotion) {
    $$(".manifesto-line", wrap).forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.6 }
  );
  $$(".manifesto-line", wrap).forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------------- */
/* SERVICES ACCORDION                                                     */
/* ---------------------------------------------------------------------- */
function renderServices() {
  const wrap = $("#services-list");
  wrap.innerHTML = SERVICES.map(
    (s) => `
    <details class="service-item" ${s.number === "01" ? "open" : ""}>
      <summary>
        <span class="service-number">${s.number}</span>
        <span class="service-title">${s.title}</span>
        <span class="service-chevron" aria-hidden="true"></span>
      </summary>
      <div class="service-body">
        <p>${s.intro}</p>
        <ul>${s.items.map((it) => `<li>${it}</li>`).join("")}</ul>
      </div>
    </details>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* PROCESS TIMELINE                                                       */
/* ---------------------------------------------------------------------- */
function renderProcess() {
  const wrap = $("#process-steps");
  wrap.innerHTML = PROCESS.map(
    (p) => `
    <div class="process-step">
      <div class="process-dot"><span>${p.number}</span></div>
      <div class="process-copy">
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </div>
    </div>`
  ).join("");
}

function initProcessProgress() {
  const track = $("#process-track");
  const fill = $("#process-fill");
  const steps = $$(".process-step");
  if (!track || !fill) return;

  let ticking = false;
  function update() {
    ticking = false;
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const scrolled = Math.min(Math.max(vh * 0.65 - rect.top, 0), total);
    const pct = total > 0 ? scrolled / total : 0;
    fill.style.transform = `scaleY(${pct})`;

    steps.forEach((step, i) => {
      const stepPct = i / Math.max(steps.length - 1, 1);
      step.classList.toggle("is-active", pct >= stepPct - 0.02);
    });
  }
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/* ---------------------------------------------------------------------- */
/* WHY TRENDPOINT                                                         */
/* ---------------------------------------------------------------------- */
function renderWhy() {
  $("#why-grid").innerHTML = WHY.map(
    (w) => `
    <article class="why-card">
      <h3>${w.title}</h3>
      <p>${w.text}</p>
    </article>`
  ).join("");
}

/* ---------------------------------------------------------------------- */
/* COLLABORATION CHIPS                                                    */
/* ---------------------------------------------------------------------- */
function renderCollabChips() {
  const chips = SERVICES.map((s) => s.title).slice(0, 5);
  $("#collab-chips").innerHTML = chips.map((c) => `<span class="chip">${c}</span>`).join("");
}

/* ---------------------------------------------------------------------- */
/* SCROLL REVEAL (generic, respects reduced motion)                       */
/* ---------------------------------------------------------------------- */
function initScrollReveal() {
  const items = $$("[data-reveal]");
  if (prefersReducedMotion || !items.length) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------------- */
/* PROJECT INQUIRY MODAL                                                  */
/* ---------------------------------------------------------------------- */
function initModal() {
  const modal = $("#modal");
  const openers = () => $$("[data-open-modal]");
  const form = $("#inquiry-form");
  const closeBtn = $("#modal-close");
  const backdrop = $("#modal-backdrop");
  const serviceSelect = $("#field-service");
  const successPanel = $("#modal-success");
  let lastFocused = null;

  function open(serviceId) {
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    modal.setAttribute("aria-hidden", "false");
    successPanel.hidden = true;
    form.hidden = false;
    if (serviceId) {
      const opt = Array.from(serviceSelect.options).find((o) => o.value === serviceId);
      if (opt) serviceSelect.value = serviceId;
    }
    setTimeout(() => $("#field-name").focus(), 50);
  }

  function close() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    modal.setAttribute("aria-hidden", "true");
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-modal]");
    if (trigger) {
      e.preventDefault();
      open(trigger.dataset.service || "");
    }
  });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    const lines = [
      `Hai Trendpoint Creative, aku mau mulai sebuah proyek.`,
      ``,
      `Nama: ${data.name || "-"}`,
      `Brand: ${data.brand || "-"}`,
      `Email: ${data.email || "-"}`,
      `Instagram / Website: ${data.handle || "-"}`,
      `Yang aku butuhkan: ${data.service || "-"}`,
      `Budget: ${data.budget || "-"}`,
      `Deskripsi proyek: ${data.description || "-"}`,
      `Tahu Trendpoint dari: ${data.source || "-"}`,
    ];
    const message = lines.join("\n");
    const encoded = encodeURIComponent(message);

    const waNumber = SITE.social.whatsapp.replace(/\D/g, "");
    $("#send-whatsapp").href = `https://wa.me/${waNumber}?text=${encoded}`;
    $("#send-email").href = `mailto:${SITE.social.email}?subject=${encodeURIComponent(
      "Permintaan proyek baru — " + (data.brand || data.name || "Trendpoint")
    )}&body=${encoded}`;

    form.hidden = true;
    successPanel.hidden = false;
    successPanel.focus();
  });
}

function populateServiceOptions() {
  const select = $("#field-service");
  const options = [...SERVICES.map((s) => s.title), "Lainnya"];
  select.innerHTML =
    `<option value="" disabled selected>Pilih salah satu</option>` +
    options.map((o) => `<option value="${o}">${o}</option>`).join("");
}

/* ---------------------------------------------------------------------- */
/* MISC: current year fallback, header shadow on scroll                   */
/* ---------------------------------------------------------------------- */
function initHeaderShadow() {
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------------------------------------------------------------- */
/* INIT                                                                    */
/* ---------------------------------------------------------------------- */
function init() {
  renderNav();
  renderFooterAndSocial();
  renderStickers();
  renderMarquee();
  renderIntroCards();
  renderQuiz();
  renderPortfolio();
  renderManifesto();
  renderServices();
  renderProcess();
  renderWhy();
  renderCollabChips();
  populateServiceOptions();

  initMobileNav();
  initParallax();
  initProcessProgress();
  initScrollReveal();
  initModal();
  initHeaderShadow();
}

document.addEventListener("DOMContentLoaded", init);
