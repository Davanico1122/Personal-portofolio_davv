const toggleBtn = document.getElementById("openChatBtn");
const chatWindow = document.getElementById("chatWindow");
const closeBtn = document.getElementById("closeChatBtn");
const sendBtn = document.getElementById("sendChatBtn");
const chatInput = document.getElementById("chatMessage");
const chatBody = document.querySelector(".chat-body");

// Toggle buka chat
toggleBtn.addEventListener("click", () => {
  chatWindow.classList.add("active");
  toggleBtn.style.bottom = "440px"; // naikkan tombol agar tidak ketutup
});

// Tutup chat
closeBtn.addEventListener("click", () => {
  chatWindow.classList.remove("active");
  toggleBtn.style.bottom = "20px"; // kembalikan ke posisi bawah
});

// Kirim pesan dummy
sendBtn.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message !== "") {
    const newMsg = document.createElement("div");
    newMsg.textContent = " Kamu: " + message;
    chatBody.appendChild(newMsg);
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});
