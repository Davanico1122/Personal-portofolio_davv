const TOKEN = '7647510633:AAHSWSstRQj3bZAmOJGFUGbqVe1gMb7Vq3M';
const CHAT_ID = '6139440643';

function toggleContactForm() {
  const wrapper = document.getElementById("contactWrapper");
  const btn = document.getElementById("toggleContactBtn");
  wrapper.classList.toggle("active");
  btn.innerText = wrapper.classList.contains("active") ? "Hide Contact" : "Show Contact";
}

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const fullMessage = ` Pesan Baru:\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`;

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: fullMessage,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you.',
          timer: 3000,
          showConfirmButton: false
        });
        contactForm.reset();
      } else {
        throw new Error("Faild To Send");
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Fail!',
        text: 'an error occurrend while sending the message.',
      });
      console.error(err);
    });
});

