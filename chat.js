document.getElementById("openChatBtn").addEventListener("click", () => {
  document.getElementById("chatWindow").classList.add("active");
});

document.getElementById("closeChatBtn").addEventListener("click", () => {
  document.getElementById("chatWindow").classList.remove("active");
});

document.getElementById("sendChatBtn").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();
  if (msg) {
    const messageBox = document.createElement("p");
    messageBox.textContent = msg;
    messageBox.style.background = "#1db954";
    messageBox.style.padding = "8px 12px";
    messageBox.style.borderRadius = "8px";
    messageBox.style.maxWidth = "80%";
    messageBox.style.alignSelf = "flex-end";
    messageBox.style.marginBottom = "8px";
    messageBox.style.color = "#fff";

    const container = document.getElementById("chatMessages");
    container.appendChild(messageBox);
    container.scrollTop = container.scrollHeight;

    input.value = "";
  }
}
