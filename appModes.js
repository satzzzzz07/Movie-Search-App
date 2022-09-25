"use strict";

// Dark Mode and Light mode switch
// DARK

function darkMode() {
  document.body.style.backgroundColor = "#121212";
  document.getElementById("light-mode").classList.remove("hidden");
  document.getElementById("night-mode").classList.add("hidden");
  document.getElementById("search").style.backgroundColor = "#2E2E2F";
  document.getElementById("search").style.color = "#fff";
  document.getElementById("submit").style.backgroundColor = "#4B4B4B";
  document.getElementById("submit").style.color = "#fff";
  document.getElementById("main-cards").style.color = "#fff";
  document.body.style.color = "#fff";
  document.getElementById("wat-h5").style.color = "#fff";
  document.getElementById("white-wat").classList.remove("hidden");
  document.getElementById("black-wat").classList.add("hidden");
}

function lightMode() {
  document.body.style.backgroundColor = "#ffffff";
  document.getElementById("night-mode").classList.remove("hidden");
  document.getElementById("light-mode").classList.add("hidden");
  document.getElementById("search").style.backgroundColor = "#FFFFFF";
  document.getElementById("search").style.color = "#374151";
  document.getElementById("submit").style.backgroundColor = "#F9FAFB";
  document.getElementById("submit").style.color = "#374151";
  document.getElementById("main-cards").style.color = "#111827";
  document.body.style.color = "##111827";
  document.getElementById("wat-h5").style.color = "#111827";
  document.getElementById("white-wat").classList.add("hidden");
  document.getElementById("black-wat").classList.remove("hidden");
}

if (localStorage.getItem("lightMode") === null) {
  localStorage.setItem("lightMode", "false");
} else if (localStorage.getItem("lightMode") === "true") {
  lightMode();
} else if (localStorage.getItem("lightMode") === "false") {
  darkMode();
}

function setModes() {
  if (localStorage.getItem("lightMode") === "false") {
    lightMode();
    localStorage.setItem("lightMode", "true");
  } else if (localStorage.getItem("lightMode") === "true") {
    darkMode();
    localStorage.setItem("lightMode", "false");
  }
}

// ================================================================= //
