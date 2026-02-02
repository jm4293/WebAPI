# URL API

## 개요
URL API는 URL을 파싱하고 조작할 수 있는 표준 JavaScript API입니다. 이 프로젝트에서는 URL 객체를 사용하여 URL의 다양한 구성 요소(프로토콜, 호스트, 포트, 경로, 쿼리 파라미터 등)를 읽고 수정하는 방법을 보여줍니다. 또한 `URLSearchParams`를 사용하여 쿼리 파라미터를 관리하고, `URL.createObjectURL()`로 Blob URL을 생성하여 파일 다운로드 기능을 구현합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
URL/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # URL API 핵심 로직
    └── style.css       # 페이지 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | URL 객체와 URLSearchParams를 활용한 URL 조작 및 Blob URL 생성 로직 |
| `src/style.css` | 다운로드 버튼 및 전체 레이아웃 스타일 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, 다운로드 버튼이 렌더링될 `<div id="download">` 컨테이너를 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
URL API를 사용하여 URL 파싱, 조작, Blob URL 생성 및 파일 다운로드 기능을 구현합니다.

**URL 객체 생성 및 파싱**
- `new URL(strURL)`로 URL 문자열을 파싱하여 URL 객체를 생성합니다.
- URL 구성 요소를 읽습니다:
  - `url.href`: 전체 URL 문자열
  - `url.hostname`: 호스트명 (예: `example.com`)
  - `url.port`: 포트 번호 (예: `8080`)
  - `url.host`: 호스트명 + 포트 (예: `example.com:8080`)
  - `url.protocol`: 프로토콜 (예: `https:`)
  - `url.origin`: 오리진 (프로토콜 + 호스트 + 포트)
  - `url.pathname`: 경로 (예: `/path`)
  - `url.search`: 쿼리 문자열 (예: `?qa=1&qb=test`)
  - `url.hash`: 해시 (예: `#section`)
  - `url.username`: 사용자 이름 (예: `userA`)
  - `url.password`: 비밀번호 (예: `pw1234`)

**URLSearchParams를 사용한 쿼리 파라미터 관리**
- `url.searchParams.get("qb")`: 특정 쿼리 파라미터 값을 가져옵니다.
- `url.searchParams.set("qb", "zest")`: 쿼리 파라미터 값을 수정합니다.
- `url.searchParams.append("qc", "apple")`: 새로운 쿼리 파라미터를 추가합니다.
- `url.searchParams.has("qc")`: 특정 쿼리 파라미터가 존재하는지 확인합니다.
- `url.searchParams.delete("qc")`: 쿼리 파라미터를 삭제합니다.
- `url.searchParams.keys()`: 모든 쿼리 파라미터 키를 반복합니다.

**URL 구성 요소 수정**
- `url.protocol = "xs:"`: 프로토콜을 변경합니다.
- URL 객체의 속성을 변경하면 자동으로 전체 URL 문자열이 업데이트됩니다.

**상대 URL과 base URL 조합**
- `new URL("/data?${params}", base)`로 base URL과 상대 경로를 조합하여 완전한 URL을 생성합니다.
- `URLSearchParams` 객체를 사용하여 쿼리 파라미터를 동적으로 생성합니다.

**URL 유효성 검사**
- `URL.canParse("example.com")`: 문자열이 유효한 URL인지 검사합니다.

**Blob URL 생성 및 파일 다운로드**
- 다운로드 버튼 클릭 시 `onclick` 이벤트가 실행됩니다.
- `new Blob([text], { type: "text/plain" })`로 텍스트 데이터를 Blob으로 변환합니다.
- `URL.createObjectURL(blob)`로 Blob을 가리키는 임시 URL을 생성합니다.
- `<a>` 태그를 동적으로 생성하고 `href`에 Blob URL을 설정합니다.
- `download` 속성에 파일명을 지정하여 다운로드를 트리거합니다.
- `URL.revokeObjectURL(url)`로 Blob URL을 해제하여 메모리를 정리합니다.

### src/style.css
다운로드 버튼의 크기, 색상, 커서와 전체 레이아웃을 정의합니다.

## 동작 순서

1. 페이지가 로드되면 `main.js`가 실행됩니다.
2. URL 문자열을 파싱하여 URL 객체를 생성합니다.
3. URL 객체의 다양한 속성을 콘솔에 출력하여 URL 구성 요소를 확인합니다.
4. `url.searchParams.get("qb")`로 쿼리 파라미터 `qb`의 값을 가져와 콘솔에 출력합니다.
5. `url.searchParams.set("qb", "zest")`로 `qb` 값을 `"zest"`로 변경합니다.
6. 변경된 `qb` 값을 다시 가져와 콘솔에 출력합니다.
7. `url.searchParams.append("qc", "apple")`로 새로운 쿼리 파라미터 `qc`를 추가합니다.
8. 전체 URL 문자열을 콘솔에 출력하여 변경 사항을 확인합니다.
9. `url.searchParams.has("qc")`로 `qc` 파라미터의 존재 여부를 확인합니다.
10. `url.searchParams.delete("qc")`로 `qc` 파라미터를 삭제합니다.
11. 다시 `has("qc")`로 삭제 여부를 확인합니다.
12. `url.searchParams.keys()`로 모든 쿼리 파라미터 키를 반복하며 콘솔에 출력합니다.
13. `url.protocol = "xs:"`로 프로토콜을 변경하고 전체 URL을 콘솔에 출력합니다.
14. `URLSearchParams` 객체를 사용하여 쿼리 파라미터를 동적으로 생성합니다.
15. `new URL("/data?${params}", base)`로 base URL과 상대 경로를 조합하여 완전한 URL을 생성합니다.
16. `URL.canParse("example.com")`로 URL 유효성 검사를 수행하고 결과를 콘솔에 출력합니다.
17. 사용자가 다운로드 버튼을 클릭하면 `onclick` 이벤트가 실행됩니다.
18. 텍스트 데이터를 Blob으로 변환합니다.
19. `URL.createObjectURL(blob)`로 Blob URL을 생성합니다.
20. 동적으로 `<a>` 태그를 생성하고 Blob URL을 `href`에 설정합니다.
21. `download` 속성에 파일명(`hello-world.txt`)을 지정합니다.
22. `link.click()`으로 다운로드를 트리거합니다.
23. `<a>` 태그를 DOM에서 제거하고 `URL.revokeObjectURL(url)`로 Blob URL을 해제합니다.
24. 브라우저가 파일 다운로드를 시작합니다.

---

## 출처

- [YouTube - GIS DEVELOPER | URL API](https://www.youtube.com/watch?v=wko0zLu_HgE&list=PLe6NQuuFBu7EgOm0n1l-qzn1hDBG5AW8_&index=35)
