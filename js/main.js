/* =========================================================
   DOMAKI MOTORS — MAIN SCRIPT
   Reads all config from js/config.js
   ========================================================= */

(function () {
  const CFG = window.DOMAKI_CONFIG || {};
  const BIZ = CFG.business || {};
  const SOCIAL = CFG.social || {};
  const IMGS = CFG.images || {};

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  function formatPrice(n) {
    return "KES " + Number(n).toLocaleString("en-KE");
  }
  window.formatPrice = formatPrice;

  function waLink(message) {
    const num = String(BIZ.whatsapp || "").replace(/\D/g, "");
    const text = encodeURIComponent(message || "Hello Domaki Motors, I would like to enquire about your tractors.");
    return "https://wa.me/" + num + "?text=" + text;
  }
  window.waLink = waLink;

  function openWhatsApp(message) {
    window.open(waLink(message), "_blank", "noopener");
  }
  window.openWhatsApp = openWhatsApp;

  function toast(msg, duration) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove("show"); }, duration || 2600);
  }
  window.toast = toast;

  /* ---------- APPLY IMAGES FROM CONFIG ---------- */
  function applyImages() {
    // Hero background
    const heroMedia = $(".hero-media");
    if (heroMedia && IMGS.hero) {
      heroMedia.style.backgroundImage = 'url("' + IMGS.hero + '")';
      heroMedia.style.backgroundSize = "cover";
      heroMedia.style.backgroundPosition = "center";
    }

    // Any element with data-img-key
    $$("[data-img-key]").forEach(function (img) {
      const key = img.getAttribute("data-img-key");
      if (IMGS[key]) img.src = IMGS[key];
    });

    // OG preview meta (updates DOM only — social networks use the HTML file's static tag)
    const og = $('meta[property="og:image"]');
    if (og && IMGS.ogPreview) og.setAttribute("content", IMGS.ogPreview);
  }

  /* ---------- HEADER ---------- */
  function buildHeader() {
    const header = $("#site-header");
    if (!header) return;

    const path = location.pathname.split("/").pop() || "index.html";
    const links = [
      ["Home", "index.html"],
      ["Tractors", "tractors.html"],
      ["Machinery", "index.html#machinery"],
      ["Services", "services.html"],
      ["Financing", "financing.html"],
      ["About", "about.html"],
      ["Contact", "contact.html"]
    ];
    const navHTML = links.map(function (l) {
      const active = path === l[1] ? "active" : "";
      return '<a href="' + l[1] + '" class="' + active + '">' + l[0] + '</a>';
    }).join("");

    header.innerHTML =
      '<div class="header-inner">' +
        '<a class="brand" href="index.html">' +
          '<span class="brand-name">DOMAKI MOTORS</span>' +
          '<span class="brand-sub">' + (BIZ.tagline || "Tractors • Machinery • Agricultural Solutions") + '</span>' +
        '</a>' +
        '<nav class="nav" aria-label="Main navigation">' + navHTML + '</nav>' +
        '<div class="header-cta">' +
          '<a class="btn btn-primary btn-sm" href="contact.html#quote">Request a Quote</a>' +
          '<button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">' +
        navHTML +
        '<a class="btn btn-primary" href="contact.html#quote">Request a Quote</a>' +
      '</nav>';

    const hamburger = $("#hamburger");
    const mobileNav = $("#mobileNav");
    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", function () {
        const open = mobileNav.classList.toggle("open");
        hamburger.classList.toggle("active", open);
        hamburger.setAttribute("aria-expanded", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$("#mobileNav a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobileNav.classList.remove("open");
          hamburger.classList.remove("active");
          document.body.style.overflow = "";
        });
      });
    }

    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    const footer = $("#site-footer");
    if (!footer) return;

    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<span class="brand-name">DOMAKI MOTORS</span>' +
            '<p>Tractors &amp; Agricultural Machinery<br>Eldoret, Kenya</p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Quick Links</h4>' +
            '<ul>' +
              '<li><a href="index.html">Home</a></li>' +
              '<li><a href="tractors.html">Tractors</a></li>' +
              '<li><a href="index.html#machinery">Machinery</a></li>' +
              '<li><a href="services.html">Services</a></li>' +
              '<li><a href="financing.html">Financing</a></li>' +
              '<li><a href="about.html">About</a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Contact</h4>' +
            '<ul>' +
              '<li>' + (BIZ.address || "Eldoret, Kenya") + '</li>' +
              '<li>' + (BIZ.phone || "[DOMAKI PHONE]") + '</li>' +
              '<li><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
              '<li>' + (BIZ.email || "[DOMAKI EMAIL]") + '</li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Follow Us</h4>' +
            '<div class="socials">' +
              '<a href="' + (SOCIAL.facebook || "#") + '" aria-label="Facebook" target="_blank" rel="noopener">f</a>' +
              '<a href="' + (SOCIAL.instagram || "#") + '" aria-label="Instagram" target="_blank" rel="noopener">ig</a>' +
              '<a href="' + (SOCIAL.tiktok || "#") + '" aria-label="TikTok" target="_blank" rel="noopener">tt</a>' +
              '<a href="' + (SOCIAL.youtube || "#") + '" aria-label="YouTube" target="_blank" rel="noopener">yt</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 Domaki Motors. All Rights Reserved.</span>' +
          '<span>Website by Adams Omondi</span>' +
        '</div>' +
      '</div>';
  }

  /* ---------- WHATSAPP FLOAT ---------- */
  function buildWaFloat() {
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = waLink();
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Chat on WhatsApp");
    a.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>';
    document.body.appendChild(a);
  }

  /* ---------- BACK TO TOP ---------- */
  function buildBackTop() {
    const btn = document.createElement("button");
    btn.className = "back-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    function toggle() { btn.classList.toggle("show", window.scrollY > 500); }
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  /* ---------- LOADER ---------- */
  function hideLoader() {
    const loader = $("#loader");
    if (!loader) return;
    setTimeout(function () { loader.classList.add("hidden"); }, 900);
  }

  /* ---------- WHATSAPP BUTTONS (data-wa) ---------- */
  function bindWaButtons() {
    $$("[data-wa]").forEach(function (btn) {
      if (btn._waBound) return;
      btn._waBound = true;
      btn.addEventListener("click", function () { openWhatsApp(btn.dataset.wa); });
    });
  }
  window.bindWaButtonsAgain = bindWaButtons;

  /* ---------- QUOTE FORM ---------- */
  function bindQuoteForm() {
    const form = $("#quoteForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const d = new FormData(form);
      const msg =
        "Hello Domaki Motors,\n\n" +
        "I am interested in the following tractor:\n" +
        "Model: " + (d.get("model") || "Not specified") + "\n" +
        "Name: " + (d.get("name") || "") + "\n" +
        "Phone: " + (d.get("phone") || "") + "\n" +
        "Email: " + (d.get("email") || "") + "\n" +
        "County: " + (d.get("county") || "") + "\n" +
        "Budget: " + (d.get("budget") || "") + "\n" +
        "New/Used: " + (d.get("condition") || "") + "\n" +
        "Message: " + (d.get("message") || "");
      window.open(waLink(msg), "_blank", "noopener");
      toast("Opening WhatsApp with your quote request…");
      form.reset();
    });
  }

  /* ---------- CONTACT FORM ---------- */
  function bindContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const d = new FormData(form);
      const msg =
        "Hello Domaki Motors,\n\n" +
        "Name: " + (d.get("name") || "") + "\n" +
        "Phone: " + (d.get("phone") || "") + "\n" +
        "Email: " + (d.get("email") || "") + "\n" +
        "Subject: " + (d.get("subject") || "") + "\n" +
        "Message: " + (d.get("message") || "");
      window.open(waLink(msg), "_blank", "noopener");
      toast("Opening WhatsApp…");
      form.reset();
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyImages();
    buildHeader();
    buildFooter();
    buildWaFloat();
    buildBackTop();
    bindWaButtons();
    bindQuoteForm();
    bindContactForm();
    hideLoader();
  });
})();