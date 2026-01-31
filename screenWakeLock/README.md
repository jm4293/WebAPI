# Screen Wake Lock API

## 개요
Screen Wake Lock API는 장치의 화면이 자동으로 꺼지지 않도록 유지하는 기능을 제공합니다. 영상 재생, 레시피 표시 등 사용자가 화면을 계속 보아야 하는 상황에서 유용합니다. `navigator.wakeLock.request("screen")`을 호출하여 Wake Lock을 요청하고, `wakeLock.release()`로 해제할 수 있습니다.

## 권한
Wake Lock은 활성화된 탭(포그라운드 탭)에서만 요청할 수 있습니다. 특별한 권한 다이얼로그는 표시되지 않으며, 탭이 포그라운드 상태에 있는 것만 충족하면 됩니다.

## 폴더 구조
```
screenWakeLock/
├── index.html          # 앱의 진입점, main.js와 style.css를 로드
└── src/
    ├── main.js         # Wake Lock 요청/해제 로직 및 UI 렌더링
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의하며, `src/main.js`와 `src/style.css`를 로드합니다.

### src/main.js
Wake Lock 기능의 핵심 로직을 담당합니다.

- **UI 렌더링**: Wake Lock 토글 버튼과 현재 상태를 표시하는 영역을 렌더링합니다.
- **지원 여부 확인**: `"wakeLock" in navigator`로 brower 지원 여부를 확인합니다. 미지원 시 토글 버튼을 비활성화합니다.
- **`toggleWakeLock()`**: Wake Lock을 요청하거나 해제하는 토글 함수입니다.
  - `wakeLock`이 존재하고 `released`가 `false`이면 `wakeLock.release()`를 호출하여 해제합니다.
  - 그 외의 경우 `navigator.wakeLock.request("screen")`을 호출하여 Wake Lock을 요청합니다.
  - 요청 성공 후 Wake Lock 객체에 `"release"` 이벤트 리스너를 등록하여, Wake Lock이 자동으로 해제될 때 UI 상태를 업데이트합니다.
- **`visibilitychange` 이벤트 핸들링**: `document`에 `visibilitychange` 이벤트를 듣습니다. 탭이 다시 활성화될 때(`document.visibilityState === "visible"`), 이전에 Wake Lock이 있었으면 자동으로 재요청합니다. 이는 탭이 백그라운드로 이동하면 Wake Lock이 자동 해제되기 때문입니다.

### src/style.css
버튼과 상태 표시 영역의 레이아웃과 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드될 때, `"wakeLock" in navigator`로 Wake Lock API 지원 여부를 확인합니다.
2. 미지원 시 토글 버튼을 비활성화하고 사용자에게 안내합니다.
3. 사용자가 토글 버튼을 클릭하면 `toggleWakeLock()`이 호출됩니다.
4. 현재 Wake Lock이 활성 상태가 아니면 `navigator.wakeLock.request("screen")`으로 Wake Lock을 요청합니다.
5. 요청 성공 시 Wake Lock 객체의 `"release"` 이벤트 리스너를 등록하고, UI 상태를 "활성"으로 업데이트합니다.
6. 사용자가 다시 버튼을 클릭하면 `wakeLock.release()`를 호출하여 Wake Lock을 해제합니다.
7. 탭이 백그라운드로 이동하면 Wake Lock이 자동으로 해제됩니다.
8. 탭이 다시 포그라운드로 복귀하면 (`visibilitychange` 이벤트), Wake Lock이 자동으로 재요청됩니다.
