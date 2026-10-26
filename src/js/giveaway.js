/* ===================================================
   GIVEAWAY PAGE
   Countdown timer, form submission, rules accordion.
   =================================================== */

// ---------- DAYS UNTIL WEDDING ----------
(function () {
  var weddingDate = new Date("2026-11-27T05:00:00Z"); // Nov 27 midnight EST
  var el = document.getElementById("gw-wedding-days");
  if (!el) return;
  var now = new Date();
  var diff = weddingDate - now;
  var days = Math.max(0, Math.ceil(diff / 86400000));
  el.textContent = days;
})();

// ---------- COUNTDOWN TIMER ----------
(function () {
  // Entry deadline: Nov 2, 2026 at 11:59:59 PM ET
  // Daylight saving ends Nov 1, 2026 — Nov 2 is EST (UTC-5)
  // Nov 2 23:59:59 EST = Nov 3 04:59:59 UTC
  var DEADLINE = new Date("2026-11-03T04:59:59Z");

  var daysEl = document.getElementById("gw-days");
  var hoursEl = document.getElementById("gw-hours");
  var minutesEl = document.getElementById("gw-minutes");
  var secondsEl = document.getElementById("gw-seconds");
  var countdownEl = document.getElementById("gw-countdown");
  var formSection = document.getElementById("gw-form-section");
  var closedMsg = document.getElementById("gw-closed");

  if (!daysEl) return;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick() {
    var now = new Date();
    var diff = DEADLINE - now;

    if (diff <= 0) {
      if (countdownEl) countdownEl.style.display = "none";
      if (formSection) formSection.style.display = "none";
      if (closedMsg) closedMsg.style.display = "block";
      return;
    }

    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000) / 60000);
    var seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

    setTimeout(tick, 1000);
  }

  tick();
})();

// ---------- FORM SUBMISSION ----------
(function () {
  var APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby9N0dBoW3Tq0Mb5sq2akwrKcNur6AFBw1UOBQxTmG3GqJMIW_L61Ll0LBpSVL9KrTR/exec";

  var form = document.getElementById("gw-form");
  var formWrap = document.getElementById("gw-form-wrap");
  var thankYou = document.getElementById("gw-thank-you");

  if (!form) return;

  // Prevent Enter key from submitting on select fields
  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName === "SELECT") {
      e.preventDefault();
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Honeypot check
    if (form.website.value) return;

    var btn = form.querySelector("button[type='submit']");
    btn.textContent = "Sending\u2026";
    btn.disabled = true;

    var params = new URLSearchParams({
      type: "giveaway",
      partner1_first: form.partner1_first.value,
      partner1_last: form.partner1_last.value,
      partner2_first: form.partner2_first.value,
      partner2_last: form.partner2_last.value,
      email: form.email.value,
      phone: form.phone.value,
      location: form.location.value,
      social_handle: form.social_handle.value,
      story: form.story.value,
      guest_count: form.guest_count.value,
      weekend_preference: form.weekend_preference.value,
    });

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
    } catch (err) {
      // Apps Script returns a CORS error even on success — show thank-you anyway
    }

    formWrap.classList.add("fading");
    setTimeout(function () {
      formWrap.style.display = "none";
      thankYou.style.display = "block";
      document
        .getElementById("gw-form-section")
        .scrollIntoView({ behavior: "smooth" });
      requestAnimationFrame(function () {
        thankYou.classList.add("visible");
      });
    }, 400);
  });
})();

// ---------- RULES ACCORDION ----------
(function () {
  var toggle = document.querySelector(".gw-rules-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var item = toggle.closest(".gw-rules-item");
    var content = item.querySelector(".gw-rules-content");
    var isOpen = item.classList.contains("open");

    if (isOpen) {
      item.classList.remove("open");
      content.style.maxHeight = null;
      toggle.setAttribute("aria-expanded", "false");
    } else {
      item.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";
      toggle.setAttribute("aria-expanded", "true");
    }
  });
})();
