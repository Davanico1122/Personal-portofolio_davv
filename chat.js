  const token = "7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M"; // Ganti token sesuai milikmu
  const chat_id = "6139440643"; // Ganti dengan chat_id kamu

  function toggleChat() {
    const formBox = document.getElementById("chatFormBox");
    formBox.classList.toggle("active");
  }

  function sendMessage(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      Swal.fire("Lengkapi Form", "Semua kolom wajib diisi.", "warning");
      return;
    }

    const text = ` *Pesan Baru dari Website*\n\n Nama: ${name}\n Email: ${email}\n Pesan:\n${message}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: "Markdown"
      })
    })
    .then(response => {
      if (response.ok) {
        Swal.fire("Terkirim!", "Pesan berhasil dikirim ke Telegram!", "success");
        e.target.reset();
        toggleChat();
      } else {
        Swal.fire("Gagal", "Terjadi kesalahan saat mengirim.", "error");
      }
    })
    .catch(() => {
      Swal.fire("Error", "Cek koneksi atau token bot.", "error");
    });
  }

