  const token = "7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M";
  const chat_id = "6139440643";

  const chatBox = document.getElementById("chatBox");

  function toggleChat() {
    chatBox.classList.toggle("active");
  }

  function sendMessage(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      Swal.fire("Lengkapi Form", "Semua kolom wajib diisi!", "warning");
      return;
    }

    const text = ` *Pesan Baru dari Website*\n\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: "Markdown",
      }),
    })
    .then((res) => {
      if (res.ok) {
        Swal.fire("Terkirim!", "Pesan berhasil dikirim!", "success");
        e.target.reset();
        chatBox.classList.remove("active");
      } else {
        Swal.fire("Gagal", "Tidak bisa mengirim pesan", "error");
      }
    })
    .catch(() => {
      Swal.fire("Gagal", "Cek koneksi atau bot API!", "error");
    });
  }
