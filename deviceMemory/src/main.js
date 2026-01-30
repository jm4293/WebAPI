/*
 * Device Memory API
 *
 * 사용자 장치의 대략적인 RAM 용량을 얻을 수 있는 API
 *
 * 주요 속성:
 * - navigator.deviceMemory : 장치의 RAM 용량 (GB 단위, 대략적인 값)
 *   - 반환값: 0.25, 0.5, 1, 2, 4, 8 등의 2의 거듭제곱 값
 *
 * 웹 표준 API
 */

import "./style.css";

document.querySelector("#app").innerHTML = `
  <h2>Device Memory API</h2>
  <p id="memoryInfo"></p>
`;

const memoryInfoElement = document.getElementById("memoryInfo");

// Device Memory API 지원 여부 확인
if ("deviceMemory" in navigator) {
  const deviceMemory = navigator.deviceMemory;
  memoryInfoElement.textContent = `이 장치의 예상 RAM 용량: ${deviceMemory} GB`;
} else {
  memoryInfoElement.textContent =
    "이 브라우저는 Device Memory API를 지원하지 않습니다.";
}

// 바이트를 메가바이트로 변환하는 유틸리티 함수
const bytesToMB = (bytes, decimalPlaces = 2) => {
  const megabyte = 1024 * 1024;
  const megabytes = bytes / megabyte;

  return parseFloat(megabytes.toFixed(decimalPlaces)) + "MB";
};

// Performance Memory API를 사용한 JavaScript 메모리 사용량 확인
console.log(
  "현재 JavaScript 힙에서 사용 중인 메모리의 양: " +
    bytesToMB(performance.memory.usedJSHeapSize)
);

console.log(
  "JavaScript 힙이 현재 할당한 총 메모리의 양: " +
    bytesToMB(performance.memory.totalJSHeapSize)
);

console.log(
  "JavaScript 힙이 할당할 수 있는 최대 메모리 양: " +
    bytesToMB(performance.memory.jsHeapSizeLimit)
);
