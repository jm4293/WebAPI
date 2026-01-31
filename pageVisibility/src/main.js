import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
  <h1>Page Visibility API</h1>
  <p>현재 페이지 가시성 상태: <span id="status">??</span></p>
  <p>타이머 카운터: <span id="timer-counter">??</span></p>
`;

const statusElement = document.getElementById("status");
const timerCounterElement = document.getElementById("timer-counter");

// --- 타이머 ---
let count = 0;
let intervalId = null;

function startTimer() {
  if (intervalId) return;
  intervalId = setInterval(() => {
    count++;
    timerCounterElement.textContent = count;
  }, 1000);
}

function stopTimer() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

function updatePageStatus() {
  statusElement.textContent = document.visibilityState; // 'visible'/'hidden'

  if (document.hidden) {
    console.log("페이지가 숨겨졌습니다.");
    statusElement.style.color = "red";
    stopTimer();
  } else {
    console.log("페이지가 보입니다.");
    statusElement.style.color = "green";
    startTimer();
  }
}

updatePageStatus();

document.addEventListener("visibilitychange", updatePageStatus);
