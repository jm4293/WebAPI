const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get("/stream/:count", (req, res) => {
  const count = parseInt(req.params.count, 10) || 10;

  if (isNaN(count) || count <= 0) {
    return res.status(400).send("유효한 숫자를 입력하세요.");
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
    Connection: "keep-alive",
  });

  let lineCount = 0;
  const interval = setInterval(() => {
    lineCount++;

    const data = JSON.stringify({
      id: lineCount,
      origin: req.hostname,
      url: req.originalUrl,
      data: `이 데이터는 스트림된 것으로 라인 번호는 ${lineCount}입니다.`,
    });

    res.write(data + "\n");

    if (lineCount >= count) {
      clearInterval(interval);
      res.end();
      console.log(`스트리밍 완료: ${lineCount} 라인 전송됨.`);
    }
  }, 100);

  req.on("close", () => {
    clearInterval(interval);
    console.log("클라이언트가 연결을 종료했습니다.");
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
