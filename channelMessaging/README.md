# Channel Messaging API (MessageChannel)

## 개요
Channel Messaging API는 `MessageChannel`과 `MessagePort`를 활용하여 두 컨텍스트 간에 독립적인 양방향 통신 채널을 생성할 수 있는 API입니다. `postMessage()`의 단순한 단일 방향 통신과 달리, 포트(port) 기반의 안정적인 양방향 통신이 가능합니다. 이 프로젝트에서는 세 가지 시나리오를 구현합니다: iframe과의 통신, 새 탭(팝업)과의 통신, Web Worker와의 통신입니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
channelMessaging/
├── index.html              # 메인 페이지 엔트리포인트 HTML
├── iframe_page_1.html      # iframe으로 로드되는 페이지
├── iframe_page_2.html      # 팝업으로 열리는 페이지
├── worker.js               # Web Worker 파일
└── src/
    ├── main_1.js           # 메인 페이지 ↔ iframe 통신 로직
    ├── main_2.js           # 메인 페이지 ↔ 새 탭(팝업) 통신 로직
    ├── main_3.js           # 메인 페이지 ↔ Web Worker 통신 로직
    ├── iframe_page_1.js    # iframe 측 통신 스크립트
    ├── iframe_page_2.js    # 팝업 측 통신 스크립트
    └── style.css           # 페이지 및 UI 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 세 가지 통신 시나리오를 탭/섹션으로 구성한 메인 페이지 |
| `src/main_1.js` | iframe에 MessageChannel의 포트를 전달하고 양방향 통신 수행 |
| `src/main_2.js` | 새 탭(팝업)에 포트를 전달하고 양방향 통신 수행 |
| `src/main_3.js` | Web Worker에 포트를 전달하고 양방향 통신 수행 |
| `src/iframe_page_1.js` | iframe 측에서 포트를 수신하고 통신 처리 |
| `src/iframe_page_2.js` | 팝업 측에서 포트를 수신하고 통신 처리 |
| `iframe_page_1.html` | iframe으로 로드되는 HTML 페이지 |
| `iframe_page_2.html` | 팝업으로 열리는 HTML 페이지 |
| `worker.js` | Web Worker: 수신된 메시지를 대문자로 변환하여 응답 |
| `src/style.css` | 전체 UI 레이아웃 및 스타일 |

## 파일 설명

### index.html
세 가지 통신 시나리오(iframe, 팝업, Worker)를 구성한 메인 페이지입니다. 각 시나리오에 해당하는 UI와 스크립트를 포함합니다.

### src/main_1.js (메인 페이지 ↔ iframe 통신)
- `new MessageChannel()`로 채널을 생성하여 `port1`과 `port2`를 얻습니다.
- iframe의 `onload` 이벤트에서 `iframe.contentWindow.postMessage("init1", "*", [channel.port2])`로 `port2`를 iframe 측에 전달합니다.
- 메인 페이지 측에서는 `port1`을 사용하여 메시지를 전송(`port1.postMessage()`)하고 수신(`port1.onmessage`)합니다.

### src/main_2.js (메인 페이지 ↔ 새 탭(팝업) 통신)
- `window.open()`으로 새 탭을 열고, 새 탭이 로드되면 `postMessage("init2", "*", [channel.port2])`로 `port2`를 전달합니다.
- 메인 페이지 측에서는 `port1`으로 양방향 통신을 수행합니다.

### src/main_3.js (메인 페이지 ↔ Web Worker 통신)
- `new Worker("worker.js")`로 워커를 생성합니다.
- `worker.postMessage("init3", [channel.port2])`로 `port2`를 워커에 전달합니다.
- 메인 페이지 측에서는 `port1`으로 통신합니다.

### src/iframe_page_1.js (iframe 측 스크립트)
- `window.onmessage` 핸들러에서 `"init1"` 이벤트를 감지하여 전달된 포트를 저장합니다.
- `port.onmessage`로 메인 페이지로부터 메시지를 수신합니다.
- `port.postMessage()`로 메인 페이지로 응답을 전송합니다.

### src/iframe_page_2.js (팝업 측 스크립트)
- `window.onmessage` 핸들러에서 `"init2"` 이벤트를 감지하여 전달된 포트를 저장합니다.
- 동일한 포트 기반의 양방향 통신을 수행합니다.

### worker.js (Web Worker)
- `self.onmessage` 핸들러에서 `"init3"` 메시지를 감지하여 전달된 포트를 저장합니다.
- 포트를 통해 수신된 메시지를 **대문자로 변환**하여 응답으로 전송합니다.

### src/style.css
세 가지 통신 시나리오 UI의 레이아웃, 입력란, 메시지 영역 스타일을 정의합니다.

## 동작 순서

**시나리오 1: iframe과의 통신**
1. 메인 페이지가 로드되면 `main_1.js`에서 `MessageChannel`을 생성합니다.
2. iframe이 로드되면 `postMessage("init1", "*", [channel.port2])`로 `port2`를 iframe에 전달합니다.
3. iframe 측 `iframe_page_1.js`에서 `window.onmessage`로 포트를 수신하고 저장합니다.
4. 메인 페이지에서 `port1.postMessage()`로 메시지를 전송하면, iframe 측 `port.onmessage`에서 수신합니다.
5. iframe 측에서 `port.postMessage()`로 응답하면, 메인 페이지의 `port1.onmessage`에서 수신합니다.

**시나리오 2: 새 탭(팝업)과의 통신**
1. 메인 페이지에서 `main_2.js`가 실행되고 버튼 클릭 시 `window.open()`으로 새 탭을 열어냅니다.
2. 새 탭이 로드되면 `postMessage("init2", "*", [channel.port2])`로 포트를 전달합니다.
3. 팝업 측 `iframe_page_2.js`에서 포트를 수신하고 저장합니다.
4. 이후 `port1`과 수신된 포트를 통해 메인 페이지와 팝업 간 양방향 통신이 진행됩니다.

**시나리오 3: Web Worker와의 통신**
1. `main_3.js`에서 `new Worker("worker.js")`로 워커를 생성합니다.
2. `worker.postMessage("init3", [channel.port2])`로 포트를 워커에 전달합니다.
3. 워커 측 `worker.js`에서 `self.onmessage`로 포트를 수신하고 저장합니다.
4. 메인 페이지에서 `port1.postMessage()`로 메시지를 전송하면, 워커가 수신합니다.
5. 워커는 수신된 메시지를 대문자로 변환하여 `port.postMessage()`로 응답합니다.
6. 메인 페이지의 `port1.onmessage`에서 변환된 메시지를 수신합니다.
