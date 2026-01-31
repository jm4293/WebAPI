import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Fullscreen API 예제</h1>
  <video id="myVideo" controls>
    <source src="/video.mp4" type="video/mp4">
  </video>
  <button id="toggleFullscreenBtn">전체 화면 토글</button>
`;

const video = document.getElementById("myVideo");
const btn = document.getElementById("toggleFullscreenBtn");

btn.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await video.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (err) {
    console.error(err);
  }
});

document.addEventListener("fullscreenchange", () => {
  btn.textContent = document.fullscreenElement ? "전체 화면 종료" : "전체 화면 토글";
});
