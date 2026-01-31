# Device Memory API

## 개요
Device Memory API는 사용자 장치의 예상 RAM 용량을 제공하는 API입니다. 이 정보를 활용하면 장치의 하드웨어 스펙에 따라 리소스 로딩 전략이나 앱의 복잡도를 조절할 수 있습니다. 이 프로젝트에서는 Device Memory API와 Performance Memory API를 함께 사용하여 장치의 RAM 용량과 JavaScript 힙 메모리 사용 정보를 표시합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
deviceMemory/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # Device Memory API 및 Performance Memory API 로직
    └── style.css       # 메모리 정보 표시 UI 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | 장치 메모리 정보 조회 및 JS 힙 정보 출력 로직 |
| `src/style.css` | 메모리 정보 표시 UI 레이아웃 및 스타일 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, 장치 메모리 정보가 표시될 영역을 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
Device Memory API와 Performance Memory API를 활용하여 장치의 메모리 관련 정보를 조회하고 표시합니다.

**Device Memory API**
- `navigator.deviceMemory` 속성의 지원 여부를 먼저 확인합니다.
- 지원되는 경우 장치의 예상 RAM 용량을 단위 **GB**로 표시합니다.
- 반환된 값은 2의 거듭제곱 단위(예: 0.25, 0.5, 1, 2, 4, 8, 16 GB)로 제공됩니다. 이는 정확한 용량이 아닌 장치의 대략적인 메모리 범주를 나타냅니다.
- 지원되지 않는 경우 해당 정보를 표시하지 않거나 안내 메시지를 출력합니다.

**Performance Memory API**
- `performance.memory` 객체를 사용하여 JavaScript 힙 메모리 정보를 `console`에 출력합니다.
  - `usedJSHeapSize`: 현재 사용 중인 JS 힙 메모리 크기
  - `totalJSHeapSize`: 현재 할당된 JS 힙 전체 크기
  - `jsHeapSizeLimit`: 할당 가능한 JS 힙 최대 크기

**유틸리티 함수**
- `bytesToMB(bytes)`: 바이트 단위의 값을 **MB** 단위로 변환하는 유틸리티 함수를 제공합니다. Performance Memory API에서 반환된 바이트 값을 읽기 쉬운 MB 단위로 변환하는 데 사용됩니다.

### src/style.css
메모리 정보 표시 영역의 레이아웃, 텍스트 스타일, 카드 디자인 등을 정의합니다.

## 동작 순서

1. 페이지가 로드되면 `main.js`가 실행됩니다.
2. `navigator.deviceMemory`의 지원 여부를 확인합니다.
3. 지원되는 경우 `navigator.deviceMemory` 값을 읽어 장치의 예상 RAM 용량을 **GB** 단위로 UI에 표시합니다 (2의 거듭제곱 값).
4. `performance.memory` 객체에서 `usedJSHeapSize`, `totalJSHeapSize`, `jsHeapSizeLimit` 값을 읽습니다.
5. `bytesToMB()` 유틸리티 함수를 사용하여 바이트 값을 MB 단위로 변환합니다.
6. 변환된 JS 힙 메모리 정보를 `console`에 출력합니다.
