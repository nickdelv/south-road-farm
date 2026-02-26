(function () {
  function loadInclude(id, file, onLoad) {
    fetch(file)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        document.getElementById(id).outerHTML = html;
        if (onLoad) onLoad();
      });
  }

  loadInclude('site-header', 'header.html', function () {
    // Scroll observer to toggle .scrolled class on nav
    const nav = document.getElementById('main-nav');
    const hero = document.getElementById('hero');
    const observer = new IntersectionObserver(([entry]) => {
      nav.classList.toggle('scrolled', !entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(hero);
  });

  loadInclude('site-footer', 'footer.html');
})();
