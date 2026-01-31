# Network Information API

## 개요
Network Information API는 현재 장치의 네트워크 연결 상태와 성능 정보를 제공하는 API입니다. 이 프로젝트는 Network Information API를 활용하여 연결 유형, 다운로드 속도, RTT(Round-Trip Time), 데이터 절약 모드 여부, 네트워크 타입 등 주요 네트워크 정보를 실시간으로 표시하며, 네트워크 상태가 변경될 때 자동으로 업데이트합니다. Chrome 전용 API입니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
networkInformation/
├── index.html          # 앱의 진입점. 네트워크 정보 표시 영역을 포함하는 UI 구조 제공
└── src/
    ├── main.js         # Network Information API를 이용한 네트워크 정보 조회 및 업데이트 로직 구현
    └── style.css       # 네트워크 정보 표시 영역 및 페이지 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의합니다. Effective Type, Downlink, RTT, Save Data, Type 등 네트워크 정보를 표시할 영역을 포함합니다.

### src/main.js
Network Information API를 활용하여 네트워크 정보를 조회하고 표시하는 로직을 구현합니다. 주요 구성 요소는 다음과 같습니다.

- **updateNetworkInfo()**: 메인 함수로, `navigator.connection`의 존재 여부를 먼저 확인합니다. 존재하면 다음 속성들을 읽어 UI에 표시합니다.
  - `connection.effectiveType`: 현재 연결의 유효 타입을 반환합니다 (`"slow-2g"`, `"2g"`, `"3g"`, `"4g"` 중 하나).
  - `connection.downlink`: 다운로드 속도를 Mbps 단위로 반환하며, `toFixed(2)`를 적용하여 소수점 2자리로 표시합니다.
  - `connection.rtt`: Round-Trip Time을 밀리초(ms) 단위로 반환합니다.
  - `connection.saveData`: 사용자가 데이터 절약 모드를 활성화한 여부를 반환하며, 활성화/비활성화 상태로 표시합니다.
  - `connection.type`: 실제 네트워크 연결 타입을 반환합니다 (`"wifi"`, `"ethernet"` 등).
- **초기 실행**: 페이지 로드 시 `updateNetworkInfo()`를 즉시 호출하여 현재 네트워크 정보를 표시합니다.
- **onchange 이벤트**: `navigator.connection.onchange`에 `updateNetworkInfo`를 등록하여 네트워크 상태가 변경되면 자동으로 UI를 업데이트합니다.

### src/style.css
네트워크 정보 항목의 표시 영역과 전체 페이지의 레이아웃 및 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 즉시 `updateNetworkInfo()`가 호출됩니다.
2. `navigator.connection`의 존재 여부를 확인합니다. 지원하지 않는 브라우저이면 해당 정보를 표시하지 않습니다.
3. `navigator.connection`이 존재하면 `effectiveType`, `downlink`, `rtt`, `saveData`, `type` 속성을 읽어옵니다.
4. 읽은 값을 각각의 표시 영역에 렌더링합니다. `downlink` 값은 `toFixed(2)`로 소수점 2자리 표시됩니다.
5. `navigator.connection.onchange` 이벤트가 등록되어, 네트워크 연결 상태가 변경되면 (예: Wi-Fi에서 모바일 데이터로 전환) `updateNetworkInfo()`가 다시 호출됩니다.
6. 재호출 시 동일한 과정으로 최신 네트워크 정보를 조회하여 UI를 실시간 업데이트합니다.
