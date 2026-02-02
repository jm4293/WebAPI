# Cross-Origin Communication (postMessage)

## 📌 출처 및 강의 정보
본 프로젝트의 모든 학습 자료와 강의 구성의 저작권은 **GIS Developer**에 있습니다.
* **강의 채널:** [GIS Developer 유튜브 채널](https://www.youtube.com/@gisdeveloper)
* **강의 영상:** [Cross-Origin Communication (postMessage) 강의 바로가기](https://www.youtube.com/watch?v=gcno0WeBDVk&list=PLe6NQuuFBu7EgOm0n1l-qzn1hDBG5AW8_&index=14)

---

## 개요
Cross-Origin Communication은 `postMessage` API를 사용하여 서로 다른 오리진(origin) 간에 안전하게 메시지를 주고받을 수 있는 방법입니다. 이 프로젝트에서는 부모 페이지(localhost:5173)와 iframe으로 로드된 자식 페이지(localhost:8080) 간에 양방향 메시지 전송을 구현합니다. `postMessage()`로 메시지를 전송하고, `message` 이벤트 리스너로 수신하며, 오리진 검증을 통해 보안을 강화합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
crossOriginCommunication/
├── index.html          # 부모 페이지 HTML 파일
├── child_homepage/     # 자식 페이지 디렉토리 (localhost:8080)
│   └── index.html      # iframe으로 로드될 자식 페이지
└── src/
    ├── main.js         # 부모 페이지의 postMessage 로직
    └── style.css       # 부모 페이지 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 부모 페이지의 HTML 구조 및 iframe 포함 |
| `child_homepage/index.html` | iframe으로 로드될 자식 페이지 |
| `src/main.js` | 부모 페이지의 postMessage 전송 및 수신 로직 |
| `src/style.css` | 부모 페이지 레이아웃 스타일 |

## 파일 설명

### index.html
부모 페이지의 기본 HTML 구조를 제공하며, `<iframe>` 요소로 자식 페이지(localhost:8080)를 로드합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### child_homepage/index.html
iframe으로 로드될 자식 페이지입니다. 자체적으로 `postMessage`를 사용하여 부모 페이지로 메시지를 전송하고, 부모로부터 메시지를 수신합니다.

### src/main.js
부모 페이지에서 postMessage를 사용한 크로스 오리진 통신을 구현합니다.

**UI 렌더링**
- `<iframe id="myIframe">`: 자식 페이지(localhost:8080)를 로드하는 iframe 요소입니다.
- `<button id="sendMessageButton">`: iframe으로 메시지를 전송하는 버튼입니다.
- `<div id="receivedMessage">`: iframe에서 수신한 메시지를 표시하는 영역입니다.

**메시지 전송**
- 버튼 클릭 시 `onclick` 이벤트가 실행됩니다.
- `iframe.contentWindow.postMessage(message, "http://localhost:8080")`를 호출하여 iframe으로 메시지를 전송합니다.
- 메시지 객체는 `text`와 `timestamp` 속성을 포함합니다.
- 두 번째 매개변수로 타겟 오리진(`http://localhost:8080`)을 명시하여 보안을 강화합니다.

**메시지 수신**
- `window.addEventListener("message", ...)`로 메시지 이벤트를 수신합니다.
- `event.origin`을 검증하여 `http://localhost:8080`에서 온 메시지만 처리합니다.
- 검증을 통과한 메시지는 `receivedMessage` div에 표시됩니다.

**오리진 검증**
- `event.origin !== "http://localhost:8080"` 조건으로 신뢰할 수 없는 오리진의 메시지를 차단합니다.
- 이를 통해 XSS 공격이나 악의적인 메시지 주입을 방지합니다.

### src/style.css
iframe, 버튼, 메시지 표시 영역의 크기, 색상, 간격과 전체 레이아웃을 정의합니다.

## 동작 순서

1. 페이지가 로드되면 `main.js`가 실행되어 부모 페이지의 UI 요소들을 렌더링합니다.
2. `<iframe>` 요소가 자식 페이지(localhost:8080)를 로드합니다.
3. 자식 페이지도 자체적으로 postMessage 로직을 포함하여 부모 페이지와 통신할 준비를 합니다.
4. 사용자가 부모 페이지의 "iframe으로 메시지 전송" 버튼을 클릭합니다.
5. `sendMessageButton.onclick` 이벤트가 실행되어 메시지 객체를 생성합니다.
6. `iframe.contentWindow.postMessage(message, "http://localhost:8080")`를 호출하여 iframe으로 메시지를 전송합니다.
7. iframe(자식 페이지)의 `message` 이벤트 리스너가 메시지를 수신합니다.
8. 자식 페이지는 오리진을 검증한 후 메시지를 처리하고, 화면에 표시합니다.
9. 자식 페이지에서 부모 페이지로 응답 메시지를 전송할 수 있습니다.
10. 부모 페이지의 `window.addEventListener("message", ...)` 리스너가 자식으로부터 메시지를 수신합니다.
11. `event.origin`을 검증하여 `http://localhost:8080`에서 온 메시지인지 확인합니다.
12. 검증을 통과한 메시지는 `receivedMessage` div에 표시됩니다.
13. 오리진이 일치하지 않으면 메시지를 무시하고 처리하지 않습니다.
