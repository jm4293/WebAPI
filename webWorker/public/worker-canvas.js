let offscreenCanvas;
let ctx;

self.onmessage = (event) => {
  if (event.data.canvas) {
    offscreenCanvas = event.data.canvas;
    ctx = offscreenCanvas.getContext("2d");
  } else if (event.data.command === "start") {
    animate();
  }
};

let angle = 0;
function animate() {
  // 캔버스 지우기
  ctx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  // 배경 설정
  ctx.fillStyle = "#131313";
  ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  // 회전하는 사각형 그리기
  ctx.save();
  ctx.translate(offscreenCanvas.width / 2, offscreenCanvas.height / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.fillStyle = "pink";
  ctx.fillRect(-50, -50, 100, 100);
  ctx.restore();

  // 각도 업데이트
  angle += 3;
  if (angle >= 360) angle = 0;

  // 애니메이션 루프
  requestAnimationFrame(animate);
}
