# Web API 예제 모음을 만들게 된 이유

최근 몇 달간 프론트엔드 개발을 하면서 느낀 점이 있다. 브라우저가 제공하는 기능들이 생각보다 많은데, 정작 실무에서는 익숙한 몇 가지만 계속 사용하게 된다는 것이다. IndexedDB나 WebRTC 같은 API는 이름만 들어봤지 직접 써본 적이 없었고, Intersection Observer나 Resize Observer는 어떻게 동작하는지 정확히 알지 못한 채 라이브러리에만 의존하고 있었다.

문서를 읽는 것만으로는 한계가 있다고 느껴서, 각 API를 직접 사용해보는 예제를 하나씩 만들어보기로 했다. 그렇게 시작한 게 이 저장소다.

## 어떤 식으로 만들었나

처음에는 자주 쓰는 것부터 시작했다. Intersection Observer로 이미지 지연 로딩을 구현하고, Fullscreen API로 전체화면 전환을 만들었다. 그러다 보니 "이왕 하는 김에 한번도 안 써본 것들도 해보자"는 생각이 들었다.

그래서 MDN 문서를 보면서 재밌어 보이는 API들을 골라서 하나씩 만들었다. Eye Dropper API로 화면의 색상을 추출하는 기능도 만들어보고, Screen Wake Lock으로 화면이 꺼지지 않게 하는 것도 해봤다. Web Audio API로는 간단한 피아노를 만들었는데, 생각보다 소리가 제대로 나와서 신기했다.

각 예제는 독립적인 폴더로 구성했다. 하나의 API에 집중할 수 있게 하려고 각 폴더마다 README를 작성했고, 해당 API가 어떻게 동작하는지, 어떤 권한이 필요한지, 파일 구조는 어떤지 등을 정리했다.

## 만들면서 배운 것들

### 브라우저가 할 수 있는 일이 정말 많다

WebRTC로 P2P 통신을 구현하면서 서버 없이도 브라우저끼리 직접 통신할 수 있다는 게 인상적이었다. STUN 서버와 시그널링 서버만 있으면 실시간 채팅을 만들 수 있었다.

IndexedDB는 LocalStorage보다 훨씬 강력했다. 단순히 키-값만 저장하는 게 아니라 인덱스를 만들어서 검색도 할 수 있고, 커서로 순회하면서 Like 검색도 가능했다. 브라우저 안에 작은 데이터베이스가 있는 셈이다.

File System Access API는 사용자가 파일을 열고 저장할 수 있게 해주는데, 이걸 쓰면 간단한 메모장이나 에디터를 브라우저에서 만들 수 있다. 실제로 파일 시스템에 접근할 수 있다는 게 놀라웠다.

### API마다 특성이 다르다

어떤 API는 사용자 제스처가 필요하다. Eye Dropper나 Screen Capture는 버튼 클릭 같은 이벤트 안에서만 호출할 수 있다. 보안상 당연한 제약이지만, 처음에는 왜 안 되나 싶어서 헤맸다.

권한이 필요한 API도 있다. Geolocation이나 Notifications는 사용자에게 명시적으로 허용을 받아야 한다. 브라우저마다 권한 요청 방식이 조금씩 달라서, 여러 브라우저에서 테스트해보는 게 중요했다.

반면 Page Visibility나 Network Information 같은 건 권한도 필요 없고 바로 쓸 수 있다. 사용자가 탭을 전환했을 때를 감지하거나, 현재 네트워크 상태를 확인하는 정도라 부담이 없다.

### 서버가 필요한 경우도 있다

WebSocket, Server-Sent Events, Streams 같은 건 서버와의 통신이 필요해서 클라이언트만으론 완성할 수 없었다. Node.js로 간단한 서버를 만들어서 같이 구성했다.

WebRTC도 처음에는 클라이언트만 있으면 될 줄 알았는데, 피어를 연결하려면 시그널링 서버가 필요하더라. WebSocket 서버를 만들어서 Offer와 Answer, ICE candidate를 중계하게 했다.

## 전체 목록

총 30개 정도의 API를 다뤘다. 각각 독립적인 예제로 만들었고, 실행하면 바로 동작을 확인할 수 있다.

