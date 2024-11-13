// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Überprüfen, ob der Benutzer bereits eine Dark Mode Präferenz hat
if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
}

// Event Listener für den Toggle Button
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Dark Mode Einstellung speichern
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
});
