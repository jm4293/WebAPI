# Web Animations API

## 개요
Web Animations API는 JavaScript를 통해 DOM 요소에 키프레임 기반 애니메이션을 적용할 수 있는 API입니다. CSS 애니메이션과 동일한 수준의 성능을 제공하면서, 프로그램적으로 애니메이션을 생성·제어(시작, 일시중지, 재개, 취소, 역재생)할 수 있습니다. 또한 `.finished` 프로미스를 활용한 애니메이션 체이닝도 지원합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
animations/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # Web Animations API 핵심 로직
    └── style.css       # 페이지 및 요소 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | box·circle 요소의 애니메이션 생성 및 제어 로직 |
| `src/style.css` | 초기 레이아웃과 요소 스타일 정의 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, `#app` 컨테이너를 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
Web Animations API를 사용하여 두 종류의 애니메이션을 구현합니다.

**Box 애니메이션 (수동 제어)**
- `#app`에 `circle`, `box`, 그리고 시작/일시중지/재개/취소/역재생 총 5개의 제어 버튼을 렌더링합니다.
- **시작 (`btnStartAnimation`)**: `box` 요소에 `.animate()` 호출로 키프레임 애니메이션을 생성합니다.
  - 키프레임: `translateX(0) → translateX(400px)`, `rotate(0) → rotate(360deg)`, `backgroundColor: blue → red`
  - 옵션: `duration: 2000`, `iterations: 2`, `direction: "alternate"`, `easing: "ease-in-out"`, `fill: "forwards"`
  - `onfinish`, `oncancel` 이벤트 핸들러를 등록하여 애니메이션 종료/취소 시 콜백 실행
- **일시중지 (`btnPauseAnimation`)**: `animation.pause()`로 애니메이션을 정지
- **재개 (`btnResumeAnimation`)**: `animation.play()`로 정지된 애니메이션을 재개
- **취소 (`btnCancelAnimation`)**: `animation.cancel()`로 애니메이션을 취소하고 초기 상태로 복원
- **역재생 (`btnReverseAnimation`)**: `animation.reverse()`로 애니메이션 재생 방향을 반전

**Circle 애니메이션 (자동 실행 및 체이닝)**
- 페이지 로드 시 `circle` 요소에 자동으로 3단계 키프레임 애니메이션이 시작됩니다. `offset: 0.5`를 사용하여 중간 단계의 키프레임을 지정합니다.
- `.finished` 프로미스를 활용하여, 첫 번째 애니메이션이 완료되면 Scale + Rotate 페이드아웃 애니메이션이 체이닝되어 자동 실행됩니다.

### src/style.css
`box`와 `circle` 요소의 초기 크기·색상·위치 등의 스타일과, 전체 레이아웃 및 버튼 디자인을 정의합니다.

## 동작 순서

1. 페이지가 로드되면 `main.js`가 실행되어 `#app` 내부에 `circle`, `box`, 제어 버튼들을 렌더링합니다.
2. `circle` 요소에 3단계 키프레임 애니메이션이 자동으로 시작됩니다 (`offset: 0.5` 활용).
3. `circle` 애니메이션이 완료되면 `.finished` 프로미스가 이행되고, Scale + Rotate 페이드아웃 애니메이션이 체이닝되어 실행됩니다.
4. 사용자가 **시작** 버튼을 클릭하면 `box` 요소에 `.animate()`가 호출되어 키프레임 애니메이션이 시작됩니다.
5. 애니메이션 진행 중 사용자가 **일시중지** 버튼을 클릭하면 `animation.pause()`로 정지됩니다.
6. **재개** 버튼 클릭 시 `animation.play()`로 정지된 지점부터 다시 재생됩니다.
7. **역재생** 버튼 클릭 시 `animation.reverse()`로 재생 방향이 반전됩니다.
8. **취소** 버튼 클릭 시 `animation.cancel()`로 애니메이션이 취소되고 `oncancel` 핸들러가 실행됩니다.
9. 애니메이션이 정상적으로 완료되면 `onfinish` 핸들러가 실행됩니다.
