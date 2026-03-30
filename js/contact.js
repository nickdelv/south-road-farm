const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxKeE-Atv4v1tFV__MsKn5AxYBF1QdHPhs1xXFMQbTwENMEqRw2YazRvrwogLqIzho/exec";

const form = document.getElementById("inquire-form");
const formWrap = document.getElementById("form-wrap");
const thankYou = document.getElementById("thank-you");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Honeypot
  if (form.website.value) return;

  const btn = form.querySelector("button[type='submit']");
  btn.textContent = "Sending\u2026";
  btn.disabled = true;

  const params = new URLSearchParams({
    name: form.name.value,
    email: form.email.value,
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
