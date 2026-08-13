// Mosaic gallery — arrow navigation, drag-to-scroll, lightbox
(function () {
  var scroll = document.querySelector(".gallery-scroll");
  if (!scroll) return;

  var leftBtn = document.querySelector(".gallery-arrow-left");
  var rightBtn = document.querySelector(".gallery-arrow-right");
  var scrollAmount = 400;

  // Arrow click handlers
  leftBtn.addEventListener("click", function () {
    scroll.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  rightBtn.addEventListener("click", function () {
    scroll.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // Arrow visibility based on scroll position
  function updateArrows() {
    var atStart = scroll.scrollLeft <= 4;
    var atEnd =
      scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 4;
    leftBtn.classList.toggle("hidden", atStart);
    rightBtn.classList.toggle("hidden", atEnd);
  }
  scroll.addEventListener("scroll", updateArrows, { passive: true });
  updateArrows();

  // Drag-to-scroll for desktop
  var isDragging = false;
  var startX = 0;
  var scrollStart = 0;
  var didDrag = false;

  scroll.addEventListener("mousedown", function (e) {
    isDragging = true;
    didDrag = false;
    startX = e.pageX;
    scrollStart = scroll.scrollLeft;
    scroll.classList.add("is-dragging");
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var dx = e.pageX - startX;
    if (Math.abs(dx) > 5) didDrag = true;
    scroll.scrollLeft = scrollStart - dx;
  });

  window.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;
    scroll.classList.remove("is-dragging");
  });

  // ── Lightbox ──
  var cells = document.querySelectorAll(".gallery-cell");
  var images = [];
  cells.forEach(function (cell) {
    var img = cell.querySelector("img");
    images.push({ src: img.src, alt: img.alt });
  });

  var currentIndex = 0;
  var lightbox = null;
  var lightboxImg = null;

  function createLightbox() {
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8592;</button>' +
      '<img src="" alt="" />' +
      '<button class="lightbox-nav lightbox-next" aria-label="Next">&#8594;</button>';
    document.body.appendChild(lightbox);
    lightboxImg = lightbox.querySelector("img");

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener("click", closeLightbox);
    lightbox
      .querySelector(".lightbox-prev")
      .addEventListener("click", function () {
        navigate(-1);
      });
    lightbox
      .querySelector(".lightbox-next")
      .addEventListener("click", function () {
        navigate(1);
      });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    // Touch swipe
    var touchStartX = 0;
    lightbox.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    lightbox.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        navigate(dx > 0 ? -1 : 1);
      }
    });

    // Trackpad swipe (desktop) — detect new gestures via delta pattern
    var prevWheelDelta = 0;
    var prevWheelDir = 0;
    var prevWheelTime = 0;
    var wheelNavigated = false;
    lightbox.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
        var now = Date.now();
        var delta = Math.abs(e.deltaX);
        var dir = Math.sign(e.deltaX);
        if (delta < 2) return;
        // New gesture: direction changed, 150ms+ gap, or delta rising from low
        if (
          dir !== prevWheelDir ||
          now - prevWheelTime > 150 ||
          (delta > prevWheelDelta && prevWheelDelta < 6)
        ) {
          wheelNavigated = false;
        }
        prevWheelDelta = delta;
        prevWheelDir = dir;
        prevWheelTime = now;
        if (!wheelNavigated && delta > 8) {
          navigate(dir > 0 ? 1 : -1);
          wheelNavigated = true;
        }
      },
      { passive: false }
    );
  }

  function openLightbox(index) {
    if (!lightbox) createLightbox();
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightbox.classList.add("is-active");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
  }

  function onKey(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  }

  cells.forEach(function (cell, i) {
    cell.addEventListener("click", function () {
      if (!didDrag) openLightbox(i);
    });
  });
})();
