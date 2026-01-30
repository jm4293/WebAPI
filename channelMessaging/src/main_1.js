import "./style.css";

document.querySelector("#app1").innerHTML = `
  <h1>메인 페이지와 iframe 간의 통신</h1>
  <p>iframe에 메시지 보내기:</p>
  <input id="messageInput1" type="text" placeholder="메시지를 입력하세요" />
  <button id="sendButton1">보내기</button>
  <p>수신된 메시지: <span id="receivedMessage1"></span></p>
  <iframe src="iframe_page_1.html" id="iframe1"></iframe>
`;

const messageInput = document.getElementById("messageInput1");
const sendButton = document.getElementById("sendButton1");
const receivedMessageSpan = document.getElementById("receivedMessage1");
const domIframe = document.getElementById("iframe1");

const channel = new MessageChannel();

domIframe.onload = () => {
  console.log("iframe loaded", channel.port1, channel.port2);
  domIframe.contentWindow.postMessage("init1", "*", [channel.port2]);
};

sendButton.onclick = () => {
  const message = messageInput.value;
  channel.port1.postMessage(message);
};

channel.port1.onmessage = (event) => {
  receivedMessageSpan.textContent = event.data;
};
