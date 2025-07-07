  const chatForm = document.getElementById('chatForm');
  const toggleChat = () => {
    chatForm.classList.toggle('active');
  };

  async function sendMessage(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = ` Pesan Baru:\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}`;

    const token = 'TOKEN_BOT_MU'; // Ganti dengan token bot
    const chatId = 'CHAT_ID_KAMU'; // Ganti dengan chat_id kamu

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });
      alert('Pesan berhasil dikirim!');
      event.target.reset();
      toggleChat();
    } catch (error) {
      alert('Gagal mengirim pesan.');
    }
  }

