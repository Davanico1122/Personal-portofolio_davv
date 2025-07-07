const toggleContact = document.getElementById("toggleContact");
const contactPanel = document.getElementById("contactPanel");
const closeContact = document.getElementById("closeContact");
const contactForm = document.getElementById("contactForm");

// Ganti dengan milikmu
const TOKEN = "7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M";
const CHAT_ID = "6139440643";

toggleContact.addEventListener("click", () => {
  contactPanel.classList.add("active");
  toggleContact.style.display = "none";
});

closeContact.addEventListener("click", () => {
  contactPanel.classList.remove("active");
  toggleContact.style.display = "block";
});

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = contactForm.name.value;
  const email = contactForm.email.value;
  const message = contactForm.message.value;

  const fullMessage = ` *Pesan Baru dari Portfolio*\n\n Nama: ${name}\n Email: ${email}\n Pesan:\n${message}`;

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: fullMessage,
      parse_mode: "Markdown"
    }),
  })
    .then(() => {
      alert("Pesan berhasil dikirim!");
      contactForm.reset();
      contactPanel.classList.remove("active");
      toggleContact.style.display = "block";
    })
    .catch(() => alert("Gagal mengirim pesan."));
});
