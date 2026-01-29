import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
  <h1>Web Audio API 피아노</h1>
  <div class="piano-container">
    <button data-note="C4">도</button>
    <button data-note="D4">레</button>
    <button data-note="E4">미</button>
    <button data-note="F4">파</button>
    <button data-note="G4">솔</button>
    <button data-note="A4">라</button>
    <button data-note="B4">시</button>
    <button data-note="C5">도</button>
  </div>
  <p class="instructions">버튼을 클릭하여 음을 들어보세요!</p>
`;

const buttons = document.querySelectorAll("[data-note]");
buttons.forEach((button) => {
  button.addEventListener("click", handleNoteClick);
});

let audioContext = new AudioContext();

function handleNoteClick(event) {
  const button = event.currentTarget;
  const note = button.dataset.note;
  const frequency = noteFrequencies[note];

  if (frequency) {
    playNote(frequency);

    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);
  }
}

function playNote(frequency, duration = 0.5) {
  // Oscillator 생성 (소리를 생성하는 노드)
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const time = audioContext.currentTime;

  // Oscillator 설정
  oscillator.type = "sine"; //  파형 종류: sine, square, sawtooth, triangle
  oscillator.frequency.setValueAtTime(frequency, time);

  // 음량 설정 및 페이드 아웃 효과
  gainNode.gain.setValueAtTime(0.3, time);
  gainNode.gain.exponentialRampToValueAtTime(0.01, time + duration);

  // 연결: Oscillator -> GainNode -> Destination (스피커)
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 재생 시작 및 종료
  oscillator.start(time);
  oscillator.stop(time + duration);
}

// 음표에 해당하는 주파수 매핑 (Hz)
const noteFrequencies = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
};
