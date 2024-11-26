document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar ul li a");

  // Menüsteuerung
  hamburger?.addEventListener("click", () => {
    navbar?.classList.toggle("nav-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar?.classList.remove("nav-open");
    });
  });

  // Funktion zur Wort-Uhr
  function getWordClock() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours > 12) hours -= 12; // 12-Stunden-Format
    const timeIndex = Math.floor(minutes / 5); // Abrunden auf 5-Minuten-Schritte

    const wordsToActivate = ["ES", "IST"]; // Standardwörter

    // Minuten auf Deutsch
    if (timeIndex === 1) wordsToActivate.push("FÜNF", "NACH");
    else if (timeIndex === 2) wordsToActivate.push("ZEHN", "NACH");
    else if (timeIndex === 3) wordsToActivate.push("VIERTEL", "NACH");
    else if (timeIndex === 4) wordsToActivate.push("ZWANZIG", "NACH");
    else if (timeIndex === 5) wordsToActivate.push("FÜNF", "VOR", "HALB");
    else if (timeIndex === 6) wordsToActivate.push("HALB");
    else if (timeIndex === 7) wordsToActivate.push("FÜNF", "NACH", "HALB");
    else if (timeIndex === 8) wordsToActivate.push("ZWANZIG", "VOR");
    else if (timeIndex === 9) wordsToActivate.push("VIERTEL", "VOR");
    else if (timeIndex === 10) wordsToActivate.push("ZEHN", "VOR");
    else if (timeIndex === 11) wordsToActivate.push("FÜNF", "VOR");

    // Stunden auf Deutsch
    if (timeIndex >= 6) hours += 1; // Wenn es nach "HALB" ist, die nächste Stunde
    const hoursWords = [
      "ZWÖLF UHR",
      "EIN UHR",
      "ZWEI UHR",
      "DREI UHR",
      "VIER UHR",
      "FÜNF UHR",
      "SECHS UHR",
      "SIEBEN UHR",
      "ACHT UHR",
      "NEUN UHR",
      "ZEHN UHR",
      "ELF UHR",
    ];
    wordsToActivate.push(hoursWords[hours % 12]);

    return wordsToActivate;
  }

  function updateClock() {
    const words = document.querySelectorAll(".word");
    const activeWords = getWordClock();

    // Alle Wörter deaktivieren
    words.forEach((word) => word.classList.remove("active"));

    // Aktive Wörter hervorheben
    activeWords.forEach((activeWord) => {
      const element = document.querySelector(`[data-word="${activeWord}"]`);
      if (element) element.classList.add("active");
    });
  }

  // Initiales Update und regelmäßige Aktualisierung
  updateClock();
  setInterval(updateClock, 60000);
});
