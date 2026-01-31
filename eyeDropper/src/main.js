import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>EyeDropper API 예제</h1>
  <button id="pickColorButton">색상 선택</button>
  <div class="color-display" id="selectedColorDisplay"></div>
  <p>선택된 색상:
    <span class="color-value" id="selectedColorValue">없음</span>
  </p>
`;

const pickColorButton = document.getElementById("pickColorButton");
const selectedColorDisplay = document.getElementById("selectedColorDisplay");
const selectedColorValue = document.getElementById("selectedColorValue");

pickColorButton.addEventListener("click", async () => {
  if (!window.EyeDropper) {
    alert("이 브라우저는 EyeDropper API를 지원하지 않습니다.");
    return;
  }

  try {
    const eyeDropper = new EyeDropper();

    const result = await eyeDropper.open();

    const pickedColor = result.sRGBHex;

    selectedColorDisplay.style.backgroundColor = pickedColor;

    selectedColorValue.textContent = pickedColor;
  } catch (error) {
    selectedColorValue.textContent = "선택 취소됨";
    selectedColorDisplay.style.backgroundColor = "#f0f0f0";
  }
});
