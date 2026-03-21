(function () {
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxKeE-Atv4v1tFV__MsKn5AxYBF1QdHPhs1xXFMQbTwENMEqRw2YazRvrwogLqIzho/exec";

  function loadInclude(id, file, onLoad) {
    fetch(file)
      .then(function (r) {
        return r.text();
      })
      .then(function (html) {
        document.getElementById(id).outerHTML = html;
        if (onLoad) onLoad();
      });
  }

  loadInclude("site-header", "components/header.html", function () {
    // Active nav link
    const page = location.pathname.split("/").pop() || "index.html";
    document
      .querySelectorAll(".nav-links a, .nav-overlay-links a")
      .forEach(function (link) {
        if (link.getAttribute("href") === page) {
          link.classList.add("active");
        }
      });

    // Mobile menu toggle
    const hamburger = document.querySelector(".nav-hamburger");
    const overlay = document.getElementById("nav-overlay");

    function openMenu() {
      overlay.classList.add("open");
      hamburger.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      overlay.classList.remove("open");
      hamburger.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    if (hamburger) {
      hamburger.addEventListener("click", function () {
        overlay.classList.contains("open") ? closeMenu() : openMenu();
      });
    }
    if (overlay) {
      overlay.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });
    }
    // Close on outside click (tablet dropdown)
    document.addEventListener("click", function (e) {
      if (
        overlay.classList.contains("open") &&
        !overlay.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Scroll observer to toggle .scrolled class on nav
    const nav = document.getElementById("main-nav");
    const hero = document.getElementById("hero");
    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          nav.classList.toggle("scrolled", !entry.isIntersecting);
        },
        { threshold: 0.05 },
      );
      observer.observe(hero);
    } else {
      // No hero — opaque background immediately, collapse on scroll past page header
      nav.classList.add("nav-opaque");
      const pageHeader = document.querySelector(".page-header");
      if (pageHeader) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            nav.classList.toggle("scrolled", !entry.isIntersecting);
          },
          { threshold: 0.05 },
        );
        observer.observe(pageHeader);
      }
    }
  });

  loadInclude("site-footer", "components/footer.html", function () {
    // Subscribe form — wired up after footer loads
    const subscribeForm = document.getElementById("subscribe-form");
    if (!subscribeForm) return;

    subscribeForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("subscribe-email").value.trim();
      const row = document.getElementById("subscribe-row");
      const success = document.getElementById("subscribe-success");
      const btn = subscribeForm.querySelector("button");

      btn.disabled = true;
      btn.textContent = "\u2026";

      const body = new URLSearchParams({ type: "subscribe", email });

      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      } catch (err) {
        // Apps Script returns a CORS error even on success — show success anyway
      }

      row.style.display = "none";
      success.style.display = "block";
    });
  });

  // Fade-in on scroll — applies to any .fade-in element on any page
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          fadeObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05 },
  );
  document.querySelectorAll(".fade-in").forEach(function (el) {
    fadeObserver.observe(el);
  });
})();
