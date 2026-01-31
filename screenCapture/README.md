# Screen Capture API (getDisplayMedia)

## 개요
Screen Capture API는 사용자의 화면(모니터, 특정 창, 탭 등)을 캡처하여 실시간으로 스트리밍할 수 있는 기능을 제공합니다. `navigator.mediaDevices.getDisplayMedia()`를 사용하여 화면 캡처 스트림을 가져오고, 이를 `<video>` 요소에 연결하여 실시간 미리보기를 표시할 수 있습니다.

## 권한
- **화면 캡처(Screen Capture) 권한** 필요
- `getDisplayMedia()`를 호출하면 브라우저가 사용자에게 캡처할 화면을 직접 선택하는 다이얼로그를 표시합니다.
- 사용자가 캡처할 화면(모니터, 창, 탭)을 선택해야 캡처가 시작됩니다.
- 사용자가 권한을 거부하면 `NotAllowedError`가 발생합니다.

## 폴더 구조
```
screenCapture/
├── index.html          # 앱의 진입점, HTML 구조 정의
└── src/
    ├── main.js         # Screen Capture API 로직 및 스트림 관리
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 기본 HTML 구조를 정의하며, `main.js`와 `style.css`를 로드합니다. `<video>` 요소가 포함되어 있습니다.

### src/main.js
Screen Capture API의 핵심 로직을 포함하는 파일입니다. 주요 구성요소는 다음과 같습니다.

- **렌더링**: 화면 캡처 시작/종료 토글 버튼, `<video>` 요소, 메시지 표시 영역을 생성합니다.
- **`startCapture()`**:
  - `navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })`를 호출하여 화면 캡처 스트림을 요청합니다.
  - 스트림을 `video.srcObject`에 설정하여 실시간 캡처 화면을 표시합니다.
  - `captureStream.getVideoTracks()[0].onended`를 설정하여 사용자가 브라우저의 "공유 중지" 버튼을 클릭하면 자동으로 캡처를 종료합니다.
- **`stopCapture()`**: 스트림의 모든 트랙에 `.stop()`을 호출하고, `video.srcObject`를 `null`로 초기화하여 캡처를 종료합니다.
- **버튼 클릭 핸들러 (토글)**:
  - `captureStream`이 존재하면 `stopCapture()`를 호출하여 캡처를 종료합니다.
  - `captureStream`이 없으면 `startCapture()`를 호출하여 캡처를 시작합니다.
- **오류 처리**: `getDisplayMedia()`에서 `NotAllowedError`가 발생하면 메시지 영역에 "권한 거부" 메시지를 표시합니다.

### src/style.css
페이지의 레이아웃과 비디오 영역, 버튼 등의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 화면 캡처 시작 버튼, `<video>` 요소, 메시지 영역이 렌더링됩니다.
2. 사용자가 **화면 캡처 시작 버튼**을 클릭합니다.
3. `startCapture()`가 호출되어 `getDisplayMedia()`를 통해 캡처할 화면 선택 다이얼로그가 표시됩니다.
4. 사용자가 캡처할 화면(모니터, 창, 탭)을 선택하면 스트림이 반환됩니다.
5. 스트림이 `video.srcObject`에 설정되어 실시간 캡처 화면이 `<video>` 요소에 표시됩니다.
6. `onended` 핸들러가 등록되어 브라우저의 "공유 중지" 클릭 시 자동 종료를 준비합니다.
7. 사용자가 **버튼을 다시 클릭**하거나 브라우저의 "공유 중지"를 클릭하면 `stopCapture()`가 호출됩니다.
8. 모든 트랙이 정지되고 `video.srcObject`가 `null`로 초기화되어 캡처가 종료됩니다.
9. 사용자가 권한 다이얼로그에서 거부하면 `NotAllowedError`가 발생하고, 메시지 영역에 "권한 거부" 메시지가 표시됩니다.
