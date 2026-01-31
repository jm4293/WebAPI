# Notification API

## 개요
Notification API는 웹 페이지에서 운영체제 수준의 알림(desktop notification)을 표시할 수 있는 기능을 제공합니다. 브라우저 창 밖에서도 사용자에게 중요한 정보를 전달할 수 있으며, 알림 클릭 시 특정 페이지로 이동하는 기능도 지원합니다.

## 권한
- **알림(Notification) 권한** 필요
- 페이지 로드 시 브라우저가 권한 요청 다이얼로그를 자동으로 표시합니다.
- 사용자가 권한 다이얼로그에서 **허용**해야 알림 표시가 가능합니다.
- 권한 상태는 `granted`, `denied`, `default` 중 하나입니다.

## 폴더 구조
```
notifications/
├── index.html          # 앱의 진입점, HTML 구조 정의
└── src/
    ├── main.js         # Notification API 로직 및 버튼 이벤트 처리
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 기본 HTML 구조를 정의하며, `main.js`와 `style.css`를 로드합니다.

### src/main.js
Notification API의 핵심 로직을 포함하는 파일입니다. 주요 구성요소는 다음과 같습니다.

- **알림 버튼 렌더링**: 사용자가 클릭하여 알림을 발생시키는 버튼을 생성합니다.
- **`requestNotificationPermission()`**: 페이지 로드 시 자동으로 호출되며, `Notification.requestPermission()`을 통해 권한을 요청합니다. 권한 결과(`granted` / `denied` / `default`)를 console에 출력합니다.
- **`btnNotification` 클릭 핸들러**:
  - `Notification.permission`이 `"granted"`인지 확인합니다.
  - `granted`이면 `new Notification("새로운 메시지가 도착했습니다!", { body: "..." })`로 알림을 표시합니다.
  - `notification.onclick`을 설정하여 알림을 클릭하면 `window.open("https://github.com/jm4293/WebAPI")`로 GitHub 페이지를 열기합니다.
  - 권한이 `granted`가 아니면 `alert()`로 권한 허용을 안내합니다.

### src/style.css
페이지의 레이아웃과 버튼 등의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 `requestNotificationPermission()`이 자동으로 실행됩니다.
2. 브라우저가 사용자에게 알림 권한 요청 다이얼로그를 표시합니다.
3. 사용자가 권한을 허용하거나 거부하며, 결과가 console에 출력됩니다.
4. 사용자가 알림 버튼을 클릭합니다.
5. 현재 권한 상태(`Notification.permission`)를 확인합니다.
6. 권한이 `granted`이면 운영체제 수준의 알림이 표시됩니다.
7. 알림을 클릭하면 GitHub 페이지(`https://github.com/jm4293/WebAPI`)가 새 탭으로 열립니다.
8. 권한이 `granted`가 아니면 `alert()`를 통해 권한 허용을 안내합니다.
