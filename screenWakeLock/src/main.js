import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
  <h1>Screen Wake Lock API</h1>
  <button id="toggleWakeLock">Wake Lock 활성화</button>
  <p id="status">상태: Wake Lock 비활성화</p>
`;

// WakeLockSentinel
let wakeLock = null;

const domToggleButton = document.getElementById("toggleWakeLock");
const domStatusText = document.getElementById("status");

// 절전모드 진입 금지 상태와 진입 가능 상태 간의 전환하는 함수
async function toggleWakeLock() {
  try {
    if (wakeLock && !wakeLock.released) {
      // 절전모드 진입 금지 상태
      await wakeLock.release();
      wakeLock = null;
      domToggleButton.textContent = "Wake Lock 활성화";
      domStatusText.textContent = "상태: Wake Lock 비활성화";
    } else {
      // 절전모드 진입 가능 상태
      wakeLock = await navigator.wakeLock.request("screen");
      domToggleButton.textContent = "Wake Lock 비활성화";
      domStatusText.textContent = "상태: Wake Lock 활성화 - 화면이 꺼지지 않습니다";

      // Wake Lock이 해제될 때 처리
      wakeLock.addEventListener("release", () => {
        console.log("Wake Lock이 해제되었습니다");
        domStatusText.textContent = "상태: Wake Lock 비활성화";
      });
    }
  } catch (err) {
    console.error("Wake Lock 오류:", err);
    domStatusText.textContent = `오류: ${err.message}`;
  }
}

// Wake Lock 지원 여부 확인
if ("wakeLock" in navigator) {
  domToggleButton.onclick = toggleWakeLock;

  // 탭이 비활성화될 때 자동으로 Wake Lock 해제되고, 다시 활성화될 때 재요청
  document.addEventListener("visibilitychange", async () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        domStatusText.textContent = "상태: Wake Lock 재활성화됨";
      } catch (err) {
        console.error("Wake Lock 재활성화 오류:", err);
      }
    }
  });
} else {
  domToggleButton.disabled = true;
  domStatusText.textContent = "이 브라우저는 Wake Lock API를 지원하지 않습니다";
}
