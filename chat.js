const contactToggle = document.getElementById('contactToggle');
const contactPanel = document.getElementById('contactFormPanel');
const closeContact = document.getElementById('closeContact');

contactToggle.addEventListener('click', () => {
  contactPanel.classList.add('active');
});

closeContact.addEventListener('click', () => {
  contactPanel.classList.remove('active');
});

// Kirim ke Telegram
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const text = `Pesan Baru dari Website:%0A Nama: ${name}%0A Email: ${email}%0A Pesan: ${message}`;
  const token = 'ISI_TOKEN_BOT_KAMU';
  const chatId = 'ISI_CHAT_ID_KAMU';

  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`, {
    method: 'GET'
  })
    .then(res => {
      alert("Pesan berhasil dikirim!");
      contactPanel.classList.remove('active');
      document.getElementById('contactForm').reset();
    })
    .catch(err => {
      alert("Gagal mengirim pesan.");
    });
});
