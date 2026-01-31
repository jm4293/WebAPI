import "./style.css";

// --- HTML 렌더링 ---
document.querySelector("#app").innerHTML = /*html*/ `
  <h1>Broadcast Channel API</h1>
  <div class="input-layout">
    <div>
      <label>이름</label>
      <input type="text" id="senderName" placeholder="발신자 이름을 입력하세요.">
    </div>
    <div>
      <input type="text" id="messageInput" placeholder="메시지를 입력하세요.">
      <button id="sendMessageBtn">메시지 전송</button>
    </div>
  </div>
  <h2>수신 메시지:</h2>
  <div id="messages"></div>
`;

const senderNameInput = document.getElementById("senderName");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messagesDiv = document.getElementById("messages");

// --- BroadcastChannel 설정 ---
const channel = new BroadcastChannel("chat");

// --- 메시지 전송 ---
sendMessageBtn.onclick = () => {
  const name = senderNameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) return;

  const payload = {
    sender: name,
    text: message,
    time: new Date().toLocaleTimeString(),
  };

  // 자기 자신에게도 표시
  renderMessage(payload, true);

  // 다른 탭에 전송
  channel.postMessage(payload);

  // 입력란만 초기화 (이름은 유지)
  messageInput.value = "";
};

// --- 다른 탭에서 메시지 수신 ---
channel.onmessage = (event) => {
  renderMessage(event.data, false);
};

// --- 메시지 렌더링 ---
function renderMessage({ sender, text, time }, isSelf) {
  const div = document.createElement("div");
  div.className = "message" + (isSelf ? " self" : "");
  div.innerHTML = `
    <span class="meta">${sender} · ${time}</span>
    <p>${text}</p>
  `;
  messagesDiv.appendChild(div);
}
