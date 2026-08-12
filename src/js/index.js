// Mosaic gallery — arrow navigation + drag-to-scroll
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

  scroll.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.pageX;
    scrollStart = scroll.scrollLeft;
    scroll.classList.add("is-dragging");
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var dx = e.pageX - startX;
    scroll.scrollLeft = scrollStart - dx;
  });

  window.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;
    scroll.classList.remove("is-dragging");
  });

  // Prevent click events on images after dragging
  scroll.addEventListener("click", function (e) {
    if (Math.abs(scroll.scrollLeft - scrollStart) > 5) {
      e.preventDefault();
    }
  });
})();
