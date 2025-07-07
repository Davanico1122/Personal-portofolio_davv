<script>
  function toggleContact() {
    const wrapper = document.getElementById('contactWrapper');
    wrapper.classList.toggle('active');
  }

  // Telegram Config
  const BOT_TOKEN = 'ISI_TOKEN_MU';
  const CHAT_ID = 'ISI_CHAT_ID_MU';

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const text = ` Pesan Baru dari Website:\n\n Nama: ${name}\n Email: ${email}\n Pesan:\n${message}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      })
    }).then(response => {
      if (response.ok) {
        alert(" Pesan berhasil dikirim!");
        document.getElementById('contactForm').reset();
        toggleContact();
      } else {
        alert(" Gagal mengirim pesan.");
      }
    });
  });
</script>
