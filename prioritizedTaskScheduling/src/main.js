import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Prioritized Task Scheduling API</h1>
  <button id="btnCancelTask">테스크 취소</button>
  <button id="btnChangePriority">테스크 우선순위 변경</button>
`;

const controller = new TaskController();

const btnCancelTask = document.getElementById("btnCancelTask");
const btnChangePriority = document.getElementById("btnChangePriority");

btnCancelTask.onclick = () => {
  controller.abort("테스크 취소 요청됨");
};

btnChangePriority.onclick = () => {
  controller.setPriority("user-blocking");
};

controller.signal.addEventListener("prioritychange", (event) => {
  const previousPriority = event.previousPriority;
  const newPriority = event.target.priority;
  console.log(`우선순위 변경: ${previousPriority} -> ${newPriority}`);
});

/* priority levels:
    user-blocking: 사용자 입력 등과 같이 즉시 처리해야할 작업, 키보드 입력에 대한 처리, 마우스 클릭 등
    user-visible: 사용자에게 시각적으로 표시해 주는 작업(기본값), 변경된 상태에 대한 UI 업데이트(렌더링) 등
    background: 백그라운드에서 처리해도 되는 작업, 로그 전송이나 서버 데이터 요청 등
*/

scheduler
  .postTask(
    () => {
      console.log("테스크 실행");
      //   throw new Error("의도적인 에러 발생");
      return "테스크 결과 반환";
    },
    {
      priority: "background",
      delay: 3000,
      signal: controller.signal,
    },
  )
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("테스크 실행 중 오류 발생:", error);
  });

console.log("task-1");
scheduler.postTask(() => console.log("task-4"), { priority: "background" });
console.log("task-2");
scheduler.postTask(() => console.log("task-5"), { priority: "user-blocking" });
console.log("task-3");
scheduler.postTask(() => console.log("task-6"), { priority: "user-visible" });
