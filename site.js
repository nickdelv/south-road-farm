(function () {
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

  loadInclude("site-header", "header.html", function () {
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
      // No hero on this page — keep nav opaque always
      nav.classList.add("scrolled");
    }
  });

  loadInclude("site-footer", "footer.html");

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
