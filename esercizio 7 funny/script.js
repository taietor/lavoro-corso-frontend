document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const nightModeToggle = document.querySelector(".night-mode-toggle");

  nightModeToggle.addEventListener("click", function () {
    body.classList.toggle("night-mode");
  });
});
