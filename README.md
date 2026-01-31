# Web API

Web API는 웹 브라우저에서 제공하는 다양한 기능을 JavaScript로 제어할 수 있게 해주는 인터페이스입니다.

---

## 프로젝트 구조

각 폴더는 하나의 Web API를 주제로 한 독립적인 예제입니다. 폴더 안의 `README.md`에서 해당 API의 자세한 설명, 동작 순서, 권한 정보 등을 확인할 수 있습니다.

---

## Web API 목록

| # | API | 폴더 | 설명 |
|---|-----|------|------|
| 1 | **Web Animations API** | [animations](./animations) | JavaScript로 DOM 요소의 애니메이션을 생성하고 제어 |
| 2 | **Web Audio API** | [audio](./audio) | 오디오를 프로그래밍적으로 생성하고 재생 (피아노 예제) |
| 3 | **Broadcast Channel API** | [broadcastChannel](./broadcastChannel) | 동일 오리진의 여러 탭 간 실시간 메시지 전달 |
| 4 | **Channel Messaging API** | [channelMessaging](./channelMessaging) | MessageChannel을 이용한 iframe, 팝업, Worker 간 안전한 통신 |
| 5 | **Device Memory API** | [deviceMemory](./deviceMemory) | 사용자 장치의 대략적인 RAM 용량 감지 |
| 6 | **Drag and Drop (File System)** | [dragAndDrop](./dragAndDrop) | 드래그 앤 드롭으로 폴더·파일을 읽고 탐색 |
| 7 | **Eye Dropper API** | [eyeDropper](./eyeDropper) | 화면 위의 색상을 픽서로 추출 |
| 8 | **File System Access API** | [fileSystemAccess](./fileSystemAccess) | 파일 열기·저장·디렉토리 탐색 다이얼로그 |
| 9 | **Fullscreen API** | [fullScreen](./fullScreen) | 특정 요소를 전체 화면으로 표시하고 제어 |
| 10 | **Geolocation API** | [geoLocation](./geoLocation) | 사용자의 실시간 위치 정보 가져오기 및 감시 |
| 11 | **IndexedDB API** | [indexedDB](./indexedDB) | 브라우저 내 NoSQL 형태의 클라이언트 저장소 |
| 12 | **Pointer Events (Canvas)** | [ink](./ink) | 마우스·펜 입력을 캔버스에서 처리하고 그림 그리기 |
| 13 | **Intersection Observer API** | [intersectionObserver](./intersectionObserver) | 요소가 뷰포트에 진입하는 시점을 감지하여 이미지 지연 로딩 |
| 14 | **Media Recorder API** | [mediaRecorder](./mediaRecorder) | 웹캠과 마이크를 사용한 실시간 영상 녹화 |
| 15 | **Network Information API** | [networkInformation](./networkInformation) | 현재 네트워크 유형, 속도, RTT 등의 정보 감지 |
| 16 | **Notifications API** | [notifications](./notifications) | 시스템 레벨 알림 표시 |
| 17 | **Page Visibility API** | [pageVisibility](./pageVisibility) | 페이지가 활성/비활성 상태인지 감지하여 리소스 절약 |
| 18 | **Prioritized Task Scheduling API** | [prioritizedTaskScheduling](./prioritizedTaskScheduling) | 우선순위를 지정하여 작업을 스케줄링하고 실행 |
| 19 | **Resize Observer API** | [resizeObserver](./resizeObserver) | DOM 요소의 크기 변경을 실시간으로 관찰 |
| 20 | **Screen Capture API** | [screenCapture](./screenCapture) | 모니터 화면 또는 특정 윈도우를 캡처하여 스트리밍 |
| 21 | **Screen Wake Lock API** | [screenWakeLock](./screenWakeLock) | 화면이 자동으로 꺼지지 않도록 유지 |
| 22 | **Server-Sent Events (SSE)** | [serverSentEvent](./serverSentEvent) | 서버에서 클라이언트로 단방향 실시간 이벤트 전송 |
| 23 | **Streams API** | [stream](./stream) | 청크 단위로 데이터를 실시간으로 수신하고 파일로 저장 |
| 24 | **View Transitions API** | [viewTransitions](./viewTransitions) | 콘텐츠 교체 시 부드러운 시각적 전환 효과 |
| 25 | **Web Components** | [webComponent](./webComponent) | Shadow DOM을 사용한 재사용 가능한 커스텀 HTML 요소 |
| 26 | **Web Crypto API** | [webCrypto](./webCrypto) | AES-GCM 암호화·복호화 수행 |
| 27 | **WebRTC API** | [webRTC](./webRTC) | STUN 서버와 WebSocket 시그널링을 이용한 P2P 통신 |
| 28 | **WebSocket API** | [webSocket](./webSocket) | 서버와의 양방향 실시간 채팅 (gzip 압축 포함) |
| 29 | **Web Speech API** | [webSpeech](./webSpeech) | 텍스트를 음성으로 합성하여 출력 |
| 30 | **OPFS (Origin Private File System)** | [OPFS](./OPFS) | 오리진별 개인 파일 시스템에서 파일 작성·읽기·삭제 |

---

## 학습 참고 자료

- [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/API)
- [W3C Web APIs](https://www.w3.org/TR/)
- [Can I Use](https://caniuse.com/) — 브라우저 호환성 확인
