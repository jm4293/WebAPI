# Server-Sent Events (SSE) API

## 개요
Server-Sent Events(SSE)는 서버에서 클라이언트로 실시간 이벤트를 단방향으로 푸시하는 기술입니다. HTTP 연결을 유지하며 서버가 언제든지 클라이언트에게 데이터를 전송할 수 있습니다. 클라이언트에서는 `EventSource` API를 사용하여 SSE 연결을 생성하고, 기본 이벤트와 커스텀 이벤트를 수신할 수 있습니다. 이 프로젝트는 기본 이벤트와 커스텀 이벤트("update") 두 종류의 이벤트를 서버에서 주기적으로 전송하는 예제입니다.

## 권한
필요한 권한 없음. 단, 클라이언트가 이벤트를 수신하려면 서버가 먼저 실행되어야 합니다.

## 폴더 구조
```
serverSentEvent/
├── client/
│   ├── index.html          # 클라이언트 앱의 진입점
│   └── src/
│       ├── main.js         # SSE 연결 생성 및 이벤트 수신 로직
│       └── style.css       # 클라이언트 페이지 스타일링
└── server/
    └── server.js           # Express.js SSE 서버
```

## 파일 설명

### client/index.html
클라이언트 앱의 HTML 구조를 정의하며, `src/main.js`와 `src/style.css`를 로드합니다.

### client/src/main.js
클라이언트 측의 SSE 연결 및 이벤트 처리 로직을 담당합니다.

- **UI 렌더링**: 연결 상태 표시 영역, 기본 전송 이벤트 리스트, 커스텀 전송 이벤트 리스트를 렌더링합니다.
- **SSE 연결 생성**: `new EventSource("http://localhost:3000/events")`로 서버와의 SSE 연결을 생성합니다.
- **`eventSource.onopen`**: 연결이 성공하면 연결 상태를 초록색으로 표시합니다.
- **`eventSource.onerror`**: 오류가 발생하면 연결 상태를 빨간색으로 표시하고, `EventSource`의 자동 재연결 기능에 대해 안내합니다.
- **`eventSource.onmessage`**: 서버에서 event 타입이 지정되지 않은 기본 이벤트를 수신합니다. `event.lastEventId`와 `event.data`를 기본 이벤트 리스트에 추가하여 표시합니다.
- **`eventSource.addEventListener("update", ...)`**: 서버에서 타입이 `"update"`인 커스텀 이벤트를 수신합니다. `event.data`를 `JSON.parse`하여 `count`와 `time` 값을 커스텀 이벤트 리스트에 추가하여 표시합니다.

### client/src/style.css
클라이언트 페이지의 레이아웃과 스타일을 정의합니다.

### server/server.js
Express.js를 사용한 SSE 서버입니다. PORT 3000에서 실행됩니다.

- **GET `/events` 엔드포인트**: SSE 연결을 처리하는 엔드포인트입니다.
  - 응답 헤더를 `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`로 설정합니다.
- **기본 이벤트 전송 (`defaultIntervalId`)**: 1초 간격으로 기본 SSE 이벤트를 전송합니다.
  - 형식: `id: {eventId}\ndata: 서버 현재 시각: {time}\n\n`
- **커스텀 이벤트 전송 (`updateIntervalId`)**: 3초 간격으로 커스텀 이벤트 `"update"`를 전송합니다.
  - 형식: `event: update\nid: {id}\ndata: {JSON}\n\n` (JSON에는 `time`과 `counter` 포함)
- **연결 종료 처리 (`req.on("close")`)**: 클라이언트가 연결을 종료하면 두 interval을 모두 `clearInterval`로 정리하여 리소스 누수를 방지합니다.

## 동작 순서
1. 서버를 먼저 실행합니다 (`node server.js`).
2. 클라이언트 페이지를 열면 `EventSource`를 통해 `http://localhost:3000/events`에 SSE 연결을 시도합니다.
3. 연결 성공 시 `onopen`이 발생하여 연결 상태가 초록색으로 표시됩니다.
4. 서버는 1초 간격으로 기본 이벤트를 전송하며, 클라이언트의 `onmessage` 핸들러가 수신하여 기본 이벤트 리스트에 표시합니다.
5. 서버는 3초 간격으로 커스텀 이벤트 `"update"`를 전송하며, 클라이언트의 `"update"` 이벤트 리스너가 수신하여 커스텀 이벤트 리스트에 표시합니다.
6. 연결 중 오류가 발생하면 `onerror`가 발생하여 빨간색으로 상태를 표시하고, `EventSource`가 자동으로 재연결을 시도합니다.
7. 클라이언트가 페이지를 닫거나 연결을 종료하면, 서버 측에서 `req.on("close")`가 발생하여 두 interval을 정리합니다.
