<script>
  const chatForm = document.getElementById('chatForm');
  const toggleChat = () => {
    chatForm.classList.toggle('active');
  };

  async function sendMessage(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert("Mohon lengkapi semua kolom!");
      return;
    }

    const text = `📩 *Pesan Baru dari Portofolio*\n👤 Nama: ${name}\n📧 Email: ${email}\n💬 Pesan:\n${message}`;

    const token = "7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M";  // ✅ TOKEN BOT kamu
    const chatId = "6139440643"; // ✅ Chat ID Telegram kamu

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "Markdown"
        }),
      });

      const result = await response.json();
      if (result.ok) {
        alert("✅ Pesan berhasil dikirim!");
        event.target.reset();
        toggleChat();
      } else {
        alert("❌ Gagal mengirim pesan. Coba lagi nanti.");
        console.error(result);
      }
    } catch (error) {
      alert("❌ Error koneksi ke Telegram.");
      console.error("Telegram Error:", error);
    }
  }
</script>
