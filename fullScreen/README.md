# Fullscreen API

## 개요
Fullscreen API는 웹 앱에서 특정 요소를 전체 화면으로 표시할 수 있는 기능을 제공합니다. 사용자가 버튼을 클릭하면 지정된 요소가 전체 화면으로 전환되고, 다시 클릭하면 복귀합니다. 이 프로젝트에서는 `<video>` 요소를 대상으로 전체 화면 토글 기능을 구현합니다.

## 권한
사용자 인터랙션(버튼 클릭) 후에만 전체 화면 요청이 가능합니다. 스크립트에서 자동으로 전체 화면을 요청하면 브라우저가 차단합니다.

## 폴더 구조
```
fullScreen/
├── index.html          # 앱의 진입점, <video> 요소와 전체 화면 토글 버튼의 기본 레이아웃 제공
└── src/
    ├── main.js         # Fullscreen API 호출 및 전체 화면 토글 로직 구현
    └── style.css       # 비디오 영역, 버튼 등의 스타일 정의
```

## 파일 설명

### index.html
앱의 진입점으로, `<video>` 요소와 전체 화면 토글 버튼을 포함하는 레이아웃을 구성합니다. `src/main.js`와 `src/style.css`를 로드합니다.

### src/main.js
Fullscreen API를 사용하여 전체 화면 토글 기능을 구현하는 핵심 파일입니다.

- **전체 화면 토글 버튼 클릭 처리**
  - 버튼이 클릭되면 `document.fullscreenElement`의 존재 여부를 확인합니다.
  - 현재 전체 화면 요소가 없으면(`fullscreenElement`가 `null`) `video.requestFullscreen()`을 호출하여 비디오 요소를 전체 화면으로 전환합니다.
  - 이미 전체 화면 중이면 `document.exitFullscreen()`을 호출하여 전체 화면을 종료합니다.

- **`fullscreenchange` 이벤트 리스너**
  - `document`에 `fullscreenchange` 이벤트 리스너를 등록합니다.
  - 이벤트가 발생할 때마다 `document.fullscreenElement`의 존재 여부를 확인하여, 전체 화면 중이면 버튼 텍스트를 `"전체 화면 종료"`로, 아니면 `"전체 화면 토글"`로 업데이트합니다.

### src/style.css
비디오 영역과 전체 화면 토글 버튼의 스타일을 정의합니다.

## 동작 순서
1. 앱이 로드되면 `<video>` 요소와 전체 화면 토글 버튼이 렌더링됩니다.
2. 사용자가 "전체 화면 토글" 버튼을 클릭합니다.
3. `document.fullscreenElement`가 `null`인지 확인합니다.
4. `null`이면(전체 화면 아닌 상태) `video.requestFullscreen()`을 호출하여 비디오가 전체 화면으로 전환됩니다.
5. `fullscreenchange` 이벤트가 발생하여 버튼 텍스트가 `"전체 화면 종료"`로 변경됩니다.
6. 사용자가 다시 버튼을 클릭하면 `document.exitFullscreen()`이 호출되어 전체 화면이 종료됩니다.
7. `fullscreenchange` 이벤트가 다시 발생하여 버튼 텍스트가 `"전체 화면 토글"`로 복원됩니다.
