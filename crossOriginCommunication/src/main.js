import "./style.css";

document.querySelector("#app").innerHTML = /* html */ `
	<h1>부모 페이지(localhost:5173)</h1>
	<iframe id="myIframe" width="400px" height="280px" src="http://localhost:8080"></iframe>
	<br />
	<button id="sendMessageButton">iframe으로 메시지 전송</button>
	<div id="receivedMessage">메시지 기다리는 중 ...</div>
`;

const iframe = document.getElementById("myIframe");
const sendMessageButton = document.getElementById("sendMessageButton");
const receivedMessage = document.getElementById("receivedMessage");

// iframe으로 메시지 전송
sendMessageButton.onclick = () => {
  if (iframe.contentWindow) {
    const message = {
      text: "안녕! iframe, 부모가 보낸 메시지야.",
      timestamp: new Date().toISOString(),
    };

    iframe.contentWindow.postMessage(message, "http://localhost:8080");
  }
};

// iframe에서 메시지 수신
window.addEventListener("message", (event) => {
  if (event.origin !== "http://localhost:8080") {
    return;
  }

  receivedMessage.textContent = `iframe에서 받은 메시지: ${event.data.text} at ${event.data.timestamp}`;
});
