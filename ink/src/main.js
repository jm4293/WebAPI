import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>캔버스에 그림 그리기</h1>
  <canvas id='inkCanvas'></canvas>
`;

const canvas = document.getElementById("inkCanvas");
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext("2d");

// 마우스나 펜을 이용해 선이 그려지는 중일 때 true로 설정됩니다.
let isDrawing = false;

// 마우스나 펜으로 선을 그릴때 입력된 가장 최근의 좌표가 저장됨
let lastX = 0;
let lastY = 0;

canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("pointerup", (e) => {
  isDrawing = false;
});

canvas.addEventListener("pointermove", (e) => {
  if (!isDrawing) {
    return;
  }

  if (e.pointerType === "pen") {
    const minWidth = 0.01;
    const maxWidth = 12;

    ctx.lineWidth = minWidth + (maxWidth - minWidth) * e.pressure;
  } else {
    ctx.lineWidth = 2;
  }

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("pointerout", (e) => {
  isDrawing = false;
});

canvas.addEventListener("pointerenter", (e) => {
  /*
    e.buttons 값의 의미
    0: 버튼이 눌려지지 않음
    1: 왼쪽 버튼
    2: 오른쪽 버튼
    4: 가운데 버튼
    8: 뒤로 가기 버튼
    16: 앞으로 가기 버튼
  */
  if (e.buttons > 0) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});
