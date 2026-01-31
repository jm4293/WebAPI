# Streams API

## 개요
Streams API는 데이터를 청크 단위로 실시간으로 읽거나 쓰는 기능을 제공합니다. 대량의 데이터를 한 번에 메모리에 로드하지 않고, 조각씩 처리할 수 있어 네트워크 응답의 실시간 처리나 대용량 파일의 스트리밍 저장에 적합합니다. 이 프로젝트는 서버로부터 스트리밍 응답을 받아 실시간으로 처리하거나, 파일로 스트리밍 저장하는 두 가지 기능을 보여드립니다.

## 권한
파일 저장 기능은 File System Access API의 `window.showSaveFilePicker()`를 사용하여 사용자가 저장 위치를 직접 선택해야 합니다. 또한 클라이언트가 스트리밍 데이터를 수신하려면 서버가 먼저 실행되어야 합니다.

## 폴더 구조
```
stream/
├── client/
│   ├── index.html          # 클라이언트 앱의 진입점
│   └── src/
│       ├── main.js         # 스트리밍 처리 및 파일 저장 로직
│       └── style.css       # 클라이언트 페이지 스타일링
└── server/
    └── server.js           # Express.js 스트리밍 서버
```

## 파일 설명

### client/index.html
클라이언트 앱의 HTML 구조를 정의하며, `src/main.js`와 `src/style.css`를 로드합니다.

### client/src/main.js
스트리밍 데이터의 실시간 처리와 파일 저장 로직을 담당합니다.

- **UI 렌더링**: "데이터 실시간 처리" 버튼과 "데이터를 파일로 저장" 버튼을 렌더링합니다.
- **`btnFetchData` (실시간 처리)**:
  - `fetch("http://localhost:3000/stream/10")`으로 10개의 청크를 스트리밍 응답으로 요청합니다.
  - `response.body.getReader()`로 `ReadableStreamDefaultReader`를 가져옵니다.
  - `while` 루프로 `reader.read()`를 반복 호출하여 청크씩 수신합니다.
  - `TextDecoder`로 수신된 바이트를 문자열로 디코딩합니다.
  - 각 청크의 번호와 길이를 `console`에 출력하고, 완료 시 총 청크 수와 총 길이를 출력합니다.
- **`btnDownloadData` (파일로 저장)**:
  - `fetch("http://localhost:3000/stream/100")`으로 100개의 청크를 요청합니다.
  - `window.showSaveFilePicker()`로 사용자가 저장할 파일 경로를 선택합니다.
  - `TransformStream`을 생성하여 수신된 바이트 수를 추적하고 `console`에 출력합니다 (`progressStream`).
  - `response.body.pipeThrough(progressStream).pipeTo(writableStream)`으로 수신된 스트리밍 데이터를 파일에 직접 저장합니다.

### client/src/style.css
클라이언트 페이지의 레이아웃과 스타일을 정의합니다.

### server/server.js
Express.js를 사용한 스트리밍 서버입니다. PORT 3000에서 실행됩니다 (`env.PORT` 우선).

- **GET `/stream/:count` 엔드포인트**: URL 파라미터 `count`로 전송할 청크 수를 결정합니다.
  - 응답 헤더에 `Transfer-Encoding: chunked`를 설정합니다.
  - `setInterval`을 100ms 간격으로 실행하여 JSON 객체를 `res.write()`로 클라이언트에 전송합니다.
  - `lineCount`가 `count`에 도달하면 `res.end()`를 호출하여 응답을 종료합니다.

## 동작 순서
1. 서버를 먼저 실행합니다 (`node server.js`).
2. 클라이언트 페이지를 열면 두 개의 버튼이 표시됩니다.
3. **실시간 처리 흐름**:
   - "데이터 실시간 처리" 버튼을 클릭하면 서버에 10개의 청크를 요청합니다.
   - 서버는 100ms 간격으로 청크를 하나씩 전송합니다.
   - 클라이언트는 `ReadableStreamDefaultReader`로 청크를 하나씩 읽어 `console`에 출력합니다.
   - 10개의 청크를 모두 수신하면 총 청크 수와 총 길이를 출력합니다.
4. **파일 저장 흐름**:
   - "데이터를 파일로 저장" 버튼을 클릭하면 서버에 100개의 청크를 요청합니다.
   - `showSaveFilePicker()`가 표시되어 사용자가 저장할 파일을 선택합니다.
   - 서버에서 전송되는 스트리밍 응답을 `TransformStream`을 거쳐 실시간으로 파일에 저장합니다.
   - 저장 진행 상황(수신된 바이트 수)이 `console`에 실시간으로 출력됩니다.
