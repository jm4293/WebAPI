# Ink (Pointer Events 그림 그리기)

## 개요
Pointer Events API를 활용한 캔버스 기반 그림 그리기 앱입니다. 마우스, 스타일러스(Pen), 터치 등 다양한 입력 장치를 통합적으로 처리하며, 스타일러스 입력 시 압력(pressure) 값을 기반으로 선의 두께를 동적으로 변화시켜 실제 펜 그림과 유사한 경험을 제공합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
ink/
├── index.html          # 앱의 진입점. 800x600 크기의 canvas 요소를 포함하는 UI 구조 제공
└── src/
    ├── main.js         # Pointer Events를 이용한 그림 그리기 로직 구현
    └── style.css       # 페이지 및 캔버스 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의합니다. 800x600 크기의 `<canvas>` 요소를 포함하며, 이 캔버스 위에서 모든 그림 작업이 이루어집니다.

### src/main.js
Pointer Events를 사용하여 캔버스 위의 그림 그리기 기능을 구현합니다. 주요 구성 요소는 다음과 같습니다.

- **pointerdown**: `isDrawing`을 `true`로 설정하고, 현재 좌표를 `lastX`/`lastY`로 저장하여 그림 그리기의 시작점을 기록합니다.
- **pointerup**: `isDrawing`을 `false`로 설정하여 그림 그리기를 종료합니다.
- **pointermove**: `isDrawing`이 `true`인 상태에서만 그림을 그리며, `pointerType`에 따라 선의 두께를 결정합니다.
  - `pointerType`이 `"pen"`인 경우: `e.pressure` 값을 활용하여 `minWidth(0.01)` ~ `maxWidth(12)` 범위로 선의 두께를 동적으로 계산합니다.
  - 마우스인 경우: 고정 두께 2로 그림을 그립니다.
  - 그림은 `beginPath()` → `moveTo(lastX, lastY)` → `lineTo(현재 좌표)` → `stroke()` 순서로 선분씩 렌더링됩니다.
- **pointerout**: 포인터가 캔버스 영역 밖으로 나간 경우 `isDrawing`을 `false`로 설정하여 그림 그리기를 중단합니다.
- **pointerenter**: 포인터가 캔버스 영역에다시 진입할 때, `e.buttons > 0`(버튼이 눌린 상태)이면 `isDrawing`을 `true`로 복원하여 연속 그림 그리기가 가능하도록 합니다.
- **선의 스타일**: `lineCap`과 `lineJoin`을 모두 `"round"`로 설정하여 선분 끝과 꺾인 부분이 부드럽게 렌더링됩니다.

### src/style.css
캔버스 영역과 전체 페이지의 레이아웃 및 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 800x600 크기의 캔버스가 표시되고, Pointer Events 핸들러가 등록됩니다.
2. 사용자가 캔버스 위에서 마우스 버튼을 누르거나 스타일러스를 댄다면 `pointerdown` 이벤트가 발생하여 `isDrawing = true`로 설정되고 시작 좌표가 저장됩니다.
3. 포인터를 이동하면 `pointermove` 이벤트가 연속으로 발생하며, `isDrawing` 상태를 확인합니다.
4. 입력 장치의 `pointerType`을 판별하여 스타일러스이면 압력 기반 동적 두께, 마우스이면 고정 두께로 선분을 그립니다.
5. 각 선분은 `moveTo` → `lineTo` → `stroke()` 순서로 이전 좌표와 현재 좌표를 잇는 짧은 선분으로 렌더링됩니다.
6. 마우스 버튼을 놓으면 `pointerup`이 발생하여 그림 그리기를 종료합니다.
7. 포인터가 캔버스 밖으로 나가면 `pointerout`으로 그림이 중단되고, 다시 캔버스 위로 돌아오면 `pointerenter`에서 버튼 눌림 상태를 확인하여 연속 그림을 복원합니다.
