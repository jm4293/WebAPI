# Performance API

## 개요
Performance API는 웹 페이지의 성능을 측정하고 모니터링할 수 있는 강력한 API입니다. 이 프로젝트에서는 Performance API를 활용하여 페이지 로드 시간, 리소스 로딩 성능, 사용자 정의 작업의 소요 시간, 페인트 타이밍, 긴 작업(long task) 감지 등을 측정하고 화면에 표시합니다. `performance.getEntriesByType()`, `performance.mark()`, `performance.measure()`, `PerformanceObserver` 등을 사용하여 다양한 성능 메트릭을 수집합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
performance/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # Performance API 핵심 로직
    └── style.css       # 페이지 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | Performance API를 활용한 성능 측정 및 모니터링 로직 |
| `src/style.css` | 출력 영역 및 전체 레이아웃 스타일 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, 성능 측정 결과가 렌더링될 `<div id="output">` 컨테이너를 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
Performance API를 사용하여 다양한 성능 메트릭을 측정하고 화면에 표시합니다.

**UI 렌더링**
- `<div id="output">`: 성능 측정 결과를 표시하는 영역입니다.
- `outputText(label, time)` 함수: 레이블과 시간 값을 포맷하여 output div에 추가합니다.

**페이지 로드 시간 측정**
- `window.addEventListener("load", ...)`로 페이지가 완전히 로드된 시점을 감지합니다.
- `performance.getEntriesByType("navigation")[0]`로 네비게이션 타이밍 정보를 가져옵니다.
- `loadEventEnd - startTime`으로 전체 페이지 로드 시간을 계산합니다.

**리소스 로딩 성능 측정**
- `performance.getEntriesByType("resource")`로 모든 리소스(JS, CSS, 이미지 등)의 성능 정보를 가져옵니다.
- 각 리소스에 대해 `responseEnd - startTime`으로 로딩 시간을 계산합니다.
- 리소스명과 함께 소요 시간을 화면에 표시합니다.

**사용자 정의 작업 시간 측정**
- `performance.mark("task-start")`로 시작 지점을 마킹합니다.
- 작업 실행 후 `performance.mark("task-end")`로 종료 지점을 마킹합니다.
- `performance.measure("task-duration", "task-start", "task-end")`로 두 마크 사이의 시간을 측정합니다.
- `performance.getEntriesByType("measure")[0]`로 측정 결과를 가져와 화면에 표시합니다.

**페인트 타이밍 관찰**
- `PerformanceObserver`를 생성하여 paint 이벤트를 관찰합니다.
- `first-paint`와 `first-contentful-paint` 타이밍을 감지합니다.
- 각 페인트 이벤트의 `startTime`을 화면에 표시합니다.

**긴 작업(Long Task) 감지**
- `PerformanceObserver`를 사용하여 `longtask` 타입의 이벤트를 관찰합니다.
- 50ms 이상 걸리는 작업이 감지되면 화면에 표시합니다.
- `simulateLongTask()` 함수로 약 100ms 동안 CPU를 점유하는 긴 작업을 시뮬레이션합니다.

### src/style.css
출력 영역의 폰트, 색상, 간격과 전체 레이아웃을 정의합니다.

## 동작 순서

1. 페이지가 로드되기 시작하면 브라우저가 자동으로 성능 데이터를 수집합니다.
2. `main.js`가 실행되어 UI 요소를 렌더링하고 성능 측정을 시작합니다.
3. 리소스 로딩 성능을 측정하여 각 리소스의 로딩 시간을 화면에 표시합니다.
4. `startTask()` 함수가 실행되어 사용자 정의 작업의 시간 측정을 시작합니다.
5. `performance.mark("task-start")`로 시작 지점을 마킹합니다.
6. 500ms 후 `setTimeout` 콜백이 실행되어 `performance.mark("task-end")`로 종료 지점을 마킹합니다.
7. `performance.measure()`로 두 마크 사이의 시간을 측정하고 결과를 화면에 표시합니다.
8. `PerformanceObserver`가 paint 이벤트를 감지하여 `first-paint`와 `first-contentful-paint` 타이밍을 표시합니다.
9. `PerformanceObserver`가 longtask 이벤트를 감지하기 위해 대기합니다.
10. `simulateLongTask()` 함수가 실행되어 약 100ms 동안 CPU를 점유합니다.
11. 긴 작업이 감지되면 `PerformanceObserver`의 콜백이 실행되어 작업 소요 시간을 화면에 표시합니다.
12. 페이지가 완전히 로드되면 `window.addEventListener("load", ...)` 콜백이 실행됩니다.
13. 네비게이션 타이밍 정보를 가져와 전체 페이지 로드 시간을 계산하고 화면에 표시합니다.
14. 모든 성능 측정 결과가 화면에 표시되어 사용자가 확인할 수 있습니다.

---

## 출처

- [YouTube - GIS DEVELOPER | Performance API](https://www.youtube.com/watch?v=QMiW0kU4bjQ&list=PLe6NQuuFBu7EgOm0n1l-qzn1hDBG5AW8_&index=41)
