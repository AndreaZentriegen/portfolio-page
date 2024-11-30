document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar ul li a");

  // Menusteuerung
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

    const wordsToActivate = ["ES", "ISCH"]; // Standardwörter

    // Minuten auf Deutsch
    if (timeIndex === 1) wordsToActivate.push("FÜNF", "NACH");
    else if (timeIndex === 2) wordsToActivate.push("ZEHN", "NACH");
    else if (timeIndex === 3) wordsToActivate.push("VIERTEL", "NACH");
    else if (timeIndex === 4) wordsToActivate.push("ZWENZIG", "NACH");
    else if (timeIndex === 5) wordsToActivate.push("FÜNF", "VOR", "HALB");
    else if (timeIndex === 6) wordsToActivate.push("HALB");
    else if (timeIndex === 7) wordsToActivate.push("FÜNFI", "NACH", "HALBI");
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

// EmailJS initialisieren mit deinem Public Key
emailjs.init("0A15qdrJoaenrcyDq");

// Event Listener für das Kontaktformular
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Verhindert das automatische Neuladen der Seite

    // Daten aus den Eingabefeldern abrufen
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const name = firstname + " " + lastname; // Vorname und Nachname kombinieren
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // EmailJS send-Aufruf
    emailjs
      .send("service_r4jrfm5", "template_i6twxso", {
        from_name: name,
        from_email: email,
        message: message,
      })
      .then(() => {
        // Erfolgsmeldung anzeigen
        const responseMessage = document.createElement("p");
        responseMessage.textContent = "Message sent successfully!";
        responseMessage.style.color = "green";
        responseMessage.id = "response-message"; // ID für zukünftige Manipulationen
        document.getElementById("contact-form").appendChild(responseMessage);
        document.getElementById("contact-form").reset(); // Formular zurücksetzen
      })
      .catch((error) => {
        // Fehlermeldung anzeigen
        const responseMessage = document.createElement("p");
        responseMessage.textContent =
          "Failed to send message. Please try again.";
        responseMessage.style.color = "red";
        responseMessage.id = "response-message"; // ID für zukünftige Manipulationen
        document.getElementById("contact-form").appendChild(responseMessage);
        console.error("EmailJS error:", error);
      });
  });
