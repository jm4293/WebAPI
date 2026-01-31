# View Transitions API

## 개요
View Transitions API는 페이지 내 콘텐츠가 바뀌는 순간에 매끄러운 전환 효과를 제공합니다. `document.startViewTransition()`을 사용하여 콘텐츠 교체를 트리거하면, 이전 콘텐츠와 새 콘텐츠 사이에 자동으로 트랜지션 효과가 적용됩니다. 이를 통해 단일 페이지 앱(SPA)에서도 페이지 이동과 같은 자연스러운 화면 전환을 구현할 수 있습니다.

## 권한
필요한 권한 없음. 단, View Transitions API는 Chrome 111 이상에서만 지원됩니다.

## 폴더 구조
```
viewTransitions/
├── index.html          # 앱의 진입점, main.js와 style.css를 로드
└── src/
    ├── main.js         # View Transition 로직 및 콘텐츠 렌더링
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의하며, `src/main.js`와 `src/style.css`를 로드합니다.

### src/main.js
View Transitions API를 활용한 콘텐츠 전환 로직을 담당합니다.

- **`contents` 배열**: 6개의 이미지와 라벨 정보를 저장하는 데이터 배열입니다.
- **`getNextContent()`**: `nextInt`를 증가시켜 다음 콘텐츠의 HTML을 반환합니다. `contents` 배열의 길이를 초과하면 처음으로 순환합니다.
- **초기 렌더링**: `#app` 영역에 `.container > #content` 구조로 첫 번째 콘텐츠를 표시합니다.
- **`btnChangeContent` 클릭 핸들러**:
  - `document.startViewTransition`의 지원 여부를 먼저 확인합니다.
  - 미지원 시 `innerHTML`을 직접 교체하여 콘텐츠를 바꾸고, 전환 효과 없이 동작합니다.
  - 지원 시 `document.startViewTransition(callback)`을 호출하여 전환을 시작합니다. `callback` 내에서 `content.innerHTML`을 교체합니다.
  - `viewTrans.finished` 프로미스를 `await`하여 전환이 완료될 때까지 버튼을 비활성화합니다. 이를 통해 전환 중 중복 클릭을 방지합니다.

### src/style.css
콘텐츠 컨테이너, 이미지, 버튼 등의 레이아웃과 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드될 때, `contents` 배열의 첫 번째 항목을 `#content` 영역에 렌더링합니다.
2. 사용자가 콘텐츠 변경 버튼을 클릭합니다.
3. `document.startViewTransition`의 지원 여부를 확인합니다.
4. **지원되는 경우**: `document.startViewTransition()`이 호출되고, 현재 화면의 스냅샷이 캡처됩니다.
5. `callback` 함수 내에서 `content.innerHTML`이 다음 콘텐츠 HTML로 교체됩니다.
6. 새 콘텐츠의 스냅샷이 캡처되고, 이전 콘텐츠와 새 콘텐츠 사이에 트랜지션 효과가 재생됩니다.
7. `viewTrans.finished` 프로미스가 이행되면 버튼이 다시 활성화됩니다.
8. **지원되지 않는 경우**: `innerHTML`을 직접 교체하여 効과 없이 콘텐츠가 바뀝니다.
9. 버튼을 계속 클릭하면 콘텐츠가 순환합니다.
