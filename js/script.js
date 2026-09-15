(function () {
  "use strict";

  var SESSION_KEY = "saar_unlocked_hash";

  async function sha256(text) {
    var enc = new TextEncoder().encode(text);
    var buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, "0"); })
      .join("");
  }

  function showGate() {
    document.body.classList.add("locked");
    var gate = document.getElementById("gate");
    gate.hidden = false;
  }

  function hideGate() {
    document.body.classList.remove("locked");
  }

  function initGate() {
    if (!window.SITE_CONFIG || !SITE_CONFIG.LOCKED) {
      hideGate();
      return;
    }

    var unlocked = sessionStorage.getItem(SESSION_KEY);
    if (unlocked === SITE_CONFIG.PASSWORD_HASH) {
      hideGate();
      return;
    }

    showGate();

    var form = document.getElementById("gate-form");
    var input = document.getElementById("gate-password");
    var error = document.getElementById("gate-error");
    var gate = document.getElementById("gate");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      var hash = await sha256(input.value.trim());

      if (hash === SITE_CONFIG.PASSWORD_HASH) {
        sessionStorage.setItem(SESSION_KEY, hash);
        error.hidden = true;
        hideGate();
      } else {
        error.hidden = false;
        input.value = "";
        input.focus();
        gate.classList.remove("shake");
        void gate.offsetWidth;
        gate.classList.add("shake");
      }
    });
  }

  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initMobileNav() {
    var hamburger = document.getElementById("hamburger");
    var mobileNav = document.getElementById("mobile-nav");
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initActiveNav() {
    var sections = document.querySelectorAll("main section[id]");
    var links = document.querySelectorAll(".nav-link");
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  function initJourneyProgress() {
    var items = document.querySelectorAll(".timeline-item");
    if (!items.length) return;

    var live = !!(window.SITE_CONFIG && SITE_CONFIG.JOURNEY_LIVE);
    var athTier = 0;
    if (window.SITE_CONFIG && typeof SITE_CONFIG.JOURNEY_ATH_TIER === "number") {
      athTier = SITE_CONFIG.JOURNEY_ATH_TIER;
    }

    items.forEach(function (item) {
      var tier = parseInt(item.getAttribute("data-tier"), 10);
      var badge = item.querySelector(".status-badge");

      if (!live) {
        item.classList.add("locked", "upcoming");
        if (tier === 0 && badge) {
          badge.textContent = "Locked";
          badge.classList.add("status-badge--locked");
        }
        return;
      }

      if (tier < athTier) {
        item.classList.add("reached");
      } else if (tier === athTier) {
        item.classList.add("reached", "current");
        if (badge) {
          badge.textContent = "Current ATH";
          badge.classList.add("status-badge--live");
        }
      } else {
        item.classList.add("upcoming");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGate();
    initHeaderScroll();
    initMobileNav();
    initActiveNav();
    initJourneyProgress();
  });
})();
