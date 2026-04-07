// Property carousel — single image today, multi-image ready
document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
  const track = carousel.querySelector(".prop-carousel-track");
  const imgs = track.querySelectorAll("img");
  const dotsWrap = carousel.querySelector(".prop-carousel-dots");
  const next = carousel.querySelector(".prop-carousel-next");

  if (imgs.length <= 1) {
    next.style.display = "none";
    dotsWrap.style.display = "none";
    return;
  }

  let current = 0;

  imgs.forEach(function (_, i) {
    const dot = document.createElement("button");
    dot.className = "prop-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to image " + (i + 1));
    dot.addEventListener("click", function () {
      goTo(i);
    });
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    current = (n + imgs.length) % imgs.length;
    track.style.transform = "translateX(-" + current * 100 + "%)";
    dotsWrap.querySelectorAll(".prop-dot").forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
  }

  next.addEventListener("click", function () {
    goTo(current + 1);
  });

  var touchStartX = 0;
  carousel.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  carousel.addEventListener(
    "touchend",
    function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    },
    { passive: true }
  );
});
