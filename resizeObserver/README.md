# ResizeObserver API

## 개요
ResizeObserver API는 특정 DOM 요소의 크기가 변경될 때를 감지하여 콜백을 실행할 수 있는 기능을 제공합니다. `window`의 `resize` 이벤트와 달리 개별 요소의 크기 변화를 관찰할 수 있으며, 콘텐츠 영역과 보더 영역의 크기 정보를 모두 제공합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
resizeObserver/
├── index.html          # 앱의 진입점, HTML 구조 정의
└── src/
    ├── main.js         # ResizeObserver 로직 및 크기 조절 기능
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 기본 HTML 구조를 정의하며, `main.js`와 `style.css`를 로드합니다.

### src/main.js
ResizeObserver API의 핵심 로직을 포함하는 파일입니다. 주요 구성요소는 다음과 같습니다.

- **렌더링**: 크기 조절 가능한 DIV, 랜덤 크기 변경 버튼, 현재 크기를 표시하는 영역을 생성합니다.
- **ResizeObserver 생성**: `new ResizeObserver(callback)`로 옵저버를 생성합니다.
  - 콜백에서 `entry.contentRect`의 `width`와 `height`를 읽어 크기 표시 영역에 업데이트합니다.
  - 추가로 `entry.contentBoxSize`와 `entry.borderBoxSize`를 console에 출력하여 상세 크기 정보를 확인할 수 있습니다.
- **관찰 시작**: `resizeObserver.observe(resizableDiv)`를 호출하여 크기 조절 가능한 DIV의 크기 변화를 관찰합니다.
- **관찰 종료**: `setTimeout`을 사용하여 **5000ms(5초)** 후 `resizeObserver.unobserve(resizableDiv)`를 호출하여 관찰을 종료합니다.
- **`resizeBtn` 클릭 핸들러**: 클릭하면 `100px`부터 `400px` 범위의 랜덤 `width`와 `height`를 생성하여 DIV의 `style`에 적용합니다.

### src/style.css
페이지의 레이아웃과 크기 조절 가능한 DIV 등의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 크기 조절 가능한 DIV, 랜덤 크기 변경 버튼, 크기 표시 영역이 렌더링됩니다.
2. `new ResizeObserver(callback)`로 옵저버가 생성됩니다.
3. `resizeObserver.observe(resizableDiv)`를 호출하여 DIV의 크기 변화 관찰이 시작됩니다.
4. 사용자가 **랜덤 크기 변경 버튼**을 클릭하면 100~400px 범위의 랜덤 크기가 DIV에 적용됩니다.
5. DIV의 크기가 변경되면 ResizeObserver의 콜백이 실행됩니다.
6. 콜백에서 `entry.contentRect`의 `width`와 `height`를 읽어 크기 표시 영역에 업데이트합니다.
7. `entry.contentBoxSize`와 `entry.borderBoxSize`도 console에 출력됩니다.
8. 페이지 로드 후 **5초가 경과하면** `resizeObserver.unobserve()`가 호출되어 관찰이 종료됩니다.
9. 관찰이 종료된 후 버튼을 클릭해도 콜백이 더 이상 실행되지 않습니다.
