"use strict";

// Preloader fade out
const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  loader.classList.add("loader-hidden");
});
