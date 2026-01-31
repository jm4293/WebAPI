# Intersection Observer API

## 개요
Intersection Observer API는 특정 요소가 뷰포트(또는 지정된 루트 요소) 내에 보이는지를 비동기적으로 관찰하는 API입니다. 이 프로젝트는 Intersection Observer를 활용하여 이미지의 지연 로딩(Lazy Loading)을 구현합니다. 이미지가 뷰포트에 50% 이상 보일 때까지 로드하지 않고, 해당 시점에 이미지를 비동기적으로 로드하여 초기 페이지 로드 속도를 향상시킵니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
intersectionObserver/
├── index.html          # 앱의 진입점. 8개의 lazy-image div 요소를 포함하는 UI 구조 제공
└── src/
    ├── main.js         # Intersection Observer를 이용한 지연 로딩 로직 구현
    └── style.css       # 이미지 영역 및 페이지 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의합니다. 8개의 `.lazy-image` div 요소를 포함하며, 각 요소는 `data-src` 속성에 실제 이미지 경로(01.jpg ~ 08.jpeg)를 저장하고 있습니다. 초기 상태에서는 이미지를 로드하지 않습니다.

### src/main.js
Intersection Observer를 생성하고, 이를 활용한 이미지 지연 로딩 로직을 구현합니다. 주요 구성 요소는 다음과 같습니다.

- **IntersectionObserver 생성**: 옵션으로 `root: null`(뷰포트를 루트로 사용), `rootMargin: "0px"`, `threshold: 0.5`(요소의 50%가 보이면 트리거)를 설정합니다.
- **observerCallback**: 각 관찰 대상 요소에 대해 다음과 같이 처리합니다.
  - `entry.isIntersecting`이 `true`일 때만 로드 로직을 실행합니다.
  - `data-src` 속성에서 이미지 경로를 가져와 `new Image()`로 이미지 객체를 생성합니다.
  - `onload`: 이미지 로드에 성공하면 해당 div의 `backgroundImage`를 `url()`로 설정하고 `"loaded"` 클래스를 추가합니다.
  - `onerror`: 이미지 로드에 실패하면 해당 div에 "이미지 로드 실패" 텍스트와 `"error"` 클래스를 표시합니다.
  - 로드 완료 후 `observer.unobserve()`를 호출하여 해당 요소의 관찰을 종료합니다.
- **초기 등록**: 페이지 로드 시 모든 `.lazy-image` 요소에 대해 `observer.observe()`를 호출하여 관찰을 시작합니다.

### src/style.css
`.lazy-image` 요소의 초기 상태 스타일, 로드 완료 후의 변화, 에러 상태 표시 등 전체 페이지의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 8개의 `.lazy-image` div가 렌더링되지만, 이미지는 아직 로드되지 않습니다. 각 div의 `data-src` 속성에만 이미지 경로가 저장되어 있습니다.
2. `IntersectionObserver`가 생성되고, 모든 `.lazy-image` 요소에 대해 `observer.observe()`를 호출하여 관찰을 시작합니다.
3. 사용자가 스크롤하면서 특정 `.lazy-image` 요소가 뷰포트에 50% 이상 보이면 `observerCallback`이 트리거됩니다.
4. 콜백에서 `entry.isIntersecting`이 `true`임을 확인하고, `data-src`에서 이미지 경로를 가져옵니다.
5. `new Image()`로 이미지 객체를 생성하고 `src`를 설정하여 비동기 로드를 시작합니다.
6. 이미지 로드에 성공하면 해당 div의 `backgroundImage`에 이미지를 적용하고 `"loaded"` 클래스를 추가합니다.
7. 이미지 로드에 실패하면 해당 div에 "이미지 로드 실패" 텍스트와 `"error"` 클래스를 표시합니다.
8. 로드 처리가 완료되면 `observer.unobserve()`를 호출하여 해당 요소에 대한 관찰을 종료하고, 불필요한 콜백 실행을 방지합니다.
