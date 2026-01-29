import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>채팅</h1>
  <div id="messages"></div>
  <span id="name">이름</span>
  <input type="text" id="messageInput" placeholder="메시지를 입력하세요">
  <button>보내기</button>
`;

const ws = new WebSocket("ws://localhost:8080");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const button = document.querySelector("button");
const nameSpan = document.getElementById("name");

const userName = Math.random().toString(36).substring(2, 10);
nameSpan.textContent = `${userName}`;

// WebSocket 연결 성공
ws.onopen = () => {
  console.log("WebSocket 연결 성공");
  addMessage("시스템: 서버에 연결되었습니다.", "system");
};

// 서버로부터 메시지 수신
ws.onmessage = async (event) => {
  if (event.data instanceof Blob) {
    const buffer = await event.data.arrayBuffer();
    const decompressionStream = new DecompressionStream("gzip");
    const decompressedStream = new Blob([buffer])
      .stream()
      .pipeThrough(decompressionStream);

    const decompressedData = await new Response(decompressedStream).text();
    const { name, message, type } = JSON.parse(decompressedData);

    if (userName !== name) {
      addMessage(`${name}: ${message}`, type);
    } else {
      addMessage(`나: ${message}`, type);
    }
  }
};

// WebSocket 연결 종료
ws.onclose = () => {
  console.log("WebSocket 연결 종료");
  addMessage("시스템: 서버와의 연결이 끊어졌습니다.", "system");
};

// WebSocket 에러
ws.onerror = (error) => {
  console.error("WebSocket 에러:", error);
  addMessage("시스템: 연결 오류가 발생했습니다.", "system");
};

// 메시지 전송 함수
async function sendMessage() {
  const message = messageInput.value.trim();

  if (message && ws.readyState === WebSocket.OPEN) {
    const jsonString = JSON.stringify({
      type: "message",
      name: userName,
      message: message,
    });

    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(jsonString).buffer;
    const compressionStream = new CompressionStream("gzip");
    const compressedStream = new Blob([dataBuffer])
      .stream()
      .pipeThrough(compressionStream);

    const compressedData = await new Response(compressedStream).arrayBuffer();

    ws.send(compressedData);
    messageInput.value = "";
  }
}

// 메시지를 화면에 추가하는 함수
function addMessage(text, type) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${type}`;
  messageElement.textContent = text;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 버튼 클릭 이벤트
button.addEventListener("click", sendMessage);

// Enter 키로 메시지 전송
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
