// Elemen
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');

// Toggle buka/tutup chat
chatToggle.addEventListener('click', () => {
  chatWindow.classList.add('active');
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('active');
});

// Kirim ke Telegram (edit dengan token & chat_id kamu)
chatForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('chatName').value;
  const email = document.getElementById('chatEmail').value;
  const message = document.getElementById('chatMessage').value;

  const telegramToken = 'YOUR_BOT_TOKEN';
  const chatID = 'YOUR_CHAT_ID';
  const text = ` Pesan Baru:\n\n Nama: ${name}\n Email: ${email}\n Pesan:\n${message}`;

  fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatID,
      text: text
    })
  }).then(response => {
    if (response.ok) {
      alert('Pesan berhasil dikirim!');
      chatForm.reset();
      chatWindow.classList.remove('active');
    } else {
      alert('Gagal mengirim pesan.');
    }
  });
});
