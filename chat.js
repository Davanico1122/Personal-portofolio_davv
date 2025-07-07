
const toggle = document.getElementById('contactToggle');
const panel = document.getElementById('contactPanel');
const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

toggle.addEventListener('click', () => {
  panel.classList.toggle('active');
});

// Ganti token dan chat_id di sini
const BOT_TOKEN = '7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M';
const CHAT_ID = '6139440643';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) return;

  const text = ` *Pesan Baru dari Portofolio*\n\n Nama: ${name}\n Email: ${email}\n Pesan:\n${message}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'Markdown'
    })
  })
    .then(res => res.json())
    .then(data => {
      statusMessage.textContent = ' Pesan terkirim!';
      form.reset();
    })
    .catch(err => {
      statusMessage.textContent = ' Gagal mengirim pesan.';
    });
});
