const zlib = require("zlib");
const util = require("util");
const unzip = util.promisify(zlib.unzip);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server started on ws://localhost:8080");

wss.on("connection", (ws) => {
  console.log("클라이언트가 연결되었습니다.");

  ws.on("message", async (message, isBinary) => {
    const decompressedData = await unzip(message);
    const jsonString = decompressedData.toString("utf-8");

    console.log("수신된 메시지:", jsonString);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: true });
      }
    });
  });

  ws.on("close", () => {
    console.log("클라이언트가 연결을 종료했습니다.");
  });
});
