import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Screen Capture API</h1>
  <button id="startCapture">화면 캡처 시작</button><br/>
  <video id="screenVideo" autoplay></video>
  <p id="message">No Message</p>
`;

const startCaptureBtn = document.getElementById("startCapture");
const screenVideo = document.getElementById("screenVideo");
const message = document.getElementById("message");

let captureStream = null;

async function startCapture() {
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    screenVideo.srcObject = captureStream;
    message.textContent = "화면 캡처 중...";

    // 캡처 종료 감지 (사용자가 "공유 중지" 클릭 시)
    captureStream.getVideoTracks()[0].onended = () => {
      stopCapture();
    };

    startCaptureBtn.textContent = "화면 캡처 중지";
  } catch (error) {
    console.error("화면 캡처 실패:", error);
    if (error.name === "NotAllowedError") {
      message.textContent = "화면 캡처 권한을 거부했습니다.";
    } else {
      message.textContent = `화면 캡처 오류: ${error.message}`;
    }
  }
}

function stopCapture() {
  if (captureStream) {
    captureStream.getTracks().forEach((track) => track.stop());
    captureStream = null;
  }
  screenVideo.srcObject = null;
  message.textContent = "화면 캡처 종료됨.";
  startCaptureBtn.textContent = "화면 캡처 시작";
}

startCaptureBtn.onclick = () => {
  if (captureStream) {
    stopCapture();
  } else {
    startCapture();
  }
};
