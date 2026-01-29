import "./style.css";

document.querySelector("#arrayBuffer").innerHTML = /*html*/ `
  <h1>이미지 흑백 변환 (WebWorker)</h1>
  <input type="file" id="imageInput" accept="image/*">
  <button id="btnProcessImage">흑백 변환</button>
  <div>
    <h3>원본 이미지</h3>
    <canvas id="originalCanvas" style="zoom: 0.5;"></canvas>
  </div>
  <div>
    <h3>흑백 이미지</h3>
    <canvas id="grayscaleCanvas" style="zoom: 0.5;"></canvas>
  </div>
  <p id="status">상태: 이미지를 선택하세요.</p>
`;

const imageInput = document.getElementById("imageInput");
const btnProcessImage = document.getElementById("btnProcessImage");
const originalCanvas = document.getElementById("originalCanvas");
const grayscaleCanvas = document.getElementById("grayscaleCanvas");
const statusElement = document.getElementById("status");

const worker = new Worker("worker-arrayBuffer.js");

btnProcessImage.onclick = () => {
  if (!imageInput.files[0]) {
    statusElement.textContent = "상태: 이미지를 선택하세요.";
    return;
  }

  const img = new Image();
  img.onload = () => {
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    const ctx = originalCanvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const buffer = imageData.data.buffer;

    worker.postMessage(
      { buffer: buffer, width: img.width, height: img.height },
      [buffer],
    );

    statusElement.textContent = "상태: 흑백 변환 중...";
  };
  img.src = URL.createObjectURL(imageInput.files[0]);
};

worker.onmessage = (event) => {
  const { buffer, width, height } = event.data;

  const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height);
  grayscaleCanvas.width = width;
  grayscaleCanvas.height = height;
  grayscaleCanvas.getContext("2d").putImageData(imageData, 0, 0);

  statusElement.textContent = "상태: 흑백 변환 완료!";
};
