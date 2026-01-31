# Drag and Drop API

## 개요
Drag and Drop API는 사용자가 파일이나 폴더를 브라우저 창으로 끌어 떨어뜨리는 방식으로 파일을 업로드하고 탐색할 수 있는 기능을 제공합니다. `dataTransfer.items`와 `getAsFileSystemHandle()`을 활용하여 폴더 구조를 재귀적으로 탐색하여, 단순한 파일 드롭뿐만 아니라 폴더 내부의 파일까지 읽을 수 있습니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
dragAndDrop/
├── index.html          # 앱의 진입점, 드롭 영역과 파일 목록 영역의 기본 레이아웃 제공
└── src/
    ├── main.js         # Drag and Drop 이벤트 처리 및 파일 탐색 로직 구현
    └── style.css       # 드롭 영역 하이라이트 및 파일 목록 등의 스타일 정의
```

## 파일 설명

### index.html
앱의 진입점으로, 드롭 영역과 파일 목록을 표시할 영역을 구성합니다. `src/main.js`와 `src/style.css`를 로드합니다.

### src/main.js
드롭 영역과 파일 목록 영역을 렌더링하고, Drag and Drop 관련 이벤트를 처리하는 핵심 파일입니다.

- **드롭 영역 이벤트 처리**
  - `dragover`: 기본 동작을 방지하고(`preventDefault`), 드롭 영역에 `highlight` 클래스를 추가하여 시각적 피드백을 제공합니다.
  - `dragleave`: `highlight` 클래스를 제거하여 드롭 영역 강조를 해제합니다.
  - `drop`: `e.dataTransfer.items`에서 각 항목을 `getAsFileSystemHandle()`로 가져와 파일 시스템 핸들을 확보한 후, `traverseFileSystemHandle()`를 호출하여 폴더 구조를 탐색합니다.

- **`traverseFileSystemHandle(handle)`**
  - `handle.kind`가 `"file"`이면 `handle.getFile()`로 파일 객체를 가져와 `displayFile()`에 전달합니다.
  - `handle.kind`가 `"directory"`이면 `handle.values()`로 디렉토리 내부 항목을 순회하며 자기 자신을 재귀적으로 호출합니다.

- **`displayFile(file)`**
  - 파일 이름, 크기, 타입을 파일 목록 영역에 추가합니다.
  - 파일 타입이 `text/*`이면 `FileReader`를 사용하여 파일 내용을 읽어 콘솔에 출력합니다.

### src/style.css
드롭 영역의 기본 스타일과 드래그 위에 올라온 상태의 하이라이트 효과, 파일 목록의 표시 스타일을 정의합니다.

## 동작 순서
1. 앱이 로드되면 드롭 영역과 파일 목록 영역이 렌더링됩니다.
2. 사용자가 파일 또는 폴더를 드롭 영역 위로 드래그하면 `dragover` 이벤트가 발생하여 영역이 강조됩니다.
3. 사용자가 드래그를 중단하고 드롭 영역을 벗어나면 `dragleave` 이벤트가 발생하여 강조가 해제됩니다.
4. 사용자가 드롭 영역에 파일 또는 폴더를 떨어뜨리면 `drop` 이벤트가 발생합니다.
5. `drop` 이벤트 핸들러에서 `dataTransfer.items`의 각 항목을 `getAsFileSystemHandle()`로 파일 시스템 핸들로 변환합니다.
6. `traverseFileSystemHandle()`가 핸들의 종류를 판별합니다.
   - 파일이면 `displayFile()`를 호출하여 파일 정보를 목록에 추가합니다.
   - 폴더이면 내부 항목을 순회하며 재귀적으로 탐색을 반복합니다.
7. `displayFile()`에서 파일 이름, 크기, 타입을 목록에 표시하고, `text/*` 타입이면 `FileReader`로 내용을 읽어 콘솔에 출력합니다.
