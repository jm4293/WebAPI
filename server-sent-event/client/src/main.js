import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
  <h1>SSE 통신</h1>
  <div id="status">연결 중...</div>

  <div id="messages-layout">
    <div>
      <h2>기본 전송 이벤트 내역</h2>
      <ul id="default-messages"></ul>
    </div>
    <div>
      <h2>커스텀 전송 이벤트 내역</h2>
      <ul id="update-messages"></ul>
    </div>
  </div>
`;

const defaultList = document.getElementById("default-messages");
const updateList = document.getElementById("update-messages");
const statusElement = document.getElementById("status");

// SSE 연결 생성
const eventSource = new EventSource("http://localhost:3000/events");

// 연결 성공
eventSource.onopen = () => {
  statusElement.textContent = "연결됨";
  statusElement.style.color = "#4ade80";
};

// 연결 에러
eventSource.onerror = (error) => {
  statusElement.textContent = "연결 오류! 자동 재시도 중...";
  statusElement.style.color = "#ef4444";
};

// 기본 메시지 수신 (event 타입 지정 없음)
eventSource.onmessage = (event) => {
  const id = event.lastEventId;
  const data = event.data;

  const newListItem = document.createElement("li");
  newListItem.textContent = `${data} (ID: ${id})`;
  defaultList.prepend(newListItem);
};

// 커스텀 이벤트 수신 (event: update)
eventSource.addEventListener("update", (event) => {
  const id = event.lastEventId;
  const data = JSON.parse(event.data);

  const li = document.createElement("li");
  li.textContent = `${data.count}번째 업데이트 - 서버 시각: ${data.time} (ID: ${id})`;
  updateList.prepend(li);
});
