const WebSocket = require("ws");
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });
const clients = new Map();

console.log(`WebSocket 시그널링 서버가 ws://localhost:${port}에서 실행 중입니다`);

function broadcast(message, senderId) {
  const messageStr = JSON.stringify(message);

  clients.forEach((clientWs, clientsId) => {
    if (clientsId !== senderId && clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(messageStr);
    }
  });
}

wss.on("connection", (ws) => {
  let userId = null;

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      /*
        type: 메세지 타입(new-peer, offer, answer, candidate, peer-disconnected)
        from: 발신자 ID
        to: 수신자 ID
        sdp: P2P 연결을 위한 SDP 정보
        candidate: P2P 연결을 위한 ICE 후보 정보
      */
      const { type, from, to } = data;

      if (type === "new-peer") {
        userId = from;
        clients.set(userId, ws);
        console.log(`새 피어 연결됨: ${userId}`);
        broadcast({ type: "new-peer", from: userId }, userId);
      } else if (["offer", "answer", "candidate"].includes(type)) {
        if (to && clients.has(to)) {
          const targetWs = clients.get(to);

          if (targetWs.readyState === WebSocket.OPEN) {
            targetWs.send(JSON.stringify(data));
            console.log(`${type}를 ${from}에서 ${to}로 중계함`);
          }
        }
      }
    } catch (e) {
      console.error("메시지 처리 중 오류:", e);
    }
  });

  ws.on("close", () => {
    if (userId) {
      clients.delete(userId);
      console.log(`피어 연결 해제됨: ${userId}`);
      broadcast({ type: "peer-disconnected", from: userId }, userId);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket 오류:", error);
  });
});
