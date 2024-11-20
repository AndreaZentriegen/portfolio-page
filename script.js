document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar ul li a");

  // Öffnen/Schließen des Menüs
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("nav-open");
  });

  // Schließen des Menüs nach einem Klick auf einen Link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("nav-open");
    });
  });
});
