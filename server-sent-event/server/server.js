const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(cors());

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("클라이언트가 연결되었습니다.");

  const defaultIntervalId = setInterval(() => {
    const currentITime = `${new Date().toLocaleTimeString("ko-KR")}`;
    const eventId = Date.now();

    /*
        id: 이벤트 고유 아이디
        data: 클라이언트로 전송할 데이터
        event: 이벤트 타입 (생략 시 기본 메시지로 처리)
        retry: 재시도 시간 (밀리초 단위)
        \n\n: 이벤트의 끝을 알리는 구분자

        1. id: ${eventId}\ndata: ${currentITime}\n\n
        2. id: ${eventId}\nevent: update\ndata: 서버 현재 시각: ${currentITime}\n\n
        3. id: ${eventId}\nretry: 5000\ndata: 서버 현재 시각: ${currentITime}\n\n
    */

    const sseData =
      `id: ${eventId}\n` + `data: 서버 현재 시각: ${currentITime}\n\n`;

    res.write(sseData);
  }, 1000);

  let counter = 0;
  const updateIntervalId = setInterval(() => {
    counter++;
    const updateData = `{"time": "${new Date().toLocaleTimeString("ko-KR")}", "count": ${counter}}`;
    const sseUpdate =
      `event: update\n` + `id: ${Date.now()}\n` + `data: ${updateData}\n\n`;

    res.write(sseUpdate);
  }, 3000);

  req.on("close", () => {
    console.log("클라이언트가 연결을 종료했습니다.");
    res.end();
    clearInterval(defaultIntervalId);
    clearInterval(updateIntervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
