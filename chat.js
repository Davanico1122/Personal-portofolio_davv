  const token = "7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M"; // Ganti dengan token kamu
  const chat_id = "6139440643"; // Ganti dengan chat_id kamu

  function toggleChat() {
    const chatBox = document.getElementById("chatBox");
    const isVisible = chatBox.style.display === "block";
    chatBox.style.display = isVisible ? "none" : "block";
  }

  function sendMessage(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Lengkapi semua kolom!',
        confirmButtonColor: '#1db954'
      });
      return;
    }

    const text = ` *Pesan Baru dari Web*\n\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: "Markdown",
      }),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Terkirim!',
            text: 'Pesan berhasil dikirim!',
            confirmButtonColor: '#1db954'
          });
          event.target.reset();
          toggleChat();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Pesan gagal dikirim.',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal menghubungi server Telegram.',
        });
      });
  }
