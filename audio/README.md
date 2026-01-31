# Web Audio API

## 개요
Web Audio API는 오디오를 생성·조절·재생하기 위한 강력한 JavaScript API입니다. 이 프로젝트에서는 Web Audio API를 활용하여 소프트웨어 피아노를 구현합니다. Oscillator를 사용하여 특정 주파수의 사인파를 생성하고, GainNode를 통해 볼륨을 제어하여 현실적인 피아노 음색을 표현합니다.

## 권한
필요한 권한 없음

## 폴더 구조
```
audio/
├── index.html          # 앱의 진입점 HTML 파일
└── src/
    ├── main.js         # Web Audio API 핵심 로직 및 피아노 구현
    └── style.css       # 피아노 키 및 페이지 스타일
```

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 구조를 정의하고 JS/CSS를 로드하는 엔트리포인트 |
| `src/main.js` | AudioContext, Oscillator, GainNode를 활용한 음표 재생 로직 |
| `src/style.css` | 피아노 키 버튼 및 전체 레이아웃 스타일 |

## 파일 설명

### index.html
기본 HTML 구조를 제공하며, 피아노 키 버튼이 렌더링될 컨테이너를 포함합니다. `main.js`와 `style.css`를 로드하여 앱을 초기화합니다.

### src/main.js
Web Audio API를 사용하여 소프트웨어 피아노의 핵심 로직을 구현합니다.

**음표-주파수 매핑**
- `noteFrequencies` 객체를 통해 C4(도)부터 C5(도)까지 8개의 음표와 해당 주파수를 매핑합니다.
  - `C4: 261.63Hz`, `D4: 293.66Hz`, `E4: 329.63Hz`, `F4: 349.23Hz`, `G4: 392.00Hz`, `A4: 440.00Hz`, `B4: 493.88Hz`, `C5: 523.25Hz`

**UI 렌더링**
- 피아노 키 8개 (C4~C5, 도레미파솔라시도) 버튼을 렌더링합니다.
- 각 버튼에 `data-note` 속성으로 음표명(예: `"C4"`)을 저장합니다.

**오디오 엔진**
- 앱 초기화 시 `new AudioContext()`로 오디오 컨텍스트를 생성합니다.
- 버튼 클릭 시 해당 음표의 주파수를 조회한 후 `playNote(frequency)`를 호출합니다.

**`playNote(frequency)` 함수**
- `OscillatorNode`를 생성하고 타입을 `sine`으로 설정합니다.
- `GainNode`를 생성하여 볼륨을 제어합니다.
- `setValueAtTime`으로 주파수와 초기 gain 값(`0.3`)을 설정합니다.
- `exponentialRampToValueAtTime(0.01, ...)`로 gain을 페이드아웃합니다.
- 노드 체인: `Oscillator → GainNode → AudioContext.destination`으로 연결합니다.
- `start()`와 `stop()`을 호출하여 음표를 재생하고 종료합니다.

### src/style.css
피아노 키 버튼의 크기, 색상, 간격과 전체 레이아웃을 정의합니다.

## 동작 순서

1. 페이지가 로드되면 `main.js`가 실행되어 피아노 키 8개 버튼을 렌더링합니다.
2. 각 버튼에 `data-note` 속성과 클릭 이벤트 리스너가 부여됩니다.
3. `AudioContext`를 생성하여 오디오 엔진을 초기화합니다.
4. 사용자가 피아노 키 버튼을 클릭하면, `data-note` 값으로 해당 음표의 주파수를 조회합니다.
5. `playNote(frequency)`가 호출되며, `OscillatorNode`와 `GainNode`가 생성됩니다.
6. Oscillator의 주파수는 `setValueAtTime`으로 설정되고, GainNode의 볼륨은 `0.3`에서 시작합니다.
7. `exponentialRampToValueAtTime(0.01, ...)`로 gain이 급격히 감소하여 자연스러운 페이드아웃 효과가 적용됩니다.
8. 노드가 `Oscillator → GainNode → destination`으로 연결된 후 `start()`로 음표가 재생됩니다.
9. 페이드아웃이 완료되는 시점에 `stop()`이 호출되어 Oscillator가 종료됩니다.
