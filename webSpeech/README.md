# Web Speech API

## 개요
Web Speech API는 웹 페이지에서 텍스트를 음성으로 출력하는 기능을 제공하는 API입니다. `SpeechSynthesis` 인터페이스를 사용하여 사용자가 입력한 텍스트를 선택된 음성으로 읽어드리는 텍스트-투-스피치(TTS) 기능을 구현합니다. 한국어 음성을 우선적으로 표시하며, 다양한 언어의 음성 중 원하는 음성을 선택할 수 있습니다.

## 권한
필요한 권한 없음. Chrome에서 가장 안정적으로 지원됩니다.

## 폴더 구조
```
webSpeech/
├── index.html          # 앱 진입점 HTML 파일
└── src/
    ├── main.js         # Web Speech API를 사용한 TTS 로직
    └── style.css       # 스타일 파일
```

## 파일 설명

### index.html
앱의 진입점 파일로, `src/main.js`와 `src/style.css`를 로드합니다. 텍스트 입력, 음성 선택 드롭다운, 말하기/정지 버튼, 상태 표시 영역 등의 UI를 포함합니다.

### src/main.js
Web Speech API의 `SpeechSynthesis`를 활용한 텍스트-투-스피치 로직을 포함합니다.

- **지원 여부 확인**: `speechSynthesis` API 지원 여부를 확인합니다. 미지원 시 버튼을 비활성화합니다.
- **음성 목록 로드**: `synth.onvoiceschanged` 이벤트에서 사용 가능한 음성 목록을 로드하고 정렬합니다. 한국어 음성(`lang.startsWith("ko")`)을 먼저 드롭다운에 추가한 후 나머지 음성을 추가합니다.
- **speakButton 클릭**: 이미 음성 출력 중이면 `cancel()`을 먼저 호출합니다. `new SpeechSynthesisUtterance(textInput.value)`로 발화 객체를 생성합니다. 드롭다운에서 선택된 음성을 `data-name` 속성으로 찾아 `utterance.voice`에 설정합니다. `onstart`에서 "음성 출력 중..." 메시지를 표시하고 버튼 상태를 전환합니다. `onend`에서 완료 메시지를 표시합니다. `onerror`에서 오류 메시지를 표시합니다. 마지막으로 `synth.speak(utterance)`로 음성 출력을 실행합니다.
- **stopButton 클릭**: `synth.cancel()`을 호출하여 진행 중인 음성 출력을 중단합니다.

### src/style.css
앱의 스타일 파일입니다.

## 동작 순서
1. 페이지가 로드되면 `speechSynthesis` API 지원 여부를 확인합니다.
2. `synth.onvoiceschanged` 이벤트가 발생하여 사용 가능한 음성 목록을 로드합니다.
3. 한국어 음성을 우선적으로 드롭다운에 추가한 후 나머지 음성을 추가합니다.
4. 사용자가 텍스트 입력 필드에 원하는 텍스트를 입력합니다.
5. 드롭다운에서 원하는 음성을 선택합니다.
6. 말하기 버튼을 클릭하면 `SpeechSynthesisUtterance` 객체가 생성됩니다.
7. 선택된 음성이 발화 객체에 설정되고 `synth.speak()`로 음성 출력이 시작됩니다.
8. 음성 출력 시작 시 상태 영역에 "음성 출력 중..." 메시지가 표시됩니다.
9. 음성 출력이 완료되면 `onend` 이벤트가 발생하여 완료 메시지가 표시됩니다.
10. 정지 버튼을 클릭하면 `synth.cancel()`로 진행 중인 음성 출력을 즉시 중단합니다.
