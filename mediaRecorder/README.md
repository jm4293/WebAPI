# Media Recorder API

## 개요
Media Recorder API는 웹캠과 마이크로부터 받아온 미디어 스트림을 录제(녹화)하는 API입니다. 이 프로젝트는 Media Recorder API와 getUserMedia API를 결합하여 웹캠 영상과 오디오를 실시간으로 녹화하고, 완료된 영상을 다운로드할 수 있는 기능을 구현합니다.

## 권한
- **카메라(Camera)**: 웹캠 영상 스트림을 가져오기 위한 권한이 필요합니다.
- **마이크(Microphone)**: 오디오 스트림을 가져오기 위한 권한이 필요합니다.

사용자가 브라우저의 권한 다이얼로그에서 카메라와 마이크 권한을 모두 허용해야 앱이 정상 동작합니다.

## 폴더 구조
```
mediaRecorder/
├── index.html          # 앱의 진입점. video 요소와 녹화 시작/중지/다운로드 버튼을 포함하는 UI 구조 제공
└── src/
    ├── main.js         # getUserMedia와 MediaRecorder를 이용한 녹화 및 다운로드 로직 구현
    └── style.css       # 페이지 및 video 영역 스타일링
```

## 파일 설명

### index.html
앱의 HTML 구조를 정의합니다. 웹캠 영상을 표시할 `<video>` 요소와 녹화 시작, 녹화 중지, 다운로드 버튼을 포함합니다.

### src/main.js
웹캠 스트림 가져오기, 녹화, 다운로드의 전체 로직을 담당합니다. 주요 구성 요소는 다음과 같습니다.

- **getStream()**: 페이지 로드 시 자동으로 호출됩니다. `navigator.mediaDevices.getUserMedia({video: true, audio: true})`를 사용하여 웹캠과 마이크 스트림을 가져옵니다. 실패 시 오류 타입에 따라 구분하여 메시지를 표시합니다.
  - `NotAllowedError`: 사용자가 권한을 거부한 경우
  - `NotFoundError`: 카메라 또는 마이크 장치가 없는 경우
- **startBtn 클릭**: `MediaRecorder.isTypeSupported("video/webm")`로 지원 여부를 확인한 후, `new MediaRecorder(stream, {mimeType})`로 MediaRecorder 객체를 생성합니다.
  - `ondataavailable`: 녹화된 데이터 청크를 `recordedChunks` 배열에 push합니다.
  - `onstop`: 녹화가 완료되면 `recordedChunks`로 `Blob`을 생성하고, `URL.createObjectURL()`로 다운로드용 URL을 생성합니다.
- **stopBtn 클릭**: `mediaRecorder.stop()`을 호출하여 녹화를 중지합니다.
- **downloadBtn 클릭**: 숨겨진 `<a>` 태그의 `href`에 생성된 URL을 설정하고 `.click()`을 트리거하여 파일을 다운로드합니다.

### src/style.css
video 영역과 버튼 등 전체 페이지의 레이아웃과 시각적 스타일을 정의합니다.

## 동작 순서
1. 페이지가 로드되면 `getStream()`이 자동 호출되어 `getUserMedia()`를 통해 웹캠과 마이크 권한을 요청합니다.
2. 사용자가 브라우저 권한 다이얼로그에서 카메라와 마이크를 허용하면 스트림이 가져와져 `<video>` 요소에 실시간 영상이 표시됩니다.
3. 권한 거부 시 `NotAllowedError`, 장치 미발견 시 `NotFoundError` 등의 오류 메시지가 표시됩니다.
4. **녹화 시작** 버튼을 클릭하면 `"video/webm"` 형식 지원 여부를 확인한 후 `MediaRecorder`를 생성하고 녹화를 시작합니다.
5. 녹화 중 `ondataavailable` 이벤트가 발생하며, 데이터 청크가 `recordedChunks` 배열에 축적됩니다.
6. **녹화 중지** 버튼을 클릭하면 `mediaRecorder.stop()`이 호출되어 녹화가 종료됩니다.
7. `onstop` 이벤트에서 축적된 청크들로 `Blob`을 생성하고 `URL.createObjectURL()`로 다운로드 URL을 준비합니다.
8. **다운로드** 버튼을 클릭하면 숨겨진 `<a>` 태그를 활용하여 녹화된 영상 파일이 다운로드됩니다.
