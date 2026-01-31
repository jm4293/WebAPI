# File System Access API

## 개요
File System Access API는 웹 앱에서 사용자의 로컬 파일 시스템과 직접 상호작용할 수 있는 기능을 제공합니다. 파일 열기, 파일 저장, 디렉토리 탐색 등의 작업을 사용자가 다이얼로그를 통해 직접 선택하는 방식으로 수행할 수 있습니다. 기존의 `<input type="file">`보다 더 강력하고 유연한 파일 시스템 접근 수단입니다.

## 권한
파일 열기·저장 시 사용자가 브라우저의 파일 다이얼로그에서 직접 파일을 선택해야 합니다. 별도의 권한 승인 단계는 없으며, 다이얼로그 자체가 권한 부여의 역할을 합니다. Chrome에서만 지원됩니다.

## 폴더 구조
```
fileSystemAccess/
├── index.html          # 앱의 진입점, 파일 열기·저장·디렉토리 탐색 UI의 기본 레이아웃 제공
└── src/
    ├── main.js         # File System Access API 호출 및 파일 읽기·저장·디렉토리 탐색 로직 구현
    └── style.css       # 앱 전체의 스타일 정의
```

## 파일 설명

### index.html
앱의 진입점으로, 파일 열기, 파일 저장, 디렉토리 열기 등 세 가지 기능의 UI를 구성합니다. `src/main.js`와 `src/style.css`를 로드합니다.

### src/main.js
File System Access API의 세 가지 기능을 구현하는 핵심 파일입니다.

- **기능 1 — 파일 열기**
  - `window.showOpenFilePicker()`를 호출하여 `.txt` 파일만 선택 가능한 파일 열기 다이얼로그를 표시합니다.
  - 사용자가 파일을 선택하면 해당 파일의 내용을 `file.text()`로 읽어 `<pre>` 태그에 표시합니다.

- **기능 2 — 파일 저장**
  - `<textarea>`에 작성된 내용을 저장할 때 사용합니다.
  - `window.showSaveFilePicker()`를 호출하여 파일 저장 다이얼로그를 표시합니다. `suggestedName`은 `"saved.txt"`로 설정됩니다.
  - 사용자가 저장 경로를 선택하면 `handle.createWritable()`로 `WritableFileStream`을 생성한 후, `write()`로 내용을 기록하고 `close()`로 스트림을 종료합니다.

- **기능 3 — 디렉토리 열기**
  - `window.showDirectoryPicker()`를 호출하여 폴더 선택 다이얼로그를 표시합니다.
  - 사용자가 폴더를 선택하면 `directoryHandle.entries()`를 사용하여 폴더 내부의 파일과 하위 폴더를 순회하며 목록으로 표시합니다.

### src/style.css
앱 전체의 스타일을 정의합니다. 파일 열기·저장 영역, 디렉토리 목록 등의 레이아웃과 표시 스타일을 포함합니다.

## 동작 순서

**파일 열기:**
1. 사용자가 "파일 열기" 버튼을 클릭합니다.
2. `showOpenFilePicker()`로 `.txt` 파일 열기 다이얼로그가 표시됩니다.
3. 사용자가 파일을 선택하면 파일 핸들이 반환됩니다.
4. `file.text()`로 파일 내용을 읽어 `<pre>` 태그에 표시됩니다.

**파일 저장:**
1. 사용자가 `<textarea>`에 내용을 작성합니다.
2. "파일 저장" 버튼을 클릭합니다.
3. `showSaveFilePicker()`로 저장 다이얼로그가 표시됩니다. 기본 파일명은 `saved.txt`입니다.
4. 사용자가 저장 경로를 선택하면 `createWritable()`로 쓰기 스트림을 생성합니다.
5. `write()`로 내용을 기록하고 `close()`로 스트림을 종료하여 파일 저장이 완료됩니다.

**디렉토리 열기:**
1. 사용자가 "디렉토리 열기" 버튼을 클릭합니다.
2. `showDirectoryPicker()`로 폴더 선택 다이얼로그가 표시됩니다.
3. 사용자가 폴더를 선택하면 디렉토리 핸들이 반환됩니다.
4. `directoryHandle.entries()`로 폴더 내부의 파일과 하위 폴더를 순회하여 목록으로 표시됩니다.
