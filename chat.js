// contact.js
const TOKEN = '7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M';
const CHAT_ID = '6139440643';

function toggleContactForm() {
  document.getElementById("contactWrapper").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Harap isi semua kolom.");
      return;
    }

    const fullMessage = ` Pesan Baru:\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}`;

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: fullMessage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(" Pesan berhasil dikirim!");
        contactForm.reset();
      })
      .catch((err) => {
        alert(" Gagal mengirim pesan.");
        console.error(err);
      });
  });
});
