# Geolocation API

## 개요
Geolocation API는 사용자의 현재 지리적 위치를 가져올 수 있는 기능을 제공합니다. 한 번만 위치를 가져오는 것은 물론, `watchPosition()`을 사용하여 연속적으로 위치를 추적하는 것도 가능합니다. 반환되는 좌표 정보에는 위도, 경도, 고도, 정확도 등의 상세 정보가 포함됩니다.

## 권한
위치 정보 권한(Geolocation Permission)이 필요합니다. 앱이 처음 위치 정보를 요청하면 브라우저의 권한 다이얼로그가 표시되며, 사용자가 직접 허용해야 위치 정보 접근이 가능합니다.

## 폴더 구조
```
geoLocation/
├── index.html          # 앱의 진입점, 위치 관련 버튼과 위치 정보 표시 영역의 기본 레이아웃 제공
└── src/
    ├── main.js         # Geolocation API 호출 및 위치 정보 표시·오류 처리 로직 구현
    └── style.css       # 위치 정보 표시 영역, 버튼 등의 스타일 정의
```

## 파일 설명

### index.html
앱의 진입점으로, 현재 위치 가져오기, 위치 감시 시작, 위치 감시 종료 버튼과 위치 정보를 표시할 영역을 구성합니다. `src/main.js`와 `src/style.css`를 로드합니다.

### src/main.js
Geolocation API를 사용하여 위치 정보 가져오기, 연속 추적, 감시 종료 기능을 구현하는 핵심 파일입니다.

- **현재 위치 가져오기 (`btnGetLocation`)**
  - `navigator.geolocation.getCurrentPosition()`을 호출하여 현재 위치를 한 번 가져옵니다.
  - 옵션으로 `enableHighAccuracy: true`, `timeout: 5000`, `maximumAge: 0`을 설정하여 최대한 정확한 실시간 위치를 요청합니다.
  - 성공 시 `displayLocation()`을 호출하여 위치 정보를 표시하고, 실패 시 `displayError()`를 호출하여 오류를 표시합니다.

- **위치 감시 시작 (`btnStartWatching`)**
  - `navigator.geolocation.watchPosition()`을 호출하여 위치가 변경될 때마다 콜백을 실행하는 연속 추적을 시작합니다.
  - 반환된 `watchId`를 저장하여 나중에 감시를 종료할 때 사용합니다.

- **위치 감시 종료 (`btnStopWatching`)**
  - 저장된 `watchId`를 `navigator.geolocation.clearWatch()`에 전달하여 연속 위치 추적을 종료합니다.

- **`displayLocation(position)`**
  - `position.coords`에서 `latitude`(위도), `longitude`(경도), `altitude`(고도), `accuracy`(정확도), `altitudeAccuracy`(고도 정확도), `heading`(방향), `speed`(속도)를 추출하여 표시합니다.
  - `position.timestamp`를 날짜 형식으로 변환하여 함께 표시합니다.

- **`displayError(error)`**
  - `error.code`를 기반으로 오류 종류를 구분합니다.
    - `PERMISSION_DENIED`: 사용자가 위치 권한을 거부한 경우
    - `POSITION_UNAVAILABLE`: 위치 정보를 가져올 수 없는 경우
    - `TIMEOUT`: 설정된 시간 내에 위치를 가져오지 못한 경우
  - 각 오류 종류에 맞는 메시지를 표시합니다.

### src/style.css
위치 정보 표시 영역, 버튼, 오류 메시지 등의 스타일을 정의합니다.

## 동작 순서

**현재 위치 가져오기:**
1. 사용자가 "현재 위치 가져오기" 버튼을 클릭합니다.
2. 브라우저가 위치 권한 다이얼로그를 표시합니다 (초진 시).
3. 사용자가 권한을 허용하면 `getCurrentPosition()`이 실행됩니다.
4. 위치 정보가 반환되면 `displayLocation()`이 호출되어 위도, 경도, 고도, 정확도 등을 표시합니다.
5. 권한 거부나 타임아웃 등의 경우에는 `displayError()`가 호출되어 해당 오류 메시지를 표시합니다.

**위치 감시 (연속 추적):**
1. 사용자가 "위치 감시 시작" 버튼을 클릭합니다.
2. `watchPosition()`이 호출되어 연속 위치 추적이 시작되며, `watchId`가 저장됩니다.
3. 위치가 변경될 때마다 콜백이 실행되어 `displayLocation()`으로 위치 정보가 갱신됩니다.
4. 사용자가 "위치 감시 종료" 버튼을 클릭하면 `clearWatch(watchId)`가 호출되어 추적이 종료됩니다.
