# WebRTC API

## 개요
WebRTC(Web Real-Time Communication) API는 브라우저 간 실시간 통신을 가능해주는 API입니다. 이 프로젝트는 WebRTC의 DataChannel을 활용하여 피어 간 실시간 채팅 기능을 구현합니다. WebSocket 서버를 시그널링(signaling) 서버로 사용하여 피어 간 연결을 세팅하고, 연결 완료 후 WebRTC DataChannel을 통해 메시지를 직접 교환합니다.

## 권한
필요한 권한 없음. 단, WebSocket 시그널링 서버를 먼저 실행해야 합니다 (`npm install` 후 `node server.js`).

## 폴더 구조
```
webRTC/
├── client/
│   ├── index.html          # 클라이언트 채팅 UI HTML 파일
│   └── src/
│       ├── main.js         # WebRTC 연결 및 채팅 로직
│       └── style.css       # 클라이언트 스타일 파일
├── server/
│   └── server.js           # WebSocket 시그널링 서버
└── package.json            # Node.js 패키지 관리 파일
```

## 파일 설명

### client/index.html
클라이언트 측 채팅 앱의 진입점 파일입니다. 사용자 ID 표시, 채팅 영역, 메시지 입력, 전송 버튼 등의 UI를 포함합니다.

### client/src/main.js
WebRTC DataChannel을 사용한 피어 간 실시간 채팅 로직을 포함합니다.

- **WebSocket 연결**: `new WebSocket("ws://localhost:8080")`로 시그널링 서버에 연결합니다.
- **peers 객체**: `peerId -> { pc, dataChannel }` 형태로 연결된 피어 정보를 관리합니다.
- **ws.onopen**: 연결 성공 시 `{ type: "new-peer", from: userId }` 메시지를 서버에 전송하여 새 피어임을 알립니다.
- **ws.onmessage**: 수신된 메시지 타입에 따라 다음과 같이 처리합니다.
  - `"new-peer"`: `createPeerConnection(from)`을 호출하여 새 피어와의 연결을 시작합니다.
  - `"offer"`: `handleOffer()`를 호출하여 Offer를 처리합니다.
  - `"answer"`: `handleAnswer()`를 호출하여 Answer를 `setRemoteDescription`에 설정합니다.
  - `"candidate"`: `handleCandidate()`를 호출하여 ICE candidate를 `addIceCandidate`에 추가합니다.
- **createPeerConnection(peerId)**: `RTCPeerConnection`을 생성합니다 (iceServers: `stun:stun.l.google.com:19302`). `createDataChannel("chat")`로 데이터 채널을 생성하고, `onicecandidate` 핸들러에서 candidate를 WebSocket으로 대상 피어에게 전송합니다. `createOffer()` -> `setLocalDescription` -> WebSocket으로 Offer 전송 순서로 진행합니다.
- **handleOffer(peerId, sdp)**: 새 `RTCPeerConnection`을 생성하고, `ondatachannel` 핸들러를 등록합니다. `setRemoteDescription(sdp)` -> `createAnswer()` -> `setLocalDescription` -> Answer를 WebSocket으로 전송합니다.
- **handleAnswer(peerId, sdp)**: `setRemoteDescription`으로 Answer를 설정합니다.
- **handleCandidate(peerId, candidate)**: `remoteDescription`이 이미 설정된 상태에서만 `addIceCandidate`를 호출합니다.
- **sendBtn 클릭**: 연결된 모든 peers의 `dataChannel`에 메시지를 전송합니다.

### client/src/style.css
클라이언트 측 채팅 UI 스타일 파일입니다.

### server/server.js
WebSocket 기반 시그널링 서버입니다. RTCPeerConnection 세팅에 필요한 메시지를 클라이언트 간에 중계합니다.

- **WebSocket.Server**: port 8080에서 WebSocket 서버를 실행합니다.
- **clients Map**: `userId -> ws` 형태로 연결된 클라이언트를 관리합니다.
- **"new-peer"**: 클라이언트를 Map에 추가하고, 다른 모든 클라이언트에게 broadcast합니다.
- **"offer", "answer", "candidate"**: `to` 필드를 기반으로 특정 클라이언트에게 직접 relay합니다.
- **ws "close" 이벤트**: 클라이언트를 Map에서 제거하고, "peer-disconnected" 메시지를 broadcast합니다.

### package.json
서버 측 Node.js 패키지 관리 파일입니다. WebSocket 서버에 필요한 의존성을 포함합니다.

## 동작 순서
1. `npm install`을 실행하여 의존성을 설치합니다.
2. `node server.js`를 실행하여 WebSocket 시그널링 서버를 시작합니다.
3. 클라이언트 페이지를 열면, WebSocket을 통해 시그널링 서버에 연결됩니다.
4. 연결 성공 시 `"new-peer"` 메시지를 서버에 전송합니다.
5. 서버가 해당 메시지를 다른 클라이언트들에게 broadcast하여 새 피어 존재를 알립니다.
6. 수신 측 클라이언트가 `createPeerConnection()`을 호출하여 Offer를 생성하고 서버를 통해 전송합니다.
7. 상대 클라이언트가 Offer를 수신하여 Answer를 생성하고 서버를 통해 전송합니다.
8. 양측이 ICE candidate를 교환하여 WebRTC 연결을 완성합니다.
9. DataChannel 연결이 완료되면, 메시지는 WebRTC DataChannel을 통해 피어 간에 직접 전송됩니다.
10. 피어가 연결을 종료하면 서버가 "peer-disconnected"를 broadcast하여 다른 클라이언트에게 알립니다.
