const toggleBtn = document.getElementById('toggleContactBtn');
const contactCard = document.getElementById('contactCard');

let isOpen = false;

toggleBtn.addEventListener('click', () => {
  isOpen = !isOpen;
  contactCard.classList.toggle('hidden', !isOpen);
  contactCard.classList.toggle('show', isOpen);
  toggleBtn.textContent = isOpen ? 'Hide Contact ' : 'Show Contact ';
});

// Telegram Submit
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const token = 'ISI_TOKEN_BOT_MU';
  const chatId = 'ISI_CHAT_ID_MU';
  const text = ` Pesan Baru:%0A Nama: ${name}%0A Email: ${email}%0A Pesan: ${message}`;

  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
    .then(res => {
      alert("Pesan berhasil dikirim!");
      contactCard.classList.remove('show');
      contactCard.classList.add('hidden');
      toggleBtn.textContent = 'Show Contact ';
      isOpen = false;
      document.getElementById('contactForm').reset();
    })
    .catch(() => {
      alert("Gagal mengirim pesan.");
    });
});