- **Web Animations API**: JavaScript로 DOM 요소를 애니메이션
- **Web Audio API**: 브라우저에서 소리를 생성하고 재생 (피아노 예제)
- **Broadcast Channel API**: 같은 사이트의 여러 탭끼리 메시지 주고받기
- **Channel Messaging API**: iframe이나 Worker 간 안전하게 통신
- **Device Memory API**: 사용자 기기의 RAM 용량 확인
- **Drag and Drop**: 파일이나 폴더를 드래그해서 읽기
- **Eye Dropper API**: 화면에서 색상 추출
- **File System Access API**: 파일 열기, 저장, 폴더 탐색
- **Fullscreen API**: 요소를 전체화면으로 표시
- **Geolocation API**: 사용자 위치 정보 가져오기
- **IndexedDB API**: 브라우저 안의 NoSQL 데이터베이스
- **Pointer Events (Canvas)**: 캔버스에 그림 그리기
- **Intersection Observer API**: 요소가 화면에 보일 때를 감지 (이미지 지연 로딩)
- **Media Recorder API**: 웹캠과 마이크로 영상 녹화
- **Network Information API**: 네트워크 속도와 상태 확인
- **Notifications API**: 시스템 알림 표시
- **Page Visibility API**: 페이지가 활성화되어 있는지 확인
- **Prioritized Task Scheduling API**: 작업에 우선순위를 지정해서 실행
- **Resize Observer API**: 요소 크기 변화 감지
- **Screen Capture API**: 화면이나 특정 창 캡처
- **Screen Wake Lock API**: 화면이 꺼지지 않게 유지
- **Server-Sent Events**: 서버에서 클라이언트로 실시간 이벤트 전송
- **Streams API**: 데이터를 조각조각 받아서 처리
- **View Transitions API**: 콘텐츠 전환 시 부드러운 애니메이션
- **Web Components**: Shadow DOM으로 재사용 가능한 컴포넌트 만들기
- **Web Crypto API**: 브라우저에서 암호화/복호화
- **WebRTC API**: 브라우저끼리 직접 통신 (P2P 채팅)
- **WebSocket API**: 서버와 실시간 양방향 통신
- **Web Speech API**: 텍스트를 음성으로 변환
- **OPFS**: 브라우저 전용 파일 시스템에 파일 저장

## 실제로 써먹을 수 있을까

이미 몇 가지는 실무에서도 쓰고 있다. Intersection Observer는 무한 스크롤이나 이미지 최적화에 유용하고, Page Visibility는 탭이 비활성화됐을 때 API 호출을 멈추는 데 쓰고 있다.

IndexedDB는 오프라인 기능이 필요한 앱에서 유용할 것 같다. 사용자 데이터를 로컬에 저장해두고, 네트워크가 연결되면 동기화하는 식으로 구현할 수 있다.

WebRTC나 WebSocket은 채팅이나 협업 도구를 만들 때 쓸 수 있다. 서버 부하를 줄이고 싶다면 WebRTC로 P2P 통신을 하는 게 좋고, 서버와 계속 연결을 유지하면서 푸시를 받고 싶다면 WebSocket이 적합하다.

물론 브라우저 호환성은 확인해야 한다. Eye Dropper나 View Transitions는 아직 지원하지 않는 브라우저가 있다. Can I Use 같은 사이트에서 확인하고 사용하는 게 좋다.

## 앞으로

이 저장소는 계속 업데이트할 예정이다. 새로운 API가 추가되면 예제를 만들어서 추가하고, 기존 예제도 개선할 부분이 있으면 고칠 생각이다.

혹시 이런 예제가 필요한 사람이 있다면 참고해도 좋을 것 같다. 각 폴더의 README를 보면 API가 어떻게 동작하는지 알 수 있고, 코드를 그대로 실행해보면서 테스트할 수 있다.

브라우저가 제공하는 기능들을 알아두면 개발할 때 선택지가 늘어난다. 라이브러리를 쓰는 것도 좋지만, 가끔은 네이티브 API만으로도 충분한 경우가 있다.

---

**저장소**: [https://github.com/jm4293/WebAPI](https://github.com/jm4293/WebAPI)
