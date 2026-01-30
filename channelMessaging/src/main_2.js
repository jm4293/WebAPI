import "./style.css";

document.querySelector("#app2").innerHTML = /*html*/ `
  <h1>독립된 페이지들 간의 통신</h1>
  <button id="btnNewTab2">새 탭 열기</button>
  <p>메시지 보내기:</p>
  <input id="messageInput2" type="text" placeholder="새 탭으로 메시지 보내기" />
  <button id="btnSendMessage2">보내기</button>
  <p>수신된 메시지: <span id="receivedMessage2"></span></p>
`;

const btnNewTab = document.getElementById("btnNewTab2");
const messageInput = document.getElementById("messageInput2");
const btnSendMessage = document.getElementById("btnSendMessage2");
const receivedMessageSpan = document.getElementById("receivedMessage2");

let newWindow;
let channel;
let port;

btnNewTab.onclick = () => {
  newWindow = window.open("iframe_page_2.html", "_blank");
  channel = new MessageChannel();
  port = channel.port1;

  newWindow.onload = () => {
    newWindow.postMessage("init2", "*", [channel.port2]);
  };

  port.onmessage = (event) => {
    receivedMessageSpan.textContent = event.data;
  };
};

btnSendMessage.onclick = () => {
  if (!port) {
    alert("새 탭을 먼저 열어주세요.");
    return;
  }

  const message = messageInput.value;
  port.postMessage(message);
};
