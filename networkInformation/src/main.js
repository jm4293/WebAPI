/*
 * Network Information API
 *
 * 사용자 네트워크 정보를 얻을 수 있는 API
 *
 * 주요 속성:
 * - effectiveType : 연결 유형(2g, 3g, 4g, slow-2g 등)
 * - downlink : 다운로드 속도(Mbps)
 * - RTT(Round-Trip Time) : 네트워크 지연 시간
 * - saveData : 네트워크 절약 모드인지 여부
 * - type : 네트워크 연결 유형(ethernet, wifi, Bluetooth ...)
 *
 * 웹 표준 API
 */

import "./style.css";

document.querySelector("#app").innerHTML = `
    <h1>현재 네트워크 정보</h1>
    <div id="network-info">
      <p><strong>실질적 유형 (Effective Type):</strong> <span id="effectiveType">N/A</span></p>
      <p><strong>다운링크 (Downlink):</strong> <span id="downlink">N/A</span> Mbps</p>
      <p><strong>RTT (Round-Trip Time):</strong> <span id="rtt">N/A</span> ms</p>
      <p><strong>데이터 절약 모드 (Save Data):</strong> <span id="saveData">N/A</span></p>
      <p><strong>연결 유형 (Type):</strong> <span id="type">N/A</span></p>
    </div>
  `;

const domNetworkInfo = document.getElementById("network-info");
const domType = document.getElementById("type");
const domEffectiveType = document.getElementById("effectiveType");
const domDownlink = document.getElementById("downlink");
const domRtt = document.getElementById("rtt");
const domSaveData = document.getElementById("saveData");

// 네트워크 정보를 화면에 표시하는 함수
function updateNetworkInfo() {
  // Network Information API 지원 여부 확인
  if ("connection" in navigator) {
    const connection = navigator.connection;

    // 3g, 4g, 5g 등과 같은 연결 유형을 나타내는 effectiveType 정보
    domEffectiveType.textContent = connection.effectiveType || "N/A";

    // 다운로드 속도를 나타내는 downlink 정보
    domDownlink.textContent =
      connection.downlink !== undefined
        ? connection.downlink.toFixed(2)
        : "N/A";

    // 네트워크 지연 시간을 나타내는 RTT 정보
    domRtt.textContent = connection.rtt !== undefined ? connection.rtt : "N/A";

    // 네트워크 절약 모드 지정 여부를 나타내는 saveData 정보
    domSaveData.textContent =
      connection.saveData !== undefined
        ? connection.saveData
          ? "활성화"
          : "비활성화"
        : "N/A";

    // Wifi 또는 이더넷카드 등의 네트워크 연결 유형을 나타내는 type 정보
    domType.textContent = connection.type || "N/A";
  } else {
    // API를 지원하지 않는 브라우저
    domNetworkInfo.innerHTML =
      "<p>이 브라우저에서는 Network Information API를 지원하지 않습니다.</p>";
    console.warn("Network Information API를 지원하지 않는 브라우저입니다.");
  }
}

// 초기 실행
updateNetworkInfo();

// 네트워크 상태 변경 감지 - onchange 이벤트 리스너 등록
navigator.connection.onchange = updateNetworkInfo;
