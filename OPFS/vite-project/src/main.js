import "./style.css";

// --- HTML 렌더링 ---
document.querySelector("#app").innerHTML = /*html*/ `
  <h1>OPFS API</h1>
  <div class="btn-group">
    <button id="writeBtn">파일 작성</button>
    <button id="readBtn">파일 읽기</button>
    <button id="listBtn">파일 목록</button>
    <button id="deleteBtn">파일 삭제</button>
    <button id="quotaBtn">저장 공간 확인</button>
  </div>
  <div id="output"></div>
`;

const output = document.getElementById("output");

const testFileName = "my-test-file.txt";
const testContent =
  "안녕하세요, Origin Private File System!\n이것은 테스트 내용입니다.";

// --- OPFS 루트 디렉토리 가져오기 ---
async function getOPFSRootDirectory() {
  try {
    const root = await navigator.storage.getDirectory();
    console.log("OPFS 루트 디렉토리를 성공적으로 가져왔습니다:", root);
    return root;
  } catch (error) {
    console.error("OPFS 루트 디렉토리를 가져오는 데 실패했습니다:", error);
    return null;
  }
}

// --- 파일 작성 ---
async function writeFile() {
  const root = await getOPFSRootDirectory();
  if (!root) return;

  try {
    const fileHandle = await root.getFileHandle(testFileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(testContent);
    await writable.close();
    log(`파일 "${testFileName}"을 작성했습니다.`);
  } catch (error) {
    console.error("파일 작성 실패:", error);
    log(`파일 작성 실패: ${error.message}`, true);
  }
}

// --- 파일 읽기 ---
async function readFile() {
  const root = await getOPFSRootDirectory();
  if (!root) return;

  try {
    const fileHandle = await root.getFileHandle(testFileName);
    const file = await fileHandle.getFile();
    const text = await file.text();
    log(`파일 내용:\n${text}`);
  } catch (error) {
    console.error("파일 읽기 실패:", error);
    log(`파일 읽기 실패: ${error.message}`, true);
  }
}

// --- 파일 목록 ---
async function listFiles() {
  const root = await getOPFSRootDirectory();
  if (!root) return;

  try {
    const entries = [];
    for await (const [name, handle] of root.entries()) {
      entries.push(`${handle.kind === "file" ? "📄" : "📁"} ${name}`);
    }
    log(entries.length ? entries.join("\n") : "파일이 없습니다.");
  } catch (error) {
    console.error("파일 목록 조회 실패:", error);
    log(`파일 목록 조회 실패: ${error.message}`, true);
  }
}

// --- 파일 삭제 ---
async function deleteFile() {
  const root = await getOPFSRootDirectory();
  if (!root) return;

  try {
    await root.removeEntry(testFileName);
    log(`파일 "${testFileName}"을 삭제했습니다.`);
  } catch (error) {
    console.error("파일 삭제 실패:", error);
    log(`파일 삭제 실패: ${error.message}`, true);
  }
}

// --- 저장 공간 확인 ---
async function checkStorageQuota() {
  try {
    const estimate = await navigator.storage.estimate();
    console.log(
      `현재 사용 중인 공간: ${(estimate.usage / (1024 * 1024 * 1024)).toFixed(2)} GB`
    );
    console.log(
      `총 저장 공간 (퀘터): ${(estimate.quota / (1024 * 1024 * 1024)).toFixed(2)} GB`
    );
    log(
      `사용 중: ${(estimate.usage / (1024 * 1024 * 1024)).toFixed(2)} GB / ` +
      `총 공간: ${(estimate.quota / (1024 * 1024 * 1024)).toFixed(2)} GB`
    );
  } catch (error) {
    console.error("저장 공간 추정 중 오류 발생:", error);
    log(`저장 공간 추정 실패: ${error.message}`, true);
  }
}

// --- 결과 출력 ---
function log(message, isError = false) {
  const div = document.createElement("div");
  div.className = "log" + (isError ? " error" : "");
  div.textContent = message;
  output.appendChild(div);
}

// --- 이벤트 바인딩 ---
document.getElementById("writeBtn").onclick = writeFile;
document.getElementById("readBtn").onclick = readFile;
document.getElementById("listBtn").onclick = listFiles;
document.getElementById("deleteBtn").onclick = deleteFile;
document.getElementById("quotaBtn").onclick = checkStorageQuota;
