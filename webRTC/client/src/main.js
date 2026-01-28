import "./style.css";

document.querySelector("#app").innerHTML = `
  <h2>WebRTC Multi-Peer Chat</h2>
  <div class='chat-layout'>
    <div id='chat'></div>
    <div>
      <span id="user-id">text</span>
      <input type="text" id="message" placeholder="Type a message..." />
      <button id="sendBtn">Send</button>
    </div>
  </div>
`;

const ws = new WebSocket(`ws://localhost:8080`);

// key: peer의 Id, value: DataChannel 객체
const peers = {};

const userId = Math.random().toString(36).substring(2, 10);

const domChat = document.getElementById("chat");
const domUserId = document.getElementById("user-id");
const domMessageInput = document.getElementById("message");
const domSendButton = document.getElementById("sendBtn");

domUserId.textContent = `Your ID: ${userId}`;

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "new-peer", from: userId }));
};

ws.onmessage = async (event) => {
  const data = JSON.parse(event.data);
  /*
    type: 메세지 타입(new-peer, offer, answer, candidate, peer-disconnected)
    from: 메세지를 전달 받을 피어의 Id
    to: 메세지를 전달한 피어의 Id
    sdp: P2P 연결을 위한 SDP 정보
    candidate: P2P 연결을 위한 ICE 후보 정보
  */
  const { type, from, to, sdp, candidate } = data;
  console.log("수신된 메시지:", data);

  if (type !== "new-peer" && to !== userId) return;

  if (type === "new-peer") {
    console.log(`new-peer@ws.onmessage(${from}->${to})`, Date.now());
    createPeerConnection(from);
  } else if (type === "offer") {
    console.log(`offer@ws.onmessage(${from}->${to})`, Date.now());
    await handleOffer(from, sdp);
  } else if (type === "answer") {
    console.log(`answer@ws.onmessage(${from}->${to})`, Date.now());
    await handleAnswer(from, sdp);
  } else if (type === "candidate") {
    console.log(`candidate@ws.onmessage(${from}->${to})`, Date.now());
    await handleCandidate(from, candidate);
  } else if (type === "peer-disconnected") {
    console.log(`피어 연결 해제: ${from}`);
  }
};

function createPeerConnection(peerId) {
  /*
    STUN 서버의 역할
      - 공인 IP와 포트 정보 제공해 줌
      - ICE 후보 생성해서 전달해 줌
      - NAT 트래버설 지원을 통해 최적의 통신 경로를 찾음
  */
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // { urls: "stun:stun.services.mozilla.com" },
      // { urls: "stun:stun.freeswitch.org" },
    ],
  });

  const dataChannel = pc.createDataChannel("chat");
  peers[peerId] = { pc, dataChannel };

  dataChannel.onopen = () => {
    console.log(`${peerId}와의 데이터 채널 열림`);
  };

  dataChannel.onmessage = (event) => {
    addMessage(peerId, event.data);
  };

  // ICE candidate 핸들러 먼저 등록 (중요!)
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      ws.send(
        JSON.stringify({
          type: "candidate",
          candidate: event.candidate,
          from: userId,
          to: peerId,
        }),
      );
      console.log(`${peerId}에게 ICE candidate 전송`);
    }
  };

  pc.oniceconnectionstatechange = (event) => {
    console.log(
      `${peerId}의 ICE 연결 상태: ${event.target.iceConnectionState}`,
    );
    if (event.target.iceConnectionState === "disconnected") {
      if (peers[peerId]) {
        console.log(`피어 ${peerId} 연결 해제 및 제거됨`);
        delete peers[peerId];
      }
    }
  };

  pc.onicegatheringstatechange = (event) => {
    console.log(`${peerId}의 ICE 수집 상태: ${event.target.iceGatheringState}`);
  };

  // Offer 생성 (핸들러 등록 후)
  pc.createOffer()
    .then((offer) => pc.setLocalDescription(offer))
    .then(() => {
      ws.send(
        JSON.stringify({
          type: "offer",
          sdp: pc.localDescription,
          from: userId,
          to: peerId,
        }),
      );
      console.log(`${peerId}에게 Offer 전송`);
    })
    .catch((error) => {
      console.error("Offer 생성 중 오류:", error);
    });
}

function addMessage(peerId, message) {
  const div = document.createElement("div");
  div.innerHTML = `<span style="color:yellow;font-weight:bold">${peerId}</span> ${message}`;
  domChat.appendChild(div);
  domChat.scrollTop = domChat.scrollHeight;
}

async function handleOffer(peerId, sdp) {
  if (!peers[peerId]) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    peers[peerId] = { pc, dataChannel: null };

    pc.ondatachannel = (event) => {
      peers[peerId].dataChannel = event.channel;

      event.channel.onopen = () => {
        console.log(`${peerId}와의 데이터 채널 열림 (수신자)`);
      };

      event.channel.onmessage = (event) => {
        addMessage(peerId, event.data);
      };
    };

    // ICE candidate 핸들러 먼저 등록 (중요!)
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(
          JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
            from: userId,
            to: peerId,
          }),
        );
        console.log(`${peerId}에게 ICE candidate 전송`);
      }
    };

    pc.oniceconnectionstatechange = (event) => {
      console.log(
        `${peerId}의 ICE 연결 상태: ${event.target.iceConnectionState}`,
      );
    };

    pc.onicegatheringstatechange = (event) => {
      console.log(
        `${peerId}의 ICE 수집 상태: ${event.target.iceGatheringState}`,
      );
    };

    await pc.setRemoteDescription(new RTCSessionDescription(sdp));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    ws.send(
      JSON.stringify({
        type: "answer",
        sdp: pc.localDescription,
        from: userId,
        to: peerId,
      }),
    );
    console.log(`${peerId}에게 Answer 전송`);
  }
}

async function handleAnswer(peerId, sdp) {
  if (peers[peerId] && peers[peerId].pc) {
    const pc = peers[peerId].pc;
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    console.log(`${peerId}의 원격 설명(answer) 설정 완료`);
  } else {
    console.warn(`Answer 처리 중 피어 ${peerId}를 찾을 수 없음`);
  }
}

async function handleCandidate(peerId, candidate) {
  if (peers[peerId] && peers[peerId].pc) {
    const pc = peers[peerId].pc;

    if (pc.remoteDescription) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
      console.log(`${peerId}의 ICE candidate 추가 완료`);
    } else {
      console.warn(
        `${peerId}의 원격 설명이 아직 설정되지 않아 candidate를 추가할 수 없음`,
      );
    }
  } else {
    console.warn(`Candidate 처리 중 피어 ${peerId}를 찾을 수 없음`);
  }
}

domSendButton.onclick = () => {
  const message = domMessageInput.value;

  if (message.trim() === "") {
    return;
  }

  addMessage("You", message);

  Object.values(peers).forEach((peer) => {
    if (peer.dataChannel && peer.dataChannel.readyState === "open") {
      peer.dataChannel.send(message);
    }
  });

  domMessageInput.value = "";
};
