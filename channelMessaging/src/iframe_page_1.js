document.querySelector("#app1").innerHTML = `
  <h1>iframe 페이지</h1>
  <p>수신된 메시지: <span id="receivedMessage1"></span></p>
  <p>메시지 보내기:</p>
  <input id="responseInput1" type="text" placeholder="응답 메시지를 입력하세요" />
  <button id="sendResponseButton1">응답 보내기</button>
`;

const receivedMessageSpan = document.getElementById("receivedMessage1");
const responseInput = document.getElementById("responseInput1");
const sendResponseButton = document.getElementById("sendResponseButton1");

let port;

window.onmessage = (event) => {
  if (event.data === "init1") {
    port = event.ports[0];
    port.onmessage = (e) => {
      receivedMessageSpan.textContent = e.data;
    };
  }
};

sendResponseButton.onclick = () => {
  if (port) {
    port.postMessage(responseInput.value);
  }
};
