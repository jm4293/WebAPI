import "./style.css";

document.querySelector("#app").innerHTML = /* html */ `
  <h1>웹캠 녹화 예제</h1>

  <video id="videoElement" autoplay muted></video>

  <div class="controls">
    <button id="startBtn">녹화 시작</button>
    <button id="stopBtn" disabled>녹화 중지</button>
    <button id="downloadBtn" disabled>다운로드</button>
  </div>

  <p id="messages">No Message</p>
  <a id="downloadLink" style="display: none;"></a>
`;

const videoElement = document.getElementById("videoElement");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const downloadBtn = document.getElementById("downloadBtn");
const messages = document.getElementById("messages");
const downloadLink = document.getElementById("downloadLink");

let mediaRecorder = null;
let recordedChunks = [];
let stream = null;

// --- 웹캠 스트림 가져오기 ---
async function getStream() {
  messages.textContent = "웹캠에 연결 중...";
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoElement.srcObject = stream;
    messages.textContent = "웹캠 연결됨. 녹화를 시작할 수 있습니다.";
  } catch (error) {
    console.error("웹캠 접근 실패:", error);
    // messages.textContent = "웹캠 접근 권한이 필요합니다.";

    if (
      error.name === "NotAllowedError" ||
      error.name === "PermissionDeniedError"
    ) {
      messages.textContent = "웹캠 접근 권한이 필요합니다.";
    } else if (
      error.name === "NotFoundError" ||
      error.name === "DevicesNotFoundError"
    ) {
      messages.textContent = "웹캠이 연결되어 있지 않습니다.";
    } else {
      messages.textContent = "웹캠 접근 중 오류가 발생했습니다.";
    }
  }
}

// --- 녹화 시작 ---
startBtn.addEventListener("click", () => {
  if (!stream) {
    messages.textContent = "먼저 카메라/마이크 스트림을 가져와야 합니다.";
    return;
  }

  recordedChunks = [];

  if (!mediaRecorder) {
    const mimeType = "video/webm"; // 또는 'video/mp4'
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      messages.textContent = `경고: ${mimeType}은(는) 지원되지 않습니다. 다른 코덱으로 녹화될 수 있습니다.`;
    }

    try {
      mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType });
    } catch (e) {
      messages.textContent = `MediaRecorder 생성 오류: ${e.message}`;
      console.error("MediaRecorder 생성 오류:", e);
      return;
    }
  }

  // --- 데이터 수신 처리 ---
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  // --- 녹화 종료 처리 ---
  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `recording_${new Date().toISOString()}.webm`;
    downloadBtn.disabled = false;
    messages.textContent = "녹화 완료. 다운로드할 수 있습니다.";
  };

  mediaRecorder.onerror = (event) => {
    console.error("녹화 중 오류 발생:", event.error);
    messages.textContent = `녹화 중 오류 발생: ${event.error.message}`;
  };

  mediaRecorder.start();
  messages.textContent = "녹화 중...";
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

// --- 녹화 중지 ---
stopBtn.onclick = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

// --- 다운로드 ---
downloadBtn.onclick = () => {
  downloadLink.click();
};

// --- 초기화 ---
getStream();
