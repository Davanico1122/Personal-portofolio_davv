// Toggle chat window
document.getElementById('chatToggle').onclick = () => {
  document.getElementById('chatWindow').style.display = 'flex';
};

document.getElementById('closeChat').onclick = () => {
  document.getElementById('chatWindow').style.display = 'none';
};

// Kirim pesan ke Telegram
function sendMessage() {
  const name = document.getElementById('chatName').value.trim();
  const email = document.getElementById('chatEmail').value.trim();
  const message = document.getElementById('chatMessage').value.trim();
  const status = document.getElementById('chatStatus');

  if (!name || !message) {
    status.innerText = " Nama dan pesan wajib diisi.";
    return;
  }

  const text = ` Pesan Baru dari Website:\n Nama: ${name}\n Email: ${email || 'Tidak diisi'}\n Pesan:\n${message}`;

  const token = '7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M';
  const chatId = '6139440643';

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        status.innerText = " Pesan terkirim!";
        document.getElementById('chatName').value = '';
        document.getElementById('chatEmail').value = '';
        document.getElementById('chatMessage').value = '';
      } else {
        status.innerText = " Gagal mengirim pesan.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      status.innerText = " Gagal terkoneksi.";
    });
}
