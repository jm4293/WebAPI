# Web Storage API

## 개요
Web Storage API는 브라우저에서 키-값 쌍의 데이터를 저장할 수 있는 메커니즘을 제공합니다. 이 프로젝트는 `localStorage`와 `sessionStorage` 두 가지 저장소를 활용하여 데이터를 저장, 조회, 삭제하는 예제를 구현합니다.

## 권한
필요한 권한 없음.

## localStorage vs sessionStorage

### localStorage
- 브라우저를 닫아도 데이터가 영구적으로 유지됩니다.
- 동일한 오리진(프로토콜, 도메인, 포트)에서 접근 가능합니다.
- 명시적으로 삭제하지 않는 한 계속 유지됩니다.

### sessionStorage
- 브라우저 탭을 닫으면 데이터가 삭제됩니다.
- 각 탭마다 독립적인 저장소를 가집니다.
- 동일한 오리진 내에서만 접근 가능하며, 탭이 닫히면 모두 제거됩니다.

## 폴더 구조
```
webStorage/
├── index.html          # HTML 진입점 파일
├── src/
│   ├── main.js         # Web Storage 테스트 로직
│   └── style.css       # 스타일 파일
└── package.json        # Vite 개발 서버 설정
```

## 파일 설명

### index.html
Vite 개발 환경의 HTML 진입점입니다. `src/main.js`를 모듈로 로드합니다.

### src/main.js
localStorage와 sessionStorage의 주요 메서드를 테스트하는 UI 로직을 포함합니다.

- **UI 구성**: localStorage와 sessionStorage 각각에 대해 키-값 입력 필드와 버튼들을 제공합니다.
- **공통 메서드**:
  - `setItem(key, value)`: 키-값 쌍을 저장합니다.
  - `getItem(key)`: 키에 해당하는 값을 가져옵니다.
  - `removeItem(key)`: 특정 키의 데이터를 삭제합니다.
  - `clear()`: 해당 저장소의 모든 데이터를 삭제합니다.

#### localStorage 동작
- **저장 (setItem)**: 입력된 키와 값을 `localStorage.setItem()`으로 저장하고 결과를 출력합니다.
- **가져오기 (getItem)**: 입력된 키에 해당하는 값을 `localStorage.getItem()`으로 조회하고 출력합니다.
- **삭제 (removeItem)**: 입력된 키의 데이터를 `localStorage.removeItem()`으로 삭제하고 결과를 출력합니다.
- **모두 삭제 (clear)**: `localStorage.clear()`로 모든 데이터를 삭제하고 결과를 출력합니다.

#### sessionStorage 동작
- **저장 (setItem)**: 입력된 키와 값을 `sessionStorage.setItem()`으로 저장하고 결과를 출력합니다.
- **가져오기 (getItem)**: 입력된 키에 해당하는 값을 `sessionStorage.getItem()`으로 조회하고 출력합니다.
- **삭제 (removeItem)**: 입력된 키의 데이터를 `sessionStorage.removeItem()`으로 삭제하고 결과를 출력합니다.
- **모두 삭제 (clear)**: `sessionStorage.clear()`로 모든 데이터를 삭제하고 결과를 출력합니다.

### src/style.css
UI 스타일 파일입니다.

### package.json
Vite 개발 서버를 위한 패키지 설정 파일입니다.

## 동작 순서
1. `npm install`을 실행하여 의존성을 설치합니다.
2. `npm run dev`를 실행하여 Vite 개발 서버를 시작합니다.
3. 브라우저에서 페이지를 열면 localStorage와 sessionStorage 테스트 UI가 표시됩니다.
4. 각 입력 필드에 키와 값을 입력하고 버튼을 클릭하여 Web Storage 메서드를 테스트합니다.
5. localStorage에 저장된 데이터는 브라우저를 닫았다가 다시 열어도 유지됩니다.
6. sessionStorage에 저장된 데이터는 탭을 닫으면 삭제됩니다.
7. 브라우저 개발자 도구의 Application 탭에서 Storage 섹션을 통해 저장된 데이터를 확인할 수 있습니다.

---

## 출처

- [YouTube - GIS DEVELOPER | Web Storage API](https://www.youtube.com/watch?v=zc_-b1hWunk&list=PLe6NQuuFBu7EgOm0n1l-qzn1hDBG5AW8_&index=16)
