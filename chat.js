// Ambil elemen
const chatWindow = document.getElementById('chatWindow');
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');

// Toggle buka chat
chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('active');
});

// Tutup chat
chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('active');
});

// Kirim ke Telegram
chatForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('chatName').value.trim();
  const email = document.getElementById('chatEmail').value.trim();
  const message = document.getElementById('chatMessage').value.trim();

  if (!name || !email || !message) {
    alert('Isi semua kolom dulu ya!');
    return;
  }

  //  Ganti ini dengan milikmu
  const telegramToken = '7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M';
  const chatID = '6139440643'; // Ganti dengan chat ID kamu
  const text = ` Pesan Baru:\n\n Nama: ${name}\n Email: ${email}\n Pesan:\n${message}`;

  // Kirim request ke Telegram
  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatID,
      text: text,
      parse_mode: 'HTML'
    })
  })
  .then(response => {
    if (response.ok) {
      alert(' Pesan berhasil dikirim!');
      chatForm.reset();
      chatWindow.classList.remove('active');
    } else {
      alert(' Gagal mengirim pesan.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Terjadi kesalahan saat mengirim.');
  });
});
