# Page Visibility API

## 개요
Page Visibility API는 현재 페이지가 사용자에게 보이는지(visible) 숨겨져 있는지(hidden) 여부를 감지할 수 있는 기능을 제공합니다. 사용자가 다른 탭으로 이동하거나 브라우저를 최소화하면 페이지가 숨겨져 있음을 감지하여, 불필요한 리소스 소비(예: 타이머)를 줄일 수 있습니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
pageVisibility/
├── index.html          # 앱의 진입점, HTML 구조 정의
└── src/
    ├── main.js         # Page Visibility API 로직 및 타이머 제어
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 기본 HTML 구조를 정의하며, `main.js`와 `style.css`를 로드합니다.

### src/main.js
Page Visibility API와 타이머 로직을 포함하는 핵심 파일입니다. 주요 구성요소는 다음과 같습니다.

- **렌더링**: 페이지 가시성 상태를 표시하는 영역과 타이머 카운터를 표시하는 영역을 생성합니다.
- **타이머 로직**:
  - `startTimer()`: `setInterval`을 사용하여 1초마다 카운터를 1 증가시킵니다.
  - `stopTimer()`: `clearInterval`을 호출하여 타이머를 정지합니다.
- **`updatePageStatus()`**: 페이지 가시성 상태를 감지하고 UI를 업데이트합니다.
  - `document.visibilityState`로 현재 상태(`"visible"` 또는 `"hidden"`)를 표시합니다.
  - `document.hidden`이 `true`이면 (페이지가 숨겨져 있으면) 상태 영역의 색상을 **빨간색**으로 변경하고 `stopTimer()`를 호출합니다.
  - `document.hidden`이 `false`이면 (페이지가 보이면) 상태 영역의 색상을 **초록색**으로 변경하고 `startTimer()`를 호출합니다.
- **초기화**: 페이지 로드 시 `updatePageStatus()`를 즉시 실행합니다.
- **이벤트 리스너**: `document`에 `"visibilitychange"` 이벤트 리스너를 등록하여 가시성 변경 시 `updatePageStatus()`를 호출합니다.

### src/style.css
페이지의 레이아웃과 상태 표시 영역 등의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 `updatePageStatus()`가 즉시 실행되어 초기 가시성 상태를 표시합니다.
2. 페이지가 현재 보이는 상태이면 상태 영역이 **초록색**으로 표시되고, 타이머가 시작됩니다.
3. 타이머는 1초마다 카운터를 1씩 증가시킵니다.
4. 사용자가 다른 탭으로 이동하거나 브라우저를 최소화하면 `"visibilitychange"` 이벤트가 발생합니다.
5. `updatePageStatus()`가 호출되어 `document.hidden`이 `true`임을 감지합니다.
6. 상태 영역의 색상이 **빨간색**으로 변경되고, `stopTimer()`가 호출되어 타이머가 정지됩니다.
7. 사용자가 다시 해당 탭으로 돌아오면 `"visibilitychange"` 이벤트가 다시 발생합니다.
8. `updatePageStatus()`가 호출되어 상태 영역이 **초록색**으로 복원되고, `startTimer()`가 호출되어 타이머가 다시 시작됩니다.
