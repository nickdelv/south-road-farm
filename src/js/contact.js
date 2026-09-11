const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby9N0dBoW3Tq0Mb5sq2akwrKcNur6AFBw1UOBQxTmG3GqJMIW_L61Ll0LBpSVL9KrTR/exec";

const form = document.getElementById("inquire-form");
const formWrap = document.getElementById("form-wrap");
const thankYou = document.getElementById("thank-you");

form.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.tagName === "SELECT") {
    e.preventDefault();
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Honeypot
  if (form.website.value) return;

  const btn = form.querySelector("button[type='submit']");
  btn.textContent = "Sending\u2026";
  btn.disabled = true;

  const params = new URLSearchParams({
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    email: form.email.value,
    phone: form.phone.value,
    wedding_date: form.wedding_date.value,
    guest_count: form.guest_count.value,
    referral: form.referral.value,
    message: form.message.value,
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
  setTimeout(() => {
    formWrap.style.display = "none";
    thankYou.style.display = "block";
    requestAnimationFrame(() => thankYou.classList.add("visible"));
  }, 400);
});
