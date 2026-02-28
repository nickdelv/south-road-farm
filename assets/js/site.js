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
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      if (link.getAttribute("href") === page) {
        link.classList.add("active");
      }
    });

    // Scroll observer to toggle .scrolled class on nav
    const nav = document.getElementById("main-nav");
    const hero = document.getElementById("hero");
    const observer = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle("scrolled", !entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(hero);
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
