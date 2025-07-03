document.addEventListener("DOMContentLoaded", () => {
  const chatbotWindow = document.getElementById("chatbot-window");
  const toggleBtn = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("close-btn");
  const sendBtn = document.getElementById("send-btn");
  const messageInput = document.getElementById("message-input");
  const chatMessages = document.getElementById("chat-messages");
  const languageSelect = document.getElementById("language-selector");
  const typingIndicator = document.getElementById("typing-indicator");
  const badge = document.getElementById("notification-badge");

  // Tampilkan chatbot
  toggleBtn.addEventListener("click", () => {
    chatbotWindow.classList.add("active");
    if (badge) badge.style.display = "none";
  });

  // Tutup chatbot
  closeBtn.addEventListener("click", () => {
    chatbotWindow.classList.remove("active");
  });

  // Kirim pesan saat klik tombol
  sendBtn.addEventListener("click", sendMessage);

  // Kirim pesan saat tekan Enter
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  // Ganti bahasa
  languageSelect.addEventListener("change", () => {
    chatMessages.innerHTML = "";
    const greeting =
      languageSelect.value === "id"
        ? "Halo! Saya AI Assistant. Ada yang bisa saya bantu? 😊"
        : "Hello! I'm your AI Assistant. How can I help you? 😊";
    appendMessage(greeting, "bot");
  });

  function sendMessage() {
    const msg = messageInput.value.trim();
    if (!msg) return;

    appendMessage(msg, "user");
    messageInput.value = "";

    showTyping();

    setTimeout(() => {
      hideTyping();
      const lang = languageSelect.value;
      let response = "";

      try {
        response = lang === "id"
          ? getBotResponseID(msg)
          : getBotResponseEN(msg);
      } catch (err) {
        response = "⚠️ Bot error. Cek file respon.";
        console.error("Bot error:", err);
      }

      appendMessage(response, "bot");
    }, 600);
  }

  function appendMessage(text, sender) {
    const messageEl = document.createElement("div");
    messageEl.className = `message ${sender}-message`;
    messageEl.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-${sender === "bot" ? "robot" : "user"}"></i>
      </div>
      <div class="message-content"><p></p></div>
    `;
    const p = messageEl.querySelector("p");
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Efek ketik jika dari bot
    if (sender === "bot") {
      let i = 0;
      const typing = setInterval(() => {
        if (i < text.length) {
          p.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typing);
        }
      }, 20);
    } else {
      p.textContent = text;
    }
  }

  function showTyping() {
    typingIndicator.classList.add("active");
  }

  function hideTyping() {
    typingIndicator.classList.remove("active");
  }
});
