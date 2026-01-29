import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
  <h1>Geolocation API - 고도와 방향 정보</h1>
  <button id='btnGetLocation'>현재 위치 가져오기</button>
  <button id='btnStartWatching'>위치 감시 시작</button>
  <button id='btnStopWatching'>위치 감시 종지</button>
  <p id="location">위치 정보: </p>
  <p id="error" style="color: red;"></p>
`;

const btnGetLocation = document.getElementById("btnGetLocation");
const btnStartWatching = document.getElementById("btnStartWatching");
const btnStopWatching = document.getElementById("btnStopWatching");
const locationEl = document.getElementById("location");
const errorEl = document.getElementById("error");
let watchId = null;

// 현재 위치 가져오기
btnGetLocation.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        displayLocation(position);
      },
      (error) => {
        displayError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  } else {
    errorEl.textContent = "Geolocation API를 지원하지 않는 브라우저입니다.";
  }
});

// 위치 감시 시작
btnStartWatching.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        displayLocation(position);
      },
      (error) => {
        displayError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
    errorEl.textContent = "위치 감시를 시작했습니다.";
    errorEl.style.color = "green";
  } else {
    errorEl.textContent = "Geolocation API를 지원하지 않는 브라우저입니다.";
    errorEl.style.color = "red";
  }
});

// 위치 감시 종지
btnStopWatching.addEventListener("click", () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    errorEl.textContent = "위치 감시를 종료했습니다.";
    errorEl.style.color = "blue";
  }
});

// 위치 정보 표시
function displayLocation(position) {
  const {
    latitude,
    longitude,
    altitude,
    accuracy,
    altitudeAccuracy,
    heading,
    speed,
  } = position.coords;

  locationEl.innerHTML = `
    <strong>위치 정보:</strong><br>
    위도: ${latitude}<br>
    경도: ${longitude}<br>
    고도: ${altitude !== null ? altitude + "m" : "정보 없음"}<br>
    정확도: ${accuracy}m<br>
    고도 정확도: ${altitudeAccuracy !== null ? altitudeAccuracy + "m" : "정보 없음"}<br>
    방향: ${heading !== null ? heading + "도" : "정보 없음"}<br>
    속도: ${speed !== null ? speed + "m/s" : "정보 없음"}<br>
    시간: ${new Date(position.timestamp).toLocaleString()}
  `;
  errorEl.textContent = "";
}

// 에러 표시
function displayError(error) {
  errorEl.style.color = "red";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorEl.textContent = "사용자가 위치 정보 요청을 거부했습니다.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorEl.textContent = "위치 정보를 사용할 수 없습니다.";
      break;
    case error.TIMEOUT:
      errorEl.textContent = "위치 정보 요청 시간이 초과되었습니다.";
      break;
    default:
      errorEl.textContent = "알 수 없는 오류가 발생했습니다.";
  }
}
