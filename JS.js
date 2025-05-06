
async function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  if (!msg.trim()) return;
  
  const lang = document.getElementById("langSelect").value;
  const chatbox = document.getElementById("chatbox");

  // Add user message
  const userDiv = document.createElement("div");
  userDiv.className = "message user-message";
  userDiv.textContent = msg;
  chatbox.appendChild(userDiv);

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, lang: lang })
  });

  const data = await response.json();
  
  // Add bot message with language info
  const botDiv = document.createElement("div");
  botDiv.className = "message bot-message";
  botDiv.innerHTML = `<span class="lang-indicator">[${data.language}]</span> ${data.response}`;
  chatbox.appendChild(botDiv);

  // Clear input and scroll to bottom
  document.getElementById("messageInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}
