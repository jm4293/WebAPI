import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>음성 합성 테스트</h1>
  <p>아래 텍스트를 입력하고 '말하기' 버튼을 누르면 음성으로 변환됩니다.</p>
  <input id="textToSpeak" size="70" /><br>
  <button id="speakButton">말하기</button>
  <button id="stopButton">정지</button>

  <label for="voiceSelect">음성 선택:</label>
  <select id="voiceSelect"></select><br><br>

  <div id="status"></div>
`;

const textToSpeakInput = document.getElementById("textToSpeak");
const speakButton = document.getElementById("speakButton");
const stopButton = document.getElementById("stopButton");
const voiceSelect = document.getElementById("voiceSelect");
const statusDiv = document.getElementById("status");

// --- 브라우저 지원 체크 ---
if (!("speechSynthesis" in window)) {
  statusDiv.textContent =
    "죄송합니다. 이 브라우저는 Web Speech API (음성 합성)를 지원하지 않습니다.";
  speakButton.disabled = true;
  stopButton.disabled = true;
}

const synth = window.speechSynthesis;

let voices = [];

// --- 음성 목록 로드 ---
synth.onvoiceschanged = () => {
  voices = synth.getVoices().sort((a, b) => {
    const an = a.name.toUpperCase();
    const bn = b.name.toUpperCase();
    if (an < bn) return -1;
    if (an > bn) return +1;
    return 0;
  });

  voiceSelect.innerHTML = "";

  // 한국어 음성을 먼저 표시
  const koreanVoices = voices.filter((voice) => voice.lang.startsWith("ko"));
  const otherVoices = voices.filter((voice) => !voice.lang.startsWith("ko"));

  koreanVoices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });

  otherVoices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

// --- 말하기 ---
speakButton.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance =
    new SpeechSynthesisUtterance(textToSpeakInput.value);

  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterance.voice = voices[i];
      break;
    }
  }

  utterance.onstart = () => {
    statusDiv.textContent = "음성 출력 중...";
    speakButton.disabled = true;
    stopButton.disabled = false;
  };

  utterance.onend = () => {
    statusDiv.textContent = "음성 출력 완료.";
    speakButton.disabled = false;
    stopButton.disabled = true;
  };

  utterance.onerror = (event) => {
    statusDiv.textContent = `오류 발생: ${event.error}`;
    speakButton.disabled = false;
    stopButton.disabled = true;
  };

  synth.speak(utterance);
});

// --- 정지 ---
stopButton.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel();
  }
  statusDiv.textContent = "음성 출력 중단됨.";
  speakButton.disabled = false;
  stopButton.disabled = true;
});
