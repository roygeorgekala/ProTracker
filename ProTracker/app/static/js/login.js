const sign_in_btn = document.querySelector("#sign-in-btn");
const about_us_btn = document.querySelector("#about-us-btn");
const container = document.querySelector(".container");

about_us_btn.addEventListener("click", () => {
  container.classList.add("about-us-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("about-us-mode");
});