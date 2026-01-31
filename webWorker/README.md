# Web Worker API

## 개요
Web Worker API는 JavaScript를 백그라운드 스레드에서 실행하여 메인 스레드(UI)를 막히게 하지 않고 무거운 작업을 수행하는 API입니다. 이 프로젝트는 세 가지 시나리오로 Web Worker의 활용을 보여줍니다: 소수 계산, OffscreenCanvas를 이용한 캔버스 드로잤, ArrayBuffer 전달을 이용한 이미지 흑백 변환입니다.

## 권한
필요한 권한 없음.

## 폴더 구조
```
webWorker/
├── index.html                  # 앱 진입점 HTML 파일
├── src/
│   ├── prime.js                # 소수 계산기 - 메인 스크립트
│   ├── canvas.js               # 캔버스 드로잤 - 메인 스크립트
│   ├── arrayBuffer.js          # 이미지 흑백 변환 - 메인 스크립트
│   └── style.css               # 스타일 파일
└── public/
    ├── worker-prime.js         # 소수 계산 워커
    ├── worker-canvas.js        # 캔버스 드로잤 워커
    └── worker-arrayBuffer.js   # 이미지 처리 워커
```

## 파일 설명

### index.html
앱의 진입점 파일로, 세 가지 Web Worker 예제의 UI를 포함합니다.

### src/prime.js
소수 계산기의 메인 스크립트입니다.

- 최대 숫자 입력과 계산 버튼 UI를 렌더링합니다.
- 버튼 클릭 시 `new Worker("worker-prime.js")`로 워커를 생성합니다.
- `worker.postMessage(maxNumber)`로 계산할 최대 숫자를 워커에 전송합니다.
- `worker.onmessage`에서 소수 배열을 수신하여 개수를 UI에 표시합니다.
- 계산 완료 후 `worker.terminate()`로 워커를 종료합니다.
- `onerror`에서 오류를 처리합니다.

### public/worker-prime.js
소수 계산을 수행하는 워커 스크립트입니다.

- `self.onmessage`에서 `maxNumber`를 수신합니다.
- `findPrimes(maxNumber)`로 2부터 `maxNumber`까지 소수를 찾습니다.
- `isPrime()` 함수로 각 숫자가 소수인지 판별합니다 (제곱근까지 나눗셈으로 판별).
- 결과 배열을 `self.postMessage()`로 메인 스레드에 반환합니다.

### src/canvas.js
OffscreenCanvas를 이용한 캔버스 드로잤의 메인 스크립트입니다.

- `<canvas>` 요소를 렌더링합니다.
- `canvas.transferControlToOffscreen()`으로 `OffscreenCanvas`를 생성합니다.
- `new Worker("worker-canvas.js")`로 워커를 생성합니다.
- `postMessage({ canvas: offscreen }, [offscreen])`으로 캔버스를 transferable 객체로 워커에 전이합니다.
- `postMessage({ command: "start" })`로 드로잤 시작 명령을 전송합니다.

### public/worker-canvas.js
캔버스 드로잤을 수행하는 워커 스크립트입니다.

- `self.onmessage`에서 `canvas`와 `command` 메시지를 처리합니다.
- `canvas` 수신 시 `getContext("2d")`로 컨텍스트를 저장합니다.
- `"start"` 명령 수신 시 `animate()` 함수를 호출합니다.
- `animate()`: `clearRect` -> `fillRect` (배경 #131313) -> `save`/`translate`(중앙)/`rotate`(angle)/`fillRect`(핑크 사각형)/`restore` -> angle 업데이트 -> `requestAnimationFrame(animate)`로 루프를 구현합니다.

### src/arrayBuffer.js
이미지 흑백 변환의 메인 스크립트입니다.

- 파일 입력, 흑백 변환 버튼, 원본/흑백 캔버스 2개를 렌더링합니다.
- 버튼 클릭 시 선택된 이미지를 `Image` 객체로 로드합니다.
- `originalCanvas`에 `drawImage()`로 원본 이미지를 표시합니다.
- `getImageData()`로 픽셀 데이터를 가져옵니다.
- `imageData.data.buffer`를 `worker.postMessage({ buffer, width, height }, [buffer])`로 transferable 객체로 워커에 전송합니다 (제영복사 방지).
- `worker.onmessage`에서 수신된 buffer로 `ImageData`를 복원하고, `grayscaleCanvas`에 `putImageData()`로 흑백 이미지를 표시합니다.

### public/worker-arrayBuffer.js
이미지 흑백 변환을 수행하는 워커 스크립트입니다.

- `self.onmessage`에서 `{ buffer, width, height }`를 수신합니다.
- `Uint8ClampedArray`로 픽셀 배열을 생성합니다.
- 4바이트씩(R, G, B, A) 순회하며 R, G, B 값의 평균으로 흑백 변환합니다 (`gray = (r + g + b) / 3`).
- 변환된 buffer를 `self.postMessage()`로 transferable 객체로 메인 스레드에 반환합니다.

### src/style.css
앱의 스타일 파일입니다.

## 동작 순서

### 소수 계산기
1. 최대 숫자 입력 필드에 숫자를 입력합니다.
2. 계산 버튼을 클릭하면 `worker-prime.js` 워커가 생성됩니다.
3. 메인 스레드가 최대 숫자를 워커에 전송합니다.
4. 워커에서 백그라운드로 소수 계산을 수행합니다 (메인 스레드 블로킹 없음).
5. 계산 완료 후 소수 배열을 메인 스레드에 반환합니다.
6. 메인 스레드에서 소수의 개수를 UI에 표시하고, 워커를 종료합니다.

### 캔버스 드로잤
1. 페이지 로드 시 `<canvas>` 요소가 생성됩니다.
2. `transferControlToOffscreen()`으로 캔버스 제어를 워커에 전이합니다.
3. `worker-canvas.js` 워커가 생성되고, 캔버스와 시작 명령을 수신합니다.
4. 워커에서 `requestAnimationFrame`을 사용하여 회전하는 핑크 사각형을 지속적으로 드로잤합니다 (메인 스레드 블로킹 없음).

### 이미지 흑백 변환
1. 파일 입력으로 이미지를 선택합니다.
2. 흑백 변환 버튼을 클릭하면 원본 이미지가 캔버스에 표시됩니다.
3. 픽셀 데이터의 buffer가 transferable 객체로 워커에 전송됩니다.
4. 워커에서 백그라운드로 각 픽셀의 R, G, B 평균값을 계산하여 흑백 변환을 수행합니다.
5. 변환된 buffer가 메인 스레드에 반환되어 흑백 이미지가 캔버스에 표시됩니다.
