document.querySelector("#app2").innerHTML = /*html*/ `
  <h1>새 탭</h1>
  <p>수신된 메시지: <span id="receivedMessage"></span></p>
  <input id="messageInput" type="text" placeholder="메인 탭으로 메시지 보내기" />
  <button id="btnSendMessage">보내기</button>
`;

const messageInput = document.getElementById("messageInput");
const btnSendMessage = document.getElementById("btnSendMessage");

let port;

window.onmessage = (event) => {
  if (event.data === "init2") {
    port = event.ports[0];

    port.onmessage = (e) => {
      document.getElementById("receivedMessage").textContent = e.data;
    };
  }
};

btnSendMessage.onclick = () => {
  if (!port) {
    alert("메인 탭과의 연결이 설정되지 않았습니다.");
    return;
  }

  const message = messageInput.value;
  port.postMessage(message);
};
