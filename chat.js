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

fetch("https://dvv12.vercel.app/api/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Pesan Terkirim!",
          text: "Terima kasih sudah menghubungi.",
          timer: 3000,
          showConfirmButton: false,
        });
        contactForm.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: data.error || "Pesan tidak terkirim.",
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Terjadi kesalahan saat mengirim.",
      });
      console.error(err);
    });
});
