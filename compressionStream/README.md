# Compression Streams API

## 개요
Compression Streams API는 데이터를 압축하거나 압축 해제할 수 있는 스트림 기반 API입니다. 이 프로젝트에서는 사용자가 선택한 파일을 gzip 형식으로 압축한 후 다운로드할 수 있는 기능을 구현합니다. `CompressionStream`을 사용하여 파일 스트림을 압축하고, Blob으로 변환하여 다운로드 링크를 생성합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
compressionStream/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # Compression Streams API 핵심 로직
    └── style.css       # 페이지 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | CompressionStream을 활용한 파일 압축 및 다운로드 로직 |
| `src/style.css` | 파일 입력, 버튼 및 전체 레이아웃 스타일 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, 파일 입력 필드와 압축 버튼, 상태 텍스트, 다운로드 링크가 렌더링될 컨테이너를 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
Compression Streams API를 사용하여 파일 압축 및 다운로드 기능을 구현합니다.

**UI 렌더링**
- `<input type="file">`: 사용자가 압축할 파일을 선택합니다.
- `<button id="compressAndDownloadBtn">`: 파일 압축을 실행하는 버튼입니다. 파일이 선택되지 않으면 비활성화됩니다.
- `<p id="status">`: 현재 상태 메시지를 표시합니다.
- `<a id="downloadLink">`: 압축된 파일을 다운로드하는 링크입니다. 초기에는 숨겨져 있습니다.

**파일 선택 처리**
- 파일이 선택되면 `onchange` 이벤트가 발생하고, `selectedFile` 변수에 파일을 저장합니다.
- 압축 버튼을 활성화하고, 상태 텍스트에 파일명과 크기를 표시합니다.

**파일 압축 및 다운로드**
- 압축 버튼 클릭 시 `onclick` 이벤트가 실행됩니다.
- `selectedFile.stream()`으로 파일의 ReadableStream을 생성합니다.
- `pipeThrough(new CompressionStream("gzip"))`를 사용하여 스트림을 gzip으로 압축합니다.
- 압축된 스트림을 `Response` 객체로 변환한 후 `blob()`으로 Blob을 생성합니다.
- `URL.createObjectURL(compressedBlob)`로 Blob URL을 생성하여 다운로드 링크에 설정합니다.
- 다운로드 링크의 `download` 속성에 원본 파일명 + `.gz` 확장자를 지정합니다.
- 압축 완료 후 다운로드 링크를 표시하고 상태 메시지를 업데이트합니다.

**에러 처리**
- `try-catch` 블록으로 압축 중 발생할 수 있는 오류를 처리합니다.
- 오류 발생 시 상태 메시지를 업데이트하고 다운로드 링크를 숨깁니다.

### src/style.css
파일 입력, 버튼, 상태 텍스트, 다운로드 링크의 크기, 색상, 간격과 전체 레이아웃을 정의합니다.

## 동작 순서

1. 페이지가 로드되면 `main.js`가 실행되어 UI 요소들을 렌더링합니다.
2. 압축 버튼은 초기에 비활성화 상태입니다.
3. 사용자가 파일 입력 필드에서 파일을 선택하면 `onchange` 이벤트가 발생합니다.
4. 선택된 파일 정보를 `selectedFile` 변수에 저장하고, 압축 버튼을 활성화합니다.
5. 상태 텍스트에 파일명과 크기를 표시합니다.
6. 사용자가 압축 버튼을 클릭하면 `onclick` 이벤트가 실행됩니다.
7. 압축 버튼을 비활성화하고, 상태 메시지를 "압축 중..."으로 업데이트합니다.
8. `selectedFile.stream()`으로 파일의 ReadableStream을 생성합니다.
9. `pipeThrough(new CompressionStream("gzip"))`를 사용하여 스트림을 gzip 압축 스트림으로 변환합니다.
10. 압축된 스트림을 `Response` 객체로 감싼 후 `blob()`을 호출하여 Blob으로 변환합니다.
11. `URL.createObjectURL()`로 Blob URL을 생성하고 다운로드 링크에 설정합니다.
12. 다운로드 링크의 `download` 속성에 원본 파일명 + `.gz`를 지정합니다.
13. 다운로드 링크를 표시하고, 상태 메시지를 "압축 완료!"로 업데이트합니다.
14. 압축 버튼을 다시 활성화합니다.
15. 사용자가 다운로드 링크를 클릭하면 압축된 파일이 다운로드됩니다.

---

## 출처

- [YouTube - GIS DEVELOPER | Compression Streams API](https://www.youtube.com/watch?v=PLVFoOWAjKc&list=PLe6NQuuFBu7EgOm0n1l-qzn1hDBG5AW8_&index=3)
