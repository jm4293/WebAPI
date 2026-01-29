import "./style.css";

document.querySelector("#canvas").innerHTML = `
    <h1>캔버스 드로잉 (WebWorker)</h1>
    <canvas id="myCanvas" width="400" height="400"></canvas>
`;

const canvas = document.getElementById("myCanvas");
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker("worker-canvas.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);

worker.postMessage({ command: "start" });
