import "./style.css";

document.querySelector("#app").innerHTML = /* html */ `
  <h1>Resize Observer API 예제</h1>
  <div id="resizableDiv">
    크기 조절 가능한 DIV
  </div>
  <button id="resizeBtn">DIV 크기 랜덤 변경</button>
  <div id="sizeInfo">
    현재 DIV 크기: <span id="widthValue">?</span> x <span id="heightValue">?</span>
  </div>
`;

const resizableDiv = document.getElementById("resizableDiv");
const resizeBtn = document.getElementById("resizeBtn");
const widthValueSpan = document.getElementById("widthValue");
const heightValueSpan = document.getElementById("heightValue");

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;

    widthValueSpan.textContent = `${width.toFixed(0)}px`;
    heightValueSpan.textContent = `${height.toFixed(0)}px`;

    console.log(
      "Content Box Size:",
      entry.contentBoxSize[0].inlineSize,
      entry.contentBoxSize[0].blockSize,
    );

    console.log(
      "Border Box Size:",
      entry.borderBoxSize[0].inlineSize,
      entry.borderBoxSize[0].blockSize,
    );
  }
});

resizeObserver.observe(resizableDiv);

setTimeout(() => {
  resizeObserver.unobserve(resizableDiv);
}, 5000);

resizeBtn.addEventListener("click", () => {
  const newWidth = Math.floor(Math.random() * 300) + 100; // 100px ~ 400px
  const newHeight = Math.floor(Math.random() * 300) + 100; // 100px ~ 400px

  resizableDiv.style.width = `${newWidth}px`;
  resizableDiv.style.height = `${newHeight}px`;
});
