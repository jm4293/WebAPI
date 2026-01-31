# Broadcast Channel API

## 개요
Broadcast Channel API는 동일한 오리진(origin)에서 열린 여러 탭, iframe, 또는 워커 간에 메시지를 방송(broadcast)할 수 있는 API입니다. 이 프로젝트에서는 Broadcast Channel API를 활용하여 다중 탭 간의 실시간 채팅 기능을 구현합니다. 한 탭에서 전송한 메시지가 동일한 채널에 연결된 다른 모든 탭에 즉시 수신됩니다.

## 권한
필요한 권한 없음. 단, 동일 오리진의 여러 탭이 열려있어야 작동합니다.

## 폴더 구조
```
broadcastChannel/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # Broadcast Channel API 핵심 로직 및 채팅 구현
    └── style.css       # 채팅 UI 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | BroadcastChannel 생성, 메시지 전송·수신, UI 렌더링 로직 |
| `src/style.css` | 채팅 UI, 입력란, 메시지 표시 스타일 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, 이름 입력란, 메시지 입력란, 전송 버튼, 수신 메시지 영역을 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
Broadcast Channel API를 사용하여 다중 탭 간 채팅 기능을 구현합니다.

**UI 렌더링**
- 이름 입력란, 메시지 입력란, 전송 버튼, 수신 메시지 영역을 렌더링합니다.

**채널 생성**
- `new BroadcastChannel("chat")`로 이름이 `"chat"`인 채널을 생성합니다. 동일한 오리진에서 같은 채널 이름으로 생성된 모든 인스턴스가 서로 통신할 수 있습니다.

**메시지 전송**
- 전송 버튼을 클릭하면 `{ sender, text, time }` 객체를 생성합니다.
- 먼저 자기 자신의 탭에도 `renderMessage()`를 호출하여 메시지를 표시합니다.
- 이후 `channel.postMessage()`로 동일한 채널에 연결된 다른 탭에 메시지를 전달합니다.

**메시지 수신**
- `channel.onmessage` 핸들러에서 다른 탭에서 전송된 메시지를 수신합니다.
- 수신된 메시지를 `renderMessage()`를 통해 메시지 영역에 표시합니다.

**`renderMessage()` 함수**
- `isSelf` 여부에 따라 CSS 클래스를 다르게 적용합니다.
- 자신이 전송한 메시지와 타인에서 수신된 메시지를 시각적으로 구분하여 표시합니다.

### src/style.css
채팅 UI의 입력란, 버튼, 메시지 영역 레이아웃과 자신/타인 메시지의 색상 구분 스타일을 정의합니다.

## 동작 순서

1. 동일한 오리진의 여러 탭에서 페이지를 열어냅니다.
2. 각 탭에서 `main.js`가 실행되어 UI를 렌더링하고, `new BroadcastChannel("chat")`로 동일한 채널에 연결됩니다.
3. 사용자가 이름과 메시지를 입력한 후 전송 버튼을 클릭합니다.
4. `{ sender, text, time }` 메시지 객체가 생성됩니다.
5. 자기 탭에 먼저 `renderMessage()`가 호출되어 메시지가 표시됩니다 (`isSelf: true`로 스타일 적용).
6. `channel.postMessage()`로 메시지가 동일한 채널의 다른 탭에 방송됩니다.
7. 다른 탭에서 `channel.onmessage` 핸들러가 실행되어 메시지를 수신합니다.
8. 수신된 메시지에 대해 `renderMessage()`가 호출되어 타인 메시지로 스타일이 적용되고 표시됩니다.
