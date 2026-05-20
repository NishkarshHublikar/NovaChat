const input = document.getElementById("message");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {

  const message = input.value.trim();

  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  chatBox.innerHTML += `
    <div class="message user">
      ${message}
    </div>
  `;

  input.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;

  const loadingDiv = document.createElement("div");

  loadingDiv.className = "message bot";

  loadingDiv.innerText = "Typing...";

  chatBox.appendChild(loadingDiv);

  const response = await fetch("/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message,
    }),
  });

  const data = await response.json();

  console.log(data);
  loadingDiv.remove();

  chatBox.innerHTML += `
    <div class="message bot">
      ${marked.parse(data.reply)}
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;
}
window.addEventListener("DOMContentLoaded", () => {

  const newChatBtn =
    document.querySelector(".new-chat");

  const chatBox =
    document.getElementById("chat-box");

  newChatBtn.addEventListener("click", () => {

    chatBox.innerHTML = "";

  });

});