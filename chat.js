// Toggle dan jendela
const toggleBtn = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeBtn = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');

// Tampilkan/Sembunyikan jendela chat
toggleBtn.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

closeBtn.addEventListener('click', () => {
  chatWindow.style.display = 'none';
});

// Telegram API
const BOT_TOKEN = "7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M";
const CHAT_ID = 6139440643;

chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = chatForm.name.value.trim();
  const email = chatForm.email.value.trim();
  const message = chatForm.message.value.trim();

  if (!name || !email || !message) {
    alert("Isi semua kolom sebelum mengirim.");
    return;
  }

  const text = ` *Pesan Baru dari Website*\n\n *Nama:* ${name}\n *Email:* ${email}\n *Pesan:*\n${message}`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: 'Markdown'
    })
  })
  .then(res => {
    if (res.ok) {
      alert(" Pesan berhasil dikirim!");
      chatForm.reset();
      chatWindow.style.display = 'none';
    } else {
      alert(" Gagal mengirim pesan. Coba lagi.");
    }
  })
  .catch(err => {
    console.error("Telegram API error:", err);
    alert(" Terjadi kesalahan.");
  });
});
