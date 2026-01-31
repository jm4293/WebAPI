# WebSocket API

## 개요
WebSocket API는 클라이언트와 서버 사이에 Full-Duplex(양방향) 실시간 통신 채널을 제공하는 API입니다. 이 프로젝트는 WebSocket을 활용한 실시간 채팅 앱을 구현합니다. 클라이언트와 서버 간 전송되는 메시지는 gzip 압축을 적용하여 네트워크 전송 효율을 높입니다.

## 권한
필요한 권한 없음. 단, WebSocket 서버를 먼저 실행해야 합니다 (`node server.js`).

## 폴더 구조
```
webSocket/
├── client/
│   ├── index.html          # 클라이언트 채팅 UI HTML 파일
│   └── src/
│       ├── main.js         # WebSocket 연결 및 gzip 압축 채팅 로직
│       └── style.css       # 클라이언트 스타일 파일
├── server/
│   └── server.js           # WebSocket 서버 (gzip 압축 지원)
└── package.json            # Node.js 패키지 관리 파일
```

## 파일 설명

### client/index.html
클라이언트 측 채팅 앱의 진입점 파일입니다. 메시지 영역, 사용자 이름 표시, 메시지 입력, 보내기 버튼 등의 UI를 포함합니다.

### client/src/main.js
WebSocket 연결과 gzip 압축을 사용한 실시간 채팅 로직을 포함합니다.

- **userName 생성**: 랜덤 문자열로 사용자 이름을 생성합니다.
- **WebSocket 연결**: `new WebSocket("ws://localhost:8080")`로 서버에 연결합니다.
- **ws.onopen**: 연결 성공 시 시스템 메시지를 UI에 표시합니다.
- **ws.onmessage**: `event.data`가 Blob(gzip 압축된 바이너리)인 경우 다음과 같이 처리합니다.
  - `arrayBuffer()`로 변환합니다.
  - `DecompressionStream("gzip")`을 사용하여 압축을 해제합니다.
  - `Blob.stream().pipeThrough()`와 `Response.text()`로 텍스트를 복원합니다.
  - `JSON.parse`로 `{ name, message, type }`을 추출합니다.
  - `userName`과 비교하여 "나:" 또는 "{name}:" 접두사로 메시지를 UI에 표시합니다.
- **ws.onclose, ws.onerror**: 연결 종료 및 오류 시 시스템 메시지를 표시합니다.
- **sendMessage()**: `JSON.stringify({ type, name, message })`를 생성한 후, `TextEncoder`로 `ArrayBuffer`로 변환하고, `CompressionStream("gzip")`으로 압축합니다. `Blob.stream().pipeThrough()`와 `Response.arrayBuffer()`로 압축된 `ArrayBuffer`를 생성하고, `ws.send(compressedData)`로 서버에 전송합니다.
- **입력 트리거**: 버튼 클릭과 Enter 키 이벤트로 메시지를 전송할 수 있습니다.

### client/src/style.css
클라이언트 측 채팅 UI 스타일 파일입니다.

### server/server.js
WebSocket 서버로, gzip 압축된 메시지를 처리하고 broadcast합니다.

- **WebSocket.Server**: port 8080에서 WebSocket 서버를 실행합니다.
- **ws.on("message")**: 수신된 메시지를 `zlib.unzip()`으로 압축 해제하여 JSON을 파싱하고 console에 출력합니다. 원본 압축된 메시지를 그대로 모든 연결된 클라이언트에게 broadcast합니다 (`client.send(message, { binary: true })`).
- **ws.on("close")**: 클라이언트 연결 종료를 로깅합니다.

### package.json
서버 측 Node.js 패키지 관리 파일입니다. WebSocket 서버에 필요한 의존성을 포함합니다.

## 동작 순서
1. `npm install`을 실행하여 의존성을 설치합니다.
2. `node server.js`를 실행하여 WebSocket 서버를 시작합니다.
3. 클라이언트 페이지를 열면, WebSocket을 통해 서버에 연결됩니다.
4. 연결 성공 시 시스템 메시지가 채팅 UI에 표시됩니다.
5. 사용자가 메시지를 입력하고 보내기 버튼 또는 Enter 키를 누눕니다.
6. 클라이언트는 메시지를 JSON으로 직렬화한 후 `CompressionStream("gzip")`으로 압축합니다.
7. 압축된 바이너리 데이터를 WebSocket으로 서버에 전송합니다.
8. 서버는 수신된 압축 메시지를 `zlib.unzip()`으로 해제하여 console에 로깅합니다.
9. 서버는 압축된 원본 메시지를 그대로 모든 연결된 클라이언트에게 broadcast합니다.
10. 각 클라이언트는 수신된 Blob을 `DecompressionStream("gzip")`으로 압축 해제하여 메시지를 복원하고 UI에 표시합니다.
