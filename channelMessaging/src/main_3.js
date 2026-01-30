import "./style.css";

document.querySelector("#app3").innerHTML = /*html*/ `
  <h1>페이지dhk Web Worker 간의 통신</h1>
  <p>Worker로 메시지 보내기:</p>
  <input id="messageInput3" type="text" placeholder="Worker로 메시지 입력" />
  <button id="btnSendMessage3">보내기</button>
  <p>Worker로부터 수신된 메시지: <span id="receivedMessage3"></span></p>
`;

const messageInput = document.getElementById("messageInput3");
const btnSendMessage = document.getElementById("btnSendMessage3");
const receivedMessageSpan = document.getElementById("receivedMessage3");

const worker = new Worker("worker.js");
const channel = new MessageChannel();

worker.postMessage("init3", [channel.port2]);

btnSendMessage.onclick = () => {
  const message = messageInput.value;
  channel.port1.postMessage(message);
};

channel.port1.onmessage = (event) => {
  receivedMessageSpan.textContent = event.data;
};
