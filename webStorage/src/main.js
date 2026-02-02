import "./style.css";

document.querySelector("#app").innerHTML = /*html*/ `
	<h1>Web Storage API 예제</h1>

	<h2>localStorage</h2>
	<div>
		<label for="localKey">키:</label>
		<input type="text" id="localKey" value="username">
		<label for="localValue">값:</label>
		<input type="text" id="localValue" value="Alice">
		<button id="setLocalStorage">저장 (setItem)</button>
		<button id="getLocalStorage">가져오기 (getItem)</button>
		<button id="removeLocalStorage">삭제 (removeItem)</button>
		<button id="clearLocalStorage">모두 삭제 (clear)</button>
	</div>
	<div id="localStorageOutput" class="output"></div>

	<h2>sessionStorage</h2>
	<div>
		<label for="sessionKey">키:</label>
		<input type="text" id="sessionKey" value="lastVisit">
		<label for="sessionValue">값:</label>
		<input type="text" id="sessionValue" value="2025-06-22">
		<button id="setSessionStorage">저장 (setItem)</button>
		<button id="getSessionStorage">가져오기 (getItem)</button>
		<button id="removeSessionStorage">삭제 (removeItem)</button>
		<button id="clearSessionStorage">모두 삭제 (clear)</button>
	</div>
	<div id="sessionStorageOutput" class="output"></div>
`;

function getLocalKeyValue() {
  const key = document.getElementById("localKey").value;
  const value = document.getElementById("localValue").value;
  return [key, value];
}

function getSessionKeyValue() {
  const key = document.getElementById("sessionKey").value;
  const value = document.getElementById("sessionValue").value;
  return [key, value];
}

function updateOutput(elementId, message) {
  document.getElementById(elementId).innerText = message;
}

updateOutput("sessionStorageOutput", "테스트");

const setLocalStorage = document.getElementById("setLocalStorage");
const getLocalStorage = document.getElementById("getLocalStorage");
const removeLocalStorage = document.getElementById("removeLocalStorage");
const clearLocalStorage = document.getElementById("clearLocalStorage");

setLocalStorage.onclick = () => {
  const [key, value] = getLocalKeyValue();
  localStorage.setItem(key, value);
  updateOutput(
    "localStorageOutput",
    `localStorage에 '${key}: ${value}' 저장됨.`,
  );
};

getLocalStorage.onclick = () => {
  const [key] = getLocalKeyValue();
  const value = localStorage.getItem(key);
  updateOutput(
    "localStorageOutput",
    `localStorage에서 '${key}'의 값: ${value}`,
  );
};

removeLocalStorage.onclick = () => {
  const [key] = getLocalKeyValue();
  localStorage.removeItem(key);
  updateOutput("localStorageOutput", `localStorage에서 '${key}' 삭제됨.`);
};

clearLocalStorage.onclick = () => {
  localStorage.clear();
  updateOutput("localStorageOutput", "localStorage의 모든 데이터가 삭제됨.");
};

const setSessionStorage = document.getElementById("setSessionStorage");
const getSessionStorage = document.getElementById("getSessionStorage");
const removeSessionStorage = document.getElementById("removeSessionStorage");
const clearSessionStorage = document.getElementById("clearSessionStorage");

setSessionStorage.onclick = () => {
  const [key, value] = getSessionKeyValue();
  sessionStorage.setItem(key, value);
  updateOutput(
    "sessionStorageOutput",
    `sessionStorage에 '${key}: ${value}' 저장됨.`,
  );
};

getSessionStorage.onclick = () => {
  const [key] = getSessionKeyValue();
  const value = sessionStorage.getItem(key);
  updateOutput(
    "sessionStorageOutput",
    `sessionStorage에서 '${key}'의 값: ${value}`,
  );
};

removeSessionStorage.onclick = () => {
  const [key] = getSessionKeyValue();
  sessionStorage.removeItem(key);
  updateOutput("sessionStorageOutput", `sessionStorage에서 '${key}' 삭제됨.`);
};

clearSessionStorage.onclick = () => {
  sessionStorage.clear();
  updateOutput(
    "sessionStorageOutput",
    "sessionStorage의 모든 데이터가 삭제됨.",
  );
};
