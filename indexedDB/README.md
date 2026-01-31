# IndexedDB API

## 개요
IndexedDB는 브라우저에서 제공하는 클라이언트 측 구조화 데이터베이스 API입니다. 키-값 형태로 대량의 데이터를 로컬에 저장하고, 인덱스를 활용한 효율적인 검색과 CRUD 작업을 지원합니다. 이 프로젝트는 IndexedDB를 이용하여 사용자 데이터의 추가, 전체 조회, 정확 일치 검색, 부분 일치(Like) 검색, 검색 결과 삭제 기능을 구현합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
indexedDB/
├── index.html          # 앱의 진입점. 버튼과 검색 입력란을 포함하는 UI 구조 제공
└── src/
    ├── main.js         # IndexedDB 연결 및 CRUD 로직 구현
    └── style.css       # 페이지 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의합니다. 샘플 데이터 추가, 전체 조회, 정확 일치 검색, Like 검색, 검색 결과 삭제 버튼과 검색어 입력란을 포함합니다.

### src/main.js
IndexedDB와의 연결 및 모든 데이터 작업 로직을 담당합니다. 주요 구성 요소는 다음과 같습니다.

- **DB 열기**: `indexedDB.open("내저장소", 2)`로 이름이 "내저장소"이고 버전이 2인 데이터베이스를 열기.
- **onupgradeneeded**: 버전이 올라간 경우 트리거됩니다. 기존 버전이 0이 아닌 경우(즉, 이전 버전 DB가 존재하는 경우) 기존 DB를 삭제하고 사용자에게 새로고침을 안내합니다. 버전 0에서 처음 생성되는 경우 `"users"` objectStore를 생성하며, `keyPath: "id"`, `autoIncrement: true` 옵션을 적용하고, `"name"` 필드에 인덱스를 생성합니다.
- **btnAddSampleData**: 홍길동, 김철수, 이영희, 박민수 4명의 샘플 사용자를 `objectStore.add()`를 통해 추가합니다.
- **btnSearchAllUsers**: `objectStore.getAll()`을 사용하여 저장된 전체 사용자를 조회합니다.
- **btnSearchUsersEqual**: `index("name").getAll(nameToSearch)`를 사용하여 이름이 정확히 일치하는 사용자를 검색합니다.
- **btnSearchUsersLike**: `objectStore.openCursor()`로 전체 레코드를 순회하며, `name.includes(searchTerm)`을 조건으로 사용하여 부분 일치 검색을 수행합니다.
- **btnDeleteSearchedUsers**: `openCursor()`로 전체 레코드를 순회하며, 이름에 검색어가 포함된 사용자를 `cursor.delete()`로 삭제합니다.

### src/style.css
앱의 전체 레이아웃과 버튼, 검색 입력란, 조회 결과 등의 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 `indexedDB.open("내저장소", 2)`를 호출하여 데이터베이스 연결을 시작합니다.
2. 버전이 올라간 경우 `onupgradeneeded`가 트리거되어, 기존 DB가 있으면 삭제 후 새로고침을 안내하거나, 처음 생성 시 `"users"` objectStore와 `"name"` 인덱스를 생성합니다.
3. DB 연결이 완료되면 (`onsuccess`) 앱이 정상 동작 상태로 준비됩니다.
4. **샘플 데이터 추가** 버튼을 클릭하면 홍길동, 김철수, 이영희, 박민수 4명의 사용자가 `objectStore.add()`로 저장됩니다.
5. **전체 조회** 버튼을 클릭하면 `objectStore.getAll()`을 통해 저장된 모든 사용자가 표시됩니다.
6. 검색어를 입력한 후 **정확 일치 검색** 버튼을 클릭하면, `index("name").getAll()`을 사용하여 이름이 정확히 일치하는 사용자만 검색 결과로 표시됩니다.
7. 검색어를 입력한 후 **Like 검색** 버튼을 클릭하면, `openCursor()`로 전체를 순회하며 `name.includes()`로 부분 일치하는 사용자를 검색 결과로 표시합니다.
8. **검색 결과 삭제** 버튼을 클릭하면, `openCursor()`로 순회하며 검색어가 포함된 사용자를 `cursor.delete()`로 DB에서 삭제합니다.
