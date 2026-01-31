# OPFS (Origin Private File System) API

## 개요
OPFS(Origin Private File System) API는 웹 앱에 사용자 인터랙션(파일 다이얼로그 등) 없이 프라이빗 파일 시스템 영역을 제공하는 API입니다. 각 origin(도메인)마다 독립적인 파일 저장소를 가지며, 파일의 생성, 읽기, 삭제, 목록 조회, 저장 공간 확인 등의 기능을 지원합니다. 이 프로젝트는 Vite를 사용하여 OPFS의 기본 기능을 시연합니다.

## 권한
필요한 권한 없음. 사용자 인터랙션 없이 파일 조작 가능합니다 (OPFS의 특성).

## 폴더 구조
```
OPFS/
└── vite-project/
    ├── index.html          # 앱 진입점 HTML 파일
    └── src/
        ├── main.js         # OPFS API를 사용한 파일 관리 로직
        └── style.css       # 스타일 파일
```

## 파일 설명

### vite-project/index.html
앱의 진입점 파일로, `src/main.js`와 `src/style.css`를 로드합니다. 파일 작성, 읽기, 목록, 삭제, 저장 공간 확인 버튼과 출력 영역 등의 UI를 포함합니다.

### vite-project/src/main.js
OPFS API를 활용한 파일 관리 로직을 포함합니다.

- **getOPFSRootDirectory()**: `navigator.storage.getDirectory()`를 호출하여 OPFS 루트 디렉토리 핸들을 가져옵니다.
- **writeFile()**: `root.getFileHandle(fileName, { create: true })`로 파일 핸들을 생성합니다. `createWritable()`로 `WritableFileStream`을 생성한 후, `write(content)` -> `close()` 순서로 파일을 작성합니다.
- **readFile()**: `root.getFileHandle(fileName)`로 파일 핸들을 가져옵니다. `getFile()` -> `file.text()`로 파일 내용을 읽습니다.
- **listFiles()**: `root.entries()`를 `for-await`로 순회하여 파일과 폴더의 이름과 종류를 출력합니다 (파일: 📄, 폴더: 📁).
- **deleteFile()**: `root.removeEntry(fileName)`으로 파일을 삭제합니다.
- **checkStorageQuota()**: `navigator.storage.estimate()`를 호출하여 현재 usage와 quota를 가져오고 GB 단위로 표시합니다.
- **log(message, isError)**: 결과를 `#output` 영역에 div로 추가합니다. `isError`가 true이면 "error" 클래스를 추가하여 오류 스타일로 표시합니다.

### vite-project/src/style.css
앱의 스타일 파일입니다.

## 동작 순서
1. 페이지가 로드되면 파일 작성, 읽기, 목록, 삭제, 저장 공간 확인 버튼이 표시됩니다.
2. 파일 작성 버튼을 클릭하면 `navigator.storage.getDirectory()`로 OPFS 루트 디렉토리를 가져옵니다.
3. `getFileHandle()`로 파일 핸들을 생성하고, `createWritable()`로 스트림을 열어 내용을 작성합니다.
4. 파일 읽기 버튼을 클릭하면 동일하게 루트 디렉토리와 파일 핸들을 가져온 후, `getFile().text()`로 내용을 읽어 출력합니다.
5. 목록 버튼을 클릭하면 `root.entries()`를 순회하여 저장된 파일과 폴더 목록을 출력합니다.
6. 삭제 버튼을 클릭하면 `root.removeEntry()`로 지정된 파일을 삭제합니다.
7. 저장 공간 확인 버튼을 클릭하면 `navigator.storage.estimate()`로 현재 사용량과 할당 용량을 GB 단위로 표시합니다.
8. 모든 작업 결과는 페이지 내 출력 영역에 실시간으로 표시되며, 오류 발생 시 빨간색으로 표시됩니다.
