import "./style.css";

document.querySelector("#app").innerHTML = /* html */ `
	<h1>Performance API 테스트</h1>
	<div id="output"></div>
`;

function outputText(label, time) {
  const text = `<p style="font-size:1.5rem">${label}: <span style="color:blue;font-weight:bold">${time.toFixed(2)}ms</span></p>`;
  document.getElementById("output").innerHTML += text;
}

window.addEventListener("load", () => {
  const navEntry = performance.getEntriesByType("navigation")[0];
  const loadTime = navEntry.loadEventEnd - navEntry.startTime;
  outputText("페이지 로드 시간", loadTime);
});

const resources = performance.getEntriesByType("resource");
resources.forEach((resource) => {
  const duration = resource.responseEnd - resource.startTime;
  outputText(`리소스(${resource.name})`, duration);
});

function startTask() {
  performance.mark("task-start");
  setTimeout(() => {
    // ...
    performance.mark("task-end");
    performance.measure("task-duration", "task-start", "task-end");
    const measure = performance.getEntriesByType("measure")[0];
    outputText(`${measure.name} 작업 소요 시간`, measure.duration);
  }, 500);
}
startTask();

const paintObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (
      entry.name === "first-paint" ||
      entry.name === "first-contentful-paint"
    ) {
      outputText(entry.name, entry.startTime);
    }
  });
});
paintObserver.observe({ entryTypes: ["paint"] });

const longTaskObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    outputText("긴 작업 감지", entry.duration);
  });
});
longTaskObserver.observe({ entryTypes: ["longtask"] });

// 긴 작업 시뮬레이션 (50ms 이상 걸리는 작업)
function simulateLongTask() {
  const start = performance.now();
  // 약 100ms 동안 CPU를 점유하는 작업
  while (performance.now() - start < 100) {
    for (let i = 0; i < 1000000; i++) {
      Math.random();
    }
  }
}
simulateLongTask();
