# Web Components

## 개요
Web Components는 재사용 가능한 커스텀 HTML 엘리먼트를 정의할 수 있는 웹 표준 기술입니다. Shadow DOM을 활용하면 컴포넌트 내부의 HTML과 CSS가 외부로 노출되지 않아 스타일과 구조가 독립적으로 유지됩니다. 이 프로젝트는 `<like-button>` 커스텀 엘리먼트를 구현하여, 클릭 시 카운트가 증가하고 커스텀 이벤트를 발생시키는 기능을 보여드립니다.

## 권한
필요한 권한 없음.

## 폴더 구조
```
webComponent/
├── index.html              # 앱의 진입점, like-button 컴포넌트 사용
└── src/
    ├── main.js             # 커스텀 엘리먼트 등록 및 이벤트 리스너 설정
    ├── LikeButton.js       # LikeButton 커스텀 엘리먼트 정의 (Shadow DOM)
    └── style.css           # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의하며, `src/main.js`를 로드합니다. `<like-button>` 커스텀 엘리먼트를 사용하여 Like 버튼을 배치합니다.

### src/main.js
커스텀 엘리먼트의 등록과 이벤트 핸들링을 담당합니다.

- **컴포넌트 등록**: `LikeButton.js`를 `import`하여 커스텀 엘리먼트를 등록합니다.
- **UI 렌더링**: 두 개의 `<like-button>` 엘리먼트를 각각 이미지와 함께 렌더링합니다. `initial-count` 속성을 사용하여 초기 카운트를 설정합니다 (각각 0, 2).
- **커스텀 이벤트 리스너**: `id="a"`인 `like-button` 엘리먼트에 `"count-changed"` 커스텀 이벤트 리스너를 등록하여, 카운트가 변경될 때마다 새로운 값을 `console`에 출력합니다.

### src/LikeButton.js
`LikeButton` 커스텀 엘리먼트의 전체 구현을 담당합니다.

- **클래스 정의**: `class LikeButton extends HTMLElement`로 커스텀 엘리먼트를 정의합니다.
- **`constructor()`**: `super()`를 호출한 후 `attachShadow({ mode: "open" })`로 Shadow DOM을 생성합니다. `shadowRoot.innerHTML`로 클릭 버튼, SVG 하트 아이콘, 카운트 표시 `span`, 그리고 컴포넌트 내부 스타일을 렌더링합니다.
- **`connectedCallback()`**: 컴포넌트가 DOM에 추가될 때 호출됩니다. Shadow DOM 내의 `#incrementButton`에 클릭 이벤트 리스너를 등록합니다. 클릭 시 `this.count`를 1 증가시키고 `span`의 `textContent`를 업데이트합니다.
- **`disconnectedCallback()`**: 컴포넌트가 DOM에서 제거될 때 호출됩니다. 클릭 이벤트 리스너를 제거하여 메모리 리크를 방지합니다.
- **`adoptedCallback()`**: 컴포넌트가 다른 Document로 이동될 때 호출되는 콜백입니다 (이 프로젝트에서는 구현되지 않음).
- **`count` getter**: `getAttribute("initial-count")`로 현재 카운트 값을 반환합니다.
- **`count` setter**: 값이 변경될 때 `"count-changed"` `CustomEvent`를 `dispatchEvent`로 발생시킵니다 (`detail`에 `newCount`와 `oldCount` 포함). `setAttribute("initial-count", value)`로 속성을 업데이트합니다.
- **`static observedAttributes`**: `["initial-count"]`를 반환하여 해당 속성의 변화를 감시합니다.
- **`attributeChangedCallback()`**: `initial-count` 속성이 외부에서 변경될 때 호출되어 카운트와 `span`을 업데이트합니다.
- **컴포넌트 등록**: `customElements.define("like-button", LikeButton)`으로 커스텀 엘리먼트를 등록합니다.

### src/style.css
페이지 전체의 레이아웃과 스타일을 정의합니다. `LikeButton` 컴포넌트 내부의 스타일은 Shadow DOM 내에서 관리됩니다.

## 동작 순서
1. 페이지가 로드될 때, `main.js`에서 `LikeButton.js`를 가져와 커스텀 엘리먼트를 등록합니다.
2. 두 개의 `<like-button>` 엘리먼트가 렌더링되며, 각각 `initial-count` 속성에 따라 초기 카운트(0, 2)로 표시됩니다.
3. 각 `<like-button>`의 `connectedCallback()`이 실행되어 클릭 이벤트 리스너가 등록됩니다.
4. 사용자가 하트 버튼을 클릭하면 `count` setter가 호출됩니다.
5. `count` setter 내에서 `"count-changed"` 커스텀 이벤트가 발생하며, `detail`에 `newCount`와 `oldCount`가 포함됩니다.
6. `id="a"`인 like-button에 등록된 이벤트 리스너가 커스텀 이벤트를 수신하여 카운트 변경을 `console`에 출력합니다.
7. `attributeChangedCallback()`이 호출되어 Shadow DOM 내의 `span` 텍스트가 새로운 카운트 값으로 업데이트됩니다.
8. 컴포넌트가 DOM에서 제거될 때, `disconnectedCallback()`이 실행되어 이벤트 리스너를 정리합니다.
